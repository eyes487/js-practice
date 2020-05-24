
const recursion=(arr)=>{
    let newArr = []
    for(let i=0;i<arr.length;i++){
        newArr.push({name: arr[i].name})
        if(arr[i].children){
            newArr =  newArr.concat(recursion(arr[i].children))
        }
    }
    return newArr
}

//测试
let arr =[
    { 
        name: '1',
        children:[
            {name: '11'},
            {name: '12'}
        ]
    },
    { 
        name: '2',
        children:[
            {name: '21'},
            {name: '22'}
        ]
    }
]

console.log(recursion(arr));