
/**
* 二叉树
*/
const stack = require('../stack/stack')

//创建节点
function BinTreeNode(data){
	this.data = data
	this.leftChild = null
	this.rightChild = null
	this.parentNode = null
}


function BinaryTree(){
	let root = null

	//采用广义表表示的建立二叉树方法
	this.init_tree = function(string){
		let stack1 = new stack()
		let k = 0; //  标识识别的是左指数还是右指数
		let new_node = null

		for(let i=0;i<string.length; i++){
			let item = string[i]
			if(item == "("){
				stack1.push(new_node)
				k = 1
			}else if(item == ","){
				k = 2
			}else if(item == ")"){
				stack1.pop()
			}else{
				new_node = new BinTreeNode(item)

				if(root === null){
					root = new_node
				}else{
					let top_item = stack1.top()
					if(k === 1){  //判断是左孩子还是右孩子
						top_item.leftChild = new_node
					}else if(k === 2){
						top_item.rightChild = new_node
					}
					new_node.parentNode = top_item
				}
			}
		}
	}

	this.get_root = function(){
		return root
	}

	//中序遍历, 先遍历左子树，在处理当前节点，在遍历右子树
	this.in_order = function(node){
		if(!node) return
		this.in_order(node.leftChild)
		console.log(node.data)
		this.in_order(node.rightChild)
	}

	//前序遍历, 当前节点最先处理，在遍历左子树，在遍历右子树
	this.pre_order = function(node){
		if(!node) return 
		console.log(node.data)
		this.pre_order(node.leftChild)
		this.pre_order(node.rightChild)
	}

	//后续遍历，先遍历左子树，在遍历右子树，当前节点最后处理
	this.post_order = function(node){
		if(!node) return 
		
		this.post_order(node.leftChild)
		this.post_order(node.rightChild)
		console.log(node.data)
	}

	//判断某个节点的子节点数
	let tree_node_count = function(node){
		//左子树的节点数，右子树的节点数，加上本身
		if(!node) return 0

		let left_node_count = tree_node_count(node.leftChild)
		let right_node_count = tree_node_count(node.rightChild)
		return left_node_count + right_node_count + 1
	}

	//返回节点数量
	this.size = function(){
		return tree_node_count(root)
	}

	//返回数的高度
	let tree_height = function(node){
		if(!node) return 0

		let left_tree_height = tree_height(node.leftChild)
		let right_tree_height = tree_height(node.rightChild)
		if(left_tree_height > right_tree_height){
			return left_tree_height + 1
		}else{
			return right_tree_height + 1
		}
	}

	this.height = function(){
		return tree_height(root)
	}

	let find_node = function(node, data){
		if(node == null) return null

		if(node.data == data){
			return node
		}
		let left_res = find_node(node.leftChild, data)
		if(left_res){
			return left_res
		}
		return find_node(node.rightChild, data)
	}
	//查找节点
	this.find = function(data){
		return find_node(root, data)
	}

}

module.exports = BinaryTree
//测试
// let  bt = new BinaryTree()
// bt.init_tree("A(B(C,D),E(F(G,),H(I,J)))")
// // bt.in_order(bt.get_root())
// // bt.pre_order(bt.get_root())
// // bt.post_order(bt.get_root())
// console.log(bt.size())
// console.log(bt.height())
// console.log(bt.find('D'))


// //互换位置,镜像树,方法一
// function mirror_1(node){
// 	if(!node) return 

// 	let temp = node.leftChild
// 	node.leftChild = node.rightChild
// 	node.rightChild = temp

// 	mirror_1(node.leftChild)
// 	mirror_1(node.rightChild)
// }

// // mirror_1(bt.get_root())
// // console.log(bt.get_root())

// //互换位置,镜像树，方法二
// function mirror_2(node){
// 	if(!node) return 

// 	let left = mirror_2(node.leftChild)
// 	let right = mirror_2(node.rightChild)

// 	node.leftChild = right
// 	node.rightChild = left
// 	return node
// }

// mirror_2(bt.get_root())
// console.log(bt.get_root())
// bt.in_order(bt.get_root())