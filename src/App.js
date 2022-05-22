import React, { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { Environment } from '@react-three/drei'
import { tw } from './twind/styled'
import Avatar, { Wireframe } from './Avatar'
import { animation, css } from 'twind/css'
import { ResizeObserver } from '@juggle/resize-observer'

const fadeIn = animation('0.5s ease forwards', {
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const fadeOut = animation('0.5s ease forwards 1s', {
  from: { opacity: 1 },
  to: { opacity: 0 },
})

const camera = { position: [0, 0, 2], fov: 12 }

const Button = tw.button(({ primary }) => [
  primary ? tw`bg-purple-700 text-white` : tw`bg-gray-200 text-black`,
  tw`font-semibold`,
  tw`px-8 py-2 rounded-lg`,
  tw`focus:outline-none focus:ring`,
])

export default function App() {
  return (
    <div className={tw`h-screen grid place-items-center overflow-y-scroll`}>
      <div className={tw`max-w-2xl mx-auto flex flex-col md:flex-row items-center p-8`}>
        <AvatarCanvas size={64} />
      </div>
    </div>
  )
}

const wipeIn = animation('1s forwards ease', {
  from: { maskPosition: '0 0' },
  to: { maskPosition: '0 100%' },
})

function AvatarCanvas({ size = 48 }) {
  const [state, setState] = useState(null)
  const detailStyles = tw(
    wipeIn,
    css({
      maskImage: 'linear-gradient(to bottom, transparent 0 45%, black 55% 100%)',
      maskSize: '100% 200%',
      willChange: 'mask-position',
    })
  )
  const queueDone = (ms) => {
    setTimeout(() => setState('done'), ms)
  }
  return (
    <div className={tw`w-64 h-64 relative`}>
      <div className={tw`h-full w-full absolute`}>
        <PlaceholderCanvas className={tw`${state === 'placeholder' ? fadeIn : fadeOut}`} onReady={() => setState('placeholder')} />
      </div>
      <div className={tw`h-full w-full absolute`}>
        <DetailCanvas className={tw`${state === 'done' && detailStyles}`} onReady={() => queueDone(500)} />
      </div>
    </div>
  )
}

function PlaceholderCanvas({ onReady, ...props }) {
  return (
    <Canvas concurrent camera={camera} {...props} resize={{ polyfill: ResizeObserver }}>
      <Suspense fallback={null}>
        <Wireframe position-y={-0.6} onCompile={onReady} />
      </Suspense>
    </Canvas>
  )
}

function DetailCanvas({ onReady, ...props }) {
  return (
    <Canvas concurrent camera={camera} {...props} resize={{ polyfill: ResizeObserver }}>
      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        <Avatar position-y={-0.6} />
        <Precompile onCompile={onReady} />
      </Suspense>
    </Canvas>
  )
}

function Precompile({ onCompile = () => {} }) {
  const { gl, scene, camera } = useThree()
  useLayoutEffect(() => {
    gl.compile(scene, camera)
    onCompile()
  }, [])
  return null
}
