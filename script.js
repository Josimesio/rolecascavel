// Cena e renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222); // fundo cinza escuro

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiente e direcional
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Eixos (ajuda visual)
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Criar blocos de eventos
const eventos = [
  { titulo: "Show da Vicka", cor: 0xff0055 },
  { titulo: "Balada Club 85", cor: 0x00ffaa },
  { titulo: "Feira Gastronômica", cor: 0x0055ff }
];

const blocos = [];

eventos.forEach((ev, i) => {
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const material = new THREE.MeshStandardMaterial({ color: ev.cor });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = i * 3 - 3;
  cube.position.y = 0;
  cube.userData = { titulo: ev.titulo };
  scene.add(cube);
  blocos.push(cube);
});

// Posição inicial da câmera
camera.position.z = 8;
camera.position.y = 2;
camera.lookAt(0, 0, 0);

// Raycaster para clique
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(blocos);

  if (intersects.length > 0) {
    const evento = intersects[0].object.userData;
    alert(`Você clicou no evento: ${evento.titulo}`);
  }
});

// Loop de animação
function animate() {
  requestAnimationFrame(animate);
  blocos.forEach(b => b.rotation.y += 0.01);
  renderer.render(scene, camera);
}

animate();
