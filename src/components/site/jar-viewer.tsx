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
      renderer.toneMappingExposure = 0.78;
      el.appendChild(renderer.domElement);
      renderer.domElement.style.touchAction = "pan-y";
      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 2.1, 7.2);
      camera.lookAt(0, 0.25, 0);

      const group = new THREE.Group();
      scene.add(group);
      const tex = new THREE.TextureLoader().load("/fleurane/jar-label.webp");
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      // Glass jar: a lathe profile with a slightly flared body, rounded base and a thick rim.
      const R = 1.25;
      const H = 1.6;
      const prof: [number, number][] = [
        [0, 0], [R * 0.78, 0], [R * 0.9, 0.03], [R * 0.97, 0.11], [R * 0.99, 0.25],
        [R, 0.6], [R * 1.01, H * 0.85], [R * 0.99, H - 0.07], [R * 0.95, H - 0.02], [R * 0.9, H],
        [R * 0.86, H - 0.05], [R * 0.9, H - 0.2],
      ];
      const glass = new THREE.Mesh(
        new THREE.LatheGeometry(prof.map(([x, y]) => new THREE.Vector2(x, y)), 128),
        new THREE.MeshPhysicalMaterial({ color: 0xf2f4f8, transmission: 0.92, thickness: 0.35, ior: 1.5, roughness: 0.04, clearcoat: 1, side: THREE.DoubleSide, transparent: true, opacity: 0.55, envMapIntensity: 1 }),
      );
      group.add(glass);
      // Cream: fills the jar and rises into a soft swirl.
      const creamMat = new THREE.MeshPhysicalMaterial({ color: 0xf7f0e4, roughness: 0.38, sheen: 1, sheenColor: new THREE.Color(0xfff6e6), clearcoat: 0.3 });
      const fill = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.86, R * 0.82, H - 0.12, 96), creamMat);
      fill.position.y = (H - 0.12) / 2 + 0.06;
      group.add(fill);
      const topY = H - 0.1;
      const pts: InstanceType<typeof THREE.Vector3>[] = [];
      const turns = 2.35;
      for (let i = 0; i <= 120; i++) {
        const u = i / 120;
        const r = (1 - u) * R * 0.52;
        const a = u * turns * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, topY + 0.12 + Math.pow(u, 0.85) * 0.34, Math.sin(a) * r));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const swirl = new THREE.Mesh(new THREE.TubeGeometry(curve, 240, 0.19, 24, false), creamMat);
      group.add(swirl);
      const swirlBase = new THREE.Mesh(new THREE.SphereGeometry(R * 0.7, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), creamMat);
      swirlBase.scale.set(1, 0.16, 1);
      swirlBase.position.y = topY;
      group.add(swirlBase);
      // Label: wraps about 150 degrees of the front, with the logo centred.
      const lh = 1.0;
      const arc = (lh * 2048) / 656 / (R * 1.02);
      const labelMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.42, metalness: 0.02, side: THREE.DoubleSide });
      const label = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.022, R * 1.022, lh, 128, 1, true, -0.43 * arc, arc), labelMat);
      label.position.y = 0.72;
      group.add(label);
      // Navy lid, shown open and leaning against the jar.
      const lidMat = new THREE.MeshPhysicalMaterial({ color: 0x2c3070, roughness: 0.55, metalness: 0.15, clearcoat: 0.3, side: THREE.DoubleSide });
      const lidProf: [number, number][] = [[R * 0.97, 0], [R * 1.1, 0], [R * 1.12, 0.04], [R * 1.12, 0.5], [R * 1.08, 0.58], [0, 0.58], [0, 0.54], [R * 1.04, 0.54], [R * 1.07, 0.48], [R * 1.06, 0.06], [R * 0.97, 0.03]];
      const lid = new THREE.Mesh(new THREE.LatheGeometry(lidProf.map(([x, y]) => new THREE.Vector2(x, y)), 96), lidMat);
      const lidGroup = new THREE.Group();
      lidGroup.add(lid);
      lidGroup.rotation.set(0, 0, -1.15);
      lidGroup.position.set(R * 1.55, 0.2, -0.1);
      group.add(lidGroup);
      group.position.set(-0.45, -0.85, 0);

      // Soft contact shadow
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, "rgba(20,20,50,0.5)");
      grad.addColorStop(1, "rgba(20,20,50,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 256, 256);
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.set(-0.45, -0.84, 0);
      scene.add(shadow);
      scene.background = null;
      const key = new THREE.DirectionalLight(0xffffff, 0.9);
      key.position.set(3, 4, 4);
      scene.add(key);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let rot = 0.5;
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
        group.rotation.x = 0;
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
