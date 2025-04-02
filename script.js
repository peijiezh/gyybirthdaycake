// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const envelope = document.querySelector('.envelope');
    const envelopeContainer = document.getElementById('envelope-container');
    const birthdayCard = document.getElementById('birthday-card');
    const cakeContainer = document.getElementById('cake-container');
    
    // Add click event to envelope
    envelope.addEventListener('click', function() {
        // Hide envelope
        envelopeContainer.classList.add('hidden');
        
        // Show birthday card
        birthdayCard.classList.remove('hidden');
        
        // Create confetti effect
        createConfetti();
        
        // Initialize 3D scene
        initThreeJS();
    });
    
    // Function to create confetti effect
    function createConfetti() {
        confetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 }
        });
    }
    
    // Function to initialize Three.js scene
    function initThreeJS() {
        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xFFF5EE);
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, cakeContainer.clientWidth / cakeContainer.clientHeight, 0.1, 1000);
        camera.position.z = 8;
        camera.position.y = 2;
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(cakeContainer.clientWidth, cakeContainer.clientHeight);
        cakeContainer.appendChild(renderer.domElement);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Add OrbitControls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        // Create cake group
        const cakeGroup = new THREE.Group();
        scene.add(cakeGroup);
        
        // Create cake layers
        // Bottom layer
        const bottomLayerGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);
        const bottomLayerMaterial = new THREE.MeshPhongMaterial({ color: 0xCD5C5C });
        const bottomLayer = new THREE.Mesh(bottomLayerGeometry, bottomLayerMaterial);
        bottomLayer.position.y = 0.25;
        cakeGroup.add(bottomLayer);
        
        // Middle layer
        const middleLayerGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 32);
        const middleLayerMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA07A });
        const middleLayer = new THREE.Mesh(middleLayerGeometry, middleLayerMaterial);
        middleLayer.position.y = 0.75;
        cakeGroup.add(middleLayer);
        
        // Top layer
        const topLayerGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 32);
        const topLayerMaterial = new THREE.MeshPhongMaterial({ color: 0xFFDAB9 });
        const topLayer = new THREE.Mesh(topLayerGeometry, topLayerMaterial);
        topLayer.position.y = 1.25;
        cakeGroup.add(topLayer);
        
        // Add frosting
        const frostingMaterial = new THREE.MeshPhongMaterial({ color: 0xFFEFD5 });
        
        // Bottom layer frosting
        const bottomFrostingGeometry = new THREE.TorusGeometry(2, 0.1, 16, 100);
        const bottomFrosting = new THREE.Mesh(bottomFrostingGeometry, frostingMaterial);
        bottomFrosting.position.y = 0.5;
        bottomFrosting.rotation.x = Math.PI / 2;
        cakeGroup.add(bottomFrosting);
        
        // Middle layer frosting
        const middleFrostingGeometry = new THREE.TorusGeometry(1.5, 0.1, 16, 100);
        const middleFrosting = new THREE.Mesh(middleFrostingGeometry, frostingMaterial);
        middleFrosting.position.y = 1;
        middleFrosting.rotation.x = Math.PI / 2;
        cakeGroup.add(middleFrosting);
        
        // Top layer frosting
        const topFrostingGeometry = new THREE.TorusGeometry(1, 0.1, 16, 100);
        const topFrosting = new THREE.Mesh(topFrostingGeometry, frostingMaterial);
        topFrosting.position.y = 1.5;
        topFrosting.rotation.x = Math.PI / 2;
        cakeGroup.add(topFrosting);
        
        // Add decorative balls
        const ballColors = [
            0xff0000, // red
            0x00ff00, // green
            0x0000ff, // blue
            0xffff00, // yellow
            0x800080, // purple
            0x00ffff  // cyan
        ];
        
        const ballGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        
        // Add balls to bottom layer
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 1.8;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const ballMaterial = new THREE.MeshPhongMaterial({ color: ballColors[i % ballColors.length] });
            const ball = new THREE.Mesh(ballGeometry, ballMaterial);
            ball.position.set(x, 0.5, z);
            cakeGroup.add(ball);
        }
        
        // Add balls to middle layer
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 1.3;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const ballMaterial = new THREE.MeshPhongMaterial({ color: ballColors[(i + 2) % ballColors.length] });
            const ball = new THREE.Mesh(ballGeometry, ballMaterial);
            ball.position.set(x, 1, z);
            cakeGroup.add(ball);
        }
        
        // Add balls to top layer
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 0.8;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const ballMaterial = new THREE.MeshPhongMaterial({ color: ballColors[(i + 4) % ballColors.length] });
            const ball = new THREE.Mesh(ballGeometry, ballMaterial);
            ball.position.set(x, 1.5, z);
            cakeGroup.add(ball);
        }
        
        // Add candles
        const candleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 16);
        const candleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        
        const candle = new THREE.Mesh(candleGeometry, candleMaterial);
        candle.position.set(0, 1.75, 0);
        cakeGroup.add(candle);
        
        // Add flame
        const flameGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const flameMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff9900,
            emissive: 0xff6600,
            emissiveIntensity: 0.5
        });
        
        const flame = new THREE.Mesh(flameGeometry, flameMaterial);
        flame.position.set(0, 2.05, 0);
        flame.scale.y = 1.5;
        cakeGroup.add(flame);
        
        // Position cake group
        cakeGroup.position.y = -1.5;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate cake
            cakeGroup.rotation.y += 0.005;
            
            // Update controls
            controls.update();
            
            // Render scene
            renderer.render(scene, camera);
        }
        
        // Start animation
        animate();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            // Update camera aspect ratio
            camera.aspect = cakeContainer.clientWidth / cakeContainer.clientHeight;
            camera.updateProjectionMatrix();
            
            // Update renderer size
            renderer.setSize(cakeContainer.clientWidth, cakeContainer.clientHeight);
        });
    }
});
