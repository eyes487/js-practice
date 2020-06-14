/**
*  判断数组中是否存在某个数，内存更小，速度更快（使用二进制位运算）
*  适合数据量大的时候
*/

function bitMap(size){
	let bit_arr = new Array(size)
	for(let i=0; i<bit_arr.length; i++){
		bit_arr[i] = 0
	}

	this.addMember = function(data){
		let arr_index = Math.floor(data/32)
		let bit_index = data % 32

		bit_arr[arr_index] = bit_arr[arr_index] | 1<<bit_index
	}

	this.isExist = function(data){
		let arr_index = Math.floor(data/32)
		let bit_index = data % 32

		let value = bit_arr[arr_index] & 1<<bit_index

		return value?true:false
	}
}


let arr = [1,34,56,78,90,54,34,67,89,99,100]
let map = new bitMap(4)
for(let i=0; i<arr.length; i++){
	map.addMember(arr[i])
}

console.log(map.isExist(78))
console.log(map.isExist(90))
console.log(map.isExist(4))
console.log(map.isExist(7))