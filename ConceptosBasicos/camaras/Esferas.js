import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { int } from 'three/tsl';

function mian(){
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas, logarithmicDepthBuffer: true});
    const camara = new THREE.PerspectiveCamera(45, 2, 0.00001, 100);
    camara.position.set(10, 6, 10);

    class MinMaxGUIHelper {
        constructor(obj, minProp, maxProp, minDif){
            this.obj = obj;
            this.minProp = minProp;
            this.maxProp = maxProp;
            this.minDif = minDif;
        }
        get min(){
            return this.obj[this.minProp];
        }
        set min(v){
            this.obj[this.minProp] = v;
            this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
        }
        get max(){
            return this.obj[this.maxProp];
        }
        set max(v){
            this.obj[this.maxProp] = v;
            this.min = this.min;
        }
    }

    function updateCamara(){
        camara.updateProjectionMatrix();
    }

    const gui = new GUI();
    gui.add(camara, 'fov', 1, 180).onChange(updateCamara);
    const minMaxGUIHelper = new MinMaxGUIHelper(camara, 'near', 'far', 0.1);
    gui.add(minMaxGUIHelper, 'min', 0.00001, 50, 0.00001).name('near').onChange(updateCamara);
    gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamara);

    const controls = new OrbitControls(camara, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const ecena = new THREE.Scene();
    ecena.background = new THREE.Color('black');

    {
        const planoSize = 40;
        const cargar = new THREE.TextureLoader();
        const textura = cargar.load("texturas/checker.png");
        textura.wrapS = THREE.RepeatWrapping;
        textura.wrapT = THREE.RepeatWrapping;
        textura.magFilter = THREE.NearestFilter;
        textura.colorSpace = THREE.SRGBColorSpace;
        const repetir = planoSize / 2;
        textura.repeat.set(repetir, repetir);

        const planoGeo = new THREE.PlaneGeometry(planoSize, planoSize);
        const planoMat = new THREE.MeshPhongMaterial({map: textura, side: THREE.DoubleSide});
        const malla = new THREE.Mesh(planoGeo, planoMat);
        malla.rotation.x = Math.PI * - .5;
        ecena.add(malla);
    }

    {
        const radio = 3; 
        const anchoDiviciones = 32;
        const altoDiviciones = 16;
        const esferaGro = new THREE.SphereGeometry(radio, anchoDiviciones, altoDiviciones);
        const numEsferas = 20;
        for(let i = 0; i < numEsferas; ++i){
            const esferaMat = new THREE.MeshPhongMaterial();
            esferaMat.color.setHSL(i * .73, 1, 0.5);
            const malla = new THREE.Mesh(esferaGro, esferaMat);
            malla.position.set(- radio - 1, radio + 2, i * radio * - 2.2);
            ecena.add(malla);
        }
    }

    {
        const color = 0xFFFFFF;
        const intencidad = 3;
        const luz = new THREE.DirectionalLight(color, intencidad);
        luz.position.set(0, 10, 0);
        luz.target.position.set(-5, 0, 0);
        ecena.add(luz);
        ecena.add(luz.target);
    }

    redimencionarDisplay(renderer);

    function redimencionarDisplay(renderer){
        const canvas = renderer.domElement;
        const ancho = canvas.clientWidth;
        const alto = canvas.clientHeight;
        const needResize = canvas.width !== ancho || canvas.height !== alto;
        if(needResize){
            renderer.setSize(ancho, alto, false);
        }
        return needResize;
    }

    function render(){
        if(redimencionarDisplay(renderer)){
            const canvas = renderer.domElement;
            camara.aspect = canvas.clientWidth / canvas.clientHeight;
            camara.updateProjectionMatrix();
        }
        renderer.render(ecena, camara);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

mian();