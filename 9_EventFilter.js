import { ethers } from "ethers";

/**
 * 学习事件过滤器前，最好先了解其原理，并不复杂
 * https://github.com/WTFAcademy/WTF-Ethers/blob/main/09_EventFilter/readme.md
 * 
 * 在这个示例中，我们仍然监听USDT的Transfer事件，并过滤出所有向 Binance 14（币安热钱包）转账和从这个钱包转出的事件。
 * 
 * Binance 14 地址：0x28C6c06298d514Db089934071355E5743bf21d60
 */

const ALCHEMY_WS_URL = "wss://eth-mainnet.g.alchemy.com/v2/XZgjN_X7Z4mLwLRW38YAc-Ykg_v_NOdH";
const httpProvider = new ethers.WebSocketProvider(ALCHEMY_WS_URL);
const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const contractABI = [
    "event Transfer(address indexed from, address indexed to, uint value)",
    "function balanceOf(address) public view returns(uint)"
];
const contractUSDT = new ethers.Contract(contractAddress, contractABI, httpProvider);
const binance14 = "0x28C6c06298d514Db089934071355E5743bf21d60";

const main = async () => {
    console.log(`币安热钱包余额：${ethers.formatUnits(await contractUSDT.balanceOf(binance14), 6)} USDT`);

    // 转入监控
    let filterToBinance = contractUSDT.filters.Transfer(null, binance14);
    contractUSDT.on(filterToBinance, (res) => {
        console.log(`【${res.args[0]}---转入】${ethers.formatUnits(res.args[2], 6)} USDT`);
    });

    // 转出监控
    let filterFromBinance = contractUSDT.filters.Transfer(binance14, null);
    contractUSDT.on(filterFromBinance, (res) => {
        console.log(`【${res.args[1]}---转出】${ethers.formatUnits(res.args[2], 6)} USDT`);
    });
}

main();