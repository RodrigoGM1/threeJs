import * as THREE from 'three';

const MAX_PUNTOS = 500;

const ecena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const render = new THREE.WebGLRenderer();

const geometry = new THREE.BufferGeometry();
const posisiones = new Float32Array(MAX_PUNTOS * 3);

geometry.setAttribute('posision', new THREE.BufferAttribute(posisiones, 3));

const drawCount = 2;
geometry.setDrawRange(0, drawCount);

const material = new THREE.LineBasicMaterial({color: 0xff0000});

const linea = new THREE.Line(geometry, material);
ecena.add(linea);

render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

// const gometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const cubo = new THREE.Mesh(gometry, material);
// ecena.add(cubo);

// camara.position.z = 5; 

function animacion(){
    // cubo.rotation.x += 0.01;
    // cubo.rotation.y += 0.01;

    const posisionAttributos = linea.geometry.getAttribute('posision');

    let x = 0, y = 0, z = 0;

    for(let i = 0; i < posisionAttributos.count; i++){
        posisionAttributos.setXYZ(i, x, y, z);

        x += (Math.random() - 0.5) * 30; 
        y += (Math.random() - 0.5) * 30; 
        z += (Math.random() - 0.5) * 30; 
    }

    render.render(ecena, camara);
}

render.setAnimationLoop(animacion);