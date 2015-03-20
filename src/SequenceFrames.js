/*
 *  SequenceFrames 0.1 
 *  播放图片序列帧的js类,借助canvas标签实现序列帧播放。
 *  http://www.airmn.com/SequenceFrames/demo
 *
 *  Copyright 2015,  MaNing
 * 
*/

function SequenceFrames(id,url,vtotal,complate){

    var images = new Array();
    var imageURL = url;
    var myCanvas =document.getElementById(id);
    var ctx=myCanvas.getContext("2d");
    var step = 0;
    var handler;
    var total = vtotal;//图片总数
    var loopStart = 0;
    var loopEnd = 0;
    var _this = this;
    var interval
    var playReverse = false;

    interval = timers || 60;
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
                rendering(0)
                complate();
            } 
        } 

        for (var i = 0; i < total; i++) { 
            var img = new Image(); 
            img.onload = function(e) { onLoad(false); }; 
            img.onerror = function(e) { onLoad(true, e);}; 
            img.src = imageURL+'/'+i+'.jpg';
            images[i] = img; 
        } 
    } 


    // 绘制图片
    function rendering (index) { 
        if (!loadedImages) 
            return; 
        var image = images[index]; 
        var screen_h = myCanvas.height; 
        var screen_w = myCanvas.width; 
        var ratio = getScaleRatio({width:image.width, height:image.height}, {width:screen_w, height:screen_h}); 
        var img_h = image.height * ratio; 
        var img_w = image.width * ratio; 
        ctx.drawImage(image, (screen_w - img_w)*0.5, (screen_h - img_h)*0.5, img_w, img_h); 

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
             clearInterval(handler);
            return false;
        }else{
             rendering(step)
        }

    }

    function previous () {
        step--;
        if(step<loopStart){
            step = loopEnd;
        }else{
             rendering(step)
        }
        console.log(step)
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
    this.play = function (){
        _this.stop();
        handler = setInterval(next,interval);
    }
    //向前播放
    this.prev = function(){
        _this.stop();
        handler = setInterval(previous,interval);
    }
    //从第n帧开始播放
    this.gotoAndPlay = function(n){
        step = n;
        _this.stop();
        handler = setInterval(next,interval);

    }
    //停止到第n帧
    this.gotoAndStop = function(n){
        rendering(n)
        clearInterval(handler);
        step = n;
    }
    //正转循环
    this.nextFrame = function(e){
        var loop = e || true;
        if(loop){
            _this.setLoop(0,total)
        }
        _this.play();
    }
    //倒转循环
    this.prevFrame = function(e){
        var loop = e || true;
        if(loop){
            _this.setLoop(0,total)
        }
        _this.prev();
    }
    loadImages();
}