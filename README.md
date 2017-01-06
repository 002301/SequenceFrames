# SequenceFrames
这是一个图片序列帧播放项目，通过js能够实现图片的顺序播放，循环播放。
This is a picture frame sequence of play items, the order can be achieved by js picture playback, loop playback.

demo：http://002301.github.io/SequenceFrames/


SequenceFrames 0.3.3

修改play()为正向播放1次

添加到播1次
reverse()

SequenceFrames 0.3.2
修改了png图片序列帧问题
修改了用png图片播放序列帧时没有清空画面的问题
SequenceFrames 0.3.1 

添加了
nextFrameStop 向前播放到某帧
prevFrameStop 向后播放到某帧
currentFrame  获取当前帧

修改了图片传入方式
SequenceFrames(id,url,complate,end)
构建函数参数调整为4个
id：为canvas的id
url：为序列帧地址数组
complate：加载完毕
end：播放完毕

SequenceFrames 0.2
添加了触摸屏支持