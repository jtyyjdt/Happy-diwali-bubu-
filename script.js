const openBtn = document.getElementById("openBtn");
const surprise = document.getElementById("surprise");
const bgMusic = document.getElementById("bgMusic");
const fireBtn = document.getElementById("fireBtn");
const ending = document.getElementById("ending");

// Open surprise
openBtn.addEventListener("click", () => {
  surprise.classList.remove("hidden");
  openBtn.style.display = "none";

  bgMusic.volume = 0.45;
  bgMusic.play().catch(() => {});

  createHearts();

  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }, 300);
});

// Floating hearts
function createHearts() {
  const emojis = ["❤️", "💛", "✨", "💕", "💖"];

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 8000);
  }, 700);
}

// Fireworks animation
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    this.alpha = 1;
    this.size = Math.random() * 3 + 1;

    this.color = [
      "#ffd166",
      "#ff6bcb",
      "#ffffff",
      "#ff9f43",
      "#b388ff"
    ][Math.floor(Math.random() * 5)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.vy += 0.045;
    this.vx *= 0.99;
    this.alpha -= 0.012;
  }

  draw() {
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  }
}

function explode(x, y) {
  for (let i = 0; i < 65; i++) {
    particles.push(new Particle(x, y));
  }
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();

// Grand fireworks button
fireBtn.addEventListener("click", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  let count = 0;

  const launch = setInterval(() => {
    const x = Math.random() * width;
    const y = Math.random() * (height * 0.55) + 50;

    explode(x, y);
    count++;

    if (count >= 12) {
      clearInterval(launch);
    }
  }, 350);

  ending.classList.remove("hidden");

  fireBtn.textContent = "Made With Love ❤️";
  fireBtn.disabled = true;

  setTimeout(() => {
    ending.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 500);
});