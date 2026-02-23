import { useEffect, useRef } from "react";
import * as THREE from "three";
import { WorldMap } from "./world-map";

const RenderView = () => {
  const canvasRef = useRef(null);
  let camera: THREE.OrthographicCamera;

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });

    const width = 800;
    const height = 800;
    renderer.setSize(width, height);

    camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      -1000,
      1000
    );

    camera.position.set(0, 500, 0);
    camera.lookAt(0, 0, 0);
    console.log("카메라 좌/우", camera.left, camera.right);
    console.log("카메라 위/아래", camera.top, camera.bottom);
    const world = new WorldMap(scene, width, height);
    world.init();

    function animate() {
      world.update();
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.dispose();
    };
  }, [canvasRef.current]);

  return <canvas ref={canvasRef} width={800} height={800} />;
};

export default RenderView;
