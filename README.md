<p align="center"><font size="7">oneClickHub 一点仓库</font></p>
<p align="center">一点仓库是在Android系统上运行，基于Auto.js无障碍服务的脚本仓库</p>
<p align="center">用户能使用开发者上传的脚本完成双十一任务、打卡等各种操作</p>
<p align="center">脚本基于仓库自动更新，免去频繁更新app的烦恼</p>


# oneClickHub
一点仓库  

# 导航
- **[关于本项目](#about)**
- **[如何使用](#howtouse)**
- **[如何开发你的脚本](#develop)**
- **[如何上传你的脚本](#jump)**
- **[如何查看其它脚本](#jump2)**
- **[脚本安全](#jump3)**
- **[Api](#api)**
- **[搭建自己的仓库](#myHub)**
- **[免责声明](#free)**


# <span id="about">关于本项目：</span>
本项目致力于开发`Autojs`脚本仓库  
用户无需频繁更新app可使用到最新发布的脚本  
本软件完全开源共享  
本项目源码在https://github.com/chrrg/chrrg.github.io/  
本项目将长期维护  

# <span id="howtouse">如何使用：</span>
硬件要求：  
Android设备（需带有无障碍服务功能）  
若涉及到触摸点击功能需使用`Android7.0`以上设备  
软件要求：  
本App可以在本项目的`release`中下载  
安装并运行即可  

# <span id="develop">如何开发你的脚本：</span>
准备环境：
NodeJS  
Win/Linux/Mac均可

clone以下项目：  
https://github.com/chrrg/autojs_extension  
修改/out/vscode.js里的21行的路径为你fork的chhub文件夹  
如以下修改：
```js
exports.workspace={
    workspaceFolders:'D:/文档/GitHub/chrrg.github.io/chhub'//工作目录需要在这里修改
};
```

打开命令行控制台切换目录到/out/  
运行node run即可运行  

手机安装AutoJs 4.1.1  
打开后侧边栏连接电脑  
输入电脑的IP  

在控制台键入r回车即可运行项目q结束运行  

调试方法：  
修改main.js  
在第一行输入  
runTest(1);exit();//1改为自己的脚本文件名
电脑上键入r并回车可以立即在手机上运行/files/1.js脚本  
支持console.log显示到电脑端  
开发细节或api请仔细阅读AutoJS开发文档：https://hyb1996.github.io/AutoJs-Docs/  

# <span id="jump">如何上传你的脚本：</span>
上传脚本到默认仓库：  
## 注意：
请勿在本页面提交PR！  
默认仓库使用 `github.io` 来获取仓库数据  
上传脚本请提交到以下地址：  
`https://github.com/chrrg/chrrg.github.io`  
### 文件列表：  
- /chhub/files/   存放所有的脚本  
- /chhub/hub.json 仓库索引  
## fork上述项目
fork并按照格式修改hub.json  
并将你的脚本添加到/chhub/files/目录下  
每次修改代码hub.json版本号需要变动，否则用户不会收到更新
提交 `Pull Request`   
等待合并即可  

## 哪些情况的PR会被拒绝
修改了不允许修改的文件：`ui.js`  
未按照规定的格式修改了`hub.json`  
包含无用的文件或文件夹  
恶意行为的脚本  
修改他人上传的文件或配置  
加载第三方不可预测安全的代码  

## 关于脚本
每一个脚本仅对应一个js文件  
不支持引入其它文件  

# <span id="jump2">如何查看其它脚本：</span>
所有脚本均保存到 `https://github.com/chrrg/chrrg.github.io/` 中  
可以去上述链接找到脚本源文件  
应用启动时会首先获取 `https://chrrg.github.io/chhub/hub.json` 的数据  

# <span id="jump3">脚本安全：</span>
每一个app在独立的线程中  
并且有一定的隔离，不会相互修改数据  

# <span id="api">Api：</span>
## Api的作用
本软件会为每一个脚本封装一个独立的api对象  
在你的脚本中可直接使用api对象进行各种函数的调用  

## Api列表：  
### api.ui()

非ui线程下使用：  
api.ui()  
可在控制台查看当前界面的所有控件的基本属性  
**此函数在调试时非常有帮助**  

参数：(selector,offset,size)  
selector为选择器  
offset为起始索引，size为从起始值查询多少个元素  
最简单的调用方法为`api.ui()`

```js
api.ui(packageName(currentPackage()),0,500);
```

如果是UI线程需要创建线程才能运行阻塞函数，如：  
```js
threads.start(function () {
    api.ui()
});
```

### api.getId()
获取应用名

### api.getExtras()
获取启动时传入的参数


# <span id="myHub">搭建自己的仓库：</span>
官方仓库地址：`https://chrrg.github.io/chhub/hub.json`  
搭建自己的仓库能够让用户只显示自己仓库中的脚本  
## hub.json文件格式
```json
{
    "code": 200,//必须200，否则会弹出text消息
    "text": "",
    "data": {
        "HubRoot":"https://chrrg.github.io/chhub/hub.json",//当前地址
        "ui":["files/ui.js",9],//数组第一个元素为用户界面ui.js的相对路径，第二个元素是版本号，若界面发生变化修改版本号，用户会自动更新ui.js
        "list": [{
            "id":1,
            "name": "应用标题",
            "file": "files/1.js",//脚本的相对路径
            "version": "1.8.9",//脚本的版本
            "desc": "一键完成淘宝喵币任务"//描述
        }]//这里格式可以自定义
    }
}
```

## 创建自己的仓库
仓库地址可以是github.io的静态，也可以是任何返回后端制作的json的地址  
且api返回格式尽量与官方仓库返回格式保持一致  
需自行实现ui.js，让用户打开后看到自己仓库的用户界面  
ui.js中可扩展api提供给脚本使用  

## 引导用户使用自己的仓库
用户第一次打开软件默认使用官方仓库地址  
创建引导脚本，脚本中调用设置仓库地址的Api  
```js
api.setHubPath("http://127.0.0.1/myhub.asp")//设置成功将重启软件
toast("设置失败！")//否则说明设置失败
```
上传自己的引导应用到官方仓库  
用户打开此仓库完成确认后即可完成仓库地址的切换  


# <span id="free">免责声明：</span>
  由于所有人可上传自己的脚本  
  并且脚本具有动态可变性  
  不能保证脚本100%安全  
  若出现任何损失，本人概不负责  

