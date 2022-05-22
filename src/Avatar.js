import { Html, useGLTF } from '@react-three/drei'
import React, { useLayoutEffect, useMemo } from 'react'
import { useThree } from 'react-three-fiber'
import * as THREE from 'three'

import { useMouse3D } from './Mouse'

export default function Avatar(props) {
  const { scene, nodes } = useGLTF('avatar.glb')
  const { plane } = useMemo(
    () => ({
      plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.5),
    }),
    []
  )
  useMouse3D(plane, (mouse3D) => {
    nodes.Head.lookAt(mouse3D)
  })
  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  )
}

export function Wireframe({ onCompile = () => {}, ...props }) {
  const { nodes } = useGLTF('loading.glb')
  const { gl, scene, camera } = useThree()
  useLayoutEffect(() => {
    gl.compile(scene, camera)
    onCompile()
  }, [])
  return (
    <group {...props}>
      {/* <mesh geometry={nodes.Loading.geometry}>
        <meshBasicMaterial color="gray" wireframe />
      </mesh> */}
    </group>
  )
}

export function Loading() {
  return <Html>loading...</Html>
}
