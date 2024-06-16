import './style.css';
import * as THREE from 'three';
import GUI from 'lil-gui';
import imgSource from './finewood.jpg';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import gsap from 'gsap';
import typefaceFont from 'three/examples/fonts/helvetiker_bold.typeface.json';


console.log(typefaceFont);
//  Scene
const scene = new THREE.Scene();

const box = new THREE.Box3();

const mesh = new THREE.Mesh(
	new THREE.SphereGeometry(),
	new THREE.MeshBasicMaterial()
);

// ensure the bounding box is computed for its geometry
// this should be done only once (assuming static geometries)
mesh.geometry.computeBoundingBox();

// ...

// in the animation loop, compute the current bounding box with the world matrix
box.copy( mesh.geometry.boundingBox ).applyMatrix4( mesh.matrixWorld );


const geometry = new THREE.TorusGeometry( 3, 0.4, 12, 48 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const torus = new THREE.Mesh( geometry, material ); 



/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("STart");

}

loadingManager.onLoad = () => {
    console.log('Loaded');
  }

  loadingManager.onProgress = () => {
    console.log('Progressing');
  }

  loadingManager.onError = () => {
    console.log('Error');
  }


const textureLoader = new THREE.TextureLoader();

 const colortexture = textureLoader.load('/screenshot.jpg');
 const alphaTexture = textureLoader.load('/finewood');

//const texture = textureLoader.load();
const matcapTexture = textureLoader.load('./finewood.jpg');
matcapTexture.colorSpace = THREE.SRGBColorSpace;
const image = new Image();

image.onload = () => {
    console.log('image loaded');
  //  colortexture.needsUpdate = true;
}

image.src = '/finewood.jpg';

/***
 * Debug
 */
const gui = new GUI();

/**
 * Base
 */

// canvas
const canvas = document.querySelector('canvas.webgl');



/**
 * Fonts
 */
 const fontLoader = new FontLoader();
 fontLoader.load(
     '/fonts/helvetiker_bold.typeface.json',
     (font) => {
         const textGeometry = new TextGeometry( 'Hello Welcome to three.js!', {
             font: font,
             size: 0.5,
             depth: 2,
             curveSegments: 5,
             bevelEnabled: true,
             bevelThickness: 0.04,
             bevelSize: 0,
             bevelOffset: 0,
             bevelSegments: 0
         });
         console.log('font loaded');
        textGeometry.center()
        const material = new THREE.MeshMatcapMaterial({map: matcapTexture});
        const text = new THREE.Mesh(textGeometry, material);
        scene.add(text);

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

    for(let i = 0; i < 100; i++)
    {
    //const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
    const donut = new THREE.Mesh(donutGeometry, material)
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.x = scale
    donut.scale.y = scale
    donut.scale.z = scale


    scene.add(donut); 
    };

    });




/**
 * Objects
 */
//const material = new THREE.MeshBasicMaterial({ map: colortexture });

// geometry
//const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
// material = new THREE.MeshBasicMaterial({ map: colortexture });

 // MeshBasicMaterial

// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 16, 16),
//     material
// )

// sphere.position.x = -1.5;

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1),
//     material
// )

// plane.position.x = 1.2;

// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.3, 0.2, 16, 32),
//     material
// )

// torus.position.x = 2.9;


 //const mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = 1;
// mesh.position.x = 0.7;
// mesh.position.z = -0.6;


// Sizes
const sizes = {
    width: 800,
    height: 600
}

window.addEventListener('resize', () => {

    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


mesh.position.normalize();
//mesh.position.set(0.7, -0.6, 1);
// Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
//const camera = new THREE.OrthographicCamera(sizes.width/ -2, sizes.width / 2, sizes.height / 2, sizes.height / -2, 1, 100);

camera.position.z = 3;
camera.position.y = 3;
camera.position.z = 3;
//camera.lookAt(mesh.position);
scene.add(camera);


// // COntrols
 const controls = new OrbitControls(camera, canvas);
 controls.enableDamping = true;

// const controls = new 

// AxesHelper
const axesHelper = new THREE.AxesHelper(7);
//scene.add(axesHelper);

// Euler
const a = new THREE.Euler(0, 2, 1.65, 'XYZ');
const b = new THREE.Vector3(1, 0, 1);
b.applyEuler(a);


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})


console.log(mesh.position.length());
console.log(mesh.position.distanceTo(camera.position));

// time
let time = Date.now();

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// Animate
const clock = new THREE.Clock();

console.log(THREE);


// Animations
const tick = () => {
    // Time
    //const currentTime = Date.now();
    //const deltaTIme = currentTime - time;
    //time  = currentTime;
    const elapsedTime = clock.getElapsedTime();

    controls.update();
    // Update objects
   // mesh.rotation.y += 0.001 * deltaTIme;
   //mesh.rotation.y = elapsedTime; 
   //sphere.rotation.y = 0.1 * elapsedTime;
   //plane.rotation.y = 0.1 * elapsedTime;
   //torus.rotation.y = 0.1 * elapsedTime;

   //sphere.rotation.x = -0.15 * elapsedTime;
   //plane.rotation.x = -0.15 * elapsedTime;
   //torus.rotation.x = -0.15 * elapsedTime;
    // render
    renderer.render(scene, camera);
    
    //console.log('tick');
    window.requestAnimationFrame(tick);
}

tick();





