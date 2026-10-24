import { useEffect, useRef } from "react";

/**
 * Interactive 3D cream jar for Fleurane. three.js is imported on demand, only in the browser,
 * so it never touches server rendering or the initial bundle. Drag to turn the jar; it turns
 * slowly by itself unless the visitor prefers reduced motion.
 */
export function JarViewer({ label, hint }: { label: string; hint: string }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let stop = false;
    let cleanup = () => {};
    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (stop) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      el.appendChild(renderer.domElement);
      renderer.domElement.style.touchAction = "pan-y";
      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 1.5, 6.2);
      camera.lookAt(0, 0.1, 0);

      const group = new THREE.Group();
      scene.add(group);
      const tex = new THREE.TextureLoader().load("/fleurane/jar-label.webp");
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      // Rotate the texture so the front of the label faces the camera at rotation 0.
      tex.wrapS = THREE.RepeatWrapping;
      tex.offset.x = 0.5;
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(1.05, 1.05, 1.3, 96, 1, false),
        [
          new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.38, clearcoat: 0.6, clearcoatRoughness: 0.25 }),
          new THREE.MeshPhysicalMaterial({ color: 0xf5f3ef, roughness: 0.5 }),
          new THREE.MeshPhysicalMaterial({ color: 0xf5f3ef, roughness: 0.5 }),
        ],
      );
      body.position.y = -0.15;
      group.add(body);
      const lidMat = new THREE.MeshPhysicalMaterial({ color: 0x3b3e72, roughness: 0.32, metalness: 0.1, clearcoat: 0.8, clearcoatRoughness: 0.2 });
      const capMat = new THREE.MeshStandardMaterial({ color: 0x34376a, roughness: 0.55, envMapIntensity: 0.25 });
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.62, 96), [lidMat, capMat, capMat]);
      lid.position.y = 0.81;
      group.add(lid);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.014, 12, 96), new THREE.MeshStandardMaterial({ color: 0xc9a24f, metalness: 1, roughness: 0.28 }));
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.49;
      group.add(ring);
      // Soft contact shadow
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, "rgba(20,20,50,0.5)");
      grad.addColorStop(1, "rgba(20,20,50,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 256, 256);
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = -0.82;
      scene.add(shadow);
      const key = new THREE.DirectionalLight(0xffffff, 1.3);
      key.position.set(3, 4, 4);
      scene.add(key);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let rot = -0.45;
      let vel = 0;
      let dragging = false;
      let lastX = 0;
      let raf = 0;
      const resize = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        renderer.setSize(w, h, false);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      const down = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        renderer.domElement.setPointerCapture(e.pointerId);
      };
      const move = (e: PointerEvent) => {
        if (!dragging) return;
        vel = (e.clientX - lastX) * 0.012;
        rot += vel;
        lastX = e.clientX;
      };
      const up = () => {
        dragging = false;
      };
      const cv = renderer.domElement;
      cv.addEventListener("pointerdown", down);
      cv.addEventListener("pointermove", move);
      cv.addEventListener("pointerup", up);
      cv.addEventListener("pointercancel", up);
      let visible = true;
      const io = new IntersectionObserver(([en]) => (visible = !!en?.isIntersecting));
      io.observe(el);
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        if (!dragging) {
          vel *= 0.95;
          rot += vel + (reduce ? 0 : 0.0035);
        }
        group.rotation.y = rot;
        group.rotation.x = 0.1;
        renderer.render(scene, camera);
      };
      loop();
      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        cv.removeEventListener("pointerdown", down);
        cv.removeEventListener("pointermove", move);
        cv.removeEventListener("pointerup", up);
        cv.removeEventListener("pointercancel", up);
        renderer.dispose();
        pmrem.dispose();
        cv.remove();
      };
    })();
    return () => {
      stop = true;
      cleanup();
    };
  }, []);
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#404378]">
      <div ref={host} role="img" aria-label={label} className="aspect-[4/3] w-full cursor-grab touch-pan-y active:cursor-grabbing md:aspect-[16/9]" />
      <p className="eyebrow pointer-events-none absolute bottom-4 left-0 w-full text-center text-white/70">{hint}</p>
    </div>
  );
}
