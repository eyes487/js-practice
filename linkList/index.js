/**
 * 实现一个链表
 */

function linkList(){
    function Node(data){
        this.data = data
        this.next = null
    }

    let length = 0   //长度
    let head = null  //头结点
    let tail = null  //尾结点

    //添加新元素
    this.append = function(data){
        let new_node = new Node(data)
        if(head === null){
            head = new_node
            tail = new_node
        }else{
            tail.next = new_node;
            tail = new_node;
        }
        length++;
    }

    // 返回链表大小
    this.length = function(){
        return length
    }

    //打印每个节点(顺序)
    this.print = function(){
        let cur_node = head;
        let str_link = ''
        while(cur_node){
            str_link += cur_node.data +' ->'
            cur_node = cur_node.next
        }
        str_link += 'null'
        console.log(str_link);
        console.log("长度为"+ length);
    }

    //打印每个节点(反序)
    this.reverse_print = function(){
        let print = function(head, str_link=''){
            if(!head) return null
            if(!head.next) return str_link += head.data
            
            str_link += print(head.next, str_link)
            return str_link += ' ->' + head.data
        }
        console.log(print(head))
    }
    //插入
    this.insert = function (index,data){
        if(index<0 || index>length) return false

        let new_node = new Node(data)
        if(index == 0){
            new_node.next = head
        }else{
            let insert_index = 1   //先设置一个插入节点
            let cur_node = head    //那这是它前一个节点
            while(insert_index < index){   //根据真正删除的下标，依次向后面查找
                cur_node = cur_node.next
                insert_index++
            }

            //找到前一个节点之后，让前一个节点的指针指向新节点，新节点的指针指向下一个节点
            let next_node = cur_node.next
            cur_node.next = new_node
            new_node.next = next_node
        }
        length++
    }

    //删除
    this.remove = function(index){
        if(index<0 || index>length) return false
        let del_node = null
        if(index == 0){
            del_node = head
            head = head.next
        }else{
            let del_index = 1   //先设置一个删除序号
            let pre_node = head   //前一个节点
            del_node = head.next  //需要删除的节点
            while(del_index < index){  //根据真正删除的下标，依次向后面查找
                pre_node = del_node
                del_node = del_node.next
                del_index++
            }
            //尾结点操作,如果删除的是尾结点，那得改变tail指向
            if(del_node.next == null){
                tail = pre_node
            }
            //找到删除的节点之后，让前一个节点的指针 指向  要删除节点的下一个节点
            pre_node.next = del_node.next
            del_node.next = null
        }

        length--;
        return del_node.data
    }

    //删除尾节点
    this.remove_tail = function(){
        return this.remove(length-1)
    }

    //删除头结点
    this.remove_head = function(){
        return this.remove(0)
    }

    //返回指定位置节点的值
    this.get = function(index){
        if(index<0 || index>length) return false

        let cur_index = 0
        let cur_node = head
        while(cur_index<index){
            cur_node = cur_node.next
            cur_index++
        }

        return cur_node.data
    }

    //返回头结点的值
    this.head = function(){
        return head.data
    }

    //返回尾结点的值
    this.tail = function(){
        return tail.data
    }

    // 返回指定元素的索引,如果没有,返回-1
    // 有多个相同元素,返回第一个
    this.indexOf = function(data){
        let index = -1
        let cur_node = head
        while(cur_node){
            index++
            if(cur_node.data == data){
                return index
            }else{
                cur_node = cur_node.next
            }
        }
        return -1
    }

    //是否为空
    this.isEmpty = function(){
        return length === 0
    }

    //清空链表
    this.clear = function(){
        head = null
        tail = null
        length = 0
    }
}

module.exports = linkList


let link = new linkList()
link.append(1)
link.append(2)
link.append(3)
link.append(4)
link.insert(2,5)

link.print()

link.reverse_print()
