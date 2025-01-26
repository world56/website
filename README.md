<p align="center">
  <a href="https://devtt.com">
    <img width="72" src="https://raw.githubusercontent.com/world56/static/main/website/icon.svg">
  </a>
</p>

<h1 align="center">Personal Website</h1>

<p align="center">快速、简约风格的个人主页</p >

![Home](https://raw.githubusercontent.com/world56/static/main/website/1.png)

## ✨ 技术栈

- 🍔 **Next.JS** (App Router)
- 🥪 **TypeScript**
- 🧑‍🎨 **Tailwind CSS** (shadcn/ui)
- 🍟 **Prisma** (MySQL)

## 💡 亮点

- 📱 **适配移动端设备**  
  响应式布局，支持低分辨率设备访问

- 🌗 **支持浅色、深色主题**  
  根据系统设置，自动调整白日、夜间皮肤

- 🌏 **SEO**  
  深度实践，支持各大搜索引擎[SEO](https://github.com/world56/static/tree/main/website#-seo%E6%95%88%E6%9E%9C%E9%A2%84%E8%A7%88)

- 🥯 **增量渲染**  
  采用 SSG、ISR 渲染，极大提升渲染效率

- 📷 **资源压缩**  
  对上传的图片资源进行压缩，提升加载速度，减少空间占用

- 🧑‍🎨 **文本编辑**  
  支持且不限于：上传、表格、音频、视频、iframe、多种编程语言代码示例

- 🙋‍♂️ **后台管理**  
  网站信息、个人信息编辑，内容管理、留言管理、静态资源管理等[相关功能](https://github.com/world56/static/tree/main/website#-%E6%95%88%E6%9E%9C%E5%9B%BE%E9%A2%84%E8%A7%88)

- 🤩 **访客日志**  
  访客日志功能，帮助您了解访客的访问频率。

- 🐳 **Docker**  
  支持 docker 多个镜像源，一键部署，降低心智负担

## 👮 环境变量 Environment

```bash
# MYSQL地址
DATABASE_URL = mysql://root:pwd@localhost:3306/website

# 系统密钥（必填）
SECRET = your_key
```

## 👷 本地开发 Development

```bash
# 注：npx prisma 相关命令仅需执行一次即可，它的作用是生成Prisma客户端以及创建、关联数据库表
$ git clone https://github.com/world56/website.git
$ cd website
$ npm install
$ npx prisma generate
$ npx prisma db push
$ npm run dev
```

## 🧑‍💼 生产部署 Production

### 🐳 Docker

#### 1.拉取镜像

```bash
# 官方源
$ docker pull world56/website
# 阿里云源
$ docker pull registry.cn-hangzhou.aliyuncs.com/world56/website
```

#### 2.启动容器

```bash
# 静态资源托管在/app/resource目录，请绑定数据卷（-v），防止资源丢失。
$ docker run -d -p 8001:3000 -e DATABASE_URL=mysql://root:mysql:3306/website -e SECRET=your_key -v ~/app/website/resource:/app/resource world56/website
```

---

### 🕷️PM2

<p><a href='https://github.com/Unitech/pm2'>PM2</a >是NodeJS应用生产环境进程管理器，可在生产环境中管理并维持Node应用运行。</p >

<p><b>构建准备</b>：NodeJS版本号<b>v20.9.0</b>，配置<b>.env</b>相关变量，全局安装 <a href='https://github.com/Unitech/pm2'><b>PM2</b></a >。</p >

<p><b>警告‼️</b>：resource 目录用于托管静态资源，<b>构建时，会先删除之前的build目录，在生成新的build目录，这会导致build目录下的resource目录重新生成</b>。若您要坚持自己手动部署，可先在本地构建，然后在上传服务器部署。</p >

```bash
# 1.生成 Prisma Client（仅需执行一次）
$ npx prisma generate

# 2.创建、关联数据库表（仅需执行一次）
$ npx prisma db push

# 3.编译构建
$ npm run build

# 4.打开build文件夹（编译后的输出文件）
$ cd build

# 5.通过pm2启动并托管
$ pm2 start pm2.json

# 6.查看pm2托管应用存活状态
$ pm2 ls
```

---

### 🙋‍♂️ 关于 Nginx

<p>若使用 Nginx 进行代理，请<b>务必添加下列参数</b>。</p >

```bash

server {
 ...
 location / {
  proxy_set_header X-Real-IP $remote_addr; # “访问日志”功能
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # “访问日志”功能
  proxy_pass http://127.0.0.1:8001;  # website服务端口
 }

 location /api/auth/upload {
  client_max_body_size 32M; # “上传资源”功能
  proxy_pass http://127.0.0.1:8001; # website服务端口
 }
}

```

## 🔍 访问地址（例）

<p>普通访客：<a href="http://127.0.0.1:3000">http://127.0.0.1:3000</a ></p >
<p>后台管理：<a href="http://127.0.0.1:3000/signin">http://127.0.0.1:3000/signin</a >  (首次使用需要注册管理员) </p >

## 📷 效果图预览

[更多细节图，点击查看](https://github.com/world56/static/tree/main/website#-%E6%95%88%E6%9E%9C%E5%9B%BE%E9%A2%84%E8%A7%88)

## 🙏 特别鸣谢 Special Thanks

本项目 UI 灵感来源于[@codewithsadee](https://github.com/codewithsadee)，和他优秀的开源项目 [vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio)，感谢他的付出与开源精神。  
The UI inspiration for this project come from [@codewithsadee](https://github.com/codewithsadee) and his outstanding open-source project [vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio). Grateful for his dedication and open-source spirit.
