'use strict';


// Допустим, у вас есть отдельные функции, которые в итоге вычисляют скидку:

// 1.	const multiply20 = (price) => price * 20;
// 2.	const divide100 = (price) => price / 100;
// 3.	const normalizePrice = (price) => price.toFixed(2);

// В итоге мы получим результат, но эта цепочка не совсем удобна. А если действий там будет много? Можно запустить её вот так:

// 1.	// result = a(b(c(x)))
// 2.	const discount = normalizePrice(divide100(multiply20(200)));

// Но при увеличении количества функций это превратиться в нечитаемый ад. И вот задача состоит в том, чтобы написать функцию compose, которая будет принимать все эти функции и делать тоже самое. То есть, организовывать композицию функций. Обратите внимание на порядок записи функций - последняя записанная запускается первой и дальше справа налево. Возможно вам понадобится это.

// 1.	const discount = compose(normalizePrice, divide100, multiply20);
// 2.	discount(200.0);

// Функций может быть сколько угодно и они могут принимать только один начальный аргумент. Так что вариант:

// const compose = (a, b, c) => (x) => a(b(c(x)));

// Не подходит, так как работает только с 3мя функциями.



const multiply20 = (price) => price * 20;
const divide100 = (price) => price / 100;
const normalizePrice = (price) => price.toFixed(2);

const multiply2 = (price) => price * 2;
const multiply3 = (price) => price * 3;
const multiply4 = (price) => price * 4;

/* let compose = function(a, b, c) {
    return function(x) {
        return a(b(c(x)));
    };
}; */

// const compose = (...fns) => (x) => fns.reduceRight((res, fn) => fn(res), x);

const compose = function(...fns) { 
    return function(x) {
       console.log();
       return fns.reduceRight(function(res, fn) { 
            return fn(res);
        }, x);
    };
}


/* var compose = function() {
    var funcs = Array.prototype.slice.call(аргументы);
   
    return funcs.reduce(function(f,g) {
      return function() {
        return f(g.apply(this, аргументы));
      };
    });
  }; */


const discount = compose(multiply4, multiply3, multiply2, normalizePrice, divide100, multiply20);
console.log(discount(200.0));


// Максимально короткое решение :)
// const compose = (...fns) => (x) => fns.reduceRight((res, fn) => fn(res), x);

// const composeWithArgs = (...fns) => fns.reduceRight((f, g) => (...args) => g(f(...args)));

const a = [1,2,3,4,5,6,7,8,9];
let d = a.reduce((prev, item, index) => {
    console.log(prev[1]);
    // console.log(item);
    if (item > prev[1]) {
        return [index, item]
    } else {
        return prev;
    }
}, [0, a[0]]);

console.log(d);