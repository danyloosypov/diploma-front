import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Service from '../utils/Service';
import app from "../firebaseConfig";
import { getDatabase, ref, get, set, push} from "firebase/database";
import { useTranslation } from 'react-i18next';
import { useLoadingContext } from '../context/LoadingContext';
import { toast } from 'react-toastify';

export default function Map({mapUrl, teamId, competitionId}) {
  const { editor, onReady } = useFabricJSEditor();
  const [mapSigns, setMapSigns] = useState([]);
  const [t, i18n] = useTranslation('global');
  const { startLoading, stopLoading } = useLoadingContext();
  const history = [];
  const [color, setColor] = useState("#35363a");
  const [cropImage, setCropImage] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      try {
        const mapSigns = await Service.getMapSigns();
        setMapSigns(mapSigns)
        stopLoading();
      } catch (error) {
        stopLoading();
        const errorMessage = t('phrazes:somethingWentWrong');
        toast.error(errorMessage);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addMapSign = (mapSign) => {
    const imageUrl = Service.getBaseURL() + "/storage/" + mapSign.icon;
    fabric.Image.fromURL(imageUrl, (image) => {
      image.set({
        left: 0,
        top: 0,
        selectable: true,
      });
      editor.canvas.add(image);
    });
  };
  
  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    if (cropImage) {
      editor.canvas.__eventListeners = {};
      return;
    }

    if (!editor.canvas.__eventListeners["mouse:wheel"]) {
      editor.canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY;
        var zoom = editor.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }

    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }

    editor.canvas.renderAll();
  }, [editor]);

  const addBackground = () => {
    if (!editor || !fabric) {
      return;
    }
  
    const imageUrl = Service.getBaseURL() + '/storage/' + mapUrl;
  
    fabric.Image.fromURL(imageUrl, (image) => {
      const canvasWidth = editor.canvas.width;
      const canvasHeight = editor.canvas.height;
  
      const scaleFactor = Math.max(canvasWidth / image.width, canvasHeight / image.height);
  
      image.set({
        scaleX: scaleFactor,
        scaleY: scaleFactor,
        left: 0,
        top: 0,
        originX: 'left',
        originY: 'top',
      });
  
      // Add the image as background
      editor.canvas.setBackgroundImage(
        image,
        editor.canvas.renderAll.bind(editor.canvas)
      );
    });
  };
  

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    const canvasContainer = document.getElementById("canvas-container");
    const containerWidth = canvasContainer.offsetWidth;

    editor.canvas.setHeight(500);
    editor.canvas.setWidth(containerWidth);
    addBackground();
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [color]);

  const undo = () => {
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop());
    }
    editor.canvas.renderAll();
  };
  const redo = () => {
    if (history.length > 0) {
      editor.canvas.add(history.pop());
    }
  };

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
  };

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  const addText = () => {
    editor.addText("inset text");
  };

  const saveCanvasAsJSON = () => {
    const json = JSON.stringify(editor.canvas.toJSON());
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "competitions/" + competitionId + '/teams/' + teamId))
    set(newDocRef, {
      map: json
    }).then(() => {
      toast("Success")
    }).catch((error) => {
      const errorMessage = t('phrazes:somethingWentWrong');
      toast.error(errorMessage);
      console.log(error);
    })
    
  };

  const loadJson = () => {
    startLoading();
    fetchFirebaseData();
    stopLoading();
  };

  const fetchFirebaseData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "competitions/" + competitionId + '/teams/' + teamId);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const maps = Object.values(snapshot.val());
      if (maps) {
        const map = maps[maps.length - 1]['map'];
        const canvas = editor.canvas;
        canvas.loadFromJSON(map, canvas.renderAll.bind(canvas), function(o, object) {
        });
      }
    }
  };

  useEffect(() => {
    if (editor) {
      fetchFirebaseData();
    }
  }, [editor]);

  return (
    <div className="map-canvas-container">
      <div className="map-btns">
        <button className="btn btn-outline-secondary" onClick={saveCanvasAsJSON}>{t('map.save')}</button>
        <button className="btn btn-outline-secondary" onClick={loadJson}>{t('map.load')}</button>
        <button className="btn btn-outline-secondary" onClick={addText} disabled={!cropImage}>
          {t('map.addText')}
        </button>
        <button className="btn btn-outline-danger" onClick={clear} disabled={!cropImage}>
          {t('map.clear')}
        </button>
        <button className="btn btn-outline-secondary" onClick={undo} disabled={!cropImage}>
          {t('map.undo')}
        </button>
        <button className="btn btn-outline-secondary" onClick={redo} disabled={!cropImage}>
          {t('map.redo')}
        </button>
        <button className="btn btn-outline-danger" onClick={removeSelectedObject} disabled={!cropImage}>
          {t('map.delete')}я
        </button>
        {mapSigns.map((mapSign, index) => (
          <button className="btn btn-outline-primary" key={index} onClick={() => addMapSign(mapSign)}>
            {t('map.add')} {mapSign.title}
          </button>
        ))}
      </div>
      
      <div
        style={{
          width: "100%",
          height: "500px"
        }}
        id="canvas-container"
      >
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      </div>
    </div>
  );
}
