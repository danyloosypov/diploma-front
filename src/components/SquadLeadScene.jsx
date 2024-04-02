import {Canvas} from "@react-three/fiber";
import {Stage, PresentationControls, useGLTF, Box, Text} from "@react-three/drei";
import React, { useState } from "react";
import SquadLead from './SquadLead';
import { Suspense } from "react";

function SquadLeadScene() {

  return (
    <div className="model-scene">
        <Canvas dpr={[1, 2]} shadows camera={{fov:45}} style={{"height": "500px", "width": "100%"}}>
          <color attach="background" args={["lightblue"]} />
          <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI /4]}>
            <hemisphereLight intensity={1} />
            <Stage environment={null}>
              <Suspense fallback={null}>
                <SquadLead scale={0.1} />
              </Suspense>
            </Stage>
          </PresentationControls>
        </Canvas>
    </div>
  );
}

export default SquadLeadScene;
