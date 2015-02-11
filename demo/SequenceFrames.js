function SequenceFrames(id,url,vtotal){
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
    var PAINT_INTERVAL = 40; 
    this.loadImages = function () { 
        console.log("loadImages")
        var imageCounter = 0; 
        var onLoad = function(err, msg) { 
            if (err) { 
                console.log(msg); 
            } 
            imageCounter++; 
            if (imageCounter == total) { 
                loadedImages = true; 
                _this.play();
                console.log("play")
            } 
        } 

        for (var i = 0; i < total; i++) { 
            var img = new Image(); 
            img.onload = function() { onLoad(false); }; 
            img.onerror = function() { onLoad(true, e);}; 
            img.src = imageURL+'/'+i+'.jpg';
            console.log(img.src)
            images[i] = img; 
        } 
    } 


    // 绘制图片
    this.paintImage = function (index) { 
        if (!loadedImages) 
            return; 
        var image = images[index]; 
        var screen_h = myCanvas.height; 
        var screen_w = myCanvas.width; 
        console.log("image.width:"+image.width)
        var ratio = _this.getScaleRatio({width:image.width, height:image.height}, {width:screen_w, height:screen_h}); 
        var img_h = image.height * ratio; 
        var img_w = image.width * ratio; 
        ctx.drawImage(image, (screen_w - img_w)/2, (screen_h - img_h)/2, img_w, img_h); 
    }

    this.getScaleRatio = function (obj1,obj2){
       var ww = obj2.width/obj1.width;
       var hh = obj2.height/obj1.height;
      // console.log(c.height)
       return (ww>hh)?ww:hh;
    }


    this._play = function (){
            step++;
            console.log("step:"+step)
            if(step==loopEnd){
                    step = loopStart;
            }
            if(step==total){
                console.log("totalstep:"+step)
                stop();
                return false;

            }
            else{
                 _this.paintImage(step)
                //console.log("loopEnd:"+loopEnd)
            }
            _this.setCavars()
    }

    this.setLoop = function (n,m){
        loopStart = n;
        loopEnd = m;
    }
    this.setCavars = function (){
        var scale = document.body.clientWidth/1440;//获取缩放比例
        myCanvas.style.webkitTransformOrigin = "top left"//设置缩放坐标点
        myCanvas.style.webkitTransform ="scale("+scale+")";//设置缩放
    };
    this.stop = function (){
        _this.clearInterval(handler);
    }
    this.play =function (){
         step = 0;
         //_this.clearInterval(_this.handler)
         _this.handler = setInterval(_this._play,PAINT_INTERVAL);
    }
    _this.loadImages()
}