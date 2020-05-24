/**
 * 
 * 实现一个通用的函数柯里化函数
 */
const curring=(fn,arr=[])=>{
    let len = fn.length  //获取函数的参数长度
    return function(...args){
        let currentArr = [...arr,...args]  
        if(currentArr.length<len){
            return curring(fn,currentArr)
        }else{
            return fn(...currentArr)
        }
    }
}



//测试
function sum(a,b,c,d,e,f){
    let val = a+b+c+d+e+f
    return val
}

let r = curring(sum)(1)(2)(3)(4)(5)(6)
console.log('ee',r);



