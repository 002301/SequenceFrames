/*
 *  SequenceFrames 0.3.3 
 *  播放图片序列帧的js类,借助canvas标签实现序列帧播放。
 *  https://github.com/002301/SequenceFrames/
 *
 *  Copyright 2015,  MaNing
 * 
*/


function SequenceFrames(id,url,complate,end){

    var images = new Array();
    var imageURL = url;
    var myCanvas =document.getElementById(id);
    var ctx=myCanvas.getContext("2d");
    var step = 0;//当前帧
    var handler;//时间事件
    var total = 0;//图片总数
    var loopStart = 0;
    var loopEnd = 0;
    var _this = this;
    var interval = 60; //设置帧数
    var _status="";

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
            ctx.clearRect((screen_w - img_w)*0.5, (screen_h - img_h)*0.5, img_w, img_h);//清空画布 
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
        if(step<=loopEnd){
            rendering(step);  
        }else{
            step = loopStart;
        }
          
        
    }
    //向后播放t为true时循环播放，默认不循环
    function prev(){
        step--;
        if(step>=loopStart){
            rendering(step);
        }else{
            step = loopEnd;
        }
    }

    /*
        对外开放接口
    */

    //设置循环起始帧和结束帧
    this.setLoop = function (n,m){
        loopStart = n;
        loopEnd = m;
    }
    //停止
    this.stop = function (){
        //console.log('end')
        clearInterval(handler);
    }
    //正向播放
    this.play = function (){
        next();
        _this.nextFrameStop(loopEnd);
    }
    //到播
    this.reverse = function (){
        prev();
        _this.prevFrameStop(loopStart);
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
    this.nextFrame = function(){
        next();
        handler = setTimeout(function(){_this.nextFrame()},interval); 
        // _this.play();
    }
    //倒转循环
    this.prevFrame = function(){
        prev()
         handler = setTimeout(function(){_this.prevFrame()},interval); 
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
        if(_status!=""){
            _this.stop();
        }

           if(goNum!=step){
                _status="nextFrameStop";
               _this.next();
               handler = setTimeout(function(){_this.nextFrameStop(goNum,nfend)},interval); 
            }else{
                _this.stop();
                _status="";
                nfend();
            } 
        
    }
    //向前播放并停止到某帧
    this.prevFrameStop = function(n,nfend){
        var goNum = n;
        var nfend = nfend || Function;
        if(_status!=""){
            _this.stop();
        }
        if(goNum!=step){
            _status="prevFrameStop";
           _this.prev();
           handler = setTimeout(function(){_this.prevFrameStop(goNum,nfend)},interval); 
        }else{
            _this.stop();
            _status="";
            nfend();
        }
    }
    //设置播放间隔时间（毫秒）
    this.setInterval = function (n){
        interval =n;
        //console.log(interval)
    }
    loadImages();
}


