import { ethers } from "ethers";

/**
 * Ethers.js提供两种方式监听合约的事件：
 * 
 * 1. 通过合约实例的on方法，持续监听事件
 * contract.on("eventName", function)
 * 
 * 2. 通过合约实例的once方法，监听一次事件
 * contract.once("eventName", function)
 * 
 * 它们的参数一样，`eventName`是事件名称，`function`是回调函数，会在监听的事件发生时被调用。
 * 
 * 为了能看到明显的监听效果，这个示例中我们监听以太坊主网上的 USDT 合约的 Transfer 事件。
 * 
 * 因为要持续监听，这里需要使用 WebSocket 连接。
 */

const ALCHEMY_WS_URL = "wss://eth-mainnet.g.alchemy.com/v2/XZgjN_X7Z4mLwLRW38YAc-Ykg_v_NOdH";
const wsProvider = new ethers.WebSocketProvider(ALCHEMY_WS_URL);
const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const contractABI = [
    "event Transfer(address indexed from, address indexed to, uint value)"
];
const contractUSDT = new ethers.Contract(contractAddress, contractABI, wsProvider);

function printEvent(from, to, value) {
    console.log(
        `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
    );
}

const main = async () => {
    try {
        // 只监听一次转账事件，并输出
        contractUSDT.once("Transfer", (from, to, value) => {
            printEvent(from, to, value);
        });

        // 持续监听转账事件，并输出
        contractUSDT.on("Transfer", (from, to, value) => {
            printEvent(from, to, value);
        });
    } catch (e) {
        console.log(e);
    }
}

main();