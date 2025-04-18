import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const httpProvider = new ethers.JsonRpcProvider(process.env.ALCHEMY_HTTP_KEY);

const privateKey = process.env.PRIVATE_KEY;

const wallet = new ethers.Wallet(privateKey, httpProvider);

const main = async () => {
    // 查看连接到哪条链
    console.log((await httpProvider.getNetwork()).toJSON());

    // 查看区块高度
    console.log(await httpProvider.getBlockNumber());

    // 查看某个钱包的历史交易次数
    console.log(await httpProvider.getTransactionCount(wallet.address));

    // 查询当前建议的gas设置
    console.log(await httpProvider.getFeeData());

    // 查询区块信息，参数为区块高度
    console.log(await httpProvider.getBlock(0));

    // 查询某个合约地址的合约bytecode，参数为合约地址，这里用我的代币SPARK
    console.log(await httpProvider.getCode("0xEC04EAb794D852FCF70fFe3b12ca985704525413"));
}

main();