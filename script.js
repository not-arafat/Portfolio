/* ==========================================================================
   ARAFAT HOSEN — PORTFOLIO CORE SCRIPT MODULE (DATABASE & TAILWIND EXPANSION)
   ========================================================================== */

document.documentElement.classList.add('js');

/* ============ MOBILE MENU LOGIC ============ */
(function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (!menuToggle || !navMenu) return;

  function setMenuState(isActive) {
    navMenu.classList.toggle('is-active', isActive);
    menuToggle.setAttribute('aria-expanded', String(isActive));
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', !isActive);
      icon.classList.toggle('fa-times', isActive);
    }
  }

  menuToggle.addEventListener('click', () => {
    const isActive = !navMenu.classList.contains('is-active');
    setMenuState(isActive);
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });
})();

/* ============ NAVBAR EVENT PIPELINE ============ */
(function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  function handleScroll() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();

/* ============ SCROLL REVEAL ENGINE ============ */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  revealEls.forEach((el) => observer.observe(el));
})();

/* ==========================================================================
   3D WORLD MAP GRAPH — NEW DATABASES & TAILWIND INTEGRATION
   ========================================================================== */
(function initWorldMapSphere() {
  const container = document.getElementById('canvas3dContainer');
  if (!container || typeof THREE === 'undefined') return;

  // টেকনোলজি কনফিগারেশন — নতুন ডাটাবেজ এবং টেইলউইন্ড অ্যাড করা হয়েছে
  const iconConfig = [
    { label: 'HTML5', unicode: '\uf13b', brand: true, color: '#E34F26' },
    { label: 'CSS3', unicode: '\uf13c', brand: true, color: '#1572B6' },
    { label: 'JavaScript', unicode: '\uf3b8', brand: true, color: '#F7DF1E' },
    { label: 'React.js', unicode: '\uf41b', brand: true, color: '#61DAFB' },
    { label: 'Tailwind CSS', unicode: '\uf84e', brand: true, color: '#38BDF8' }, // Tailwind Added
    { label: 'Python', unicode: '\uf3e2', brand: true, color: '#3776AB' },
    { label: 'Git Ecosystem', unicode: '\uf1d3', brand: true, color: '#F05032' },
    { label: 'Node.js', unicode: '\uf3d3', brand: true, color: '#339933' },
    { label: 'MySQL', unicode: '\uf1c0', brand: false, color: '#00758F' },       // MySQL Added
    { label: 'PostgreSQL', unicode: '\uf1c0', brand: false, color: '#336791' },  // PostgreSQL Added
    { label: 'MongoDB', unicode: '\uf1c0', brand: false, color: '#47A248' },     // MongoDB Added
    { label: 'Firebase Core', unicode: '\uf06d', brand: false, color: '#FFCA28' },
    { label: 'Terminal Core', unicode: '\uf120', brand: false, color: '#4D4D4D' },
    { label: 'Source Arch', unicode: '\uf121', brand: false, color: '#24292E' },
    { label: 'Cloud Systems', unicode: '\uf0c2', brand: false, color: '#00A1E0' }
  ];

  if (document.fonts) {
    document.fonts.ready.then(() => {
      buildInteractiveWorldSphere();
    }).catch(() => {
      buildInteractiveWorldSphere();
    });
  } else {
    window.addEventListener('load', buildInteractiveWorldSphere);
  }

  function buildInteractiveWorldSphere() {
    container.innerHTML = '';

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11.0); 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const worldRadius = 4.0;

    // ল্যাটিচিউড-লংগিচিউড ওয়্যারফ্রেম গ্রিড
    const mapWireGeometry = new THREE.SphereGeometry(worldRadius, 30, 30); 
    const mapWireMaterial = new THREE.MeshBasicMaterial({
      color: 0xD1D5DB, 
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const mapWireMesh = new THREE.Mesh(mapWireGeometry, mapWireMaterial);
    sphereGroup.add(mapWireMesh);

    // সলিড ইনার গ্লোব ব্যাকগ্রাউন্ড
    const innerCoreGeo = new THREE.SphereGeometry(worldRadius - 0.02, 32, 32); 
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xFAFAFC, 
      roughness: 0.5,
      metalness: 0.05,
      transparent: true,
      opacity: 0.92
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    sphereGroup.add(innerCoreMesh);

    // CANVAS NODE ENGINE
    function createIconPlane(config) {
      const canvas = document.createElement('canvas');
      canvas.width = 384; 
      canvas.height = 384;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // নোড বাউন্ডারি ব্যাকগ্রাউন্ড 
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2 - 20, 100, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = config.color; 
      ctx.stroke();

      // ড্র ভেক্টর ফন্ট আইকন 
      ctx.fillStyle = config.color; 
      const fontFamily = config.brand ? '"Font Awesome 6 Brands"' : '"Font Awesome 6 Free"';
      ctx.font = `900 110px ${fontFamily}`; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(config.unicode, canvas.width / 2, canvas.height / 2 - 20);

      // ড্র টেক্সট লেবেল 
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#111118';
      ctx.textAlign = 'center';
      
      ctx.shadowColor = 'rgba(255, 255, 255, 1)';
      ctx.shadowBlur = 6;
      ctx.fillText(config.label, canvas.width / 2, canvas.height / 2 + 120);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;

      const planeGeo = new THREE.PlaneGeometry(1.9, 1.9);
      const planeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: true
      });

      return new THREE.Mesh(planeGeo, planeMat);
    }

    // FIBONACCI DISTRIBUTOR
    const totalIcons = iconConfig.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    iconConfig.forEach((icon, index) => {
      const y = 1 - (index / (totalIcons - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * index;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const iconMesh = createIconPlane(icon);
      
      // গ্যাপহীন ৩ডি গ্লোব ফিটিং
      iconMesh.position.set(x * (worldRadius + 0.02), y * (worldRadius + 0.02), z * (worldRadius + 0.02));

      // ক্যামেরা লক ওরিয়েন্টেশন
      iconMesh.lookAt(x * 5, y * 5, z * 5);

      sphereGroup.add(iconMesh);
    });

    // Inertia Interaction
    let isDragging = false;
    let prevX = 0, prevY = 0;
    let velX = 0, velY = 0;
    const LIMIT_ROT_X = 1.35;

    function clampRotX(val) { return Math.min(Math.max(val, -LIMIT_ROT_X), LIMIT_ROT_X); }

    function startDrag(cx, cy) {
      isDragging = true;
      prevX = cx; prevY = cy;
      velX = 0; velY = 0;
    }

    function moveDrag(cx, cy) {
      if (!isDragging) return;
      const dX = cx - prevX;
      const dY = cy - prevY;

      velX = dX * 0.0055;
      velY = dY * 0.0055;

      sphereGroup.rotation.y += velX;
      sphereGroup.rotation.x = clampRotX(sphereGroup.rotation.x + velY);

      prevX = cx; prevY = cy;
    }

    function endDrag() { isDragging = false; }

    container.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => { if (isDragging) e.preventDefault(); moveDrag(e.clientX, e.clientY); }, { passive: false });
    window.addEventListener('mouseup', endDrag);

    container.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    window.addEventListener('touchmove', (e) => { if (isDragging) e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
    window.addEventListener('touchend', endDrag);

    window.addEventListener('resize', () => {
      width = container.clientWidth; height = container.clientHeight;
      camera.aspect = width / height; camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const defaultAutoRotation = prefersReducedMotion ? 0 : 0.003; 

    function renderLoop() {
      requestAnimationFrame(renderLoop);

      if (!isDragging) {
        if (Math.abs(velX) > 0.0001 || Math.abs(velY) > 0.0001) {
          sphereGroup.rotation.y += velX;
          sphereGroup.rotation.x = clampRotX(sphereGroup.rotation.x + velY);
          velX *= 0.94; velY *= 0.94;
        } else {
          sphereGroup.rotation.y += defaultAutoRotation;
        }
      }
      renderer.render(scene, camera);
    }
    renderLoop();
  }
})();
