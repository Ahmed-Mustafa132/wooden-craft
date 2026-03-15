import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import * as THREE from "three";

export default function ThreeBackground({
  init ,
  animate,
  dependencies = [],
  cameraPos = { z: 5 },
  sx = {},
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000,
    );
    if (cameraPos) {
      if (cameraPos.x !== undefined) camera.position.x = cameraPos.x;
      if (cameraPos.y !== undefined) camera.position.y = cameraPos.y;
      if (cameraPos.z !== undefined) camera.position.z = cameraPos.z;
    }

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // User Init
    const cleanupInit = init ? init(scene, camera, renderer) : null;

    // Animation Loop
    let frameId;
    const loop = () => {
      frameId = requestAnimationFrame(loop);
      if (animate) animate(scene, camera, renderer);
      renderer.render(scene, camera);
    };
    loop();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      if (cleanupInit) cleanupInit();
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, dependencies);

  return (
    <Box
      ref={mountRef}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        ...sx,
      }}
    />
  );
}
