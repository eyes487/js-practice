function stack(){
	let arr = []

	this.push = function(data){
		arr.push(data)
	}

	this.pop = function(data){
		return arr.pop()
	}

	this.size = function(){
		return arr.length
	}

	this.top = function(){
		return arr[arr.length-1]
	}

	this.clear = function(){
		arr = []
	}
	this.isEmpty = function(){
		return arr.length === 0
	}
	this.arr = function(){
		return arr
	}
}


module.exports = stack