import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const ecena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const render = new THREE.WebGLRenderer();

render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const cargar = new GLTFLoader();

cargar.load('./texturas/piedra/scene.gltf', function(gltf){
    ecena.add(gltf.ecena);
}, undefined, function(error){
    console.log(error);
});

function animacion(){
    render.render(ecena, camara);
}


render.setAnimationLoop(animacion);