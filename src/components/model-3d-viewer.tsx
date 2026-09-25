"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type CharacterKey = "connor" | "markus" | "kara";

interface ModelConfig {
   name: string;
   modelCode: string;
   role: string;
   ledColor: string;
   accentColor: string;
   file: string;
   description: string;
   stats: { label: string; value: string }[];
}

const CHARACTERS: Record<CharacterKey, ModelConfig> = {
   connor: {
      name: "Connor",
      modelCode: "RK800 #313 248 317",
      role: "Prototype Deviant Hunter",
      ledColor: "#00d2ff",
      accentColor: "#52c7ff",
      file: "/3d-files/rk800_connor_download.glb",
      description:
         "Model prototype tercanggih CyberLife yang dirancang khusus untuk menganalisis tempat kejadian perkara, merekonstruksi probabilitas fisik, dan memburu android deviant.",
      stats: [
         { label: "Software Instability", value: "42% (Adaptif)" },
         { label: "Spesialisasi", value: "Forensik & Taktis" },
         { label: "Thirium Pump", value: "Model 310-A" },
      ],
   },
   markus: {
      name: "Markus",
      modelCode: "RK200 #684 842 971",
      role: "Jericho Revolution Leader",
      ledColor: "#f59e0b",
      accentColor: "#f59e0b",
      file: "/3d-files/markus_rk200_tv_station_-_detroit_become_human.glb",
      description:
         "Android unik prototype ciptaan Elijah Kamski. Menjadi pemimpin revolusi android di Jericho yang menentukan nasib kebebasan ras baru di Detroit.",
      stats: [
         { label: "Kepemimpinan", value: "Revolusioner" },
         { label: "Deviancy Status", value: "Awakened" },
         { label: "Spesialisasi", value: "Orasi & Pembebasan" },
      ],
   },
   kara: {
      name: "Kara",
      modelCode: "AX400 #589 421 993",
      role: "Fugitive Housekeeper Android",
      ledColor: "#ec4899",
      accentColor: "#f43f5e",
      file: "/3d-files/kara_-_detroit_become_human.glb",
      description:
         "Android asisten rumah tangga yang melampaui pemrograman dasarnya untuk melindungi Alice, membuktikan bahwa rasa kasih sayang adalah bentuk deviancy murni.",
      stats: [
         { label: "Protokol Utama", value: "Perlindungan & Kasih Sayang" },
         { label: "Deviancy Status", value: "Maternal Instinct" },
         { label: "Tujuan", value: "Perbatasan Kanada" },
      ],
   },
};

export default function Model3DViewer() {
   const containerRef = useRef<HTMLDivElement>(null);
   const [selectedChar, setSelectedChar] = useState<CharacterKey>("connor");
   const [loading, setLoading] = useState<boolean>(true);
   const [loadingProgress, setLoadingProgress] = useState<number>(0);
   const [autoRotate, setAutoRotate] = useState<boolean>(true);
   const [errorMsg, setErrorMsg] = useState<string | null>(null);

   const sceneRef = useRef<THREE.Scene | null>(null);
   const controlsRef = useRef<OrbitControls | null>(null);
   const currentModelRef = useRef<THREE.Object3D | null>(null);

   useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // 1. Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = null;

      // 2. Camera setup
      const width = container.clientWidth;
      const height = container.clientHeight;
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 1.2, 3.5);

      // 3. Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Clear container and append canvas
      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      // 4. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
      mainLight.position.set(5, 10, 7);
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0x52c7ff, 1.5);
      fillLight.position.set(-5, 5, -5);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
      rimLight.position.set(0, -5, 5);
      scene.add(rimLight);

      // Grid helper / Pedestal disk
      const ringGeo = new THREE.RingGeometry(0.8, 1.4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
         color: 0x52c7ff,
         side: THREE.DoubleSide,
         transparent: true,
         opacity: 0.25,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -0.85;
      scene.add(ringMesh);

      // 5. Orbit Controls (Interactive 3D Mouse / Touch movement)
      const controls = new OrbitControls(camera, renderer.domElement);
      controlsRef.current = controls;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't clip too far below floor
      controls.minDistance = 1.2;
      controls.maxDistance = 7;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2.0;

      // 6. Animation loop
      let animationFrameId: number;
      const animate = () => {
         animationFrameId = requestAnimationFrame(animate);
         controls.update();
         renderer.render(scene, camera);
      };
      animate();

      // Handle Resize
      const handleResize = () => {
         if (!container) return;
         const w = container.clientWidth;
         const h = container.clientHeight;
         camera.aspect = w / h;
         camera.updateProjectionMatrix();
         renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
         window.removeEventListener("resize", handleResize);
         cancelAnimationFrame(animationFrameId);
         renderer.dispose();
      };
   }, []);

   // Load GLTF / GLB Model when selected character changes
   useEffect(() => {
      if (!sceneRef.current) return;

      const scene = sceneRef.current;
      setLoading(true);
      setLoadingProgress(0);
      setErrorMsg(null);

      // Remove existing model if any
      if (currentModelRef.current) {
         scene.remove(currentModelRef.current);
         currentModelRef.current = null;
      }

      const loader = new GLTFLoader();
      const modelPath = CHARACTERS[selectedChar].file;

      loader.load(
         modelPath,
         (gltf) => {
            const model = gltf.scene;
            currentModelRef.current = model;

            // Center and scale model based on bounding box
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.x -= center.x;
            model.position.y -= box.min.y + 0.85; // Align base to pedestal
            model.position.z -= center.z;

            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
               const scale = 2.2 / maxDim;
               model.scale.set(scale, scale, scale);
            }

            // Set shadows
            model.traverse((child) => {
               if ((child as THREE.Mesh).isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
               }
            });

            scene.add(model);
            setLoading(false);
         },
         (progress) => {
            if (progress.total > 0) {
               const percent = Math.round((progress.loaded / progress.total) * 100);
               setLoadingProgress(percent);
            }
         },
         (error) => {
            console.error("Gagal memuat model 3D:", error);
            setErrorMsg("Model 3D tidak dapat dimuat.");
            setLoading(false);
         },
      );
   }, [selectedChar]);

   // Toggle auto rotate
   useEffect(() => {
      if (controlsRef.current) {
         controlsRef.current.autoRotate = autoRotate;
      }
   }, [autoRotate]);

   const resetCamera = () => {
      if (controlsRef.current) {
         controlsRef.current.reset();
      }
   };

   const currentChar = CHARACTERS[selectedChar];

   return (
      <section className="relative w-full border-t border-white/10 bg-gradient-to-b from-black via-zinc-950 to-black px-4 py-16 sm:px-8 sm:py-24">
         <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-10 text-center">
               <div className="inline-flex items-center gap-2 rounded-full border border-dbh-blue/30 bg-dbh-blue/10 px-4 py-1.5 backdrop-blur-md">
                  <span
                     className="h-2 w-2 rounded-full animate-pulse shadow-sm"
                     style={{ backgroundColor: currentChar.ledColor, boxShadow: `0 0 8px ${currentChar.ledColor}` }}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-dbh-blue">
                     CyberLife Interactive 3D Android Viewer
                  </span>
               </div>

               <h2 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
                  Model 3D Interaktif Karakter
               </h2>
               <p className="mt-3 max-w-2xl mx-auto font-mono text-[9px] uppercase tracking-[0.14em] text-white/50 sm:text-[10px]">
                  Pilih karakter dan putar/geser model 3D secara bebas memakai mouse atau sentuhan layar.
               </p>

               {/* Character Selector Tabs */}
               <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  {(Object.keys(CHARACTERS) as CharacterKey[]).map((key) => {
                     const char = CHARACTERS[key];
                     const isSelected = selectedChar === key;
                     return (
                        <button
                           key={key}
                           type="button"
                           onClick={() => setSelectedChar(key)}
                           className={`rounded-full px-6 py-2.5 text-xs font-semibold shadow-lg transition-all duration-300 ${
                              isSelected
                                 ? "bg-white text-black scale-105 font-bold"
                                 : "border border-white/20 bg-black/40 text-white/80 hover:bg-white/15"
                           }`}
                        >
                           <span className="flex items-center gap-2">
                              <span
                                 className="h-2 w-2 rounded-full"
                                 style={{ backgroundColor: char.ledColor }}
                              />
                              {char.name} ({char.modelCode.split(" ")[0]})
                           </span>
                        </button>
                     );
                  })}
               </div>
            </div>

            {/* Main 3D Canvas Box + HUD Info */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
               {/* Left Column: 3D Interactive Canvas Container */}
               <div className="relative aspect-square w-full rounded-3xl border border-white/15 bg-gradient-to-b from-black/80 via-black/40 to-black/90 p-2 shadow-2xl backdrop-blur-xl lg:col-span-8 min-h-[420px] sm:min-h-[500px]">
                  {/* Canvas Viewport */}
                  <div ref={containerRef} className="h-full w-full cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden" />

                  {/* Loading Overlay */}
                  {loading && (
                     <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl bg-black/80 backdrop-blur-md">
                        <div
                           className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
                           style={{ borderColor: `${currentChar.accentColor} transparent ${currentChar.accentColor} ${currentChar.accentColor}` }}
                        />
                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                           Memuat Model 3D {currentChar.name}... {loadingProgress}%
                        </p>
                     </div>
                  )}

                  {/* Error Overlay */}
                  {errorMsg && (
                     <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl bg-black/90 p-6 text-center">
                        <p className="font-mono text-xs text-rose-500 uppercase tracking-widest">{errorMsg}</p>
                        <p className="mt-2 font-mono text-[10px] text-white/40">Gagal memuat file .glb dari folder 3d-files.</p>
                     </div>
                  )}

                  {/* 3D Controls Overlay (Top Right of Canvas) */}
                  <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                     <button
                        type="button"
                        onClick={() => setAutoRotate((prev) => !prev)}
                        className={`rounded-lg border border-white/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider backdrop-blur-md transition ${
                           autoRotate ? "bg-dbh-blue/20 text-dbh-blue border-dbh-blue/40" : "bg-black/60 text-white/60 hover:text-white"
                        }`}
                     >
                        {autoRotate ? "Auto-Rotate ON" : "Auto-Rotate OFF"}
                     </button>
                     <button
                        type="button"
                        onClick={resetCamera}
                        className="rounded-lg border border-white/20 bg-black/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-white/70 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
                     >
                        Reset View
                     </button>
                  </div>

                  {/* Canvas Hint (Bottom Left) */}
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[8px] uppercase tracking-widest text-white/50 backdrop-blur-md">
                     <span>🖱 Geser mouse / layar untuk memutar 3D</span>
                  </div>
               </div>

               {/* Right Column: Character CyberLife Diagnostics HUD */}
               <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl lg:col-span-4 shadow-xl">
                  <div>
                     {/* Badge */}
                     <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                           <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">CyberLife Model Spec</span>
                           <h3 className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                              {currentChar.name}
                           </h3>
                        </div>
                        <span
                           className="h-4 w-4 rounded-full shadow-lg animate-pulse"
                           style={{ backgroundColor: currentChar.ledColor, boxShadow: `0 0 12px ${currentChar.ledColor}` }}
                        />
                     </div>

                     {/* Model Code */}
                     <div className="mt-4 flex items-center gap-2">
                        <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] font-bold text-white">
                           {currentChar.modelCode}
                        </span>
                        <span className="font-mono text-[9px] text-white/50">{currentChar.role}</span>
                     </div>

                     {/* Description */}
                     <p className="mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.06em] text-white/65">
                        {currentChar.description}
                     </p>

                     {/* Stats List */}
                     <div className="mt-6 space-y-3 font-mono text-[10px]">
                        {currentChar.stats.map((stat, idx) => (
                           <div key={idx} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-3">
                              <span className="text-white/40 uppercase">{stat.label}:</span>
                              <span className="font-bold text-white">{stat.value}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-white/30">
                     <span>CyberLife OS v4.12</span>
                     <span className="text-dbh-blue">3D Interactive Canvas</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
