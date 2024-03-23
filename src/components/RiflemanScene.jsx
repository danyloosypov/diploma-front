import {Canvas} from "@react-three/fiber";
import {Stage, PresentationControls, useGLTF, Box, Text} from "@react-three/drei";
import React, { useState } from "react";
import Rifleman from './Rifleman';
import { Suspense } from "react";

function RiflemanScene() {

  return (
    <div>
        <Canvas dpr={[1, 2]} shadows camera={{fov:45}} style={{"height": "800px", "width": "500px"}}>
          <color attach="background" args={["lightblue"]} />
          <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI /4]}>
            <hemisphereLight intensity={1} />
            <Stage environment={null}>
              <Suspense fallback={null}>
                <Rifleman scale={0.1} />
              </Suspense>
            </Stage>
          </PresentationControls>
        </Canvas>
    </div>
  );
}

export default RiflemanScene;
