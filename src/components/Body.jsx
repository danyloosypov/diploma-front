import {Canvas} from "@react-three/fiber";
import {Stage, PresentationControls, useGLTF, Box, Text} from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

function Model(props) {
  const {scene} = useGLTF("../Test/body.glb");
  return <primitive object={scene} scale={0.1} {...props} />
}

function Body({ hits }) {
  const [isRed, setIsRed] = useState(true);
  const [t, i18n] = useTranslation('global');

  useEffect(() => {
    console.log(hits)
  }, []);

  return (
    <div className="body-model-container">
        <Canvas dpr={[1, 2]} shadows camera={{fov:45}} style={{"height": "100%", "width": "100%"}}>
          <color attach="background" args={["lightblue"]} />
          <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI /4]}>
            <Stage environment={null}>
              <Model scale={0.1} />
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
                  {t('body.rightChest')}: { hits[3] }
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
                  {t('body.leftChest')}: { hits[2] }
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
                  {t('body.head')}: { hits[1] }
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
                  {t('body.spine')}: { hits[7] }
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
                  {t('body.leftLeg')}: { hits[5] }
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
                  {t('body.rightLeg')}: { hits[6] }
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
                  {t('body.stomach')}: { hits[4] }
                </Text>
              </Box>
            </Stage>
          </PresentationControls>
        </Canvas>
    </div>
  );
}

Body.defaultProps = {
  hits: [0, 0, 0, 0, 0, 0, 0] 
};

export default Body;
