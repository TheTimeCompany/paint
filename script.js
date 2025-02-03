let canvas = document.getElementById('paintCanvas');
let ctx = canvas.getContext('2d');
let painting = false;
let brushSize = 5;
let brushColor = '#000000';

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    createParticles(x, y);
}

function createParticles(x, y) {
    let particle = document.createElement('div');
    particle.classList.add('particle');
    document.body.appendChild(particle);

    let size = Math.random() * 5 + 2;
    particle.style.left = `${x - 2}px`;
    particle.style.top = `${y - 2}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    setTimeout(() => particle.remove(), 500);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('brush-size-container').addEventListener('click', () => {
    const sliderContainer = document.getElementById('brush-slider-container');
    sliderContainer.style.display = sliderContainer.style.display === 'block' ? 'none' : 'block';
});

function changeBrushSize(value) {
    brushSize = value;
    document.getElementById('brush-size-preview').textContent = `${value}px`;
}

function updateColorPickerBackground() {
    const colorPickerButton = document.getElementById('color-picker-button');
    colorPickerButton.style.backgroundColor = brushColor;
}

document.getElementById('color-picker-button').addEventListener('click', () => {
    let colorPicker = document.createElement('input');
    colorPicker.setAttribute('type', 'color');
    colorPicker.style.position = 'absolute';
    colorPicker.style.zIndex = '1000';
    colorPicker.addEventListener('input', (e) => {
        brushColor = e.target.value;
        updateColorPickerBackground();
        document.body.removeChild(colorPicker);
    });
    document.body.appendChild(colorPicker);
    colorPicker.click();
});

document.getElementById('brush-size-container').addEventListener('mouseover', () => {
    document.getElementById('brush-size-container').style.backgroundColor = brushColor;
});

document.getElementById('brush-size-container').addEventListener('mouseout', () => {
    document.getElementById('brush-size-container').style.backgroundColor = '#f3f3f3';
});
