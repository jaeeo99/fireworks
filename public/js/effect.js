/**
 * Created by Jaeeo on 2016. 10. 23..
 */
var renderer, scene, camera,
    ww     = window.innerWidth,
    wh     = window.innerHeight,
    amount = 100,
    mouse  = {x:0,y:0};

var pngs = [];
var renderers = [],
    cameras = [],
    canvas = [],
    scenes = [],
    leaves = [];
texture = new THREE.TextureLoader;

for(var i=0;i<9;i++){
    texture.setCrossOrigin('');
    texture.load('http://mamboleoo.be/lab/leaves/'+i+'.png', function(texture) {
        pngs.push(texture);
        if(pngs.length===9){

            for(var i=0;i<2;i++){
                var newScene = init("scene"+i);
                renderers.push(newScene.renderer);
                cameras.push(newScene.camera);
                scenes.push(newScene.scene);
                leaves.push(newScene.leaves);
            }

            requestAnimationFrame(render);
        }
    });
}

window.addEventListener("resize", onWindowResize );


function init(scene){
    var canvas = document.getElementById(scene);
    var renderer = new THREE.WebGLRenderer({canvas:canvas, alpha: true});
    renderer.setSize(ww, wh);

    var scene = new THREE.Scene();

    var leaves = new THREE.Object3D()
    for(var i=0;i<amount;i++){
        var leave = new Leave(renderers.length);
        leaves.add(leave);
    }

    scene.add(leaves);

    var camera = new THREE.PerspectiveCamera(50,ww/wh, 1, 10000 );
    camera.position.set(0,0,400);
    scene.add(camera);


    var light = new THREE.HemisphereLight( 0xF29641,0x402821, 1.5 );
    scene.add( light );


    return {
        canvas : canvas,
        renderer : renderer,
        scene : scene,
        camera :camera,
        leaves :leaves
    };
}

function onWindowResize(){
    ww     = window.innerWidth;
    wh     = window.innerHeight;
    for(var i=0;i<2;i++){
        cameras[i].aspect = ww / wh;
        cameras[i].updateProjectionMatrix();

        renderers[i].setSize(ww, wh);
    }
}

function onMouseMove(e){
    mouse.x = (e.clientX - ww/2)/(ww/15);
    mouse.y = (e.clientY/wh)*3;
};

function Leave(depth){
    var x = (Math.random()-0.5)*ww;
    var y = (Math.random()-0.5)*wh;
    var z = - Math.random()*500 * (depth/6) + (Math.random()*250);
    var rX = Math.random()*(Math.PI);
    var rY = Math.random()*(Math.PI);
    var rZ = Math.random()*(Math.PI);
    var randomMap = pngs[Math.floor(Math.random()*9)];
    var geometry = new THREE.PlaneGeometry( 20, 20, 3 );
    var material = new THREE.MeshLambertMaterial( {
        side: THREE.DoubleSide,
        map: randomMap,
        transparent: true,
        alphaTest: 0.8
    } );
    var leave = new THREE.Mesh( geometry, material );
    leave.position.set(x,y,z);
    leave.rotation.set(rX,rY,rZ);

    leave.speed = {
        x : Math.random()/30+0.2,
        y : Math.random()/20+0.4,
        rX : Math.random()/50,
        rY : Math.random()/50,
        rZ : Math.random()/50
    };

    return leave;
};

var render = function (a) {
    requestAnimationFrame(render);
    for(var i=0;i<2;i++){
        for(var j=0;j<amount;j++){
            var leave = leaves[i].children[j];
            leave.position.x += leave.speed.x + mouse.x;
            leave.position.y -= leave.speed.y + mouse.y;
            leave.rotation.x += leave.speed.rX + (mouse.x/80);
            leave.rotation.y += leave.speed.rY + (mouse.y/40);
            leave.rotation.z += leave.speed.rZ;

            if(leave.position.y <= -(wh/2)){
                leave.position.y = (wh/2);
                leave.position.x = (Math.random()-0.5)*ww;;
            }
        }
        renderers[i].render(scenes[i], cameras[i]);
    }
};