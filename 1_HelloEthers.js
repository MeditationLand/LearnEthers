import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const httpProvider = new ethers.JsonRpcProvider(process.env.ALCHEMY_HTTP_KEY);

const privateKey = process.env.PRIVATE_KEY;

const wallet = new ethers.Wallet(privateKey, httpProvider);

/**
 * 一个简单的小程序，查询某账户的Hoodi测试网ETH余额
 */
const main = async () => {
    const balance = await httpProvider.getBalance(wallet.address);
    console.log(`My Hoodi testnet ETH balance: ${ethers.formatEther(balance)}ETH`);
}

main();