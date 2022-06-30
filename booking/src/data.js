// const stack = [];

// stack.push(1);
// stack.push(9);
// stack.push(5);
// console.log(stack);
// stack.pop();
// console.log(stack)

// const queue = [];
// queue.push(1);
// queue.push(9);
// queue.push(5);
// console.log(queue);
// queue.shift();
// console.log(queue);

const head = {
    name:'Matt'
}

const person2 = {
    name:'Bob'
}

const person3 = {
    name:'Sally'
}

const tail = {
    name:'Zagthorp'
}

head.next = person2;
person2.next = person3;
person3.next = tail;

console.log(head)