
/**
* 练习题
*/
const BinaryTree = require('./tree.js')
const stack = require('../stack/stack')

let  bt = new BinaryTree()
bt.init_tree("A(B(C,D),E(F(G,),H(I,J)))")

//使用非递归的方式实现树的遍历方法
function in_order(node){
	if(!node) return 
	let stack_ins1 = new stack()
	let cur_node = node

	while(true){
		while(cur_node){
			stack_ins1.push(cur_node)
			cur_node = cur_node.leftChild
		}

		let pop_item = stack_ins1.pop()
		console.log(pop_item.data)
		cur_node = pop_item.rightChild
		if(!cur_node && stack_ins1.isEmpty()){
			break;
		}
	}
}

function pre_order(node){
	if(!node) return 
	let stack_ins1 = new stack()
	let cur_node = node

	while(cur_node){
		console.log(cur_node.data)
		if(cur_node.rightChild){
			stack_ins1.push(cur_node.rightChild)
		}
		if(cur_node.leftChild){
			cur_node = cur_node.leftChild
		}else{
			cur_node = stack_ins1.pop()
		}
	}
}

var Tag = function(node, state){
    this.node = node;
    this.state = state;    // 0表示左边已经遍历结束,1表示右边已经遍历结束
};

function post_order(node){
    var stack_ins1 = new stack();
    var curr_node = node;
    while(true){
        while(curr_node){
            var tag = new Tag(curr_node, 0);
            stack_ins1.push(tag);
            curr_node = curr_node.leftChild;
        }

        var pop_item = stack_ins1.pop();
        if(pop_item.node.rightChild && pop_item.state==0){
            pop_item.state = 1;
            stack_ins1.push(pop_item);
            curr_node = pop_item.node.rightChild;
        }else{
            console.log(pop_item.node.data);
        }
        if(!curr_node && stack_ins1.isEmpty()){
            break;
        }
    }
};


// in_order(bt.get_root())
// pre_order(bt.get_root())
post_order(bt.get_root())