import * as THREE from 'three';

const cargarElemento = document.querySelector('#cargador');
const cargarBarElem = cargarElemento.querySelector('.progresobar');

const ecena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const render = new THREE.WebGLRenderer();

const cargar = new THREE.TextureLoader();

render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const gometry = new THREE.BoxGeometry(1, 1, 1);

const materials = [
    new THREE.MeshBasicMaterial({map: cargarColorTextura('texturas/flower-1.jpg')}),
    new THREE.MeshBasicMaterial({map: cargarColorTextura('texturas/flower-2.jpg')}),
    new THREE.MeshBasicMaterial({map: cargarColorTextura('texturas/flower-3.jpg')}),
    new THREE.MeshBasicMaterial({map: cargarColorTextura('texturas/flower-4.jpg')}),
    new THREE.MeshBasicMaterial({map: cargarColorTextura('texturas/flower-5.jpg')}),
    new THREE.MeshBasicMaterial({map: cargarColorTextura('texturas/flower-6.jpg')}),
];

function cargarColorTextura(direccion){
    const textura = cargar.load(direccion);
    textura.colorSpace = THREE.SRGBColorSpace;
    return textura;
}



const cubo = new THREE.Mesh(gometry, materials);
ecena.add(cubo);

camara.position.z = 5; 

function animacion(){
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;

    render.render(ecena, camara);
}

render.setAnimationLoop(animacion);