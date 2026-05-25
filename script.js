// ------------------- CONFIGURACIÓN DEL CARRUSEL -------------------
const basePath = "images/";

function fixFileName(name) {
    return encodeURI(name);
}

const slides = [
    { type: "img", src: "bebe_feliz.jpeg", text: "Desde que te conocí, me enamoré sin darme cuenta. ✨" },
    { type: "img", src: "renegoncita_bella.jpeg", text: "Eres mi niña preciosa, mi renegoncita bella y guapa. 🌹" },
    { type: "img", src: "guapa.jpeg", text: "Cada día me enseñas que puedo ser mejor de lo que soy. 💪" },
    { type: "img", src: "cusco_sonrisita.jpeg", text: "Me enseñaste el verdadero significado del esfuerzo y la valentía. 🌟" },
    { type: "video", src: "felices_de_estar_juntos.mp4", text: "Con esa sonrisita que me cautiva y enamora todos los días… 💖" },
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
    { type: "img", src: "juntos_piscina_doyunbeso.jpeg", text: "Los problemas ni dificultades puedran apagar nuestro amor. 💦❤️" },
    { type: "img", src: "juntos1.jpeg", text: "Cada día a tu lado es un nuevo capítulo de felicidad. 📖✨" }
];

let currentIndex = 0;
let autoInterval = null;
let userInteracted = false; // Bandera para saber si ya se eliminó el overlay

const mediaContainer = document.getElementById('mediaContainer');
const overlayText = document.getElementById('overlayText');

// Función para cambiar de slide (imagen o video)
function changeSlide(index) {
    const slide = slides[index % slides.length];
    mediaContainer.innerHTML = '';
    
    if (slide.type === "video") {
        const video = document.createElement('video');
        video.src = basePath + fixFileName(slide.src);
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = 'auto';
        video.style.objectFit = 'contain';
        video.style.backgroundColor = '#ffd9e6';
        
        // Solo intentar reproducir si el usuario ya interactuó
        if (userInteracted) {
            video.autoplay = true;
            video.addEventListener('loadedmetadata', () => {
                video.play().catch(e => console.log("Error reproduciendo video:", e));
            });
            // Intento adicional después de agregar al DOM
            setTimeout(() => {
                if (video.paused) video.play().catch(e => console.log("Fallo segundo intento"));
            }, 100);
        }
        
        video.addEventListener('error', () => {
            // Fallback a imagen si el video no existe
            const fallbackImg = document.createElement('img');
            fallbackImg.src = basePath + "felices_de_estar_juntos.jpeg";
            fallbackImg.alt = "Recuerdo";
            fallbackImg.style.width = '100%';
            fallbackImg.style.height = 'auto';
            fallbackImg.style.objectFit = 'contain';
            mediaContainer.innerHTML = '';
            mediaContainer.appendChild(fallbackImg);
        });
        
        mediaContainer.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = basePath + fixFileName(slide.src);
        img.alt = "Recuerdo de amor";
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        img.style.backgroundColor = '#ffd9e6';
        img.onerror = () => {
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

function startAutoSlide() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        changeSlide(currentIndex);
    }, 7000);
}

// Avance manual al hacer clic en el contenedor
mediaContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % slides.length;
    changeSlide(currentIndex);
    clearInterval(autoInterval);
    startAutoSlide();
});

// ------------------- CONTADOR DE ANIVERSARIO -------------------
const startDate = new Date(2025, 4, 28, 0, 0, 0); // 28 de mayo de 2025
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    if (diff <= 0) return;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const counterDiv = document.getElementById('timeCounter');
    if (counterDiv) {
        if (days >= 365) {
            counterDiv.innerHTML = `🌹 +365 días · y seguirán · de amor eterno 🌹`;
        } else {
            counterDiv.innerHTML = `🌹 ${days} días juntos · y cada día más 🌹`;
        }
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

// ------------------- CORAZONES FLOTANDO -------------------
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

// ------------------- MÚSICA DE FONDO Y OVERLAY -------------------
const audio = document.getElementById('bgMusic');
const overlay = document.getElementById('musicOverlay');

function startMusicAndRemoveOverlay() {
    if (audio) {
        audio.play().catch(e => console.log("Música requiere interacción"));
    }
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 800);
    }
    // Marcar que el usuario ya interactuó
    userInteracted = true;
    // Iniciar carrusel
    changeSlide(0);
    startAutoSlide();
    // Si el primer slide es video, forzar reproducción
    const firstSlide = slides[0];
    if (firstSlide.type === "video") {
        setTimeout(() => {
            const video = document.querySelector('#mediaContainer video');
            if (video && video.paused) {
                video.play().catch(e => console.log("No se pudo reproducir video al inicio"));
            }
        }, 300);
    }
}

// Al hacer clic en cualquier parte (incluyendo el overlay) se inicia la magia
document.body.addEventListener('click', () => {
    if (overlay && overlay.style.display !== 'none') {
        startMusicAndRemoveOverlay();
    }
}, { once: false });