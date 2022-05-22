import { useEffect, useMemo } from 'react'
import { useThree } from 'react-three-fiber'
import * as THREE from 'three'

export const useMouse3D = (plane, callback = () => {}) => {
  const { gl, camera } = useThree()
  const bounds = gl.domElement.getBoundingClientRect()
  const { position, mouse, raycaster } = useMemo(() => {
    const position = new THREE.Vector3()
    const mouse = new THREE.Vector2()
    // We need a new raycaster that works beyond the canvas
    const raycaster = new THREE.Raycaster()
    return { position, mouse, raycaster }
  }, [])
  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.x = ((e.clientX - bounds.x) / bounds.width) * 2 - 1
      mouse.y = ((e.clientY - bounds.y) / bounds.height) * -2 + 1
      raycaster.setFromCamera(mouse, camera)
      raycaster.ray.intersectPlane(plane, position)
      callback(position)
    }
    const listener = window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', listener)
  }, [bounds])
  return position
}
