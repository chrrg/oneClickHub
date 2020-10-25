toast("开始任务");
if(typeof api==="undefined")toast("一点仓库有更新了！快更新吧！");
device.keepScreenOn(3600 * 1000);
device.keepScreenDim(3600 * 1000)
// try {requiresApi(24);}catch (error){toast('需要在Android 7.0以上版本运行');throw "";}
auto.waitFor();
var Package="com.taobao.taobao"
var chfn=function(fn,timeout){
	if(!timeout)timeout=10000//10s
	var i=0;
	while(1){
		var result=fn()
		if(result){
			return result;
		}else{
			sleep(500);
			if(i++>(timeout/500)){
				toast("任务步骤超时，请重新运行！");
				// sleep(1000);
				// throw "";
				throw "";
			}
		}
	}
}
var p=console.log;
pp=function(data,offset,size){
	for(var i=offset;i<offset+size;i++){
		sleep(10);
		if(i>=data.length)return;
		p(data[i].id()+"|"+data[i].text()+"|"+data[i].desc()+"|"+data[i].className());
	}
}

var current=currentPackage()
if(!current||current==="com.android.systemui"){
	back();
	sleep(2000)
}
if(currentPackage()!==Package){
	//需要启动tb
	app.launch(Package)
	chfn(function(){
		return currentPackage()===Package
	})
	if(currentActivity()=="android.widget.FrameLayout"){
		chfn(function(){
			return desc("我的淘宝").findOnce()
		},20000);
	}
}
cur=currentActivity()
if(cur!="com.taobao.tao.TBMainActivity"&&cur!="com.taobao.browser.BrowserActivity"){
	back();
	sleep(1000);
}

var autoclick=function(arr){
	for(var i=0;i<arr.length;i++){
		var result=arr[i]();
		if(result){
			for(var j=i;j>=0;j--){
				chfn(arr[j]).click()
			}
			return;
		}
	}
}
var getMyCoin=function(){
	if(text("累计任务奖励").findOnce()){
		if(text("关闭").findOnce()){
			text("关闭").findOnce().click()
			chfn(function(){
				return text("赚喵币").findOnce()
			})
			var coin=getMyCoin()
			return coin
		}
	}else if(text("赚喵币").findOnce()){
		if(textContains("我的喵币,").findOnce()){
			return parseInt(textContains("我的喵币,").findOnce().text().split("我的喵币,")[1])
		}
	}
}

if(cur!="com.taobao.browser.BrowserActivity"||!text("累计任务奖励").findOnce()){
	autoclick([function(){
		return desc("养猫分20亿").findOnce()
	},function(){
		return desc("我的淘宝").findOnce()
	}])
}
if(text("累计任务奖励").findOnce()){
	if(text("关闭").findOnce()){
		text("关闭").findOnce().click()
		chfn(function(){
			return text("赚喵币").findOnce()
		})
	}
}
chfn(function(){
	return text("赚喵币").findOnce()
})
sleep(1000)
var oldCoin=getMyCoin()
var hisCoin=oldCoin
var startTime=new Date().getTime()
toast("现在您有"+oldCoin+"喵币\n现在开始撸猫！")
chfn(function(){
	return text("我的猫，点击撸猫").findOnce()
})
while(1){
	var obj=text("我的猫，点击撸猫").findOnce()
	if(obj){
		obj.click()
		sleep(100+Math.random()*100)
		coin=getMyCoin()
		
		if(new Date().getTime()-startTime>20000){
			startTime=new Date().getTime()
			if(coin==oldCoin){
				device.vibrate(1000)
				if(coin-hisCoin>0){
					toast("任务完成:喵币没变化了，共增加"+(coin-hisCoin)+"喵币！")
				}else{
					toast("任务完成:喵币没变化，任务结束！")
				}
				exit()
			}
			oldCoin=coin
		}
		
	}else{
		device.vibrate(200)
		toast("猫跑丢了，任务停止！")
		exit()
	}
}