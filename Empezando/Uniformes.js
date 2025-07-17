import * as THREE from 'three';

const entidad1 = {
    posision: new THREE.Vector3(),
    direccion: new THREE.Vector3(0, 0, 1)
};

const entidad2 = {
    posision: new THREE.Vector3(1, 1, 1),
    direccion: new THREE.Vector3(0, 1, 0)
};

let uniforms = {
    data:{
        value: [entidad1, entidad2]
    }
};