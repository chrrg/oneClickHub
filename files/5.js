var width=device.width
var height=device.height
alert("欢迎使用屏幕连点器！","您的设备分辨率为\nx:"+width+",y:"+height+"\n注：屏幕左上角为0点\n横轴x、纵轴y\n如果不确定坐标可以打开开发者选项的指针位置")
var x = rawInput("请输入需要连点的X坐标", width);
if(!x)exit()
var y = rawInput("请输入需要连点的Y坐标", height);
if(!y)exit()
var duration = rawInput("请输入点击间隔(ms)", 1000);

if(!confirm("最后确认","确认5秒后开始执行吗？\nx:"+x+",y:"+y+" 间隔:"+duration+"\n切换应用或按音量减可停止任务！"))exit()
toast("5秒后自动开始点击("+x+","+y+")")
sleep(5000)
var current=currentPackage()
while(1){
	sleep(duration+Math.random()*2);
	press(x,y,1);
	if(current!=currentPackage()){
		toast("检测到切换应用，已为您停止执行！")
		exit()
	}
}