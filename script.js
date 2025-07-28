const scene = document.getElementById('scene');

// GRAMA DINÂMICA
const grassContainer = document.getElementById('dynamic-grass');
const grassBlades = [];
const grassCount = 38; // quantidade de folhas de grama

for (let i = 0; i < grassCount; i++) {
  const blade = document.createElement('div');
  blade.className = 'grass-blade';

  // Distribuição horizontal e altura variada
  const left = (3 + i * (94 / (grassCount - 1))) + Math.random() * 1.5;
  blade.style.left = `${left}%`;

  // Altura e largura variando
  const height = 40 + Math.random() * 45;
  blade.style.height = `${height}px`;
  blade.style.background = Math.random() > 0.5
    ? 'linear-gradient(to top, #20703a 60%, #4caf50 100%)'
    : 'linear-gradient(to top, #388e3c 60%, #81c784 100%)';

  // Espessura variando
  blade.style.width = `${1.5 + Math.random() * 1.5}px`;

  // Curvatura inicial
  blade.dataset.baseRotate = (-10 + Math.random() * 20).toFixed(2);

  grassContainer.appendChild(blade);
  grassBlades.push(blade);
}

// Movimento da grama com o mouse
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

scene.addEventListener('mousemove', (e) => {
  const rect = scene.getBoundingClientRect();
  mouseX = e.clientX - rect.left - rect.width / 2;
  mouseY = e.clientY - rect.top - rect.height / 2;
});

function animateGrass() {
  currentX += (mouseX - currentX) * 0.07;
  currentY += (mouseY - currentY) * 0.07;

  grassBlades.forEach((blade, i) => {
    const sway = Math.sin(i + currentX * 0.005) * 12 + Number(blade.dataset.baseRotate);
    blade.style.transform = `translateX(-50%) rotate(${sway}deg)`;
  });

  requestAnimationFrame(animateGrass);
}
animateGrass();

// FLORES BALANÇANDO
function animateFlowers() {
  const flowers = document.querySelectorAll('.flower-container');
  flowers.forEach((el, i) => {
    const strength = 0.6 + 0.3 * (i % 2);
    el.style.transform = `translateX(-50%) translateY(${currentY * 0.01 * strength}px) rotate(${currentX * 0.01 * strength}deg)`;
  });
  requestAnimationFrame(animateFlowers);
}
animateFlowers();

// PÉTALAS CAINDO
const petalContainer = document.querySelector('.falling-petals');
for (let i = 0; i < 70; i++) {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDelay = `${Math.random() * 5}s`;
  petal.style.animationDuration = `${5 + Math.random() * 5}s`;
  petalContainer.appendChild(petal);
}

// FLORES
const colors = ['pink', 'purple', 'white'];
const smallFlowerPositions = [];
const total = 15;

for (let i = 0; i < total; i++) {
  smallFlowerPositions.push({
    left: `${10 + i * (80 / (total - 1))}%`,
    z: (i % 3 === 0) ? 2 : 1,
    scale: (i % 2 === 0) ? 1 : 0.8 + Math.random() * 0.15,
    color: colors[i % colors.length]
  });
}

const gradients = {
  pink: [
    { offset: '0%', color: '#fff0fa' },
    { offset: '100%', color: '#f9b3e6' }
  ],
  purple: [
    { offset: '0%', color: '#f8f6ff' },
    { offset: '100%', color: '#b39ddb' }
  ],
  white: [
    { offset: '0%', color: '#ffffff' },
    { offset: '100%', color: '#fdf5e6' }
  ]
};

function getFlowerSVG(gradId) {
  return `
  <svg class="flower small-svg" viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="${gradId}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#fdf5e6"/>
      </radialGradient>
    </defs>
    <g class="flower-caule">
      <line x1="100" y1="250" x2="100" y2="100" stroke="#3aaf3a" stroke-width="5" />
      <ellipse cx="90" cy="180" rx="18" ry="7" fill="#3aaf3a" transform="rotate(-30 90 180)" />
      <ellipse cx="110" cy="150" rx="18" ry="7" fill="#3aaf3a" transform="rotate(30 110 150)" />
      <ellipse cx="90" cy="120" rx="14" ry="6" fill="#3aaf3a" transform="rotate(-20 90 120)" />
      <ellipse cx="110" cy="100" rx="12" ry="5" fill="#3aaf3a" transform="rotate(25 110 100)" />
    </g>
    <g class="flower-petalas" fill="url(#${gradId})">
      <g transform="rotate(0,100,100)"><ellipse cx="100" cy="60" rx="16" ry="34"/></g>
      <g transform="rotate(45,100,100)"><ellipse cx="100" cy="60" rx="16" ry="34"/></g>
      <g transform="rotate(90,100,100)"><ellipse cx="100" cy="60" rx="16" ry="34"/></g>
      <g transform="rotate(135,100,100)"><ellipse cx="100" cy="60" rx="16" ry="34"/></g>
      <g transform="rotate(180,100,100)"><ellipse cx="100" cy="60" rx="16" ry="34"/></g>
      <g transform="rotate(225,100,100)"><ellipse cx="100" cy="60" rx="16" ry="34"/></g>
      <g transform="rotate(270,100,100)"><ellipse cx="100" cy="60" rx="16" ry="34"/></g>
      <g transform="rotate(315,100,100)"><ellipse cx="100" cy="60" rx="16" ry="34"/></g>
      <circle cx="100" cy="100" r="16" fill="gold" />
    </g>
  </svg>
  `;
}


smallFlowerPositions.forEach((pos, idx) => {
  const container = document.createElement('div');
  container.className = 'flower-container small flower-hidden';
  container.style.left = pos.left;
  container.style.bottom = pos.z === 2 ? '60px' : '30px';
  container.style.width = `${12 * pos.scale}vw`;
  container.style.zIndex = pos.z;

  const gradId = `petalGradient${pos.color}${idx}`;
  let svg = getFlowerSVG(gradId);

  const stops = gradients[pos.color];
  svg = svg.replace(
    `<radialGradient id="${gradId}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#fdf5e6"/>
      </radialGradient>`,
    `<radialGradient id="${gradId}" cx="50%" cy="50%" r="50%">
        <stop offset="${stops[0].offset}" stop-color="${stops[0].color}"/>
        <stop offset="${stops[1].offset}" stop-color="${stops[1].color}"/>
      </radialGradient>`
  );

  container.innerHTML = svg;
  scene.appendChild(container);

  // Efeito suave ao passar o mouse
  container.addEventListener('mouseenter', () => {
    if (container.classList.contains('flower-hidden')) {
      container.classList.remove('flower-hidden');
    }
  });
});




const bushes = document.querySelectorAll('.bush-container');
function animateBushes() {
  bushes.forEach((bush, i) => {
    // Movimento suave, alternando direção para cada lado
    const sway = Math.sin(currentX * 0.004 + i) * 8;
    bush.style.transform = `translateY(${sway}px) ${i === 1 ? 'scaleX(-1)' : ''}`;
  });
  requestAnimationFrame(animateBushes);
}
animateBushes();