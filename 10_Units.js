import { ethers } from "ethers";

/**
 * JavaScript的最大整数安全值是9007199254740991
 * Ethers.js提供了一些便捷的方法来处理较大的数字
 */
const main = async () => {
    // 1. 用ethers.getBigInt()把 string, number等类型转换为BigInt
    const oneGwei = ethers.getBigInt("1000000000"); // 从十进制字符串生成
    console.log(oneGwei);
    console.log(ethers.getBigInt("0x3b9aca00")); // 从hex字符串生成
    console.log(ethers.getBigInt(1000000000)); // 从数字生成
    // 不能从js最大的安全整数之外的数字生成BigNumber，下面代码会报错
    // ethers.getBigInt(Number.MAX_SAFE_INTEGER);
    console.log("js中最大安全整数：", Number.MAX_SAFE_INTEGER);

    // 2. BigInt同样支持运算，普通数字后面加n会转换为BigInt
    // 运算
    console.log("加法：", oneGwei + 1n)
    console.log("减法：", oneGwei - 1n)
    console.log("乘法：", oneGwei * 2n)
    console.log("除法：", oneGwei / 2n)
    // 比较
    console.log("是否相等：", oneGwei == 1000000000n)

    // 3. 单位转换
    /**
     * 以太坊中最常用的单位是wei, gwei, ether       1 ether => 10^9 gwei => 10^18 wei
     * 
     * 区块链上的数字通常是以wei为单位的，但钱包、DApp等应用通常使用ether作为单位
     * 
     * 使用format方法可以把小单位转换为大单位，使用parse方法则可以把大单位转换为小单位
     */
    console.log(`1 gwei = ${ethers.formatEther(oneGwei)} ether`);
    console.log(`1 ether = ${ethers.parseEther("1")} wei`);
    // 有些代币的小数位和ETH不同，使用parseUnits和formatUnits可以指定小数位
    console.log(`USDT的最小单位 = ${ethers.formatUnits("1", 6)} USDT`);
    console.log(`1 USDT可以被分割为 ${ethers.parseUnits("1", 6)} 份`);
}

main();