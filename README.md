<p align="center">
  <a href="https://devtt.com">
    <img width="72" src="https://raw.githubusercontent.com/world56/static/main/website/icon.svg">
  </a>
</p>

<h1 align="center">Website</h1>

<p align="center">一款极简风格的个人主页</p>

![Home](https://raw.githubusercontent.com/world56/static/main/website/1.png)

## ✨ 主要技术栈

- 🍔 **Next.JS**  <span style="font-size: 13px;color: gray;">(App Router)</span>
- 🥯 **ISR**  <span style="font-size: 13px;color: gray;">(On-demand Revalidation)</span>
- 🥪 **TypeScript**
- 🧑‍🎨 **Tailwind CSS**  <span style="font-size: 13px;color: gray;">(shadcn/ui)</span>
- 🍟 **Prisma**  <span style="font-size: 13px;color: gray;">(MySQL)</span>
- 🐳 **Docker**


## 👮 环境变量 Environment

```bash
# MYSQL地址，可自行指定数据库名，这里用的是website
DATABASE_URL = mysql://root:xxx@@localhost:3306/website

# JWT 密钥
SECRET = xxx
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

<p><b>拉取镜像：</b>国内用户，可将<b>world56/website</b>替换为阿里云源<b> registry.cn-hangzhou.aliyuncs.com/world56/website </b></p>
<p><b>静态资源：</b>静态资源托管在/app/resource目录，建议绑定数据卷（-v），防止意外丢失。</p>

#### 1.拉取镜像

```bash
$ docker pull world56/website
```

#### 2.启动容器

```bash
$ docker run -d -p 3000:3000 -e DATABASE_URL=mysql://root:mysql:3306/website -e SECRET=text -v ~/app/website/resource:/app/resource world56/website
```


### 🕷️PM2

<p><a href='https://github.com/Unitech/pm2'>PM2</a>是NodeJS应用生产环境进程管理器，可在生产环境中管理并维持Node应用运行。</p>

<p><b>环境准备</b>：默认宿主机<b>NodeJS版本号v20.9.0</b>，且已全局安装 <a href='https://github.com/Unitech/pm2'><b>PM2</b></a>。</p>

<p><b>环境变量</b>：根目录<b>.env</b>文件是环境变量配置文件，编译前应提前正确配置。</p>

<p><b>静态资源</b>：应用<b>构建</b>时会创建<b>resource目录</b>，负责<b>托管静态资源</b>，手动部署请注意resource目录不要被删除、覆盖等情况，防止资源丢失。</p>

```bash
# 1.生成 Prisma Client（仅需执行一次）
$ npx prisma generate

# 2.创建、关联数据库表（仅需执行一次）
$ npx prisma db push

# 3.编译构建 (https://nextjs.org/docs/app/api-reference/next-config-js/output)
$ npm run build:pm2

# 4.打开standalone文件夹（编译后的输出文件）
$ cd standalone

# 5.通过pm2启动并托管
$ pm2 start pm2.json

# 6.查看pm2托管应用存活状态
$ pm2 ls
```


## 🔍 访问地址（例）
<p>普通访客：<a href="http://127.0.0.1:3000">http://127.0.0.1:3000</a></p>
<p>后台管理：<a href="http://127.0.0.1:3000/signin">http://127.0.0.1:3000/signin</a>  (首次使用需要注册) </p>


## 📷 效果图预览

<img width="1000" style="border-radius:20px"  src="https://raw.githubusercontent.com/world56/static/main/website/1.png" alt="个人主页">

<img width="1000" style="border-radius:20px"  src="https://raw.githubusercontent.com/world56/static/main/website/2.png" alt="个人主页">

<img width="1000" style="border-radius:20px"  src="https://raw.githubusercontent.com/world56/static/main/website/0.png" alt="个人主页">

<img width="1000" style="border-radius:20px"  src="https://raw.githubusercontent.com/world56/static/main/website/3.png" alt="个人主页">

<img width="1000" style="border-radius:20px"  src="https://raw.githubusercontent.com/world56/static/main/website/4.png" alt="个人主页">

<img width="1000" style="border-radius:20px"  src="https://raw.githubusercontent.com/world56/static/main/website/5.png" alt="个人主页">

<img width="1000" style="border-radius:20px"  src="https://raw.githubusercontent.com/world56/static/main/website/6.png" alt="个人主页">


## 🙏 特别鸣谢 Special Thanks

本项目 UI 灵感来源于[@codewithsadee](https://github.com/codewithsadee)，和他优秀的开源项目 [vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio)，感谢他的付出与开源精神。  
The UI inspiration for this project come from [@codewithsadee](https://github.com/codewithsadee) and his outstanding open-source project [vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio). Grateful for his dedication and open-source spirit.
