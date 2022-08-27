import './style.css'
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();



const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(10, 10, 10);
scene.add(light);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

const renderer = new THREE.WebGL1Renderer();
document.body.appendChild( renderer.domElement );


renderer.setSize( window.innerWidth, window.innerHeight );



renderer.render( scene, camera);
renderer.setPixelRatio( window.devicePixelRatio );

/*let posX = 15;
let posY = 32;
let posZ = 16;
const geometry = new THREE.SphereBufferGeometry( posX, posY, posZ );
const color3 = new THREE.Color("rgb(0, 255, 0)");
const material = new THREE.MeshBasicMaterial();

const sphere = new THREE.Mesh( geometry, material );
sphere.material.color.set(color3);

scene.add( sphere );
*/
//scene.add(new THREE.AxesHelper(5));


const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material = new THREE.MeshPhysicalMaterial({
metalness: 0,
roughness: 1,
envMapIntensity: 0.9,
clearcoat: 1,
transparent: true,
transmission: .95,
opacity: 1,
reflectivity: 0.2,
roughness: 0
})
const cylinder = new THREE.Mesh( geometry, material );
//scene.add( cylinder );
camera.lookAt(cylinder);
console.log(camera.position.y);
console.log(camera.position.z);
console.log(camera.position.x);
camera.position.x = 30;


const geometry1 = new THREE.SphereGeometry( 1, 1, 1 );
const material1 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry1, material1 );
scene.add( sphere );


// Get float array of all coordinates of vertices
//const float32array = geometry.attributes.position.array;
// run loop,  each step of loop need increment by 3, because each vertex has 3 coordinates, X, Y and Z
/* for (let i = 0; i < float32array.length; i += 3) {
  // inside the loop you can get coordinates
  console.log(float32array[i]); // X coordinate
  console.log(float32array[i]); // Y coordinate
  console.log(float32array[i]); // Z coordinate
}*/

loader.load( 'jarsmooth.glb', function ( gltf ) {
  var model = gltf.scene;
  var newMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0,
    roughness: 1,
    envMapIntensity: 0.9,
    clearcoat: 1,
    transparent: true,
    transmission: .95,
    opacity: 1,
    reflectivity: 0.2,
    roughness: 0
    })
model.traverse((o) => {
if (o.isMesh) o.material = newMaterial;
});

  scene.add( model );

}, undefined, function ( error ) {

  console.error( error );

} );




const controls = new OrbitControls( camera, renderer.domElement );

camera.position.z = 5;
controls.update();

//shows on canvas
//loops like p5
function animate() {
  requestAnimationFrame( animate );
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
  controls.update();

renderer.render( scene, camera );
}
animate();