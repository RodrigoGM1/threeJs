import * as THREE from 'three';

THREE.ColorManagement.enabled = true;

const color = new THREE.Color();

color.r = color.g = color.b = 0.5;
console.log(color.r);

color.r = 0.5;
color.convertSRGBToLinear();
console.log(color.r);

color.setHex(0x808080);
console.log(color.r);
console.log(color.getHex());

color.setStyle('rgb(0.5, 0.5, 0.5)');
console.log(color.r);

color.setHex(0x808080, THREE.LinearSRGBColorSpace);
console.log(color.r);
console.log(color.getHex(THREE.LinearSRGBColorSpace));
console.log(color.getHex(THREE.SRGBColorSpace));