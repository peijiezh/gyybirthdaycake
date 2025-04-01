// Variables for Three.js scene
let scene, camera, renderer, controls, cake;

// DOM Elements
const envelopeContainer = document.getElementById('envelope-container');
const envelope = document.getElementById('envelope');
const birthdayContent = document.getElementById('birthday-content');
const sceneContainer = document.getElementById('scene-container');

// Initialize the application
function init() {
    // Add event listener to envelope
    envelope.addEventListener('click', openEnvelope);
    
    // Add window resize listener
    window.addEventListener('resize', onWindowResize);
    
    // For testing - uncomment to immediately show cake without clicking envelope
    // openEnvelope();
}

// Function to handle envelope click
function openEnvelope() {
    // Show confetti effect
    createConfetti();
    
    // Hide envelope with transition
    envelopeContainer.style.opacity = '0';
    
    // After transition, hide envelope and show 3D scene
    setTimeout(() => {
        envelopeContainer.style.display = 'none';
        birthdayContent.style.display = 'flex';
        
        // Initialize the 3D scene
        initThreeJs();
    }, 1000);
}

// Create confetti effect
function createConfetti() {
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random confetti properties
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                        '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
                        '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.background = color;
        
        // Random position and animation
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '-10px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Animation properties
        const animationDuration = Math.random() * 3 + 2;
        confetti.style.animation = `fall ${animationDuration}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
    
    // Add confetti CSS animation
    const style = document.createElement('style');
    style.innerHTML = `
        .confetti {
            position: absolute;
            z-index: 100;
            pointer-events: none;
        }
        
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize Three.js scene
function initThreeJs() {
    console.log("Initializing Three.js scene...");
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFF5EE');
    
    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        sceneContainer.clientWidth / sceneContainer.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 7;
    camera.position.y = 2;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);
    
    // Add OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Add lights
    addLights();
    
    console.log("Creating cake...");
    // Create the cake
    createCake();
    
    // Start animation loop
    animate();
}

// Add lights to the scene
function addLights() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Directional light for shadows and highlights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Additional light from the other side
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);
}

// Create the birthday cake model
function createCake() {
    // Create a group to hold all cake elements
    cake = new THREE.Group();
    
    // Materials
    const bottomLayerMaterial = new THREE.MeshPhongMaterial({ color: 0xCD5C5C });
    const middleLayerMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA07A });
    const topLayerMaterial = new THREE.MeshPhongMaterial({ color: 0xFFDAB9 });
    const frostingMaterial = new THREE.MeshPhongMaterial({ color: 0xFFEFD5 });
    
    // Create bottom layer
    const bottomGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);
    const bottomLayer = new THREE.Mesh(bottomGeometry, bottomLayerMaterial);
    bottomLayer.position.y = 0.25;
    cake.add(bottomLayer);
    
    // Bottom layer frosting
    const bottomFrostGeometry = new THREE.TorusGeometry(2, 0.1, 16, 100);
    const bottomFrosting = new THREE.Mesh(bottomFrostGeometry, frostingMaterial);
    bottomFrosting.position.y = 0.5;
    bottomFrosting.rotation.x = Math.PI / 2;
    cake.add(bottomFrosting);
    
    // Create middle layer
    const middleGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 32);
    const middleLayer = new THREE.Mesh(middleGeometry, middleLayerMaterial);
    middleLayer.position.y = 0.75 + 0.25;
    cake.add(middleLayer);
    
    // Middle layer frosting
    const middleFrostGeometry = new THREE.TorusGeometry(1.5, 0.1, 16, 100);
    const middleFrosting = new THREE.Mesh(middleFrostGeometry, frostingMaterial);
    middleFrosting.position.y = 1.5;
    middleFrosting.rotation.x = Math.PI / 2;
    cake.add(middleFrosting);
    
    // Create top layer
    const topGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 32);
    const topLayer = new THREE.Mesh(topGeometry, topLayerMaterial);
    topLayer.position.y = 1.25 + 0.75;
    cake.add(topLayer);
    
    // Top layer frosting
    const topFrostGeometry = new THREE.TorusGeometry(1, 0.1, 16, 100);
    const topFrosting = new THREE.Mesh(topFrostGeometry, frostingMaterial);
    topFrosting.position.y = 2.25;
    topFrosting.rotation.x = Math.PI / 2;
    cake.add(topFrosting);
    
    // Add decorations
    addDecorations();
    
    // Add candles
    addCandles();
    
    // Add the cake to the scene
    scene.add(cake);
    console.log("Cake added to scene!");
}

// Add candles to the cake
function addCandles() {
    // Candle material (white)
    const candleMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    // Flame material (orange with emissive)
    const flameMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF8C00,
        emissive: 0xFF4500,
        emissiveIntensity: 0.8
    });
    
    // Center candle
    createCandle(0, 0, 2.5, candleMaterial, flameMaterial);
    
    // Surrounding candles (cross pattern)
    createCandle(0.5, 0, 2.5, candleMaterial, flameMaterial);
    createCandle(-0.5, 0, 2.5, candleMaterial, flameMaterial);
    createCandle(0, 0.5, 2.5, candleMaterial, flameMaterial);
    createCandle(0, -0.5, 2.5, candleMaterial, flameMaterial);
}

// Helper function to create a candle with flame
function createCandle(x, z, y, candleMaterial, flameMaterial) {
    // Candle stick
    const candleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16);
    const candle = new THREE.Mesh(candleGeometry, candleMaterial);
    candle.position.set(x, y, z);
    cake.add(candle);
    
    // Flame
    const flameGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.set(x, y + 0.25, z);
    cake.add(flame);
}

// Add colored ball decorations to the cake
function addDecorations() {
    // Colors for the balls
    const colors = [
        0xFF0000, // red
        0x00FF00, // green
        0x0000FF, // blue
        0xFFFF00, // yellow
        0x800080, // purple
        0x00FFFF  // cyan
    ];
    
    // Create approximately 20 decorative balls
    for (let i = 0; i < 20; i++) {
        const ballGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const ballMaterial = new THREE.MeshPhongMaterial({ 
            color: colors[Math.floor(Math.random() * colors.length)],
            shininess: 100
        });
        
        const ball = new THREE.Mesh(ballGeometry, ballMaterial);
        
        // Position the ball on the cake
        const layerChoice = Math.floor(Math.random() * 3);
        let layerRadius, layerHeight;
        
        if (layerChoice === 0) {
            layerRadius = 2;
            layerHeight = 0.5;
        } else if (layerChoice === 1) {
            layerRadius = 1.5;
            layerHeight = 1.5;
        } else {
            layerRadius = 1;
            layerHeight = 2.25;
        }
        
        // Random angle
        const angle = Math.random() * Math.PI * 2;
        // Random distance from center (not too close to edge)
        const distance = Math.random() * (layerRadius - 0.2);
        
        ball.position.x = Math.cos(angle) * distance;
        ball.position.z = Math.sin(angle) * distance;
        ball.position.y = layerHeight + 0.1; // Slightly above the layer
        
        cake.add(ball);
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the cake
    if (cake) {
        cake.rotation.y += 0.005;
    }
    
    // Update controls
    if (controls) {
        controls.update();
    }
    
    // Render the scene
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    }
}

// For debugging
function logSceneContent() {
    console.log("Scene children:", scene.children);
    console.log("Cake children:", cake ? cake.children : "Cake not created yet");
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);