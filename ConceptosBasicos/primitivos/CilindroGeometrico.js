import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 100 );
camera.position.z = 20;

const scene = new THREE.Scene();

const start = Math.PI * 0.25;
const length = Math.PI * 1.5;

const geometry = new THREE.CylinderGeometry(4, 4, 8);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {

    mesh.rotation.x = time / 20000;
    mesh.rotation.y = time / 10000;

    renderer.render( scene, camera );

}