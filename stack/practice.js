/**
 * 练习题
 */
const Stack = require('./stack')
/**
 * 1. 请编写一个函数判断字符串中的括号是否成对出现
 *  sdf(ds(ew(we)rw)rwqq)qwewe      合法 
 *  (sd(qwqw)sd(sd))	            合法 
 *  ()()sd()(sd()fw))(				不合法
 */
function is_equal_brackets(string){
    let stack = new Stack()

    for(let i=0; i<string.length; i++){
        let item = string[i]
        if(item === "("){
            stack.push(item)
        }else if(item === ")"){
            if(stack.isEmpty())
                return false
            else 
                stack.pop()
        }
    }  
    return stack.size() === 0
}

console.log(is_equal_brackets('()()sd()(sd()fw))('))


/**
 * 2. 计算逆波兰表达式，也叫后缀表达式，eg: (a+b)*(c+d)  =>  ab+cd+*， 这就叫后缀表达式
 *  ["4","13","5","/","+"]等价于(4+(13/5))=6 ，计算结果
 *  ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]等价于((10*(6/((9+3)*-11)))+17)+5
 */

function calc_exp(exp){
    let stack = new Stack()
    for(let i=0; i<exp.length; i++){
        let item = exp[i]
        
        if(['+','-','*','/'].indexOf(item)>-1){
            let val_1 = stack.pop()
            let val_2 = stack.pop()

            let res = parseInt(eval(val_2 + item + val_1))
            stack.push(res)
        }else{
            stack.push(item)
        }
    }
    return stack.pop()
}   

console.log(calc_exp(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))
console.log(((10*(6/((9+3)*-11)))+17)+5)