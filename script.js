// ------------------- CONFIGURACIÓN DEL CARRUSEL -------------------
const basePath = "images/";

// Función para codificar nombres (por si acaso)
function fixFileName(name) {
    return encodeURI(name);
}

// LISTA COMPLETA DE RECUERDOS (con todas tus imágenes + video)
const slides = [
    { type: "img", src: "bebe_feliz.jpeg", text: "Desde que te conocí, me enamoré sin darme cuenta. ✨" },
    { type: "img", src: "renegoncita_bella.jpeg", text: "Eres mi niña preciosa, mi renegoncita bella y guapa. 🌹" },
    { type: "img", src: "guapa.jpeg", text: "Cada día me enseñas que puedo ser mejor de lo que soy. 💪" },
    { type: "img", src: "cusco_sonrisita.jpeg", text: "Me enseñaste el verdadero significado del esfuerzo y la valentía. 🌟" },
    { type: "video", src: "felices_de_estar_juntos.mp4", text: "Con esa sonrisita que me cautiva y enamora todos los días… 💖" }, // video mudo
    { type: "img", src: "beso_a_mi_bebe.jpeg", text: "Te amo más que a mí mismo, eres mi vida entera. 💕" },
    { type: "img", src: "beso_juntos.jpeg", text: "Cada beso tuyo es un pedacito de cielo. 😘" },
    { type: "img", src: "juntos_en_cusco.jpeg", text: "Desde la primera vez que fuimos a Cusco, mi vida cambió para siempre. 🏔️" },
    { type: "img", src: "juntos_mirador.jpeg", text: "No cambiaría nada, porque a tu lado todo es perfecto. 🌄" },
    { type: "img", src: "feliz_y_bella_cusco.jpeg", text: "Haces que mis días sean mejores, eres mi sol. ☀️" },
    { type: "img", src: "juntos_piscina.jpeg", text: "Quiero que sepas: TE AMO CON TODO MI CORAZÓN. ❤️" },
    { type: "img", src: "juntos_ampay.jpeg", text: "Eres la mujer con quien quiero pasar el resto de mi vida. 👰🤵" },
    { type: "img", src: "bebe_feliz_mirador.jpeg", text: "Te mereces mucho más de lo que puedo dar, pero me esforzaré por darte todo. 🎁" },
    { type: "img", src: "happy_cusco.jpeg", text: "Tu felicidad es la mía, por siempre. 🥰" },
    { type: "img", src: "juntos.jpeg", text: "Juntos formamos el mejor equipo del mundo. 🤝💕" },
    { type: "img", src: "juntos_piscina_doyunbeso.jpeg", text: "El agua no puede apagar nuestro amor. 💦❤️" },
    { type: "img", src: "juntos1.jpeg", text: "Cada día a tu lado es un nuevo capítulo de felicidad. 📖✨" }
];

let currentIndex = 0;
let autoInterval = null;

const mediaContainer = document.getElementById('mediaContainer');
const overlayText = document.getElementById('overlayText');

// Función para cambiar de slide (imagen o video)
function changeSlide(index) {
    const slide = slides[index % slides.length];
    mediaContainer.innerHTML = '';
    
    if (slide.type === "video") {
        const video = document.createElement('video');
        video.src = basePath + fixFileName(slide.src);
        video.autoplay = true;
        video.loop = true;
        video.muted = true;   // Sin sonido
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.addEventListener('error', () => {
            // Si el video no existe, mostrar imagen de respaldo
            const fallbackImg = document.createElement('img');
            fallbackImg.src = basePath + "felices_de_estar_juntos.jpeg";
            fallbackImg.alt = "Recuerdo";
            fallbackImg.style.width = '100%';
            fallbackImg.style.height = '100%';
            fallbackImg.style.objectFit = 'cover';
            mediaContainer.innerHTML = '';
            mediaContainer.appendChild(fallbackImg);
        });
        video.addEventListener('canplay', () => {
            video.play().catch(e => console.log("autoplay permitido"));
        });
        mediaContainer.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = basePath + fixFileName(slide.src);
        img.alt = "Recuerdo de amor";
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.onerror = () => {
            // Si la imagen no existe, poner un placeholder
            img.src = "https://placehold.co/600x600/e6005c/white?text=Te+Amo";
        };
        mediaContainer.appendChild(img);
    }
    
    // Texto con animación
    overlayText.style.opacity = '0';
    setTimeout(() => {
        overlayText.textContent = slide.text;
        overlayText.style.opacity = '1';
    }, 200);
}

// Iniciar carrusel automático cada 7 segundos
function startAutoSlide() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        changeSlide(currentIndex);
    }, 7000);
}

// Al hacer clic en el contenedor multimedia se avanza manualmente
mediaContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % slides.length;
    changeSlide(currentIndex);
    clearInterval(autoInterval);
    startAutoSlide();
});

// ------------------- CONTADOR DE ANIVERSARIO -------------------
const startDate = new Date(2024, 4, 25, 0, 0, 0); // 25 de mayo de 2024
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    if (diff <= 0) return;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const counterDiv = document.getElementById('timeCounter');
    if (counterDiv) {
        counterDiv.innerHTML = `🌹 ${days} días · ${hours} horas · ${minutes} min de amor eterno 🌹`;
    }
}
updateCounter();
setInterval(updateCounter, 60000);

// ------------------- FLORES DE FONDO (ROSAS) -------------------
function createRoses() {
    const container = document.getElementById('bgRoses');
    if (!container) return;
    const roses = ['🌹','🌹','🌹','🌹','🌹','🥀','💐'];
    for (let i = 0; i < 50; i++) {
        let rose = document.createElement('div');
        rose.textContent = roses[Math.floor(Math.random() * roses.length)];
        rose.style.left = Math.random() * 100 + '%';
        rose.style.fontSize = (Math.random() * 40 + 20) + 'px';
        rose.style.animationDuration = Math.random() * 20 + 12 + 's';
        rose.style.animationDelay = Math.random() * 15 + 's';
        rose.style.opacity = Math.random() * 0.5 + 0.2;
        container.appendChild(rose);
    }
}
createRoses();

// ------------------- PÉTALOS CAYENDO -------------------
function createFallingPetals() {
    const container = document.getElementById('fallingPetals');
    if (!container) return;
    const petals = ['🌸','🌼','🌺','🌹','🌷'];
    setInterval(() => {
        for (let i = 0; i < 4; i++) {
            let petal = document.createElement('div');
            petal.textContent = petals[Math.floor(Math.random() * petals.length)];
            petal.style.left = Math.random() * 100 + '%';
            petal.style.fontSize = (Math.random() * 20 + 12) + 'px';
            petal.style.animationDuration = Math.random() * 4 + 3 + 's';
            petal.style.opacity = Math.random() * 0.7 + 0.3;
            container.appendChild(petal);
            setTimeout(() => petal.remove(), 6000);
        }
    }, 800);
}
createFallingPetals();

// ------------------- CORAZONES FLOTANDO (automáticos) -------------------
setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['❤️','💖','💗','💓','❤️‍🔥'][Math.floor(Math.random()*5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '0px';
    heart.style.position = 'fixed';
    heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}, 600);

// ------------------- MÚSICA DE FONDO (con overlay) -------------------
const audio = document.getElementById('bgMusic');
const overlay = document.getElementById('musicOverlay');

function startMusicAndRemoveOverlay() {
    if (audio) {
        audio.play().catch(e => console.log("Interacción necesaria"));
    }
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 800);
    }
    // Iniciar carrusel
    changeSlide(0);
    startAutoSlide();
}

// Al hacer clic en cualquier parte se inicia la magia (si el overlay está visible)
document.body.addEventListener('click', () => {
    if (overlay && overlay.style.display !== 'none') {
        startMusicAndRemoveOverlay();
    }
}, { once: false });