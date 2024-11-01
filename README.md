<p align="center">
  <img src="./public/logo.png" width="50px" />
</p>

<p align="center">
  <span style="color: #0a69f5">知行博客</span>
</p>

[博客预览](https://zxctb.top:8080) 

![zxblog.png](https://github.com/xtthaop/image-lib/blob/master/zxnote/zxblog.png?raw=true)

![zxblog.note.png](https://github.com/xtthaop/image-lib/blob/master/zxnote/zxblog.note.png?raw=true)

### 简介

展示[知行笔记内容管理系统](https://github.com/xtthaop/zxnote-web)所发布的笔记；  
支持调用微信平台接口将笔记分享给微信好友；  
接入百度统计可在百度统计平台查看访问数据；  
支持显示赞赏码获取内容创作收入；  
……

### 快速开始

node v18.17.0  
pnpm v8.10.2

**初始化安装依赖**

```
pnpm install
```

**在开发环境运行**

```
pnpm run dev
```

**打包到生产环境**

```
pnpm run build
```

生产环境可安装 pm2 管理运行服务

```
npm install pm2 -g
pm2 start ecosystem.config.cjs
```

### 关于作者

知行博客的作者是一名前端小学生，水平不高，文档或者代码中如有不当之处还请指正。

联系我：chentao231205@163.com

### 成为赞助者

<img src="https://github.com/xtthaop/image-lib/blob/master/comodo-admin/sponsor.png?raw=true" width="300px" />

维护这个项目需要一定的服务器费用用作项目预览，还需要消耗我本人一定的精力，所以如果这个项目帮助到你的话，请多多予以支持！感谢！

### 许可证

[MIT](LICENSE.md)
