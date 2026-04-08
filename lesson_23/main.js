console.log("#6. JavaScript homework example file");

/*
 * #1
 * Задача: Калькулятор калорійності продуктів через клас.
 * Завдання: Розробити модуль на JavaScript, який імплементує клас CalorieCalculator. Клас має використовувати Map для управління даними про калорійність продуктів. Необхідно реалізувати наступні функціональності:
 * Додавання продуктів: Метод addProduct приймає назву продукту та його калорійність, додаючи їх до колекції.
 * Отримання калорійності продукту: Метод getProductCalories повертає калорійність продукту за його назвою. Якщо продукт не знайдено, повертає рядок 'Product not found'.
 * Видалення продукту: Метод removeProduct видаляє продукт з колекції за назвою.
 *
 * Критерії перевірки:
 * Клас CalorieCalculator має бути реалізований з використанням ключового слова class.
 * Внутрішнє сховище продуктів має бути реалізоване за допомогою new Map().
 * Наявність методів addProduct, getProductCalories, та removeProduct.
 */

class CalorieCalculator {
  constructor() {
    this.productsMap = new Map();
  }

  static describeSelf() {
    return console.log("I am a safe for your nutirtious food! Just create a new instance of me and let's get rolling!");
  }

  #normalize(product) {
    return product.trim().toLowerCase();
  }

  addProduct(product, calories) {
    product = this.#normalize(product);
    if (this.productsMap.has(product)) {
      const shouldOverwrite = confirm(`The product '${product}' already exists! Do you want to overwrite it?`);

      if (!shouldOverwrite) {
        console.log("Product was NOT added");
        return;
      }
    }
    this.productsMap.set(product, calories);
    console.log(`The product '${product}' (${calories} kcal) has been added!`);
  }

  getProductCalories(product) {
    product = this.#normalize(product);
    const calories = this.productsMap.get(product);

    if (calories) {
      console.log(`The calories of the ${product} is ${calories} kcal.`);
      return calories;
    } else {
      console.log(`The product '${product}' does not exist!`);
    }
  }

  removeProduct(product) {
    product = this.#normalize(product);

    if (this.productsMap.has(product)) {
      const calories = this.productsMap.delete(product);
      console.log(`The product '${product}' has been removed.`);
    } else {
      console.log(`The product '${product}' does not exist!`);
    }
  }
}

// Демонстрація використання
console.log("Task 1\n--------------------------------------------------------------");
const calorieCalculator = new CalorieCalculator();
calorieCalculator.addProduct("Apple", 52);
console.log(calorieCalculator.productsMap);
calorieCalculator.getProductCalories("Apple");
calorieCalculator.addProduct("Banana", 89);
//
calorieCalculator.getProductCalories("Apple"); // 52
calorieCalculator.getProductCalories("Banana"); // 89
//
calorieCalculator.removeProduct("Apple");
console.log(calorieCalculator.getProductCalories("Apple")); // Product not found

/*
 * #2
 * Задача: Унікальні користувачі.
 * Завдання: Реалізувати модуль на JavaScript у формі класу UniqueUsernames, який використовує Set для збереження унікальних імен користувачів. Клас має надавати можливість:
 * Додавання імен користувачів: Метод addUser дозволяє додати нове ім'я до набору. Якщо ім'я вже існує, воно не буде додано повторно, зберігаючи унікальність імен у наборі.
 * Перевірка наявності імені: Метод exists перевіряє, чи існує задане ім'я серед збережених унікальних імен.
 * Отримання кількості унікальних імен: Метод count повертає кількість унікальних імен, збережених у наборі.
 *
 * Критерії перевірки:
 * Наявність методів addUser, exists, count у класі UniqueUsernames.
 * Використання конструкції class для створення класу UniqueUsernames.
 * Застосування new Set() для внутрішнього сховища імен користувачів у конструкторі класу.
 */

class UniqueUsernames {
  constructor() {
    this.users = new Set();
  }

  addUser(username) {
    if (this.exists(username)) {
      console.log(`The user ${username} already exists.`);
    } else {
      this.users.add(username);
    }
  }

  exists(username) {
    return this.users.has(username);
  }

  count() {
    return this.users.size;
  }
}

// Демонстрація використання
console.log("Task 2\n--------------------------------------------------------------");
const uniqueUsernames = new UniqueUsernames();
uniqueUsernames.addUser("john_doe");
uniqueUsernames.addUser("jane_doe");
uniqueUsernames.addUser("john_doe"); // Ця дія не змінить набір, оскільки 'john_doe' вже існує
//
console.log(`Існує 'john_doe': ${uniqueUsernames.exists("john_doe")}`); // true
console.log(`Кількість унікальних імен: ${uniqueUsernames.count()}`); // 2

console.log(uniqueUsernames);

// Експорт для використання в тестах
// export { CalorieCalculator, UniqueUsernames }
