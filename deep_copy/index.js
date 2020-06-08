//原文地址 : http://www.conardli.top/blog/article/JS%E8%BF%9B%E9%98%B6/%E5%A6%82%E4%BD%95%E5%86%99%E5%87%BA%E4%B8%80%E4%B8%AA%E6%83%8A%E8%89%B3%E9%9D%A2%E8%AF%95%E5%AE%98%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D.html

//可继续遍历的数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

//不可继续遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

//工具函数，while
function  forEach(array, iteratee){
    let index = -1
    const length = array.length
    while(++index<length){
        iteratee(array[index],index)
    }
    return array
}
//判断是否为引用类型
function isObject(target){
    const type = typeof(target)
    return target !== null && (type === 'object' || type === 'function')
}
//获取实际类型
function getType(target){
    return Object.prototype.toString.call(target)
}
//初始化被克隆的对象
function getInit(target){
    const Ctor = target.constructor
    return new Ctor()
}
//克隆symbol
function cloneSymbol(target){
    return Object(Symbol.prototype.valueOf.call(target))
}
//克隆正则
function cloneReg(target){
    const reFlags = /\w*$/
    const result = new target.constructor(target.source, reFlags.exec(target))
    result.lastIndex = target.lastIndex
    return result
}
//克隆函数
function cloneFunction(func) {
    return func  //可直接返回函数
    // const bodyReg = /(?<={)(.|\n)+(?=})/m;
    // const paramReg = /(?<=\().+(?=\)\s+{)/;
    // const funcString = func.toString();
    // if (func.prototype) {
    //     console.log('普通函数');
    //     const param = paramReg.exec(funcString);
    //     const body = bodyReg.exec(funcString);
    //     if (body) {
    //         console.log('匹配到函数体：', body[0]);
    //         if (param) {
    //             const paramArr = param[0].split(',');
    //             console.log('匹配到参数：', paramArr);
    //             return new Function(...paramArr, body[0]);
    //         } else {
    //             return new Function(body[0]);
    //         }
    //     } else {
    //         return null;
    //     }
    // } else {
    //     return eval(funcString);
    // }
}

//克隆不可遍历类型
function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;

    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}


function clone(target, map = new WeakMap()){
    if(!isObject(target)){
        return target
    }

    const type = getType(target)
    let cloneTarget;
    if(deepTag.includes(type)){
        cloneTarget = getInit(target, type)
    }else{
        return cloneOtherType(target, type)
    }

    if(map.get(target)){
        return target
    }
    map.set(target, cloneTarget)

    if(type === setTag){
        target.forEach(value=>{
            cloneTarget.add(clone(value))
        })
        return cloneTarget
    }

    if(type === mapTag){
        target.forEach((value, key)=>{
            cloneTarget.set(key, clone(value))
        })
        return cloneTarget
    }

    const keys = type === arrayTag?  undefined : Object.keys(target)
    forEach(keys || target, (value, key)=>{
        if(keys){
            key = value
        }
        cloneTarget[key] = clone(target[key],map)
    })

    return cloneTarget
}


const map = new Map();
map.set('key', 'value');
map.set('age', 12);

const set = new Set();
set.add('sex');
set.add('girl');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('hello world');
    },
    func2: function (a, b) {
        return a + b;
    }
};

console.log(clone(target))