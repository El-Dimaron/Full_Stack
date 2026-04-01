// console.log("#5. JavaScript homework example file");

console.log("\n\nTask 1\n\n");

/*
 * #1
 *
 * Створіть функцію counter(), яка має реалізувати лічильник за допомогою замикання:
 * функція може приймати число як аргумент counter(n)
 * якщо число передано у функцію - лічба починається із зазначеного числа
 * якщо ні - то лічба триває
 */

let count = -1;

const counter = function (n) {
  if (n === 0) {
    count = 0;
  } else if (!n || typeof n === "string") {
    count += 1;
  } else {
    count = n;
  }

  return count;
};

console.log(counter()); // 0
console.log(counter(0)); // 1 -> логіка не збігається - лічба має починатись з цього числа, а не виводити 'це число + 1'
console.log(counter(100)); // 100
console.log(counter()); // 101
console.log(counter()); // 102
console.log(counter(500)); // 500
console.log(counter()); // 501
console.log(counter()); // 502
console.log(counter(0)); // 0
console.log(counter()); // 0 -> логіка не збігається - переданий нуль вище, тому тепер виклик без аргументу має виводити '1', а виклик нижче '2'
console.log(counter()); // 1

/*
 * #2
 *
 * Створіть функцію counterFactory, яка має реалізувати три методи за допомогою замикання:
 * початкове значення лічильника - 0
 * counterFactory.value() - повертає значення лічильника
 * counterFactory.value(n) - встановлює значення лічильника, повертає нове значення
 * counterFactory.increment() - збільшує значення лічильника на 1
 * counterFactory.decrement() - зменшує значення лічильника на 1
 */

console.log("\n\nTask 2\n\n");

const counterFactory = function () {
  let counter = 0;

  const value = function value(n) {
    if (typeof n === "number") {
      counter = n;
    }
    return counter;
  };

  const increment = function increment() {
    return (counter += 1);
  };

  const decrement = function decrement() {
    return (counter -= 1);
  };

  return { value: value, increment: increment, decrement: decrement };
};

const testCounter = counterFactory();

console.log(testCounter.value());
testCounter.increment();
testCounter.increment();
testCounter.increment();

console.log(testCounter.value());
testCounter.decrement();
testCounter.decrement();

console.log(testCounter.value());
console.log(testCounter.value(100));

testCounter.decrement();
console.log(testCounter.value());

console.log(testCounter.value(200));
testCounter.increment();
console.log(testCounter.value());

// Не розумію, чому приклади виклику написані таким чином...
// Виклики нижче - це, наскільки я розумію, просто присвоєння існуючій функції перелічених методів.
// Таким чином, це буде обʼєкт-окремий лічильник, а не фабрика функцій, з якої можна створити різні незалежні обʼєкти-лічильники.

// console.log(counterFactory.value()); // 0
// counterFactory.increment()
// counterFactory.increment()
// counterFactory.increment()
// console.log(counterFactory.value()) // 3
// counterFactory.decrement()
// counterFactory.decrement()
// console.log(counterFactory.value()) // 1
// console.log(counterFactory.value(100)) // 100
// counterFactory.decrement()
// console.log(counterFactory.value()) // 99
// console.log(counterFactory.value(200)) // 200
// counterFactory.increment()
// console.log(counterFactory.value()) // 201

console.log("\n\nTask 3\n\n");

/*
 * #3
 *
 * Створіть функцію myPow(a, b, myPrint). Всередині реалізуйте рекурсію для підрахунку результату піднесення числа a до ступеня b.
 * - Функція myPrint(a, b, res) - глобальна функція, що має генерувати з параметрів a, b, res рядок вигляду 'a^b=res' і повертати його.
 * - myPrint() має бути передана в myPow() як параметр і викликана всередині як callback-функція.
 * - функція myPow() як значення, що повертається, приймає результат myPrint().
 * Наприклад:
 * console.log(myPow(3, 4, myPrint)); // 3^4=81
 * console.log(myPow(2, 3, myPrint)); // 2^3=8
 * console.log(myPow(2, 0, myPrint))  // 2^0=1
 * console.log(myPow(2, -2, myPrint)) // 2^-2=0.25
 */

function myPrint(a, b, res) {
  return `${a}^${b}=${res}`;
}

function myPow(a, b, myPrint) {
  function power(a, b) {
    if (b === 0) {
      return 1;
    }

    if (b < 0) {
      a = 1 / a;
      b = -b;
    }

    let counter = b;

    if (counter === 1) {
      return a;
    }

    return a * power(a, b - 1);
  }

  const result = power(a, b);

  return myPrint(a, b, result);
}

console.log(myPow(3, 4, myPrint)); // 3^4=81
console.log(myPow(2, 3, myPrint)); // 2^3=8
console.log(myPow(2, 0, myPrint)); // 2^0=1
console.log(myPow(2, -2, myPrint)); // 2^-2=0.25

console.log("\n\nTask 4\n\n");

/*
 * #4
 * Створіть функцію myMax(arr), яка як параметр приймає
 * довільний числовий масив і повертає максимальне число з переданого їй масиву.
 * У реалізації функції має бути застосовано метод Math.max() і apply().
 */

const list = [12, 23, 100, 34, 56, 9, 233];

// console.log(Math.max(...list));

// function myMax(arr) {
//   let maxVal = 0;
//   for (val of arr) {
//     if (val > maxVal) {
//       maxVal = val;
//     }
//   }
//   return maxVal;
// }

const myMax = (arr) => {
  return Math.max.apply(null, arr);
};

console.log(myMax(list)); // 233

console.log("\n\nTask 5\n\n");
/*
 * #5
 *
 * Створіть функцію myMul(a, b), яка буде множити числа а і b, повертаючи результат.
 */

const myMul = (a, b) => {
  return a * b;
};

/*
 * Створіть функції myDouble(n), яка приймає один параметр і подвоює його.
 * Використовувати множення або інші математичні операції всередині функції - заборонено, тільки bind() і myMul().
 * Функція повертає результат обчислення.
 */

const myDouble = myMul.bind(null, 2);

console.log(myDouble(3)); // = myMul(2, 3) = 6
console.log(myDouble(4)); // = myMul(2, 4) = 8
console.log(myDouble(5)); // = myMul(2, 5) = 10

// Аналогічним чином створюємо функцію myTriple(n), яка потроює параметр, що приймає, повертаючи результат.

const myTriple = myMul.bind(null, 3);

console.log(myTriple(3)); // = myMul(3, 3) = 9
console.log(myTriple(4)); // = myMul(3, 4) = 12
console.log(myTriple(5)); // = myMul(3, 5) = 15

// export { counter, counterFactory, myPow, myMax, myMul, myDouble, myTriple };
