const SHA256 = require('crypto-js/sha256');  

class Block {
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data; 
		this.previousHash = previousHash;
		this,hash = this.calculateHash();
	}

	calculateHash(){         
		return SHA256(this.index + this.timestamp +JSON.stringify(this.data) + this.previousHash).toString();  
	}
}

class Blockchain {        s
	constructor(){
		this.chain =  [
		this.createGenesisBlock()
		];
	}
	createGenesisBlock(){    //its the first block containing no previous hash value
		return new Block(0, "08/09/2018","Genesis Block","0");
		                //index,timestamp,data,previous HashValue

	}
	getLatestBlock(){ //hash of this block is added to the next new block as previous blocks hash
		return this.chain[this.chain.length-1];
	}
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();

		this.chain.push(newBlock);
	}


	let myCoin = new Blockchain(); //OOP'S application

	myCoin.addBlock(new Block(1, "09/09/2018" , {amount:4}));
	myCoin.addBlock(new Block(2, "10/09/2018" , {amount:8}));


console.log(JSON.stringify(myCoin, null ,4));

}
