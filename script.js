// Variables for Three.js scene
let scene, camera, renderer, controls, cake;

// DOM Elements - using querySelector instead of getElementById for better compatibility
const envelopeContainer = document.querySelector('#envelope-container');
const envelope = document.querySelector('#envelope');
const birthdayContent = document.querySelector('#birthday-content');
const sceneContainer = document.querySelector('#scene-container');

// Initialize the application
function init() {
    console.log("Initializing birthday card...");
    
    // Make sure DOM elements are available
    if (!envelope || !envelopeContainer || !birthdayContent || !sceneContainer) {
        console.error("Required DOM elements not found!");
        return;
    }
    
    // Add event listener to envelope
    envelope.addEventListener('click', openEnvelope);
    
    // Add window resize listener
    window.addEventListener('resize', onWindowResize);
    
    console.log("Birthday card initialized successfully!");
}

// Function to handle envelope click
function openEnvelope() {
    console.log("Envelope clicked!");
    
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
    // Reduce the number of confetti pieces on mobile to improve performance
    const confettiCount = window.innerWidth <= 768 ? 75 : 150;

    for (let i = 0; i < confettiCount; i++) {
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
    
    try {
        // Verify Three.js is available
        if (typeof THREE === 'undefined') {
            console.error("THREE is not defined! Three.js library is not loaded correctly.");
            return;
        }
        
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
    
    // After creating the camera, adjust for device viewport
    if (window.innerWidth <= 768) {
        // For mobile, position the camera slightly farther away
        camera.position.z = 8.5;
        camera.position.y = 1.8;
    }
        
        // Create renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
        sceneContainer.appendChild(renderer.domElement);
        
        // Check if OrbitControls is available
        if (typeof THREE.OrbitControls === 'undefined') {
            console.error("THREE.OrbitControls is not defined! OrbitControls is not loaded correctly.");
            // Continue without OrbitControls
        } else {
            // Add OrbitControls
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
        }
        
        // Add lights
        addLights();
        
        // Create the cake
        createCake();
        
        // Start animation loop
        animate();
        
        console.log("Three.js scene initialized successfully!");
    } catch (error) {
        console.error("Error initializing Three.js scene:", error);
    }
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
    console.log("Creating cake model...");
    
    try {
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
        bottomLayer.position.y = 0.25; // Half of the bottom layer height
        cake.add(bottomLayer);
        
        // Bottom layer frosting
        const bottomFrostGeometry = new THREE.TorusGeometry(2, 0.1, 16, 100);
        const bottomFrosting = new THREE.Mesh(bottomFrostGeometry, frostingMaterial);
        bottomFrosting.position.y = 0.5; // Top of the bottom layer
        bottomFrosting.rotation.x = Math.PI / 2;
        cake.add(bottomFrosting);
        
        // Create middle layer - POSITION ADJUSTED
        const middleGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 32);
        const middleLayer = new THREE.Mesh(middleGeometry, middleLayerMaterial);
        middleLayer.position.y = 0.5 + 0.25; // Bottom layer top + half of middle layer height
        cake.add(middleLayer);
        
        // Middle layer frosting - POSITION ADJUSTED
        const middleFrostGeometry = new THREE.TorusGeometry(1.5, 0.1, 16, 100);
        const middleFrosting = new THREE.Mesh(middleFrostGeometry, frostingMaterial);
        middleFrosting.position.y = 1.0; // Bottom layer height + middle layer height
        middleFrosting.rotation.x = Math.PI / 2;
        cake.add(middleFrosting);
        
        // Create top layer - POSITION ADJUSTED
        const topGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 32);
        const topLayer = new THREE.Mesh(topGeometry, topLayerMaterial);
        topLayer.position.y = 1.0 + 0.25; // Middle layer top + half of top layer height
        cake.add(topLayer);
        
        // Top layer frosting - POSITION ADJUSTED
        const topFrostGeometry = new THREE.TorusGeometry(1, 0.1, 16, 100);
        const topFrosting = new THREE.Mesh(topFrostGeometry, frostingMaterial);
        topFrosting.position.y = 1.5; // Total height of all layers
        topFrosting.rotation.x = Math.PI / 2;
        cake.add(topFrosting);
        
        // Add decorations
        addDecorations();
        
        // REMOVE THIS LINE: addCandles();
        
        // Add the cake to the scene
        scene.add(cake);
        console.log("Cake added to scene successfully!");
    } catch (error) {
        console.error("Error creating cake:", error);
    }
}




// Add candles to the cake (optional enhancement)
function addCandles() {
    // Candle material
    const candleMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    // Flame material with emissive property to make it glow
    const flameMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFF9900, 
        emissive: 0xFF6600,
        emissiveIntensity: 0.5
    });
    
    // Add a center candle
    const candleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 12);
    const flameGeometry = new THREE.SphereGeometry(0.08, 12, 12);
    
    // Center candle
    const centerCandle = new THREE.Mesh(candleGeometry, candleMaterial);
    centerCandle.position.set(0, 1.75, 0); // Positioned on top of cake
    cake.add(centerCandle);
    
    const centerFlame = new THREE.Mesh(flameGeometry, flameMaterial);
    centerFlame.position.set(0, 2.05, 0); // Top of the candle
    cake.add(centerFlame);
}

// Update the addDecorations function to match the new layer heights
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
        
        // Position the ball on the cake - UPDATED HEIGHTS
        const layerChoice = Math.floor(Math.random() * 3);
        let layerRadius, layerHeight;
        
        if (layerChoice === 0) {
            layerRadius = 2;
            layerHeight = 0.5; // Top of bottom layer
        } else if (layerChoice === 1) {
            layerRadius = 1.5;
            layerHeight = 1.0; // Top of middle layer
        } else {
            layerRadius = 1;
            layerHeight = 1.5; // Top of top layer
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
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Handle window resize
function onWindowResize() {
    if (camera && renderer && sceneContainer) {
        camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    }
}


// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Additional fix for browsers that might not trigger DOMContentLoaded correctly
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 1);
}

// Add touch support to your manual controls
function implementManualControls() {
    console.log("Implementing manual controls...");
    
    const canvas = renderer.domElement;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    // Mouse events
    canvas.addEventListener('mousedown', function(event) {
        isDragging = true;
        previousMousePosition = { 
            x: event.clientX, 
            y: event.clientY 
        };
        event.preventDefault();
    });
    
    canvas.addEventListener('mousemove', function(event) {
        if (isDragging) {
            handleDragMovement(event.clientX, event.clientY);
            event.preventDefault();
        }
    });
    
    canvas.addEventListener('mouseup', function(event) {
        isDragging = false;
        event.preventDefault();
    });
    
    canvas.addEventListener('mouseleave', function(event) {
        isDragging = false;
    });
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', function(event) {
        if (event.touches.length === 1) {
            isDragging = true;
            previousMousePosition = { 
                x: event.touches[0].clientX, 
                y: event.touches[0].clientY 
            };
        }
        // Don't prevent default here to allow scrolling on mobile
    });
    
    canvas.addEventListener('touchmove', function(event) {
        if (isDragging && event.touches.length === 1) {
            handleDragMovement(event.touches[0].clientX, event.touches[0].clientY);
            event.preventDefault(); // Prevent scrolling while rotating
        }
    }, { passive: false });
    
    canvas.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Common drag handler function
    function handleDragMovement(clientX, clientY) {
        const deltaMove = { 
            x: clientX - previousMousePosition.x, 
            y: clientY - previousMousePosition.y 
        };
        
        if (cake) {
            // Rotate cake based on movement
            cake.rotation.y += deltaMove.x * 0.01;
            cake.rotation.x += deltaMove.y * 0.01;
        }
        
        previousMousePosition = {
            x: clientX,
            y: clientY
        };
    }
    
    // Pinch zoom for mobile
    let initialPinchDistance = 0;
    
    canvas.addEventListener('touchstart', function(event) {
        if (event.touches.length === 2) {
            initialPinchDistance = getPinchDistance(event);
        }
    });
    
    canvas.addEventListener('touchmove', function(event) {
        if (event.touches.length === 2) {
            const currentDistance = getPinchDistance(event);
            const delta = (currentDistance - initialPinchDistance) * 0.01;
            
            if (camera) {
                camera.position.z -= delta;
                camera.position.z = Math.max(3, Math.min(12, camera.position.z));
                initialPinchDistance = currentDistance;
            }
            
            event.preventDefault();
        }
    }, { passive: false });
    
    function getPinchDistance(event) {
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // Mouse wheel zoom
    canvas.addEventListener('wheel', function(event) {
        if (camera) {
            event.preventDefault();
            const zoomSpeed = 0.1;
            const delta = -Math.sign(event.deltaY) * zoomSpeed;
            
            camera.position.z += delta;
            camera.position.z = Math.max(3, Math.min(12, camera.position.z));
        }
    }, { passive: false });
    
    console.log("Manual and touch controls implemented");
}

// Adjust camera for better mobile view
function initThreeJs() {
    // ... existing code ...
    
    // After creating the camera, adjust for device viewport
    if (window.innerWidth <= 768) {
        // For mobile, position the camera slightly farther away
        camera.position.z = 8.5;
        camera.position.y = 1.8;
    }
    
    // ... rest of the existing code ...
}


// Handle orientation changes on mobile devices
window.addEventListener('orientationchange', function() {
    // Wait a bit for the orientation change to complete
    setTimeout(onWindowResize, 300);
});


// Fix for OrbitControls initialization
function fixOrbitControls() {
    console.log("Fixing OrbitControls...");
    
    // If we already have a scene and camera but no working controls
    if (scene && camera && renderer) {
        try {
            // Check if THREE.OrbitControls exists
            if (typeof THREE.OrbitControls !== 'undefined') {
                console.log("Creating new OrbitControls instance");
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                console.log("OrbitControls created successfully");
            } else {
                console.error("THREE.OrbitControls is still not defined!");
            }
        } catch (error) {
            console.error("Error creating OrbitControls:", error);
        }
    }
    implementManualControls();
}


// Call this after a short delay to ensure Three.js and OrbitControls are fully loaded
setTimeout(fixOrbitControls, 2000);