import * as THREE from 'three';

const ecena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const render = new THREE.WebGLRenderer();

render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const gometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cubo = new THREE.Mesh(gometry, material);
ecena.add(cubo);

camara.position.z = 5; 

function animacion(){
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;

    render.render(ecena, camara);
}

render.setAnimationLoop(animacion);