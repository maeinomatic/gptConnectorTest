import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js'

export default function IFCViewer() {
  const containerRef = useRef()
  const loaderRef = useRef()
  const sceneRef = useRef()
  const cameraRef = useRef()
  const rendererRef = useRef()
  const modelRef = useRef()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    sceneRef.current = new THREE.Scene()
    cameraRef.current = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    cameraRef.current.position.z = 5

    rendererRef.current = new THREE.WebGLRenderer({ antialias: true })
    rendererRef.current.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(rendererRef.current.domElement)

    loaderRef.current = new IFCLoader()

    const onResize = () => {
      if (!rendererRef.current || !cameraRef.current) return
      cameraRef.current.aspect = container.clientWidth / container.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    const animate = () => {
      rendererRef.current.render(sceneRef.current, cameraRef.current)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement)
      }
    }
  }, [])

  const onFileChange = async event => {
    const file = event.target.files?.[0]
    if (!file || !loaderRef.current || !sceneRef.current) return
    try {
      const buffer = await file.arrayBuffer()
      const parsed = await loaderRef.current.ifcManager.parse(buffer, file.name)
      const mesh = parsed.isMesh ? parsed : new THREE.Mesh(parsed.geometry, parsed.material)
      if (modelRef.current) sceneRef.current.remove(modelRef.current)
      sceneRef.current.add(mesh)
      modelRef.current = mesh
    } catch (err) {
      console.error('Failed to parse IFC file', err)
      alert('Error parsing IFC file')
    }
  }

  return (
    <div>
      <input type='file' accept='.ifc' onChange={onFileChange} />
      <div style={{ width: '100%', height: '400px' }} ref={containerRef} />
    </div>
  )
}

