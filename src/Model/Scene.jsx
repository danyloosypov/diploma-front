import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials['Material.001']} rotation={[Math.PI / 2, 0, 0]} scale={2.113} />
    </group>
  )
}

useGLTF.preload('/scene.gltf')
