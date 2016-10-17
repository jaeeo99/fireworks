var renderer, scene, camera,
			ww     = window.innerWidth,
			wh     = window.innerHeight
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

/*


var speed = 0.9;
var WIDTH;
var HEIGHT;
var scale;
var control = false;

var progress = 0.0;

var resize = function() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    scale = WIDTH / 1440;

};
resize();
$(window).on('resize', resize);


var draw = function() {
    requestAnimationFrame(draw);

    progress += 0.00012 * speed;
    if (progress > 1) progress = 0;
    if (progress < 0) progress = 1;

};

$(document).on('mousemove', function(e) {
    if (!control) return;

    speed = (1 - (e.clientX / WIDTH) * 2) * 2;

    tl.timeScale(speed);
    tl2.timeScale(speed);
    tl3.timeScale(speed);
    tl4.timeScale(speed);
    tl5.timeScale(speed);
});

$('.control-toggle').on('click', function() {
    control = !control;
    $('.container').toggleClass('active');
});

TweenLite.defaultEase = Power1.easeInOut;

var cloudIntro = function() {
    TweenLite.to($('.cloud1'), 20, {x: WIDTH * 2, y: 300 * scale, opacity: 0.3, ease: Linear.easeNone, force3D: true});
    TweenLite.to($('.cloud-shadow1'), 20, {x: WIDTH * 2 + 50 * scale, y: 450 * scale, opacity: 0.2, ease: Linear.easeNone, force3D: true});
    TweenLite.to($('.cloud-shadow2'), 20, {x: WIDTH * 2 + 50 * scale, y: 450 * scale, ease: Linear.easeNone, force3D: true});
    TweenLite.to($('.cloud-shadow3'), 20, {x: WIDTH * 2 + 50 * scale, y: 450 * scale, ease: Linear.easeNone, force3D: true});
    TweenLite.to($('.cloud2'), 20, {x: WIDTH * 2, y: 300 * scale, opacity: 0.5, ease: Linear.easeNone, force3D: true});
    TweenLite.to($('.cloud3'), 20, {x: WIDTH * 2, y: 300 * scale, ease: Linear.easeNone, force3D: true});
    TweenLite.to($('.cloud4'), 20, {x: WIDTH * 2, y: 300 * scale, ease: Linear.easeNone, force3D: true});
    TweenLite.to($('.cloud5'), 20, {x: WIDTH * 2, y: 300 * scale, ease: Linear.easeNone, force3D: true, onComplete: function() {
        $('.clouds').remove();
    }});
};

var init = function() {
    TweenLite.to($('.load-gate'), 0.5, {opacity: 0, onComplete: function() {
        $('.load-gate').remove();
    }});
    requestAnimationFrame(draw);
    cloudIntro();
};
if (document.readyState == 'complete') {
    init();
} else {
    $(window).load(init);
};

TweenMax.to($('.cloud-bg'), 40, {x: WIDTH * 2, y: 200 * scale, ease: Linear.easeNone, repeat: -1, force3D: true, onRepeat: function() {
    TweenLite.set(this.target[0], {y: Math.random() * 200 - 100, rotationZ: Math.round(Math.random() * 60) - 30, scaleX: Math.random() > 0.5 ? 1 : -1});
}});

TweenMax.to($('.cloud-bg2'), 40, {x: WIDTH * 2, y: 200 * scale, ease: Linear.easeNone, delay: 10, repeat: -1, force3D: true, onRepeat: function() {
    TweenLite.set(this.target[0], {y: Math.random() * 200 - 100, rotationZ: Math.round(Math.random() * 60) - 30, scaleX: Math.random() > 0.5 ? 1 : -1});
}});

var tl = new TimelineMax({repeat: -1, onReverseComplete: function() {this.seek(tl.duration())}});
*/
