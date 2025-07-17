import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/Addons.js';

const ecena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const render = new THREE.WebGLRenderer();

render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);
document.body.appendChild(VRButton.createButton(render));

render.xr.enabled = true;

function animacion(){
    render.render(ecena, camara);
}

render.setAnimationLoop(animacion);