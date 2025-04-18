import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const httpProvider = new ethers.JsonRpcProvider(process.env.ALCHEMY_HTTP_KEY);

const privateKey = process.env.PRIVATE_KEY;

const wallet = new ethers.Wallet(privateKey, httpProvider);

/**
 * 虽然可以用 Ethers.js 部署合约，但终究不如 Hardhat 方便。
 * 
 * 合约的 ABI 和 Bytecode 都可以通过 Hardhat、Foundry 等框架生成，或者直接从 Remix 复制。
 * 
 * 这里就用 SPARK 代币的合约来演示。
 */
const main = async () => {
    const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "allowance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                }
            ],
            "name": "ERC20InsufficientAllowance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                }
            ],
            "name": "ERC20InsufficientBalance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "approver",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidApprover",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidReceiver",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidSender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidSpender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "_burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "_mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const contractBytecode = "60806040525f6003556040518060400160405280600581526020017f535041524b0000000000000000000000000000000000000000000000000000008152506004908161004c91906107b0565b506040518060400160405280600381526020017f53504100000000000000000000000000000000000000000000000000000000008152506005908161009191906107b0565b5034801561009d575f5ffd5b50335f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361010f575f6040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161010691906108be565b60405180910390fd5b61011e8161013c60201b60201c565b5061013733670de0b6b3a76400006101fd60201b60201c565b610994565b5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050815f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b61020b61029060201b60201c565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361027b575f6040517fec442f0500000000000000000000000000000000000000000000000000000000815260040161027291906108be565b60405180910390fd5b61028c5f838361032960201b60201c565b5050565b61029e61054560201b60201c565b73ffffffffffffffffffffffffffffffffffffffff166102c261054c60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff1614610327576102eb61054560201b60201c565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161031e91906108be565b60405180910390fd5b565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610379578060035f82825461036d9190610904565b92505081905550610449565b5f60015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905081811015610403578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016103fa93929190610946565b60405180910390fd5b81810360015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610490578060035f82825403925050819055506104db565b8060015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610538919061097b565b60405180910390a3505050565b5f33905090565b5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806105ee57607f821691505b602082108103610601576106006105aa565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026106637fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610628565b61066d8683610628565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f6106b16106ac6106a784610685565b61068e565b610685565b9050919050565b5f819050919050565b6106ca83610697565b6106de6106d6826106b8565b848454610634565b825550505050565b5f5f905090565b6106f56106e6565b6107008184846106c1565b505050565b5b81811015610723576107185f826106ed565b600181019050610706565b5050565b601f8211156107685761073981610607565b61074284610619565b81016020851015610751578190505b61076561075d85610619565b830182610705565b50505b505050565b5f82821c905092915050565b5f6107885f198460080261076d565b1980831691505092915050565b5f6107a08383610779565b9150826002028217905092915050565b6107b982610573565b67ffffffffffffffff8111156107d2576107d161057d565b5b6107dc82546105d7565b6107e7828285610727565b5f60209050601f831160018114610818575f8415610806578287015190505b6108108582610795565b865550610877565b601f19841661082686610607565b5f5b8281101561084d57848901518255600182019150602085019450602081019050610828565b8683101561086a5784890151610866601f891682610779565b8355505b6001600288020188555050505b505050505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6108a88261087f565b9050919050565b6108b88161089e565b82525050565b5f6020820190506108d15f8301846108af565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61090e82610685565b915061091983610685565b9250828201905080821115610931576109306108d7565b5b92915050565b61094081610685565b82525050565b5f6060820190506109595f8301866108af565b6109666020830185610937565b6109736040830184610937565b949350505050565b5f60208201905061098e5f830184610937565b92915050565b61117f806109a15f395ff3fe608060405234801561000f575f5ffd5b50600436106100e8575f3560e01c8063715018a61161008a5780639b1f9e74116100645780639b1f9e7414610238578063a9059cbb14610254578063dd62ed3e14610284578063f2fde38b146102b4576100e8565b8063715018a6146101f25780638da5cb5b146101fc57806395d89b411461021a576100e8565b806323b872dd116100c657806323b872dd14610158578063313ce567146101885780634e6ec247146101a657806370a08231146101c2576100e8565b806306fdde03146100ec578063095ea7b31461010a57806318160ddd1461013a575b5f5ffd5b6100f46102d0565b6040516101019190610dcd565b60405180910390f35b610124600480360381019061011f9190610e7e565b610360565b6040516101319190610ed6565b60405180910390f35b610142610382565b60405161014f9190610efe565b60405180910390f35b610172600480360381019061016d9190610f17565b61038b565b60405161017f9190610ed6565b60405180910390f35b6101906103b9565b60405161019d9190610f82565b60405180910390f35b6101c060048036038101906101bb9190610e7e565b6103c1565b005b6101dc60048036038101906101d79190610f9b565b610448565b6040516101e99190610efe565b60405180910390f35b6101fa61048e565b005b6102046104a1565b6040516102119190610fd5565b60405180910390f35b6102226104c8565b60405161022f9190610dcd565b60405180910390f35b610252600480360381019061024d9190610fee565b610558565b005b61026e60048036038101906102699190610e7e565b610566565b60405161027b9190610ed6565b60405180910390f35b61029e60048036038101906102999190611019565b610588565b6040516102ab9190610efe565b60405180910390f35b6102ce60048036038101906102c99190610f9b565b61060a565b005b6060600480546102df90611084565b80601f016020809104026020016040519081016040528092919081815260200182805461030b90611084565b80156103565780601f1061032d57610100808354040283529160200191610356565b820191905f5260205f20905b81548152906001019060200180831161033957829003601f168201915b5050505050905090565b5f5f61036a61068e565b9050610377818585610695565b600191505092915050565b5f600354905090565b5f5f61039561068e565b90506103a28582856106a7565b6103ad85858561073a565b60019150509392505050565b5f6009905090565b6103c961082a565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610439575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016104309190610fd5565b60405180910390fd5b6104445f83836108b1565b5050565b5f60015f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b61049661082a565b61049f5f610acd565b565b5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600580546104d790611084565b80601f016020809104026020016040519081016040528092919081815260200182805461050390611084565b801561054e5780601f106105255761010080835404028352916020019161054e565b820191905f5260205f20905b81548152906001019060200180831161053157829003601f168201915b5050505050905090565b610563335f836108b1565b50565b5f5f61057061068e565b905061057d81858561073a565b600191505092915050565b5f60025f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b61061261082a565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610682575f6040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016106799190610fd5565b60405180910390fd5b61068b81610acd565b50565b5f33905090565b6106a28383836001610b8e565b505050565b5f6106b28484610588565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110156107345781811015610725578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161071c939291906110b4565b60405180910390fd5b61073384848484035f610b8e565b5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107aa575f6040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016107a19190610fd5565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361081a575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016108119190610fd5565b60405180910390fd5b6108258383836108b1565b505050565b61083261068e565b73ffffffffffffffffffffffffffffffffffffffff166108506104a1565b73ffffffffffffffffffffffffffffffffffffffff16146108af5761087361068e565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016108a69190610fd5565b60405180910390fd5b565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610901578060035f8282546108f59190611116565b925050819055506109d1565b5f60015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205490508181101561098b578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610982939291906110b4565b60405180910390fd5b81810360015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a18578060035f8282540392505081905550610a63565b8060015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610ac09190610efe565b60405180910390a3505050565b5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050815f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610bfe575f6040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610bf59190610fd5565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610c6e575f6040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610c659190610fd5565b60405180910390fd5b8160025f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508015610d57578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610d4e9190610efe565b60405180910390a35b50505050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610d9f82610d5d565b610da98185610d67565b9350610db9818560208601610d77565b610dc281610d85565b840191505092915050565b5f6020820190508181035f830152610de58184610d95565b905092915050565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610e1a82610df1565b9050919050565b610e2a81610e10565b8114610e34575f5ffd5b50565b5f81359050610e4581610e21565b92915050565b5f819050919050565b610e5d81610e4b565b8114610e67575f5ffd5b50565b5f81359050610e7881610e54565b92915050565b5f5f60408385031215610e9457610e93610ded565b5b5f610ea185828601610e37565b9250506020610eb285828601610e6a565b9150509250929050565b5f8115159050919050565b610ed081610ebc565b82525050565b5f602082019050610ee95f830184610ec7565b92915050565b610ef881610e4b565b82525050565b5f602082019050610f115f830184610eef565b92915050565b5f5f5f60608486031215610f2e57610f2d610ded565b5b5f610f3b86828701610e37565b9350506020610f4c86828701610e37565b9250506040610f5d86828701610e6a565b9150509250925092565b5f60ff82169050919050565b610f7c81610f67565b82525050565b5f602082019050610f955f830184610f73565b92915050565b5f60208284031215610fb057610faf610ded565b5b5f610fbd84828501610e37565b91505092915050565b610fcf81610e10565b82525050565b5f602082019050610fe85f830184610fc6565b92915050565b5f6020828403121561100357611002610ded565b5b5f61101084828501610e6a565b91505092915050565b5f5f6040838503121561102f5761102e610ded565b5b5f61103c85828601610e37565b925050602061104d85828601610e37565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061109b57607f821691505b6020821081036110ae576110ad611057565b5b50919050565b5f6060820190506110c75f830186610fc6565b6110d46020830185610eef565b6110e16040830184610eef565b949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61112082610e4b565b915061112b83610e4b565b9250828201905080821115611143576111426110e9565b5b9291505056fea2646970667358221220ff855bebee02f36f499a6c2197590c8fe67225ad5e9086fccc38fc0d663fc1ca64736f6c634300081d0033";
    
    // 创建合约工厂
    const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

    // 调用deploy()函数部署合约，要填入构造函数的参数（如果有的话）
    const contract = await contractFactory.deploy(); // 这个合约的构造函数没有参数
    console.log("合约地址: ", contract.address);
    console.log("部署合约的交易详情: ", contract.deployTransaction());
    await contract.waitForDeployment();
    console.log("合约部署完成");
}

main();