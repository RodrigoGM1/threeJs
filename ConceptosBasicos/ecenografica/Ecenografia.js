import * as THREE from 'three';
import GUI from 'lil-gui';

class AxisGridHelper{
    constructor(nodo, unidades = 10){
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 2;
        nodo.add(axes);

        const grid = new THREE.GridHelper(unidades, unidades);
        grid.material.depthTest = false;
        grid.renderOrder = 1;
        nodo.add(grid);

        this.grid = grid;
        this.axes = axes;
        this.visible = false;
    }
    get visible(){
        return this._visible;
    }
    set visible(v){
        this._visible = v;
        this.grid.visible = v;
        this.axes.visible = v;
    }
};

const gui = new GUI();

const ecena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const render = new THREE.WebGLRenderer();
camara.position.set(0, 50, 0);
camara.up.set(0, 0, 1);
camara.lookAt(0, 0, 0);

render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const objetos = [];
const radio = 1;
const anchoSegmento = 6;
const altoSegmento = 6;
const sphereGeometry = new THREE.SphereGeometry(radio, anchoSegmento, altoSegmento);

const solarSistema = new THREE.Object3D();
ecena.add(solarSistema);
objetos.push(solarSistema);

const solMaterial = new THREE.MeshPhongMaterial({emissive: 0xffff00});
const solMalla = new THREE.Mesh(sphereGeometry, solMaterial);;
solMalla.scale.set(5, 5, 5);
solarSistema.add(solMalla);

objetos.push(solMalla);

const tierraOrbita = new THREE.Object3D();
tierraOrbita.position.x = 10;
solarSistema.add(tierraOrbita);
objetos.push(tierraOrbita);

const tierraMaterial = new THREE.MeshPhongMaterial({color: 0x2233ff, emissive: 0x112244});
const tierraMalla = new THREE.Mesh(sphereGeometry, tierraMaterial);
tierraOrbita.add(tierraMalla);
objetos.push(tierraMalla);

const lunaOrbita = new THREE.Object3D();
lunaOrbita.position.x = 2;
tierraOrbita.add(lunaOrbita);

const lunaMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const lunaMalla = new THREE.Mesh(sphereGeometry, lunaMaterial);
lunaMalla.scale.set(.5, .5, .5);
lunaOrbita.add(lunaMalla);
objetos.push(lunaMalla);

{
    const color = 0xffffff;
    const intencidad = 500;
    const luz = new THREE.PointLight(color, intencidad);
    ecena.add(luz);
}

function makeAxiesGrid(nodo, nivel, unidades){
        const help = new AxisGridHelper(nodo, unidades);
        gui.add(help, 'visible').name(nivel);
    }

    makeAxiesGrid(solarSistema, 'SolorSistema', 25);
    makeAxiesGrid(solMalla, 'solMalla');
    makeAxiesGrid(tierraOrbita, 'tierraOrbita');
    makeAxiesGrid(tierraMalla, 'tierraMalla');
    makeAxiesGrid(lunaOrbita, 'lunaOrbita');
    makeAxiesGrid(lunaMalla, 'lunaMalla');

function animacion(tiempo){
    objetos.forEach((obj) => {
         obj.rotation.y = tiempo / 1000;
    });

    

    render.render(ecena, camara);
}

render.setAnimationLoop(animacion);
