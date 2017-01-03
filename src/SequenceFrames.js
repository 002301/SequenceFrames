/*
 *  SequenceFrames 0.3.1 
 *  播放图片序列帧的js类,借助canvas标签实现序列帧播放。
 *  http://www.airmn.com/SequenceFrames/demo
 *
 *  Copyright 2015,  MaNing
 * 
*/

function SequenceFrames(id,url,complate,end){

    var images = new Array();
    var imageURL = url;
    var myCanvas =document.getElementById(id);
    var ctx=myCanvas.getContext("2d");
    var step = 0;
    var handler;
    var total = 0;//图片总数
    var loopStart = 0;
    var loopEnd = 0;
    var _this = this;
    var interval = 60;
    var playReverse = false;

    complate = complate || Function;
    end = end || Function;

    function loadImages () { 
        var imageCounter = 0; 
        total = imageURL.length;
        loopEnd = total;
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
            // console.log(imageURL[i]);
            img.src = imageURL[i];
            images[i] = img; 
        } 
    } 


    // 绘制图片
    function rendering (index) { 
        if (!loadedImages) 
            return; 
        if(images[index]!=undefined){
           var image = images[index]; 
            var screen_h = myCanvas.height; 
            var screen_w = myCanvas.width; 
            var ratio = getScaleRatio({width:image.width, height:image.height}, {width:screen_w, height:screen_h}); 
            var img_h = image.height * ratio; 
            var img_w = image.width * ratio; 
            ctx.drawImage(image, (screen_w - img_w)*0.5, (screen_h - img_h)*0.5, img_w, img_h); 
        }
    }

    function getScaleRatio (obj1,obj2){
       var ww = obj2.width/obj1.width;
       var hh = obj2.height/obj1.height;
       return (ww>hh)?ww:hh;
    }
    function next(){
        step++;
        //console.log(step);
        if(step>=loopEnd){
            step = loopStart;
        }
        rendering(step);
    }

    function prev(){
        step--;
        if(step<loopStart){
            step = loopEnd;
        }
        rendering(step);
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
        //console.log('end')
        clearInterval(handler);
    }
    //播放
    this.play = function (){
        _this.stop();
        handler = setInterval(next,interval);
    }
    //下一帧
    this.next =function(){
        next();
    }
    //前一帧
    this.prev = function(){
        prev();
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
    //获取当前帧
    this.currentFrame = function(){
        return step;
    }
    //向后播放并停止到某帧
    this.nextFrameStop = function(n,nfend){
        var goNum = n;
        var nfend = nfend || Function;
        //console.log(goNum+"    :"+step)
        if(goNum!=step){
           _this.next();
           handler = setTimeout(function(){_this.nextFrameStop(goNum,nfend)},interval); 
        }else{
            _this.stop();
            nfend();
        }
    }
    //向前播放并停止到某帧
    this.prevFrameStop = function(n,nfend){
        var goNum = n;
        var nfend = nfend || Function;
        if(goNum!=step){
           _this.prev();
           handler = setTimeout(function(){_this.prevFrameStop(goNum,nfend)},interval); 
        }else{
            _this.stop();
            nfend();
        }
    }

    this.setInterval = function (n){
        interval =n;
        //console.log(interval)
    }
    loadImages();
}
