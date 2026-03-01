import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Player } from "./player";
import { WorldMap } from "./world-map";

const RenderView = () => {
  const canvasRef = useRef(null);
  let camera: THREE.OrthographicCamera;
  let player: Player;

  // init renderer, scene, camera, world, player
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
    const world = new WorldMap(scene, width, height);
    player = new Player(scene, 0, 0, 80);
    world.init();

    function animate() {
      world.update();
      renderer.render(scene, camera);
      player.update();
    }

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.dispose();
    };
  }, [canvasRef.current]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
          player.move(0, 1);
          break;
        case "ArrowDown":
          player.move(0, -1);
          break;
        case "ArrowLeft":
          player.move(-1, 0);
          break;
        case "ArrowRight":
          player.move(1, 0);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={800} />;
};

export default RenderView;
