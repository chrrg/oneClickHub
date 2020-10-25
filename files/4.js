var Package = 'com.alibaba.android.rimet';var p=console.log;auto.waitFor();
var company=id("com.alibaba.android.rimet:id/menu_current_company")
// p(currentActivity())
// pp(packageName(Package).find(),0,500);
// exit()
if(typeof api==="undefined"){
	alert("您的一点仓库过旧，部分功能暂不支持，请先升级！");
	exit();
}
var storage = storages.create("dingTalk");
var lastTime=parseInt(storage.get("time"));
if(lastTime){
	if(new Date(lastTime).toString().slice(0, 10)===new Date().toString().slice(0, 10)){
		if(!confirm("记录到"+getDateStr(lastTime)+"已经打过卡了，是否继续尝试呢？")){
			toast("已退出!");
			exit();
		}
	}
}
chfn(function(){
	var current=currentPackage()
	if(!current||current==="com.android.systemui"){
		back();
		sleep(2000)
		return false;
	}
	return true;
})

var launch=function(){
	if(currentPackage()!==Package){
		//需要启动tb
		app.launch(Package)
		chfn(function(){
			return currentPackage()===Package
		})
		// p(currentActivity())
		chfn(function(){
			if(currentActivity()!="android.widget.FrameLayout"){
				back()
				sleep(500)
				launch()
				return false
			}else return true
		},20000);
		// p(currentActivity())
	}
}
function getzf(num){
	if(parseInt(num) < 10)num = '0'+num;
	return num;
}
function getDateStr(sj){
    var now = new Date(sj)
    var year=now.getFullYear();    
    var month=getzf(now.getMonth()+1);    
    var date=getzf(now.getDate());    
    var hour=getzf(now.getHours());    
    var minute=getzf(now.getMinutes());    
    var second=getzf(now.getSeconds());    
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;    
}


launch()
if(currentActivity()!="android.widget.FrameLayout"){
	back()
}
chfn(function(){
	if(currentActivity()!="android.widget.FrameLayout"){
		back()
		sleep(500)
		launch()
		return false
	}else return true
},20000);
if(currentActivity()=="android.widget.FrameLayout"){
	chfn(function(){
		if(id("com.alibaba.android.rimet:id/btn_check_detail").findOnce()){
			id("com.alibaba.android.rimet:id/btn_check_detail").findOnce().click()
		}
		return desc("工作台").findOnce()
	},20000).click()
}

// p(currentActivity())
// pp(packageName(Package).find(),0,500);

// pp(packageName(Package).find(),0,500);
// exit();
if(!company.findOnce()&&desc("工作台").findOnce())desc("工作台").findOnce().click()
var companyTitle=chfn(function(){
	return company.findOnce()
},20000).text()
toast(companyTitle);
try{
	chfn(function(){
		if(text("学生健康打卡").findOnce()||desc("学生健康打卡").findOnce())return true;
		sleep(1000)
		swipe(500, 500, 505,450, 20)
		sleep(1000)
		return false; 
	},20000)
}catch(e){toast("未找到【学生健康打卡】，请确认是否存在或重试！");exit()}
sleep(100)
chfn(function(){
	return text("高校每日健康打卡（学生健康码）2.0").findOnce()||desc("高校每日健康打卡（学生健康码）2.0").findOnce()
},20000).click()
chfn(function(){
	return text("今天").findOnce()||desc("今天").findOnce()
},20000).click()

chfn(function(){
	if(text("修改").findOnce()||desc("修改").findOnce()){
		toast("您今天已经打过卡了！正在为您返回");
		var lastTime=parseInt(storage.get("time"));
		if(!lastTime||new Date(lastTime).toString().slice(0, 10)!==new Date().toString().slice(0, 10)){
			storage.put("time",new Date().getTime())
		}
		backdesktop();
		exit();
	}
	return text("当前位置").findOnce()||desc("当前位置").findOnce()
},20000).click()
sleep(1000)

chfn(function(){
	return text("获取").findOnce()||desc("获取").findOnce()
},20000).click()
toast("获取中")
chfn(function(){
	return text("地点微调").findOnce()||desc("地点微调").findOnce()
},20000)
chfn(function(){
	return text("提交").findOnce()||desc("提交").findOnce()
},20000).click()

chfn(function(){
	return textContains("你已成功提交高校每日健康打卡").findOnce()||descContains("你已成功提交高校每日健康打卡").findOnce()
},20000)
storage.put("time",new Date().getTime())//记录打卡时间
toast("打卡完成，即将返回！");
backdesktop();
function backdesktop(){
	chfn(function(){
		if(currentPackage()===Package){
			back()
			sleep(200)
			return false
		}else return true
	},20000);
	toast("任务完成！")
}
exit()
// desc("工作台").findOnce().click()
function pp(data,offset,size){
	var p=console.log;
	for(var i=offset;i<offset+size;i++){
		sleep(10);
		if(i>=data.length)return;
		p(data[i].id()+"|"+data[i].text()+"|"+data[i].desc()+"|"+data[i].className());
	}
}
pp(packageName(Package).find(),0,500);
exit();

function chfn(fn,timeout){
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



