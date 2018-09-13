const SHA256 = require('crypto-js/sha256');  
// its used for importing header files in the form of sha256
class Transaction(){
	constructor(fromAddress, toAdress, amount){
		this.fromAddress = fromAddress;
		this.toAdress = toAdress;
		this.amount = amount;
	}
class Block 
{
	constructor(index, timestamp, transactions, previousHash = '')
	{
		this.timestamp = timestamp;
		this.transactions = transactions ;  //amount :2 initially kept static
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash()  // this method calculates the hash value of the blocks
	{         
		return SHA256(this.timestamp +JSON.stringify(this.transactions) + this.previousHash + this.nonce).toString(); // to convert the data from integer to string
	}
	mineBlock(difficulty){    //mining done in blochain to avoid spamming
		while(this.hash.substring(0, difficulty) !== Array(difficulty +1).join("0")){
			this.nonce++; // nonce is just a variable which changes everytime resulting in the calculation of a new hash value
			this.hash = this.calculateHash();
		}
	console.log("Block mined " + this.hash);
	}
}

class Blockchain 
{        
	constructor()
	{
		this.chain =  [
		this.createGenesisBlock()
		];
		this.difficulty = 3;
		this.pendingTransaction = [];
	}
	createGenesisBlock()
	{    
		//its the first block containing no previous hash value
		return new Block( "08/09/2018","Genesis Block","0");
		                //index,timestamp,data,previous HashValue

	}
	getLatestBlock()
	{ 
		//hash of this block is added to the next new block as previous blocks hash
		return this.chain[this.chain.length-1];
	}
	createTransaction(transaction){
		this.pendingTransaction.push(transaction);  //for uncomfirmed transactions, a memory pool is created
	}
	minePendingTransaction(minerAddress){  //called by miner
		let block = new Block(Date.now(), this.pendingTransaction); //current date and time will be taken
		block.previousHash = this.getLatestBlock().hash;
		block.mineBlock(this.difficulty);
		this.chain.push(block);  //push the block to the block chain
		console.log("Blocksuccessfully mined");
		this.pendingTransaction = [      //transactions will now be finished 
// coins are generated from code itself(reward) hencefoth from address is taken as null in the parameter
		new Transaction(null, minerAddress, this.miningReward)               
		];  
	}//reward is given to the person solving puzzle
	//addBlock(newBlock)
	//{
		//newBlock.previousHash = this.getLatestBlock().hash; // to get hash value from previous blocks hash
		//newBlock.mineBlock(this.difficulty);

		//this.chain.push(newBlock);  //to push blocks into the blockchain
	//}
	getBalanceOfAsress(address){  //
		let balance = 0;
		for(const block of this.chain){
			if(address === trans.fromAddress){
				balance -= trans.amount;       // balance-trans amount
			}
			if(address === trans.toAdress){
				balance += trans.amount;
			}
		}
	}
	return balance;
	isChainValid(){      
		// this method checks whether a particular block of code is altered or not
		
		for(let i = 1; i < this.chain.length;i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];

			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
				//hashes are collision free

			}
			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}
		return true;
	}


	let myCoin = new Blockchain(); //OOP'S application 
	myCoin.createTransaction(new Transaction("address-1", "address-2", 100));
	myCoin.createTransaction(new Transaction("address-3", "address-4", 500));
	console.log("start mining..");
	myCoin.minePendingTransaction("miner address");
	console.log(JSON.stringify(myCoin, null ,4));
//console.log("mining Block 1..");

	//myCoin.addBlock(new Block("09/09/2018" , {amount:4})); 
//two blocks will be created with these parameters and will be pushed to blockchain 
//console.log("mining Block 2..");
	//myCoin.addBlock(new Block("10/09/2018" , {amount:8}));


//console.log(JSON.stringify(myCoin, null ,4));   //displays output
//myCoin.chain[1].data = {amount : 40}; 
// the above line of code when once uncommented,the data of block1(line no 69)is altered
//console.log("is blockchain valid "+ my coin.isChainValid()); //displays the output for validity of blockchain

// the output of this code till here will showcase a genesis block along with its other two blocks with the static data given by us in it.

