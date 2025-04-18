import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const httpProvider = new ethers.JsonRpcProvider(process.env.ALCHEMY_HTTP_KEY);

const privateKey = process.env.PRIVATE_KEY;

const wallet = new ethers.Wallet(privateKey, httpProvider);

/**
 * 使用StaticCall可以模拟执行一个合约的函数调用，而不会实际改变区块链的状态。
 * 
 * 如果实际执行这个函数失败，花费的gas并不会退还，使用StaticCall模拟函数执行结果，可以避免因函数执行失败而导致的gas浪费。
 */
const main = async () => {
    // 这里用我在Hoodi上的ERC20代币SPARK举例
    const contractAddress = "0xEC04EAb794D852FCF70fFe3b12ca985704525413";
    const contractABI = [
        "function balanceOf(address) external view returns (uint256)",
        "function transfer(address, uint256) external returns (bool)"
    ];
    const contract = new ethers.Contract(contractAddress, contractABI, httpProvider); // 注意这里要用provider创建合约
    const targetAddress = "0xfb890890E373c504f04829A2C7Fbf84ed5Ad0e5F";

    console.log("1. 展示两个测试账户的余额");
    console.log(`我的余额: ${await contract.balanceOf(wallet.address)}`);
    console.log(`目标账户余额: ${await contract.balanceOf(targetAddress)}`);

    // 模拟我的账户向目标账户转账SPARK，因为我的账户有充足的余额，所以这里的结果为true
    const tx = await contract.transfer.staticCall(targetAddress, 100, { from: wallet.address });
    console.log(`模拟执行结果: ${tx}`);

    // 模拟目标账户向我的账户转账SPARK，因为转账会失败，这里的tx2不会是一个布尔值，而是具体错误信息
    // 参考官方文档的说明：https://docs.ethers.org/v6/api/contract/#BaseContractMethod-staticCall
    const tx2 = await contract.transfer.staticCall(wallet.address, 100, { from: targetAddress });
    console.log(`模拟执行结果: ${tx2}`);
}

main();