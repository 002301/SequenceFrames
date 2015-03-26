# SequenceFrames
这是一个图片序列帧播放项目，通过js能够实现图片的顺序播放，循环播放。
This is a picture frame sequence of play items, the order can be achieved by js picture playback, loop playback.

---------------------------------------------------------------
//引入库
<script src="SequenceFrames.js"></script>
//添加到<body>里面
<canvas id="mycanvas" width=1000 height=562></canvas>
<script>
	var sf = new SequenceFrames("mycanvas","images",29);
</script>

---------------------------------------------------------------
可以实现以下操作
sf.play()//播放
sf.stop()//停止
sf.gotoAndPlay(10)//从第10张播放
sf.gotoAndStop(10)//停止到第10张图片
sf.loop(5,10)//循环播放5～10张图片

demo：http://www.airmn.com/SequenceFrames/demo/
