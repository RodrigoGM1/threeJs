import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

class colorGUI {
    constructor(objeto, prop){
        this.objeto = objeto;
        this.prop = prop;
    };
    get value(){
        return this.objeto[this.prop].getHexString();
    }
    set value(hexString){
        this.objeto[this.prop].set(hexString);
    }
};

function main(){
    const canvas = document.querySelector("#c");
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    const camara = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
    const ecena = new THREE.Scene();
    camara.position.set(0, 10, 20);

    const controls = new OrbitControls(camara, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

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

    {
        const cuboSize = 4;
        const cuboGeo = new THREE.BoxGeometry(cuboSize, cuboSize, cuboSize);
        const cuboMat = new THREE.MeshPhongMaterial({color: '#8AC'});
        const malla = new THREE.Mesh(cuboGeo, cuboMat);
        malla.position.set(cuboSize + 1, cuboSize / 2, 0);
        ecena.add(malla);
    }
    {
        const esferaRadio = 3;
        const esferaAnchoDiv = 32;
        const esferaAltoDiv = 16;
        const esferaGeo = new THREE.SphereGeometry(esferaRadio, esferaAnchoDiv, esferaAltoDiv);
        const esferaMat = new THREE.MeshPhongMaterial({color: '#CA8'});
        const malla = new THREE.Mesh(esferaGeo, esferaMat);
        malla.position.set(-esferaRadio - 1, esferaRadio + 2, 0);
        ecena.add(malla);
    }

    const color = 0xFFFFFF;
    const intencidad = 150;
    // const luz = new THREE.DirectionalLight(color, intencidad);
    const luz = new THREE.PointLight(color, intencidad);
    luz.position.set(0, 10, 0);
    // luz.target.position.set(-5, 0, 0);
    ecena.add(luz);
    // ecena.add(luz.target);

    const helper = new THREE.PointLightHelper(luz);
    ecena.add(helper);

    // updateLuz();

    const gui = new GUI();
    gui.addColor(new colorGUI(luz, 'color'), 'value').name('color');;
    gui.add(luz, 'intensity', 0, 150, 0.01);
    gui.add(luz, 'distance', 0, 40).onChange(updateLuz);;
    
    makeXYZGUI(gui, luz.position, 'position', updateLuz);
    // makeXYZGUI(gui, luz.target.position, 'target', updateLuz);

    function animacion() {
        
        if(resizeRendererDisplay(renderer)){
            const canvas = renderer.domElement;
            camara.aspect = canvas.clientWidth / canvas.clientHeight;
            camara.updateMatrix();
        }

        renderer.render(ecena, camara);
        requestAnimationFrame(animacion);
    }
    
    requestAnimationFrame(animacion);


    // Funciones 
    function resizeRendererDisplay(renderer){
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const ancho = Math.floor(canvas.clientWidth * pixelRatio);
        const alto = Math.floor(canvas.clientHeight * pixelRatio);
        const needResize = canvas.width !== ancho || canvas.height !== ancho;
        if(needResize){
            renderer.setSize(ancho, alto, false);
        }
        return needResize;
    }

    function makeXYZGUI(gui, vector3, name, onChangeFn){
        const folder = gui.addFolder(name);
        folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
        folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
        folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
        folder.open();
    }

    function updateLuz(){
        // luz.target.updateMatrixWorld();
        helper.update();
    }
}

main();