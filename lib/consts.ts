export const defaultHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Celestiq AI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');
      :root {
        --primary: #00f0ff;
        --secondary: #7b2dff;
        --tertiary: #ff2d7b;
      }
      body {
        margin: 0;
        overflow: hidden;
        font-family: 'Space Grotesk', 'Orbitron', sans-serif;
        /* BACKGROUND MADE DARKER */
        background: radial-gradient(circle at center, #2c3e50, #040a18 80%);
        color: #e0e0ff;
        height: 100vh;
        position: relative;
        cursor: crosshair;
      }
      .neon {
        text-shadow: 0 0 5px #0ff, 0 0 15px #0ff, 0 0 30px #0ff,
          0 0 60px #0ff;
      }
      .chevron {
        position: absolute;
        bottom: 2rem;
        left: 2rem;
        width: 25px;
        height: 25px;
        border-left: 3px solid cyan;
        border-top: 3px solid cyan;
        transform: rotate(-45deg);
        filter: drop-shadow(0 0 6px cyan);
      }
      @media (prefers-reduced-motion: no-preference) {
        .chevron {
          animation: bounce 1s infinite;
        }
      }
      @keyframes bounce {
        0%, 100% { transform: translateX(0) rotate(-45deg); }
        50% { transform: translateX(-10px) rotate(-45deg); }
      }
      .badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }
      canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        display: block;
      }
      .bottom-section {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        z-index: 10;
      }
    </style>
  </head>
  <body>
    <canvas id="bg"></canvas>
    <span
      class="badge text-xs px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 animate-pulse"
    >
      🚀 Update live!
    </span>
    <div class="bottom-section">
      <h1 class="text-2xl lg-text-3xl font-bold neon">
        I'm ready to assist
        <span class="text-base lg-text-lg text-gray-300 block font-medium mt-2">
          Ask anything.
        </span>
      </h1>
      <button
        class="mt-6 px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-xl transition-all hover:scale-110"
      >
        Let’s Talk
      </button>
    </div>
    <div class="chevron"></div>
    <script src="https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.min.js"></script>
    <script>
      // --- SETUP ---
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("bg"),
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearAlpha(0);
      const clock = new THREE.Clock();

      // --- ACCESSIBILITY & INTERACTIVITY SETUP ---
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const mousePosition = new THREE.Vector2();
      window.addEventListener('mousemove', (event) => {
        mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
      });

      // --- ORIGINAL TORUS AND GLOW ---
      const torusRadius = 4;
      const torusTubeRadius = 1.5;
      const torusYPosition = 4.5;

      const glowGeometry = new THREE.SphereGeometry(5.5, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x00eaff, transparent: true, opacity: 0.18 });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.y = torusYPosition;
      scene.add(glow);

      const outerGlowGeometry = new THREE.SphereGeometry(7, 32, 32);
      const outerGlowMaterial = new THREE.MeshBasicMaterial({ color: 0x7b2dff, transparent: true, opacity: 0.08 });
      const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
      outerGlow.position.y = torusYPosition;
      scene.add(outerGlow);

      const geometry = new THREE.TorusGeometry(torusRadius, torusTubeRadius, 30, 100);
      const material = new THREE.MeshPhongMaterial({ color: 0x00eaff, wireframe: true, emissive: 0x00ccff, emissiveIntensity: 1 });
      const torus = new THREE.Mesh(geometry, material);
      torus.position.y = torusYPosition;
      scene.add(torus);
      
      const pointLight = new THREE.PointLight(0x00eaff, 2, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      // --- NEW PARTICLE SYSTEM (EMITTING FROM TORUS) ---
      const starCount = 5000;
      const positions = new Float32Array(starCount * 3);
      const velocities = [];

      function resetParticle(index) {
          const i3 = index * 3;
          // Get a random point on the torus surface
          const theta = Math.random() * 2 * Math.PI;
          const phi = Math.random() * 2 * Math.PI;
          
          const x = (torusRadius + torusTubeRadius * Math.cos(phi)) * Math.cos(theta);
          const y = (torusRadius + torusTubeRadius * Math.cos(phi)) * Math.sin(theta);
          const z = torusTubeRadius * Math.sin(phi);

          positions[i3] = x;
          positions[i3 + 1] = y + torusYPosition; // Add torus Y offset
          positions[i3 + 2] = z;

          // Create a random outward velocity
          const velocity = new THREE.Vector3(
              (Math.random() - 0.5) * 0.5,
              (Math.random() - 0.5) * 0.5,
              (Math.random() - 0.5) * 0.5
          ).normalize().multiplyScalar(Math.random() * 0.1 + 0.02);
          velocities[index] = velocity;
      }

      for (let i = 0; i < starCount; i++) {
        resetParticle(i);
      }

      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const starMaterial = new THREE.PointsMaterial({
        color: 0x87CEEB,
        size: 0.1,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const starField = new THREE.Points(starGeometry, starMaterial);
      scene.add(starField);
      
      camera.position.z = 25;

      function animate() {
        requestAnimationFrame(animate);

        // Animate torus and glows
        const isReducedMotion = motionQuery.matches;
        const slowSpeed = isReducedMotion ? 0.0001 : 0.004;
        const fastSpeed = isReducedMotion ? 0.0002 : 0.008;
        torus.rotation.x += slowSpeed;
        glow.rotation.y += slowSpeed * 0.5;
        outerGlow.rotation.y -= slowSpeed * 0.25;

        const mouseInfluence = isReducedMotion ? 0.05 : 1.0;
        const mouseTargetY = mousePosition.x * mouseInfluence;
        torus.rotation.y += (mouseTargetY - torus.rotation.y) * 0.3 + fastSpeed;

        // Animate particles flowing from torus
        const positions = starField.geometry.attributes.position.array;
        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            positions[i3] += velocities[i].x;
            positions[i3 + 1] += velocities[i].y;
            positions[i3 + 2] += velocities[i].z;
            
            const distance = Math.sqrt(positions[i3]**2 + (positions[i3+1]-torusYPosition)**2 + positions[i3+2]**2);

            if (distance > 30) {
                resetParticle(i);
            }
        }
        starField.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    </script>
  </body>
</html>
`;
