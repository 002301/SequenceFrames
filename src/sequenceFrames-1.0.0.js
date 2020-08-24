
/**
 * 这是一个播放序列帧类
 * @author maning
 * 
 */
let _config = {
    url:[],
    fps:60,//设置帧数
    autoPlay:false, //自动播放
    homePage:0,
    onComplate:_onComplate,
    onLoaded:_onLoaded
}
const _type = Object.freeze({
    PLAY:"PLAY",
    STOP:"STOP",
    LOOP:"LOOP",
    YOYOLOOP:"YOYOLOOP",
    PAUSE:"PAUSE",
    REVERSE:"REVERSE",
    PLAYTO:"PLAYTO",
    YOYOPLAYTO:"YOYOPLAYTO",
})
let _canvas =document.createElement("canvas"),
_ctx = _canvas.getContext("2d"),
_currentFrame = 0,//当前帧
_totalFrame = 0,//总帧数
_stage= new Array(),//播放的图片
_status='',//播放状态
//设置tick
_then = Date.now(),//获取一个时间戳
_interval = 1000/_config.fps,
_delta,//帧率间隔
//tick end
_loop={
    start:0,//循环开始
    end:0,//循环结束
},
_playTo=0;//播放到某一帧

//图片准备完毕
function _onLoaded (){
    console.log('onLoaded')
}
//播放完毕
function _onComplate (){
    // return this;
    console.log('onComplate_ok');
}
//加载图片
async function loadImg(url){
    return new Promise(res=>{
        let img = new Image();
        img.onload = e =>{
            res(img);
        }
        img.src = url;
    })
    
}
//加载列表
async function loadImgs(urls){
    for(let i of urls){
        let img = await loadImg(i);
        _stage.push(img);
    } 
    // console.log(_stage)
    _config.onLoaded();
    draw();
};
//缩放
function getScaleRatio (obj1,obj2){
    var ww = obj2.width/obj1.width;
    var hh = obj2.height/obj1.height;
    return (ww>hh)?ww:hh;
}

function tick() {
    if(_status==_type.PAUSE) return;
    if(window.requestAnimationFrame)
    {
　　    requestAnimationFrame(tick);
　　    let now = Date.now();
　　    _delta = now - _then;
　　    if (_delta > _interval) {
　　　　    _then = now - (_delta % _interval);
　　　　    draw(); // ... Code for Drawing the Frame ...
　　    }
    }
    else
    {
        setTimeout(tick, _interval);
        draw();
    }
}
// 绘制图片
function draw () { 
    // console.log(_stage[_currentFrame])
    if(_stage[_currentFrame]!=undefined){
        let image = _stage[_currentFrame]; 
        let screen_w = _canvas.width; 
        let screen_h = _canvas.height; 
        let ratio = getScaleRatio({width:image.width, height:image.height}, {width:screen_w, height:screen_h}); 
        let img_h = image.height * ratio; 
        let img_w = image.width * ratio;
        _ctx.clearRect(0, 0, screen_w, screen_h);//清空画布 
        _ctx.drawImage(image, (screen_w - img_w)*0.5, (screen_h - img_h)*0.5, img_w, img_h);

    }
    setStatus();
    
}
//设置状态
function setStatus(){
    if(_status==_type.PLAY){
        // _status = _type.PAUSE;
        _currentFrame++;
        if(_config.autoPlay){
            if(_currentFrame>_totalFrame){
                _currentFrame = 0;
            }
        }else{
            if(_currentFrame>_totalFrame){
                _status = _type.PAUSE;
                _onComplate();
            }
        }
    }else if(_status==_type.REVERSE){
        _currentFrame--;
        if(_config.autoPlay){
            if(_currentFrame<0){
                _currentFrame = _totalFrame;
            }
        }else{
            if(_currentFrame<0){
                _status = _type.PAUSE;
                _onComplate();
            }
        }
    }else if(_status==_type.LOOP){
        _currentFrame++;
        if(_currentFrame<_loop.start){
            _currentFrame = _loop.start 
        }
        if(_currentFrame>_loop.end){
            _currentFrame =_loop.start;
        }
    }else if(_status==_type.YOYOLOOP){
        _currentFrame--;
        if(_currentFrame<_loop.start){
            _currentFrame = _loop.end 
        }
        if(_currentFrame>_loop.end){
            _currentFrame =_loop.end;
        }
    }else if(_status==_type.PLAYTO){
        _currentFrame++;
        if(_currentFrame>_playTo){
            _status = _type.PAUSE;
            _onComplate();
        }
    }else if(_status==_type.YOYOPLAYTO){
        _currentFrame--;
        if(_currentFrame<_playTo){
            _status = _type.PAUSE;
            _onComplate();
        }
    }
}
class sequenceFrames{
    /**
     *Creates an instance of sequenceFrames.
     * @param {String} id - 需要传入的
     * @param {Array} url - 图片地址列表
     * @param {*} w - canvas宽度
     * @param {*} h - canvas 高度
     * @param {*} {complate,end}
     * @memberof sequenceFrames
     */
    constructor(id,url,w=100,h=100,opts={}){
        _config = Object.assign(_config,opts);
        _interval = 1000/_config.fps;
        _currentFrame = _config.homePage;
        let cont = document.querySelector('#'+id)
        _canvas.width = w;
        _canvas.height = h;
        cont.appendChild(_canvas);
        //设置总帧数
        _config._url = url;
        _totalFrame = url.length;
        // console.log(_config);
        loadImgs(url);
        
    }
    /**
     *停止播放
     *
     */
    stop(){
        _status = _type.PAUSE;
        _currentFrame = 0;
    }
    /**
     *暂停播放
     *
     */
    pause(){
        _status = _type.PAUSE;
    }
    /**
     *播放序列帧
     *
     */
    play(){
        _status=_type.PLAY;
        tick();
        // draw ();
    }
    /**
     *下一帧
     *
     */
    nextFrame(){
        if(_currentFrame<_totalFrame){
            _currentFrame++;
        }else{
            _currentFrame=0;
        }
        draw();
    }
    /**
     *上一帧
     *
     */
    prevFrame(){
        if(_currentFrame>0){
            _currentFrame--;
        }else{
            _currentFrame=_totalFrame;
        }
        draw();
    }
    /**
     *倒播
     *
     */
    reverse(){
        _currentFrame= _totalFrame;
        _status=_type.REVERSE;
        tick();
    }
    /**
     *从某帧开始播放
     *
     * @param {number} n -帧数
     */
    gotoAndPlay(n){
        _currentFrame = n;
        this.play();
    }
    /**
     *停止到某一帧
     *
     * @param {number} n -帧数
     */
    gotoAndStop(n){
        _currentFrame = n;
        draw();
    }
    /**
     *获取当前帧
     *
     * @returns -返回当前帧
     */
    currentFrame(){
        return _currentFrame;
    }
    /**
     *设置循环帧
     *
     * @param {*} start
     * @param {*} end
     */
    loop(start,end,yoyo=false){
        if(yoyo){
            _status = _type.YOYOLOOP;
        }else{
            _status = _type.LOOP;
        }
        if(start<0) start = 0;
        if(start>_totalFrame) start = _totalFrame;
        _loop.start = start;
        _loop.end = end;
        tick();

    }
    /**
     *播放到某一帧
     *
     * @param {*} n
     */
    playTo(n){
        _playTo = n;
        if(_currentFrame<n){
            _status = _type.PLAYTO;
        }else{
            _status = _type.YOYOPLAYTO;
        }
        tick();
    }

    
}
export default sequenceFrames;