/**
 * 练习题
 */
const Queue = require('./index')
/**
 * 1. 有一个数组a[100], 存放0-99， 要求每隔两个数删掉一个数，到末尾时循环至开头继续进行，求最后一个被删掉的数
 */

function del_ring(arr_list){
    let queue = new Queue()
    for(let i=0; i<arr_list.length; i++){
        queue.enqueue(arr_list[i])
    }

    let index = 0
    while(queue.size() !=1){
        let item = queue.dequeue()
        index++
        if(index % 3 !== 0){
            queue.enqueue(item)
        }
    }
    return queue.head()
}

let arr_list = []
for(let i=0; i<100; i++){
    arr_list.push(i)
}

console.log(del_ring(arr_list))


/**
 * 2.斐波那契数列，使用队列计算菲波那切数列的第n项 （比较常见的是递归算法，但是也可以用队列实现）
 */

function fibonacci(n){
    let queue = new Queue()
    let index = 0

    //放入前两个数
    queue.enqueue(1)
    queue.enqueue(1)

    while(index < n-2){
        //出队列第一个元素
        let del_item = queue.dequeue()
        let head_item = queue.head()
        let next_item = del_item + head_item

        queue.enqueue(next_item)
        index++
    }
    queue.dequeue()

    return queue.head()
}

console.log(fibonacci(10))