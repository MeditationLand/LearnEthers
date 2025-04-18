# LearnEthers

我的Ethers.js学习笔记。

## 如何运行代码案例？

首先确保安装了Node.js。如果这里没有显示版本信息，请根据[官网](https://nodejs.org/en)指示自行安装。
```bash
npm -v
node -v
```

然后安装一些依赖的软件包
```bash
npm init -y

# 完成后，把 package.json 中的 "type" 属性改为 "module"

npm install --save ethers
npm install dotenv
```

在项目根目录创建`.env`文件，写入配置
```
ALCHEMY_HTTP_KEY=你的ALCHEMY RPC URL

PRIVATE_KEY=你的钱包私钥
```

RPC URL需要去[Alchemy](https://www.alchemy.com/)官网注册账号，申请一个（免费的）

配置完成后就可以在项目根目录直接运行程序，如
```bash
node 1_HelloEthers.js
```