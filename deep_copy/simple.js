
// 1. 但是循环引用的时候，会出现爆栈的问题
// function clone(target) {  
//     if (typeof target === 'object') {
//             let cloneTarget = Array.isArray(target)? [] : {};   
//         for (const key in target) {
//             cloneTarget[key] = clone(target[key]);
//         }    
//         return cloneTarget;   
//     } else {        
//         return target;
//     }
// };


//2.开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
function clone1(target, map= new Map()){
    if(typeof target === "object"){
        let cloneTarget = Array.isArray(target)?[]:{}   
        if(map.get(target)){
            return target
        }
        map.set(target, cloneTarget)
        for(const key in target){
            cloneTarget[key] = clone1(target[key], map)
        }
        return cloneTarget
    }else{
        return target
    }
}

//3.for  in  速度太慢，改用while,  同时weakMap中的建是弱引用，会更优于Map
function  forEach(array, iteratee){
    let index = -1
    const length = array.length
    while(++index<length){
        iteratee(array[index],index)
    }
    return array
}

function clone2(target, map= new Map()){
    if(typeof target === "object"){
        const isArray = Array.isArray(target)
        let cloneTarget = Array.isArray(target)?[]:{}   
        if(map.get(target)){
            return target
        }
        map.set(target, cloneTarget)

        const keys = isArray? undefined: Object.keys(target)
        forEach(keys || target,(value, key)=>{
            if(keys){
                key = value
            }
            cloneTarget[key] = clone2(target[key], map)
        })
        return cloneTarget
    }else{
        return target
    }
}


const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2,4,7],
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } }
}
target.target = target

console.time()
const result1 = clone1(target)     //0.577ms
console.timeEnd()


console.time()
const result2 = clone2(target)     //0.173ms, 看出两种方式相差还是显而易见的
console.timeEnd()