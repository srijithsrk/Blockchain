const SHA256 = require('crypto-js/sha256');  
// its used for importing header files in the form of sha256
class Block 
{
	constructor(index, timestamp, data, previousHash = '')
	{
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;  //amount :2 initially kept static
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash()  // this method calculates the hash value of the blocks
	{         
		return SHA256(this.index + this.timestamp +JSON.stringify(this.data) + this.previousHash + this.nonce).toString(); // to convert the data from integer to string
	}
	mineBlock(difficulty){
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
	}
	createGenesisBlock()
	{    
		//its the first block containing no previous hash value
		return new Block(0, "08/09/2018","Genesis Block","0");
		                //index,timestamp,data,previous HashValue

	}
	getLatestBlock()
	{ 
		//hash of this block is added to the next new block as previous blocks hash
		return this.chain[this.chain.length-1];
	}
	addBlock(newBlock)
	{
		newBlock.previousHash = this.getLatestBlock().hash; // to get hash value from previous blocks hash
		newBlock.hash = newBlock.calculateHash();

		this.chain.push(newBlock);  //to push blocks into the blockchain
	}
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

	myCoin.addBlock(new Block(1, "09/09/2018" , {amount:4}));  //two blocks will be created with these parameters and will be pushed to blockchain 
	myCoin.addBlock(new Block(2, "10/09/2018" , {amount:8}));


console.log(JSON.stringify(myCoin, null ,4));   //displays output
//myCoin.chain[1].data = {amount : 40}; 
// the above line of code when once uncommented,the data of block1(line no 69)is altered
console.log("is blockchain valid "+ my coin.isChainValid()); //displays the output for validity of blockchain

// the output of this code till here will showcase a genesis block along with its other two blocks with the static data given by us in it.

