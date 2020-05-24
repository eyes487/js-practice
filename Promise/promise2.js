/**
 * autor: eyes487
 * promise--完整版
 * 根据 promiseA+规范实现promise
 * 使用 promises-aplus-tests 测试
 */

//1.promise有三种状态： 成功态（resolved）  失败态（rejected） 等待态（pending）
//2.用户自己决定失败的原因和成功的原因， 成功和失败也是用户自定义
//3.promise 默认执行器立即执行
//4.promise的实例拥有then方法，一个参数是成功的回调，另一个是失败的回调
//5.如果执行函数时发生了异常也会执行失败逻辑
//6.状态是不可逆的，一旦成功就不能失败，反之也是一样，只有等待态才能改变状态


const PENDING = 'PENDING'
const RESOLVED = 'FULFILLED'
const REJECTED = 'REJECTED'

const resolvePromise =(promise2,x,resolve,reject)=>{
    //1.循环引用 自己等待自己完成 那状态就一直是pending，不合理
    if(promise2 === x){
        return reject(new TypeError('Chaining cycle detected for promise #<promise>'))
    }
    let called;  //这个字段用来保证状态，执行了成功就不能再执行失败了，我们自己的库是这样，这是为了兼容其他库
    //后续的条件要严格判断  保证代码能和别的库一起使用
    //因为promise的规范不只有promiseA+， 还有其他的， 有n种实现 所以不能使用instanceof promise来判断返回是是不是promise
    if((x!==null && typeof x === "object") || typeof x === "function" ){
       //继续判断,如果含有then方法，，就判断是promise对象
        try{  //取then的时候，有可能会报错
            let then = x.then 
            if(typeof then === "function"){
                then.call(x,y=>{
                    if(called) return; // 1)
                    called = true;
                    //返回的可能还继续是promise，要继续判断
                    resolvePromise(promise2,y,resolve,reject)
                },e=>{
                    if(called) return; // 2)
                    called = true;
                    reject(e)
                })
            }else{
                resolve(x)
            }
        }catch(e){
            if(called) return; // 3) 为了辨别这个promise 不能调用多次
            called = true;
            reject(e)
        }
    }else{
        //是一个值，直接返回
        resolve(x)
    }
}

class Promise{
    constructor(excutor){
        this.status = PENDING  // 默认是等待态
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = [] // 存储成功的所有的回调 只有pending的时候才存储
        this.onRejectedCallbacks = [] // 存储所有失败的

        let resolve = (value)=>{
            if(value instanceof Promise){  //写promise.resolve的时候，需要来判断。。
                return value.then(resolve,reject)
            }
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
            excutor(resolve,reject)  //立即执行
        }catch(err){  //错误处理，直接走reject
            reject(err)
        }
    }
}

/**
 * then
 */
//  可以不停的调用then方法,返回一个新的promise
// 异步的特点 等待当前主栈代码都执行后才执行
Promise.prototype.then = function(onFulfilled,onRejected){
    //值穿透，如果then中没有传东西，就设置一个函数，把值传下去
    onFulfilled = typeof onFulfilled === "function"? onFulfilled : v=>v;
    onRejected = typeof onRejected === "function"? onRejected : e=>{throw e};
    let promise2 = new Promise((resolve,reject)=>{
        if(this.status === RESOLVED){
            //类创建的过程，只有等待类中代码都执行完毕，才能拿到promise2
            //promise2 必须在类定义完之后才能拿到，所以需要放在宏任务中，帮助我们能拿到promise2
            setTimeout(()=>{
                //在异步方法中，错误不能被统一捕获了，。所以添加try-catch
                try{
                    // 这里的x是普通值还是promise
                    // 如果是一个promise呢？写一个resolvePromise来统一处理
                    let x = onFulfilled(this.value)
                    resolvePromise(promise2,x,resolve,reject)  
                }catch(e){
                    reject(e)
                }
            })
        }
        if(this.status === REJECTED){
            setTimeout(()=>{
                try{
                    let x = onRejected(this.reason)
                    resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e)
                }
            })
        }
        //发布订阅模式  如果当期那状态是pending时，我们需要将成功的回调和失败的回调存放起来，稍后调用resolve和rejectd的时候重新执行
        if(this.status === PENDING){
            this.onResolvedCallbacks.push(()=>{
                setTimeout(()=>{
                    try{
                        //其他todo
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            })
            this.onRejectedCallbacks.push(()=>{
                setTimeout(()=>{
                    try{
                        //其他todo
                        let x = onRejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            })
        }
    })
    return promise2
}

/**
 * catch
 */
Promise.prototype.catch = function(errCallback){
    return this.then(null,errCallback)
}

/**
 * finally
 */
Promise.prototype.finally = function(callback){
    return this.then((value)=>{
        return Promise.resolve(callback()).then(()=>value)
    },(reason)=>{
        return Promise.resolve(callback()).then(()=>{throw reason})
    })
}

/**
 * Promise.resolve
 */
Promise.resolve = function(data){
    return new Promise((resolve,reject)=>{
        resolve(data)
    })
}
/**
 * Promise.reject
 */
Promise.reject = function(data){
    return new Promise((resolve,reject)=>{
        reject(data)
    })
}
// 计数器
function isPromise(value){
    if(typeof value === 'function' || (typeof value === 'object' && value !== null)){
        if(typeof value.then === 'function'){
            return true;
        }
    }
    return false;
}
/**
 * Promise.all
 */
Promise.all = function(values){
    return new Promise((resolve,reject)=>{
        let arr = []; // arr[3] = 2  arr.length = 4
        let i = 0;
        let processData = (key,value)=>{
            arr[key] = value; // after函数
            if(++i === values.length){
                resolve(arr);
            }
        }
        for(let i = 0 ; i < values.length;i++){
            let current = values[i];
            if(isPromise(current)){
                current.then(y=>{
                    processData(i,y);
                },reject);
            }else{
                processData(i,current);
            }
        }
    })
}
//promise的延迟对象
Promise.defer = Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
}

module.exports = Promise