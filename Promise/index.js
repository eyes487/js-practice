// const Promise = require('./promise2')

let promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // resolve('ok')
        reject('错了---')
    },1000)
})

promise.then(data=>{
    // return new Promise((resolve)=>{
    //     resolve(data)
    // })
})
.then()
.finally(()=>{
    console.log('finally');
})
.then(data=>{
    console.log('resolve',data);
},(err)=>{
    console.log('err--',err);
})
.catch(err=>{
    console.log('catch--',err);
    return 'catch data'
})
.then(data=>{
    console.log('resolve',data);
},err=>{
    console.log('err1',err);
    
})