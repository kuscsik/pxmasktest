px.import("px:scene.1.js").then( function ready(scene) {
var root = scene.root;
var basePackageUri = px.getPackageBaseFilePath();

var url;

var txt1 = scene.create({t:"text",r:-85, x:140,text:"------------------ THIS IS A TRANSPARENCY TEST -------------",parent:root,pixelSize:24});

var scaleFactor = 0.2

urlLogo = basePackageUri + "/images/Peach_Rinkysplash.jpg";
url = basePackageUri + "/images/rounded_map.png";

var container = scene.create({t:"rect", fillColor:0x00000000, parent:root});

// ball will draw since draw:true, but will also be used as mask for childText

var ball = scene.create({t:"image",url:url,parent:container,sx:scaleFactor,sy:scaleFactor,clip:true,mask:true,draw:true});
  ball.ready.then(function() {
    container.w=ball.resource.w*scaleFactor;
    container.h=ball.resource.h*scaleFactor;
    container.cx = ball.resource.w*scaleFactor;
    container.cy = ball.resource.h*scaleFactor;
    fancy(container);

    var childText = scene.create({t:"image", url:urlLogo, sx:scaleFactor, sy:scaleFactor, parent:container,pixelSize:65});
  });

function fancy(o) {
  var startX = 150;
  var startY = 100;

  // animate x and restart the overall animation at end
  o.x = startX;
  o.animateTo({x:50}, 1.0, scene.animation.TWEEN_LINEAR, scene.animation.OPTION_LOOP, 1)
    .then(function(o){
      o.animateTo({x:startX}, 3.0, scene.animation.EASE_OUT_ELASTIC, scene.animation.OPTION_LOOP, 1)
        .then(function(o){
          fancy(o);
        })
  });

  // animate y
  o.y = startY;
  o.animateTo({y:150}, 1.0, scene.animation.EASE_OUT_BOUNCE, scene.animation.OPTION_LOOP, 1)
    .then(function(o) {
      o.animateTo({y:startY}, 1.0, scene.animation.EASE_OUT_ELASTIC, scene.animation.OPTION_LOOP, 1);
  });

  // animate r
  o.r = 0;
  o.animateTo({r:-360}, 2.5, scene.animation.EASE_OUT_ELASTIC, scene.animation.OPTION_LOOP, 1);

  // animate sx, sy
  o.animateTo({sx:scaleFactor,sy:scaleFactor}, 1, scene.animation.TWEEN_LINEAR, scene.animation.OPTION_LOOP, 1)
    .then(function(o){
      o.animateTo({sx:2.0,sy:2.0}, 1.0, scene.animation.TWEEN_EXP1, scene.animation.OPTION_LOOP, 1)
        .then(function(o) {
          o.animateTo({sx:1.0,sy:1.0}, 1.0, scene.animation.EASE_OUT_ELASTIC, scene.animation.OPTION_LOOP, 1);
        })
    });
}


scene.on('onKeyDown', function(e) {
  console.log("keydown:" + e.keyCode);
});

scene.on("onMouseMove", function(e) {
    txt1.text = "" + e.x+ ", " + e.y;
});

function updateSize(w, h) {
/*
    bg.w = w;
    bg.h = h;
    bgShade.w = w;
    bgShade.h = h;
*/
    txt1.y = h-txt1.h;
}

scene.on("onResize", function(e){updateSize(e.w,e.h);});
updateSize(scene.getWidth(), scene.getHeight());

}).catch( function importFailed(err){
  console.error("Import failed for masktest.js: " + err)
});

