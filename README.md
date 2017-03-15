# gallery-by-react
a photo gallery project based on react
基于ReactJS构架的图片画廊应用

项目搭建

首先此项目依赖nodejs，所以要先装node的环境,可去nodejs官网自行下载安装.

首先安装脚手架工具yeoman npm install -g yo yo —version 可查安装版本

接下来安装webpack

npm install -g generator-react-webpack

由于国外镜像，国内有时候下载慢或者下载不了，可以换成国内淘宝镜像。


创建项目

yo react-webpack gallery-by-react

editconfig：主要是统一不同编辑器的编码风格  //需要ide安装支持editconfig的插件

yo-rc.json: yeoman的配置文件

karma.config.js: karma测试框架配置文件

webpack.config.js: webpack开发配置文件

package.json: node js开发配置文件

lint hint: js es检测工具



项目启动

npm start
