import * as THREE from 'three';

function main(){
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    const camara = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    camara.position.z = 2;

    const ecena = new THREE.Scene();

    const luz = new THREE.DirectionalLight(0xFFFFFF, 3);
    luz.position.set(-1, 2, 4);
    ecena.add(luz);

    const geoemtry = new THREE.BoxGeometry(1, 1, 1);

    function makeInstancias(geoemtry, color, x){
        const material = new THREE.MeshPhongMaterial({color});
        const cubo = new THREE.Mesh(geoemtry, material);
        ecena.add(cubo);

        cubo.position.x = x;

        return cubo;
    }

    const cubos = [
        makeInstancias(geoemtry, 0x44aa88, 0),
        makeInstancias(geoemtry, 0x8844aa, -2),
        makeInstancias(geoemtry, 0xaa8844, 2)
    ];

    function render(tiempo){
        tiempo *= 0.001;

        cubos.forEach((cubo, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = tiempo * speed;
            cubo.rotation.x = rot;
            cubo.rotation.y = rot;
        });

        renderer.render(ecena, camara);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();