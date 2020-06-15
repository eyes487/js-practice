function Queue(){
    let items = []

    this.enqueue = function(data){
        items.push(data)
    }

    this.dequeue = function(data){
        return items.shift()
    }

    this.head = function(){
        return items[0]
    }

    this.size = function(){
        return items.length
    }

    this.clear = function(){
        items = []
    }

    this.isEmpty = function(){
        return items.length === 0
    }
}

module.exports = Queue