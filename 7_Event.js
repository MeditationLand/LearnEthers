import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const httpProvider = new ethers.JsonRpcProvider(process.env.ALCHEMY_HTTP_KEY);

const privateKey = process.env.PRIVATE_KEY;

const wallet = new ethers.Wallet(privateKey, httpProvider);

/**
 * Ethers.js 可以使用合约实例监听合约释放的事件
 * 
 * 要监听某个事件，该事件必须被包含在合约的ABI中
 */
const main = async () => {
    // 这里用我在Hoodi上的ERC20代币SPARK举例
        const contractAddress = "0xEC04EAb794D852FCF70fFe3b12ca985704525413";
        // 这里只需要监听事件，直接用IERC20中的Transfer事件就可以了
        const contractABI = [
            "event Transfer(address indexed from, address indexed to, uint256 value)"
        ];
        const contract = new ethers.Contract(contractAddress, contractABI, httpProvider);

        // 监听事件的函数有三个参数，第一个是事件的名称，第二个是起始区块号，第三个是结束区块号，后两个参数是选填的
        // const transferEvents = await contract.queryFilter("Transfer", 0, "latest");

        // 这里我们获取过去10个区块里，SPARK代币的转账事件
        const blockNumber = await httpProvider.getBlockNumber();
        console.log("当前区块高度: ", blockNumber);
        
        // 由于我们使用了Alchemy的免费API，这里的查询范围不是无限大的，所以需要限制一下查询范围
        const transferEvents = await contract.queryFilter("Transfer", blockNumber - 498, blockNumber);
        console.log("Transfer event: ", transferEvents[0]);

        // 适当格式化一下，便于阅读
        console.log(`从地址 ${transferEvents[0].args[0]} 向地址 ${transferEvents[0].args[1]} 转账了 ${transferEvents[0].args[2]} 个SPARK代币`);
}

main();