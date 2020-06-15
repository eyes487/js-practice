const Stack = require('./stack')



function queue(){
	const stack1 = new Stack()
	const stack2 = new Stack()

	this.enqueue = function(data){ //入队操作stack1就行  
		stack1.push(data)
	}

	this.dequeue = function(){  //出队只操作stack2就行，因为从stack1倒入stack2的在栈顶的元素就是队列的头，符合队列的要求
		 //当stack2为空了，在把stack1中的元素倒进去
		 if(stack2.isEmpty() && stack1.isEmpty()){
		 	return null
		 }

		if(stack2.isEmpty()){  
			while(!stack1.isEmpty()){
				stack2.push(stack1.pop())
			}
		}
		return stack2.pop()
	}

	this.head = function(){
		if(stack2.isEmpty() && stack1.isEmpty()){
		 	return null
		 }

		if(stack2.isEmpty()){  
			while(!stack1.isEmpty()){
				stack2.push(stack1.pop())
			}
		}
		return stack2.top()
	}

	this.size = function(){
		return stack1.size()+stack2.size()
	}

	this.clear = function(){
		stack1.clear()
		stack2.clear()
	}

	this.isEmpty = function(){
		return stack1.isEmpty()&&stack2.isEmpty()
	}
}

let queue1 = new queue()


queue1.enqueue(1)
queue1.enqueue(2)
queue1.enqueue(3)
queue1.enqueue(4)

console.log(queue1.dequeue())

queue1.enqueue(5)
queue1.enqueue(6)
queue1.enqueue(7)
console.log(queue1.size())

// console.log(queue1.dequeue())

// console.log(queue1.dequeue())
console.log(queue1.head())
console.log(queue1.dequeue())
console.log(queue1.dequeue())
// console.log(queue1.dequeue())
console.log(queue1.isEmpty())


