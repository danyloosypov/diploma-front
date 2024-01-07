import { Suspense } from 'react';
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls, Stage, PresentationControls, useGLTF, Box, Text} from "@react-three/drei";
import React, { useRef, useEffect, useState } from "react";
import { Vector3, Mesh, Spherical } from "three";

function Model(props) {
  const {scene} = useGLTF("../Test/body.glb");
  return <primitive object={scene} scale={0.1} {...props} />
}


function Body() {
  const [isRed, setIsRed] = useState(true);

  return (
    <div className="App">
        <Canvas dpr={[1, 2]} shadows camera={{fov:45}} style={{"position": "absolute", "width": "500px"}}>
          <color attach="background" args={["lightblue"]} />
          <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI /4]}>
            <Stage environment={null}>
              <Model scale={0.1} />
              {/*<pointLight position={[0, 0.35, 0.04]} intensity={0.01} color={"red"} />*/}
              {/* правая грудь */}
              <Box 
                position={[0.02, 0.35, 0.026]} 
                scale={0.01}
              >
                <meshStandardMaterial 
                  attach="material" 
                  color={isRed ? 'red' : 'white'}
                />
                <Text position={[4, 2, 0.86]} color="black" fontSize={1.5}>
                  Right chest: 24
                </Text>
              </Box>
              {/* левая грудь */}
              <Box 
                position={[-0.02, 0.35, 0.026]} 
                scale={0.01}
              >
                <meshStandardMaterial 
                  attach="material" 
                  color={isRed ? 'red' : 'white'}
                />
                <Text position={[-4, 2, 0.86]} color="black" fontSize={1.5}>
                  Left chest: 24
                </Text>
              </Box>
              {/* голова */}
              <Box 
                position={[0, 0.42, 0.026]} 
                scale={0.01}
              >
                <meshStandardMaterial 
                  attach="material" 
                  color={isRed ? 'red' : 'white'}
                />
                <Text position={[0, 2, 0.86]} color="black" fontSize={1.5}>
                  Head: 24
                </Text>
              </Box>
              {/* спина */}
              <Box 
                position={[0, 0.35, -0.046]} 
                scale={0.01}
              >
                <meshStandardMaterial 
                  attach="material" 
                  color={isRed ? 'red' : 'white'}
                />
                <Text Text position={[0, 2, -0.86]} color="black" fontSize={1.5} rotation={[0, Math.PI, 0]}>
                  Spine: 24
                </Text>
              </Box>
              {/* правая нога */}
              <Box 
                position={[0.03, 0.18, 0.026]} 
                scale={0.01}
              >
                <meshStandardMaterial 
                  attach="material" 
                  color={isRed ? 'red' : 'white'}
                />
                <Text position={[0, 4, 0.86]} color="black" fontSize={1.5}>
                  Right leg: 24
                </Text>
              </Box>
              {/* левая нога */}
              <Box 
                position={[-0.03, 0.18, 0.026]} 
                scale={0.01}
              >
                <meshStandardMaterial 
                  attach="material" 
                  color={isRed ? 'red' : 'white'}
                />
                <Text position={[0, -4, 0.86]} color="black" fontSize={1.5}>
                  Left leg: 24
                </Text>
              </Box>
              {/* живота */}
              <Box 
                position={[0, 0.3, 0.026]} 
                scale={0.01}
              >
                <meshStandardMaterial 
                  attach="material" 
                  color={isRed ? 'red' : 'white'}
                />
                <Text position={[0, 2, 0.86]} color="black" fontSize={1.5}>
                  Stomach: 24
                </Text>
              </Box>
            </Stage>
          </PresentationControls>
        </Canvas>
    </div>
  );
}

export default Body;
