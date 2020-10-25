# oneClickHub
概述：一个apk，自动完成双十一任务、打卡等脚本，并且可自动更新  

# 导航
[关于本项目](#about)  
[如何上传你的脚本](#jump)  
[如何查看其它脚本](#jump2)  
[脚本安全](#jump3)  
[Api](#jump4)  
[搭建自己的仓库](#myHub)  
[免责声明](#free)  


# <span id="about">关于本项目：</span>
本项目致力于开发Autojs脚本仓库  
用户无需频繁更新app可使用到最新发布的脚本  
本软件完全开源共享  


# <span id="jump">如何上传你的脚本：</span>
默认仓库使用github.io来获取仓库数据  
https://github.com/chrrg/chrrg.github.io/  
找到chhub文件夹  
/chhub/files/   存放所有的脚本  
/chhub/hub.json 仓库索引  
首先将项目clone下来  
修改hub.json  
并将你的脚本添加到/chhub/files/目录下  
提交Pull Request  
等待合并即可  

<span id="jump2">如何查看其它脚本：</span>
所有脚本均保存到
https://github.com/chrrg/chrrg.github.io/
中
应用启动时会首先获取https://chrrg.github.io/chhub/hub.json的数据
<span id="jump3">如何查看其它脚本：</span>
<span id="jump4">如何查看其它脚本：</span>

# <span id="myHub">搭建自己的仓库：</span>
官方仓库地址：https://chrrg.github.io/chhub/hub.json
搭建自己的仓库能够让用户只显示自己仓库中的脚本  
## 发布自己的仓库
仓库地址可以是github.io的静态
返回格式需与官方仓库地址返回格式一致
## 引导用户使用自己的仓库
用户第一次使用默认使用官方仓库地址  
先上传自己的引导应用  
应用中调用提供的api  
用户确认后即可完成仓库地址的切换  

<span id="free">免责声明：</span>
由于所有人可上传自己的脚本  
并且脚本上传后具有动态可变性
不能保证脚本100%安全  
若出现任何损失，本人概不负责  


