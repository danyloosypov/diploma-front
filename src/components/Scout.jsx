/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 scene.gltf 
Author: 3dmodelsst (https://sketchfab.com/3dmodelsst)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/commander-freedom-from-stalker-08866d9718aa4f2793c63d3e76a9f3c7
Title: Commander freedom from STALKER
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('../scout/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh geometry={nodes.Object_67.geometry} material={materials.actnewfreedomballisticvest_co} skeleton={nodes.Object_67.skeleton} />
          <skinnedMesh geometry={nodes.Object_69.geometry} material={materials.actnewfreedombeaniehat_green_co} skeleton={nodes.Object_69.skeleton} />
          <skinnedMesh geometry={nodes.Object_71.geometry} material={materials.actnewbanditframe} skeleton={nodes.Object_71.skeleton} />
          <skinnedMesh geometry={nodes.Object_73.geometry} material={materials.actnewfreedomfreedom_hood3_d} skeleton={nodes.Object_73.skeleton} />
          <skinnedMesh geometry={nodes.Object_75.geometry} material={materials.actfacesm_white_13_co} skeleton={nodes.Object_75.skeleton} />
          <skinnedMesh geometry={nodes.Object_77.geometry} material={materials.actnewfreedomm65_jacket_freedom3_co} skeleton={nodes.Object_77.skeleton} />
          <skinnedMesh geometry={nodes.Object_79.geometry} material={materials.actnewlonermilitaryboots_black_co} skeleton={nodes.Object_79.skeleton} />
          <skinnedMesh geometry={nodes.Object_81.geometry} material={materials.actnewfreedompants_cargo_freedom2} skeleton={nodes.Object_81.skeleton} />
          <skinnedMesh geometry={nodes.Object_83.geometry} material={materials.actnewbanditslide} skeleton={nodes.Object_83.skeleton} />
          <skinnedMesh geometry={nodes.Object_85.geometry} material={materials.actnewmercus_rangers_loadout_a} skeleton={nodes.Object_85.skeleton} />
          <skinnedMesh geometry={nodes.Object_87.geometry} material={materials.actnewmercus_rangers_loadout_c} skeleton={nodes.Object_87.skeleton} />
          <skinnedMesh geometry={nodes.Object_89.geometry} material={materials.actnewfreedomvest_tactical_freedom} skeleton={nodes.Object_89.skeleton} />
          <skinnedMesh geometry={nodes.Object_91.geometry} material={materials.actnewfreedomworkinggloves_freedom_co} skeleton={nodes.Object_91.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
