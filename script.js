const flower = document.getElementById('flower');
const scene = document.getElementById('scene');

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

scene.addEventListener('mousemove', (e) => {
  const rect = scene.getBoundingClientRect();
  mouseX = e.clientX - rect.left - rect.width / 2;
  mouseY = e.clientY - rect.top - rect.height / 2;
});

function animateFlowers() {
  currentX += (mouseX - currentX) * 0.05;
  currentY += (mouseY - currentY) * 0.05;

  const flowers = document.querySelectorAll('.flower-container');
  flowers.forEach((el, i) => {
    const strength = i === 0 ? 1 : 0.6;
    el.style.transform = `translateX(-50%) translateY(${currentY * 0.01 * strength}px) rotate(${currentX * 0.01 * strength}deg)`;
  });

  requestAnimationFrame(animateFlowers);
}
animateFlowers();

const petalContainer = document.querySelector('.falling-petals');
for (let i = 0; i < 30; i++) {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDelay = `${Math.random() * 5}s`;
  petal.style.animationDuration = `${5 + Math.random() * 5}s`;
  petalContainer.appendChild(petal);
}

const smallFlowerPositions = [
  '32%', '38%', '44%', // esquerda
  '56%', '62%', '68%'  // direita
];

smallFlowerPositions.forEach((pos) => {
  const scale = Math.random() * 0.1 + 0.95;
  const container = document.createElement('div');
  container.className = 'flower-container small';
  container.style.left = pos;
  container.style.bottom = '40px';
  container.style.width = `${150 * scale}px`;

  const clone = document.querySelector('.main-flower svg').cloneNode(true);
  clone.setAttribute('class', 'flower small-svg');

  const smile = clone.querySelector('.smile');
  if (smile) smile.remove();

  container.appendChild(clone);
  scene.appendChild(container);
});
