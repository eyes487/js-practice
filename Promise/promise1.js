/**
 * autor: eyes487
 * promise--简单版
 */

//1.promise有三种状态： 成功态（resolved）  失败态（rejected） 等待态（pending）
//2.用户自己决定失败的原因和成功的原因， 成功和失败也是用户自定义
//3.promise 默认执行器立即执行
//4.promise的实例拥有then方法，一个参数是成功的回调，另一个是失败的回调
//5.如果执行函数时发生了异常也会执行失败逻辑
//6.状态是不可逆的，一旦成功就不能失败，反之也是一样，只有等待态才能改变状态

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class Promise{
    constructor(excutor){
        this.status = PENDING  // 默认是等待态
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = [] // 存储成功的所有的回调 只有pending的时候才存储
        this.onRejectedCallbacks = [] // 存储所有失败的

        let resolve = (value)=>{
            if(this.status === PENDING){
                this.value = value
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        let reject = (reason)=>{
            if(this.status === PENDING){
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try{
            excutor(resolve,reject)
        }catch(err){
            reject(e)
        }
    }
}

Promise.prototype.then = function(onFulfilled,onRejected){
    if(this.status === RESOLVED){
        onFulfilled(this.value)
    }
    if(this.status === REJECTED){
        onRejected(this.reason)
    }
    //发布订阅模式  如果当期那状态是pending时，我们需要将成功的回调和失败的回调存放起来，稍后调用resolve和rejectd的时候重新执行
    if(this.status === PENDING){
        this.onResolvedCallbacks.push(()=>{
            //其他todo
            onFulfilled(this.value)
        })
        this.onRejectedCallbacks.push(()=>{
            onRejected(this.reason)
        })
    }
}

module.exports = Promise