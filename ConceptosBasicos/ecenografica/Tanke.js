import * as THREE from 'three';
import { time } from 'three/tsl';

function main(){
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas});
    renderer.setClearColor(0xFFFFFF);
    renderer.shadowMap.enabled = true;

    function makeCamara(fov = 40){
        const aspecto = 2;
        const nNear = 0.1;
        const nFar = 100.0;

        return new THREE.PerspectiveCamera(fov, aspecto, nNear, nFar)
    }

    const camara = makeCamara();
    camara.position.set(8, 4, 10).multiplyScalar(3);
    camara.lookAt(0, 0, 0);

    const ecena = new THREE.Scene();

    {
        const luz = new THREE.DirectionalLight(0xffffff, 3);
        luz.position.set(0, 20, 0);
        ecena.add(luz);
        luz.castShadow = true;
        luz.shadow.mapSize.width = 2048;
        luz.shadow.mapSize.height = 2028;

        const d = 50;
        luz.shadow.camera.left = -d;
        luz.shadow.camera.right = d;
        luz.shadow.camera.top = d;
        luz.shadow.camera.bottom = -d;
        luz.shadow.camera.near = 1;
        luz.shadow.camera.far = 50;
        luz.shadow.bias = 0.001;
    }
    {
        const luz = new THREE.DirectionalLight(0xffffff, 3);
        luz.position.set(1, 2, 4);
        ecena.add(luz);
    }

    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshPhongMaterial({color: 0xcc8866});
    const groundMalla = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMalla.rotation.x = Math.PI * - .5;
    groundMalla.receiveShadow = true;
    ecena.add(groundMalla);

    const carAncho = 4;
    const carAlto = 1;
    const carLongitud = 8;

    const tank = new THREE.Object3D();
    ecena.add(tank);

    const bodyGeometry = new THREE.BoxGeometry(carAncho, carAlto, carLongitud);
    const bodyMaterial = new THREE.MeshPhongMaterial({color: 0x6688aa});
    const bodyMalla = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMalla.position.y = 1.4;
    bodyMalla.castShadow = true;
    tank.add(bodyMalla);

    const tankCamaraFov = 75;
    const tankCamara = makeCamara(tankCamaraFov);
    tankCamara.position.y = 3;
    tankCamara.position.z = 3;
    tankCamara.rotation.y = Math.PI;
    bodyMalla.add(tankCamara);

    const llantaRadio = 1;
    const llantaEspeso = .5;
    const llantaSegmento = 6;
    const llantaGeometry = new THREE.CylinderGeometry(llantaRadio, llantaRadio, llantaEspeso, llantaSegmento);
    const llantaMaterial = new THREE.MeshPhongMaterial({color: 0x888888});
    const llantaPosision = [
        [-carAncho / 2 - llantaEspeso / 2, -carAlto / 2, carLongitud / 3],
        [ carAncho / 2 + llantaEspeso / 2, -carAlto / 2, carLongitud / 3],
        [-carAncho / 2 - llantaEspeso / 2, -carAlto / 2,               0],
        [ carAncho / 2 + llantaEspeso / 2, -carAlto / 2,               0],
        [-carAncho / 2 - llantaEspeso / 2, -carAlto / 2, -carLongitud / 3],
        [ carAncho / 2 + llantaEspeso / 2, -carAlto / 2, -carLongitud / 3]
    ];

    const llantaMalla = llantaPosision.map((posision) => {
        const malla = new THREE.Mesh(llantaGeometry, llantaMaterial);
        malla.position.set(...posision);
        malla.rotation.z = Math.PI * .5;
        malla.castShadow = true;
        bodyMalla.add(malla);
        return malla;
    });

    const cupulaRadio = 2;
    const cupulaAncho = 12;
    const cupulaAlto = 12;
    const cupulaStart = 0;
    const cupulaEnd = Math.PI * 2;
    const cupulaThetaStart = 0;
    const cupulaThetaEnd = Math.PI * .5;
    const cupulaGeometry = new THREE.SphereGeometry(cupulaRadio, cupulaAncho, cupulaAlto, cupulaStart, cupulaEnd, cupulaThetaStart, cupulaThetaEnd);
    const cupulaMalla = new THREE.Mesh(cupulaGeometry, bodyMaterial);
    cupulaMalla.castShadow = true;
    bodyMalla.add(cupulaMalla);
    cupulaMalla.position.y = .5;

    // Fallas
    const torretaAncho = .1;
    const torretaAlto = .1;
    const torretaLongitud = carLongitud * .75 * .2;
    const torretaGeometry = new THREE.BoxGeometry(torretaAncho, torretaAlto, torretaLongitud);
    const torretaMalla = new THREE.Mesh(torretaGeometry, bodyMaterial);
    const torretaPivot = new THREE.Object3D();
    torretaMalla.castShadow = true;
    torretaPivot.scale.set(5, 5, 5);
    torretaPivot.position.y = .5;
    torretaMalla.position.z = torretaLongitud * .5;
    torretaPivot.add(torretaMalla);
    bodyMalla.add(torretaMalla);
    // Fallas

    const torretaCamara = makeCamara();
    torretaCamara.position.y = .75 * .2;
    torretaMalla.add(torretaCamara);

    const targetGeometry = new THREE.SphereGeometry(.5, 6, 3);
    const targetMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
    const targetMalla = new THREE.Mesh(targetGeometry, targetMaterial);
    const targetOrbit = new THREE.Object3D;
    const targetElevacion = new THREE.Object3D;
    const targetBob = new THREE.Object3D;
    targetMalla.castShadow = true;
    ecena.add(targetOrbit);
    targetOrbit.add(targetElevacion);
    targetElevacion.position.z = carLongitud * 2;
    targetElevacion.position.y = 8;
    targetElevacion.add(targetBob);
    targetBob.add(targetMalla);

    const targetCamera = makeCamara();
    const targetCamaraPivot = new THREE.Object3D();
    targetCamera.position.y = 1;
    targetCamera.position.z = -2;
    targetCamera.rotation.y = Math.PI;
    targetBob.add(targetCamaraPivot);
    targetCamaraPivot.add(tankCamara);

    const curva = new THREE.SplineCurve([
        new THREE.Vector2( - 10, 0 ),
        new THREE.Vector2( - 5, 5 ),
        new THREE.Vector2( 0, 0 ),
        new THREE.Vector2( 5, - 5 ),
        new THREE.Vector2( 10, 0 ),
        new THREE.Vector2( 5, 10 ),
        new THREE.Vector2( - 5, 10 ),
        new THREE.Vector2( - 10, - 10 ),
        new THREE.Vector2( - 15, - 8 ),
        new THREE.Vector2( - 10, 0 ),
    ]);

    const punto = curva.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(punto);
    const material = new THREE.LineBasicMaterial({color: 0xff0000});
    const splineObject = new THREE.Line(geometry, material);
    splineObject.rotation.x = Math.PI * .5;
    splineObject.position.y = 0.05;
    ecena.add(splineObject);

    // Redimencion de la ecena
    function resizeRendererToDisplaySize(renderer){
        const canvas = renderer.domElement;
        const ancho = canvas.clientWidth;
        const alto = canvas.clientHeight;

        const needResize = canvas.width !== ancho || canvas.height !== alto;
        if(needResize){
            renderer.setSize(ancho, alto, false);
        }

        return needResize;
    }
    // Redimencion de la ecena

    const targetPosicion = new THREE.Vector3();
    const tankPosicion = new THREE.Vector2();
    const tankTaget = new THREE.Vector2();

    const camaras = [
        {cam: camara, desc: 'canara independiente'},
        {cam: torretaCamara, desc: 'torreta mirando el objetivo'},
        {cam: targetCamera, desc: 'mirando tanque'},
        {cam: tankCamara, desc: 'encima del tanque'},
    ];

    // const infoElment = document.querySelector('#info');


    function render(tiempo){
        tiempo *= 0.001;

        if(resizeRendererToDisplaySize(renderer)){
            const canvas = renderer.domElement;
            camaras.forEach((camaraInfo) => {
                const camara = camaraInfo.cam;
                camara.aspect = canvas.clientWidth / canvas.clientHeight;
                camara.updateProjectionMatrix();
            });
        }

        targetOrbit.rotation.y = tiempo * .27;
        targetBob.position.y = Math.sin(tiempo * 2) * 4;
        targetMalla.rotation.x = tiempo * 7;
        targetMalla.rotation.y = tiempo * 13;
        targetMaterial.emissive.setHSL(tiempo * 10 % 1, 1, .25);
        targetMaterial.color.setHSL(tiempo * 10 % 1, 1, .25);

        const tankTiempo = tiempo * .05;
        curva.getPointAt(tankTiempo % 1, tankPosicion);
        curva.getPointAt((tankTiempo + 0.01) % 1, tankTaget);
        tank.position.set(tankPosicion.x, 0, tankPosicion.y);
        tank.lookAt(tankTaget.x, 0, tankTaget.y);

        targetMalla.getWorldPosition(targetPosicion);
        torretaPivot.lookAt(targetPosicion);

        torretaCamara.lookAt(targetPosicion);

        tank.getWorldPosition(targetPosicion);
        targetCamaraPivot.lookAt(targetPosicion);

        llantaMalla.forEach((obj) => {
            obj.rotation.x = tiempo * 3;
        });

        const camara = camaras[tiempo * .25 % camaras.length | 0];


        renderer.render(ecena, camara.cam);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    // console.log(renderer);    
}

main();