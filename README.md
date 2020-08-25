[![NPM](https://nodei.co/npm/sequence-frames.png?compact=true)]

# SequenceFrames
这是一个图片序列帧播放项目，通过js能够实现图片的顺序播放，循环播放。

This is a picture frame sequence of play items, the order can be achieved by js picture playback, loop playback.

NPM

>npm i sequence-frames


使用方法：
```html
<div id="mycanvas" width=1000 height=562></div>
<script>
var sf
function slFun(){
	var arr =['img1.jpg','img2.jpg','img3.jpg']
	sf = new SequenceFrames("mycanvas",arr,1000,562,{autoPlay:true,fps:10,onLoaded:()=>{
		sf.play();
	}});
}
slFun();
</script>
```
>SequenceFrames(id,array,width,height,{fps:30,autoPlay:true,homePage:10,onLoaded=>{},onComplate:()=>{}})
----
#### SequenceFrames初始化参数
----
| 属性 | 说明 |
|---|---|
| id| 装载div id | 
| array| 序列帧数组 | 
| width| canvas的宽 | 
| hieght| canvas的高 | 
| autoPlay| true/false 设置自动播放 | 
| fps| number 设置帧率 | 
| homePage| number 设置第一帧 | 
| onLoaded| function 图片加载完毕 | 
| onComplate| function 播放完毕 | 

----
#### SequenceFrames可用方法
----
| 方法 | 说明 | 示例|
|---|---|---|
| play() | 顺序播放 | sf.play()|
| pause() | 暂停播放 | sf.pause()|
| stop() | 停止播放，回到第一帧 | sf.stop()|
| reverse() | 倒序播放 | sf.reverse()|
| nextFrame() | 向后播放一帧 | sf.nextFrame();|
| prevFrame() | 向前播放一帧 | sf.prevFrame(); |
| setLoop(int,int) | 设置循环帧 |sf.setLoop(10,20)|
| gotoAndPlay(int) | 从第n帧开始播放 | sf.gotoAndPlay(10)|
| gotoAndStop(int) | 停止到第n帧 | sf.gotoAndStop(10)|
| loop() | 循环播放 | sf.loop(10,20,yoyo);yoyo=true/false //正循环和倒循环|
| playTo(int) | 播放并停止到某帧 | sf.playTo(20)|


[demo](http://002301.github.io/SequenceFrames/)

