// // alert("123213","123213")
// engines.execScriptFile("test.js");
// exit()
// // alert("666")
// // exit()

// var p=console.log;
// // if(confirm("问题检测","喵币数量未变化，是否为您停止任务？")){
// // 	alert("已正常停止")
// // 	exit()
// // }
// // exit()
// function pp(data,offset,size){
// 	var p=console.log;
// 	for(var i=offset;i<offset+size;i++){
// 		sleep(10);
// 		if(i>=data.length)return;
// 		p(data[i].id()+"|"+data[i].text()+"|"+data[i].desc()+"|"+data[i].className());
// 	}
// }
// pp(packageName("com.taobao.taobao").find(),0,500);
// exit()
// var Package="com.taobao.taobao"
// var chfn=function(fn,timeout){
// 	if(!timeout)timeout=10000//10s
// 	var i=0;
// 	while(1){
// 		var result=fn()
// 		if(result){
// 			return result;
// 		}else{
// 			sleep(500);
// 			if(i++>(timeout/500)){
// 				toast("任务步骤超时，请重新运行！");
// 				// sleep(1000);
// 				// throw "";
// 				throw "";
// 			}
// 		}
// 	}
// }
// var getMyCoin=function(){
// 	if(text("累计任务奖励").findOnce()){
// 		if(text("关闭").findOnce()){
// 			text("关闭").findOnce().click()
// 			chfn(function(){
// 				return text("赚喵币").findOnce()
// 			})
// 			var coin=getMyCoin()
// 			text("赚喵币").findOnce().click()
// 			chfn(function(){
// 				return text("累计任务奖励").findOnce()
// 			})
// 			return coin
// 		}
// 	}else if(text("赚喵币").findOnce()){
// 		if(textContains("我的喵币,").findOnce()){
// 			return parseInt(textContains("我的喵币,").findOnce().text().split("我的喵币,")[1])
// 		}
// 	}
// }


// console.log(getMyCoin())
// console.log(getMyCoin())
// console.log(getMyCoin())

// // text("我的猫，点击撸猫").findOnce().click()
// // pp(packageName("com.taobao.taobao").find(),0,500);
// // console.log()
// exit()

//仓库

var appVersion=3//app版本号
var storage = storages.create("https://github.com/chrrg/oneClickHub");
if(!storage.get("readme")){
	alert("欢迎使用","本软件可以一键自动完成各种任务\n运行需要启用无障碍服务！\n若失效请关闭无障碍服务再开启，或者重启手机！\n若闪退请卸载重装！");
	alert("启用无障碍服务","请在接下来弹出来的界面中启用本软件的无障碍服务")
	auto.waitFor();
	storage.put("readme",new Date().getTime())
}else{
	toast("欢迎使用一点仓库！运行需要启用无障碍服务！\n若失效请关闭无障碍服务再开启，或者重启手机！\n若闪退请卸载重装！");
}
var officialHub="https://chrrg.github.io/chhub/"//官方仓库地址
var curHub=storage.get("myHub")//当前使用的仓库
var isOfficalHub=function(){return curHub==officialHub}
if(!curHub){curHub=officialHub;storage.put("myHub",curHub)}
var ifUnOfficialThenNoticeSwitch=function(text){if(!isOfficalHub()){if(confirm("温馨提醒",text)){curHub=officialHub;storage.put("myHub",curHub)}}}
ifUnOfficialThenNoticeSwitch("您正在使用非官方仓库："+curHub+"\n是否为您切换回官方仓库？")
// if(!isOfficalHub()){
// 	curHub=officialHub;
// }
var getRemoteCode=function(url,fn){
	try{
		var r = http.get(url, {},function(res,err){
			try{
				if(err){console.error(err);return;}
				if(res.statusCode != 200){toast("请求失败: " + res.statusCode + " " + res.statusMessage);throw "";}//网络错误
				fn(res)
			}catch(e){fn(null)}
		});
	}catch(e){toast("系统出错！")}
}
//response转各种类型
var responseToString=function(response){return res.body.string()}
var responseToJson=function(response){return res.body.json()}
//获取仓库的json数据
var getHubData=function(fn){getRemoteCode(curHub+"hub.json?appVersion="+appVersion,function(response){if(!response)fn(null);var res=responseToJson(response);fn(res)})}
auto.waitFor();
var loading=engines.execScriptFile("loading.js");


var initUserFace=function(fn){//初始化用户界面
	try{
		getHubData(function(response){
			try{
				if(!response)throw ""
		        if(response.code!=200){//规范 不为200就要提醒用户
		            toast(response.text);

		            throw "";
		        }else{
		        	if(response.data.list){
		        		var list=[];
			        	for(var i in response.data.list){
			        		var item=response.data.list[i]
			        		list.push(item.name)
			        		storage.put("item_"+item.name,item);
			        		/*
								{
						            "name": "2020双十一喵喵",
						            "file": "files/1.js",
						            "version": 1,
						            "desc": "修复"
						        }
			        		*/
			        		if(!storage.get("data_"+item.name)){
			        			storage.put("data_"+item.name,{
			        				"installTime":new Date().getTime(),//安装时间
			        				"useCount":0,//使用次数
			        				"useLast":0,//上次使用时间
			        				"currentVersion":"",//当前版本号
			        			});
			        		}
			        	}
			        	storage.put("list",list);
			        }
			        if(response.data.ui){
		        		
		        	}
		        }
		    }catch(e){
		    	ifUnOfficialThenNoticeSwitch("仓库："+curHub+"请求失败\n是否为您切换回官方仓库？");
		    }
	    })
	}catch(e){return false}
	// engines.execScriptFile("ui.js")
	return true;
}
while(1){
	var result=initUserFace()
	if(!result){
		if(curHub!=officialHub){
			if(confirm("温馨提醒","请求仓库"+curHub+"失败\n是否为您切换回官方仓库并重试")){
				curHub=officialHub

				storage.put("myHub",curHub)
			}
		}else{
			toast("网络异常，请稍后再试！")
			exit()
		}
	}else{
		setTimeout(function(){
			loading.getEngine().forceStop()
		},1000)
	}
}

setTimeout(function(){
	
},100)