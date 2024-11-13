const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

let isStarForming = false; // Indica si el trazado de la estrella está en curso
let starPoints = []; // Almacena los puntos de la estrella
let currentPoint = 0; // Indica el punto actual en el que se está formando la estrella
let progress = 0; // Controla el progreso en el trazado
let maxProgress = 100; // Para hacer que el progreso sea suave
let isMousePressed = false; // Indica si el mouse está presionado
let isMoving = false; // Indica si el trazado está avanzando

let level = 1;
let messageVisible = false;

// Parámetros para las bolas con púas
let bolas = [];
let numBolas = 5;
let bolaSize = 30;

// Inicializar el nivel 1 con bolas
function startLevel(lvl) {
    level = lvl;
    document.getElementById('menu').style.display = 'none'; // Ocultar menú
    document.getElementById('game').style.display = 'block'; // Mostrar juego

    resetLevel(); // Reiniciar el nivel
    initStar(); // Inicializar los puntos de la estrella
    createBolas(); // Crear las bolas con púas
    updateGame(); // Iniciar la actualización del juego
}

// Crear bolas con púas que rebotan
function createBolas() {
    bolas = []; // Reiniciar la lista de bolas
    for (let i = 0; i < numBolas; i++) {
        let bola = {
            x: Math.random() * (canvas.width - bolaSize), // Posición aleatoria en x
            y: Math.random() * (canvas.height - bolaSize), // Posición aleatoria en y
            vx: (Math.random() * 2 - 1) * 2, // Velocidad aleatoria en x
            vy: (Math.random() * 2 - 1) * 2, // Velocidad aleatoria en y
            size: bolaSize // Tamaño de la bola
        };
        bolas.push(bola); // Agregar la bola a la lista
    }
}

// Dibuja las bolas y las hace rebotar en los bordes
function updateBolas() {
    for (let bola of bolas) {
        bola.x += bola.vx; // Actualizar la posición x
        bola.y += bola.vy; // Actualizar la posición y

        // Rebotar en los bordes
        if (bola.x <= 0 || bola.x + bola.size >= canvas.width) {
            bola.vx *= -1; // Invertir dirección en x
        }
        if (bola.y <= 0 || bola.y + bola.size >= canvas.height) {
            bola.vy *= -1; // Invertir dirección en y
        }

        // Dibujar bola
        ctx.beginPath();
        ctx.arc(bola.x + bola.size / 2, bola.y + bola.size / 2, bola.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'white'; // Color de la bola
        ctx.shadowBlur = 10; // Efecto de sombra
        ctx.shadowColor = 'gray';
        ctx.fill();
        ctx.strokeStyle = 'gray'; // Color del borde
        ctx.stroke();
        ctx.shadowBlur = 0; // Resetear sombra
    }
}

// Inicializar los puntos de la estrella pentagonal
function initStar() {
    const centerX = canvas.width / 2;  // Centro en x
    const centerY = canvas.height / 2; // Centro en y

    const radius = Math.min(canvas.width, canvas.height) * 0.4; // Radio basado en el tamaño del canvas
    const innerRadius = radius / 2.5; // Radio interno para los vértices internos de la estrella

    starPoints = []; // Reiniciar los puntos de la estrella

    // Definir los 10 puntos (5 exteriores y 5 interiores) de la estrella
    for (let i = 0; i < 10; i++) {
        const angle = (Math.PI / 5) * i; // 36 grados entre cada punto
        const r = i % 2 === 0 ? radius : innerRadius; // Alternar entre el radio externo e interno
        const x = centerX + Math.cos(angle - Math.PI / 2) * r; // Calcular posición x
        const y = centerY + Math.sin(angle - Math.PI / 2) * r; // Calcular posición y
        starPoints.push({ x, y }); // Agregar punto a la lista
    }

    // Dibujar la estrella
    drawStar();
}

// Función para dibujar la estrella pentagonal en el canvas
function drawStar() {
    ctx.beginPath();
    ctx.moveTo(starPoints[0].x, starPoints[0].y); // Moverse al primer punto

    // Conectar los puntos de la estrella en orden
    for (let i = 1; i < starPoints.length; i++) {
        ctx.lineTo(starPoints[i].x, starPoints[i].y);
    }

    ctx.closePath(); // Cerrar el trazado
    ctx.fillStyle = 'yellow'; // Color de la estrella
    ctx.fill();
    ctx.strokeStyle = 'black'; // Color del borde
    ctx.stroke();
}


// Función para dibujar la estrella en el canvas
function drawStar() {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(starPoints[0].x, starPoints[0].y); // Moverse al punto 1

    ctx.lineTo(starPoints[2].x, starPoints[2].y); // Del punto 1 al 3
    ctx.lineTo(starPoints[4].x, starPoints[4].y); // Del punto 3 al 5
    ctx.lineTo(starPoints[1].x, starPoints[1].y); // Del punto 5 al 2
    ctx.lineTo(starPoints[3].x, starPoints[3].y); // Del punto 2 al 4
    ctx.lineTo(starPoints[0].x, starPoints[0].y); // Regresar al punto 1

    ctx.closePath();
    ctx.fillStyle = 'yellow'; // Color de la estrella
    ctx.fill();
    ctx.strokeStyle = 'black'; // Color del borde
    ctx.stroke();
}


// Función para dibujar la estrella en el canvas
function drawStar() {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(starPoints[0].x, starPoints[0].y); // Moverse al punto 1

    ctx.lineTo(starPoints[2].x, starPoints[2].y); // Del punto 1 al 3
    ctx.lineTo(starPoints[4].x, starPoints[4].y); // Del punto 3 al 5
    ctx.lineTo(starPoints[1].x, starPoints[1].y); // Del punto 5 al 2
    ctx.lineTo(starPoints[3].x, starPoints[3].y); // Del punto 2 al 4
    ctx.lineTo(starPoints[0].x, starPoints[0].y); // Regresar al punto 1

    ctx.closePath();
    ctx.fillStyle = 'yellow'; // Color de la estrella
    ctx.fill();
    ctx.strokeStyle = 'black'; // Color del borde
    ctx.stroke();
}


let animationFrame; // Variable para controlar la animación

// Actualizar el juego
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo

    // Dibujar las bolas
    updateBolas();

    // Dibujar la estrella en formación
    if (isStarForming) {
        drawStarPath(); // Llamar a la función para dibujar el trazado de la estrella
    }

    // Detectar colisiones
    checkCollisions();

    animationFrame = requestAnimationFrame(updateGame); // Continuar la animación
}

// Dibujar el trazado progresivo de la estrella
function drawStarPath() {
    const startPoint = starPoints[currentPoint]; // Punto inicial
    const nextPoint = starPoints[(currentPoint + 1) % starPoints.length]; // Siguiente punto

    // Calcular el progreso entre los dos puntos
    const xProgress = startPoint.x + (nextPoint.x - startPoint.x) * (progress / maxProgress); // Posición x del progreso
    const yProgress = startPoint.y + (nextPoint.y - startPoint.y) * (progress / maxProgress); // Posición y del progreso

    // Dibujar línea progresiva
    ctx.beginPath();
    ctx.moveTo(starPoints[0].x, starPoints[0].y); // Mover al primer punto de la estrella

    // Dibuja las líneas ya completadas
    for (let i = 0; i <= currentPoint; i++) {
        if (i < currentPoint) {
            ctx.lineTo(starPoints[i + 1].x, starPoints[i + 1].y); // Dibuja líneas entre los puntos de la estrella
        } else {
            ctx.lineTo(xProgress, yProgress); // Dibuja la línea en progreso
        }
    }

    ctx.strokeStyle = 'gray'; // Color de la línea
    ctx.lineWidth = 2; // Grosor de la línea
    ctx.stroke(); // Dibujar la línea

    // Avanzar el progreso
    if (isMoving) {
        progress += 2; // Controla la velocidad del trazado
        if (progress >= maxProgress) {
            progress = 0; // Reiniciar el progreso
            currentPoint = (currentPoint + 1) % starPoints.length; // Avanzar al siguiente punto

            // Completar estrella
            if (currentPoint === 0) {
                completeStar(); // Completar la estrella si vuelve al inicio
            }
        }
    }
}

// Detectar colisiones entre el punto y las bolas
function checkCollisions() {
    const currentStarPoint = {
        x: starPoints[currentPoint].x + (starPoints[(currentPoint + 1) % starPoints.length].x - starPoints[currentPoint].x) * (progress / maxProgress),
        y: starPoints[currentPoint].y + (starPoints[(currentPoint + 1) % starPoints.length].y - starPoints[currentPoint].y) * (progress / maxProgress)
    };

    for (let bola of bolas) {
        let dx = currentStarPoint.x - (bola.x + bola.size / 2); // Diferencia en x
        let dy = currentStarPoint.y - (bola.y + bola.size / 2); // Diferencia en y
        let distance = Math.sqrt(dx * dx + dy * dy); // Distancia al centro de la bola

        // Si hay colisión, reiniciar el nivel
        if (distance < bola.size / 2) {
            if (isStarForming) { // Solo reiniciar si se ha comenzado a formar la estrella
                resetLevel(); // Reiniciar el nivel
            }
            break;
        }
    }
}

// Mantener presionado el ratón para dibujar
canvas.addEventListener('mousedown', () => {
    isMousePressed = true; // El mouse está presionado
    isStarForming = true; // Comenzar a formar la estrella
    isMoving = true; // Iniciar el movimiento del trazado
    if (messageVisible) {
        document.getElementById('mensajeFinal').style.display = 'none'; // Ocultar mensaje final si es visible
        messageVisible = false; // Cambiar el estado del mensaje
    }
});

canvas.addEventListener('mouseup', () => {
    isMousePressed = false; // El mouse ya no está presionado
    isMoving = false; // Detener el movimiento del trazado
});

// Mostrar mensaje cuando la estrella está completa
function completeStar() {
    document.getElementById('mensajeFinal').style.display = 'block'; // Mostrar mensaje de completado
    messageVisible = true; // Cambiar el estado del mensaje
}

// Reiniciar el nivel
function resetLevel() {
    isStarForming = false; // Detener el trazado de la estrella
    currentPoint = 0; // Reiniciar el punto actual
    progress = 0; // Reiniciar el progreso
}

// Comenzar el juego al seleccionar un nivel
document.getElementById('level1').addEventListener('click', () => startLevel(1));
document.getElementById('level2').addEventListener('click', () => startLevel(2));