import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 100 );
camera.position.z = 20;

const scene = new THREE.Scene();

const shape = new THREE.Shape();
const x = -2.5;
const y = -5;
shape.moveTo(x + 2.5, y + 2.5);
shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

const extrudeSettings = {
  steps: 2,  
  depth: 2,  
  bevelEnabled: true,  
  bevelThickness: 1,  
  bevelSize: 1,  
  bevelSegments: 2,  
};

const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

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