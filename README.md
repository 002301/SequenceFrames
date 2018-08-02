# SequenceFrames
这是一个图片序列帧播放项目，通过js能够实现图片的顺序播放，循环播放。

This is a picture frame sequence of play items, the order can be achieved by js picture playback, loop playback.


使用方法：
'''html
<canvas id="mycanvas" width=1000 height=562></canvas>
<script>

	var sf
	function slFun(){
		var arr =['img1.jpg','img2.jpg','img3.jpg']
		sf = new SequenceFrames("mycanvas",arr,function(){console.log('加载完成');sf.play()});
		//sf.setInterval(120);//
	}
	slFun();
</script>

'''
| 属性 | 说明 | 示例|
|---|---|---|
| play() | 顺序播放 | sf.play()|
| reverse() | 倒序播放 | sf.reverse()|
| stop() | 停止播放 | sf.stop()|
| setLoop(int,int) | 设置循环帧 |sf.setLoop(10,20)|
| next() | 向后播放一帧 | sf.next();|
| prev() | 向前播放一帧 | sf.prev(); |
| gotoAndPlay(int) | 从第n帧开始播放 | sf.gotoAndPlay(10)|
| gotoAndStop(int) | 停止到第n帧 | sf.gotoAndStop(10)|
| nextFrame() | 循环正转 | sf.nextFrame()|
| prevFrame() | 倒转循环 | sf.prevFrame()|
| currentFrame() | 获取当前帧 | sf.currentFrame()|
| nextFrameStop(int,function) | 向后播放并停止到某帧 | sf.nextFrameStop(20,onEndFunction)|
| prevFrameStop(int,function) | 向前播放并停止到某帧 | sf.prevFrameStop(10,onEndFunction)|
| setInterval(int) | 设置播放间隔时间（毫秒） | sf.setInterval(30) |


[demo](http://002301.github.io/SequenceFrames/)


## SequenceFrames 0.3.3

- 修改play()为正向播放1次
- 添加到播1次reverse()

## SequenceFrames 0.3.2
- 修改了png图片序列帧问题
- 修改了用png图片播放序列帧时没有清空画面的问题

## SequenceFrames 0.3.1 
- 添加了
 - nextFrameStop 向前播放到某帧
 - prevFrameStop 向后播放到某帧
 - currentFrame  获取当前帧
- 修改了图片传入方式
- SequenceFrames(id,url,complate,end)
- 构建函数参数调整为4个
- id：为canvas的id
- url：为序列帧地址数组
- complate：加载完毕
- end：播放完毕

## SequenceFrames 0.2
- 添加了触摸屏支持