import * as THREE from 'three';

const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camara.position.set(0, 0, 100);
camara.lookAt(0, 0, 0);

const ecena = new THREE.Scene();

const material = new THREE.LineBasicMaterial({color: 0x000ff});

const puntos = [];
puntos.push(new THREE.Vector3(-10, 0, 0));
puntos.push(new THREE.Vector3( 0, 10, 0));
puntos.push(new THREE.Vector3( 10, 0, 0));

const geoemtry = new THREE.BufferGeometry().setFromPoints(puntos);

const linea = new THREE.Line(geoemtry, material);

ecena.add(linea);
render.render(ecena, camara);