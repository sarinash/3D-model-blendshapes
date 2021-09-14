import * as THREE from './three.js-master/build/three.module.js';

import Stats from './three.js-master/examples/jsm/libs/stats.module.js';
import { controllers, GUI } from './three.js-master/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

var container, controls;
var camera, scene, renderer, light, mixer;
var clock = new THREE.Clock();
var mesh;
var x;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);





    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    //light

    light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 200, 100);
    light.castShadow = true;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.left = -120;
    light.shadow.camera.right = 120;
    scene.add(light);

    // slider
    var params = {
        morphTarget: 0,
        

    };

    var gui = new GUI();

    var folder = gui.addFolder('Morph Targets');
    
   


    
    folder.open();
    

    // grid
    var grid = new THREE.GridHelper(2, 2, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    // model
    var loader = new GLTFLoader();
    var filepath = 'assets/juun.gltf';
    let object;
    let options={morph:0};

 

    loader.load(filepath, function (gltf) {
       // scene.add(object);
        scene.add(gltf.scene);

        
        for (var j = 2; j<=5; j++){
            object=gltf.scenes[0].children[j];
            //gltf.scenes[0].children[2].morphTargetInfluences[43] =1
            //gltf.scenes[0].children[5].morphTargetInfluences[0] =1
            console.log(x)


            
            var expressions = Object.keys( object.morphTargetDictionary ).length;
            
           // console.log(object);
           
    
           
    
            for ( var i = 0; i < expressions; i ++ ) {
                
        
                folder.add( object.morphTargetInfluences,i, 0,1, 0.1).onChange(morphChange).name(object.userData.targetNames[i] );
                function morphChange(){
                    object.morphTargetInfluences[i]=options.morph;
                  };
                //console.log(object.userData.targetNames[i])
                
    
        
            }

        }


   
        

            
            
     


       
     

        scene.add(gltf.scene);




    });

    // render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement)
    renderer.outputEncoding = THREE.sRGBEncoding;
    //renderer.gammaOutput = true;
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
    camera.position.set(-1.8, 0.9, 2.7);
    camera.position.set( - 5, 3, 10 );
    camera.lookAt( new THREE.Vector3( 0, 2, 0 ) );
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, -0.2, -0.2);
    controls.update();
    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    //console.log(x)
    
    if (mixer) mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}
