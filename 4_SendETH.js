import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const httpProvider = new ethers.JsonRpcProvider(process.env.ALCHEMY_HTTP_KEY);

const privateKey = process.env.PRIVATE_KEY;

// 创建一个随机的钱包的方法
// const randomWallet = ethers.Wallet.createRandom();
// console.log(randomWallet.address);
// console.log(randomWallet.privateKey);
// console.log(randomWallet.mnemonic.phrase);


// 使用私钥创建钱包
// const tempPrivateKey = "0xcb27e1c1dae9cbf2d8f95710c734f7a5e091a58dada58e92023f9fbbb03896bd";
// const pkWallet = new ethers.Wallet(privateKey, httpProvider);

// 使用助记词创建钱包
// const walletPhrase = "palm zebra what strong census bottom north fog cherry cushion police silver";
// const phraseWallet = ethers.Wallet.fromPhrase(walletPhrase);

const wallet = new ethers.Wallet(privateKey, httpProvider);

const main = async () => {
    // 构造交易请求
    const tx = {
        to: "0x3B53a0e693869442091124B8177c6d688D74ff2e",
        value: ethers.parseEther("0.015")
        // 这里还能设置 gasPrice, gasLimit, nonce 等参数
    }

    // 发送交易，获取收据
    // 因为这里使用了默认的gasPrice，所以可能交易被打包得没那么快，要等几秒钟到几分钟
    const txResponse = await wallet.sendTransaction(tx);
    const txReceipt = await txResponse.wait(); // 等待交易被打包
    console.log(txReceipt);
}

main();