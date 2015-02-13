/*
 *  SequenceFrames 0.1 
 *  播放图片序列帧的js类,借助canvas标签实现序列帧小混混播放。
 *  http://www.airmn.com/SequenceFrames/
 *
 *  Copyright 2015,  MaNing
 * 
*/

function SequenceFrames(id,url,timers,vtotal,complate){

	var images = new Array();
	var imageURL = url;
    var myCanvas =document.getElementById(id);
	var ctx=myCanvas.getContext("2d");
    var step = 0;
    var handler;
    var total = vtotal;
    var loopStart = 0;
    var loopEnd = 0;
    var _this = this;
    var interval = timers; 
    var playReverse = false;
    complate = complate || Function;
    function loadImages () { 
        var imageCounter = 0; 
        var onLoad = function(err, msg) { 
            if (err) { 
                console.log(msg); 
            } 
            imageCounter++; 
            if (imageCounter == total) { 
                loadedImages = true; 
                _this.play();
                complate();
            } 
        } 

        for (var i = 0; i < total; i++) { 
            var img = new Image(); 
            img.onload = function() { onLoad(false); }; 
            img.onerror = function() { onLoad(true, e);}; 
            img.src = imageURL+'/'+i+'.jpg';
            images[i] = img; 
        } 
    } 


    // 绘制图片
    function Rendering (index) { 
        if (!loadedImages) 
            return; 
        var image = images[index]; 
        var screen_h = myCanvas.height; 
        var screen_w = myCanvas.width; 
        var ratio = getScaleRatio({width:image.width, height:image.height}, {width:screen_w, height:screen_h}); 
        var img_h = image.height * ratio; 
        var img_w = image.width * ratio; 
        ctx.drawImage(image, (screen_w - img_w)/2, (screen_h - img_h)/2, img_w, img_h); 

    }

    function getScaleRatio (obj1,obj2){
       var ww = obj2.width/obj1.width;
       var hh = obj2.height/obj1.height;
       return (ww>hh)?ww:hh;
    }


    function next (){
            step++;
            if(step==loopEnd){
                    step = loopStart;
            }
            if(step>=total){
                stop();
                return false;
            }else{
                 Rendering(step)
            }

    }


    /*
        对外开放接口
    */

    //循环
    this.setLoop = function (n,m){
        loopStart = n;
        loopEnd = m;
    }
    //停止
    this.stop = function (){
        clearInterval(handler);
    }
    //播放
    this.play =function (){
         handler = setInterval(next,interval);
    }
    //从第n帧开始播放
    this.gotoAndPlay = function(n){
        step = n;
        handler = setInterval(next,interval);

    }
    //停止到第n帧
    this.gotoAndStop = function(n){
        Rendering(n)
        clearInterval(handler);
        step = n;
    }

    loadImages();
}