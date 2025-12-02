const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to viewport size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ----------------- COLOR AND UTILITY FUNCTIONS -----------------

function getRandomColor() {
    // Soft pink, violet, and magenta tones for the flower heads
    const colors = ['#FF66B2', '#E63946', '#FF006E', '#8D3DAF', '#FF3D5A'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ----------------- ADVANCED DRAWING FUNCTION -----------------

// The function takes (x, y) as the center point of the flower head
function drawFlower(x, y) {
    const petalCount = 6;
    const flowerRadius = Math.random() * 15 + 25; // Base size
    const stemLength = Math.random() * 250 + 150; // LONGER STEM LENGTH (150 to 400)
    const petalColor = getRandomColor();
    
    // 1. Draw Stem (Starts at Y and goes down)
    ctx.beginPath();
    ctx.strokeStyle = '#4CAF50'; // Green stem
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    
    // Stem starts at the clicked Y and curves down to Y + stemLength
    ctx.moveTo(x, y); 
    ctx.quadraticCurveTo(x + (Math.random() * 30 - 15), y + stemLength / 2, x, y + stemLength);
    ctx.stroke();

    // The center of the flower head is exactly at the clicked coordinates
    const flowerX = x;
    const flowerY = y; 

    // 🌟 Set up the Canvas Shadow/Glow Effect 🌟
    ctx.shadowColor = petalColor;
    ctx.shadowBlur = 15;
    ctx.fillStyle = petalColor;
    ctx.globalAlpha = 1;

    // 2. Draw Petals
    for (let i = 0; i < petalCount; i++) {
        const angle = (i * (Math.PI * 2)) / petalCount;
        
        ctx.save();
        ctx.translate(flowerX, flowerY);
        ctx.rotate(angle);

        ctx.beginPath();
        // Use quadratic curve to create a softer, more teardrop-like petal shape
        ctx.moveTo(0, 0); 
        ctx.quadraticCurveTo(flowerRadius * 0.5, flowerRadius * 0.8, 0, flowerRadius * 1.5);
        ctx.quadraticCurveTo(flowerRadius * -0.5, flowerRadius * 0.8, 0, 0);
        ctx.fill();
        
        ctx.restore();
    }
    
    // Reset shadow and alpha after drawing the glowing petals
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    // 3. Draw Center of Flower (Small dark spot)
    ctx.beginPath();
    ctx.fillStyle = '#111'; 
    ctx.arc(flowerX, flowerY, flowerRadius * 0.2, 0, Math.PI * 2);
    ctx.fill();
}

// ----------------- INTERACTION LOGIC -----------------

function handleClick(event) {
    // Get mouse coordinates relative to the canvas
    const x = event.clientX;
    const y = event.clientY; 
    
    // Draw the flower wherever the user clicks
    drawFlower(x, y); 
}

// Add the click listener to the entire canvas area
canvas.addEventListener('click', handleClick);

// Optional: Draw a few initial flowers on load for a starting scene
drawFlower(canvas.width * 0.15, canvas.height * 0.7);
drawFlower(canvas.width * 0.4, canvas.height * 0.8);
drawFlower(canvas.width * 0.65, canvas.height * 0.7);
drawFlower(canvas.width * 0.85, canvas.height * 0.85);