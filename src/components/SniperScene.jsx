import {Canvas} from "@react-three/fiber";
import {Stage, PresentationControls, useGLTF, Box, Text} from "@react-three/drei";
import React, { useState } from "react";
import Sniper from './Sniper';
import { Suspense } from "react";

function SniperScene() {

  return (
    <div className="model-scene">
        <Canvas dpr={[1, 2]} shadows camera={{fov:45}} style={{"height": "500px", "width": "100%"}}>
          <color attach="background" args={["lightblue"]} />
          <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI /4]}>
            <hemisphereLight intensity={2} />
            <Stage environment={null}>
              <Suspense fallback={null}>
                <Sniper scale={0.1} />
              </Suspense>
            </Stage>
          </PresentationControls>
        </Canvas>
    </div>
  );
}

export default SniperScene;
