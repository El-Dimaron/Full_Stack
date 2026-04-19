console.log("#9. JavaScript homework example file");

/*
 * #1
 *
 * Задача: Відстежування кліку на кнопку та виведення повідомлення
 * Мета: Розробити функцію, яка призначає обробник події кліку на кнопку з певним ID і виводить у консоль заздалегідь визначене повідомлення при кожному кліку на кнопку.
 *
 * Вимоги:
 * 1. Функція має приймати два параметри:
 *    - buttonId (рядок) - ID кнопки, на яку потрібно встановити обробник події.
 *    - message (рядок) - повідомлення, яке буде виводитись у консоль при кліку на кнопку.
 * 2. Функція має знайти кнопку за допомогою buttonId і призначити їй обробник події кліку.
 * 3. При кліку на кнопку у консоль має виводитись задане message.
 * 4. Функція має бути експортована для подальшого використання і тестування.
 *
 */

function handleButtonClick(buttonId, message) {
  const button = document.querySelector(`#${buttonId}`);
  button.addEventListener("click", function () {
    console.log(message);
  });
}

// const button = document.querySelector(".myButton");
// button.addEventListener("click", function () {
//   console.log("Button clicked!");
// });

// Демонстрація використання функції (припустимо, що HTML містить кнопку з ID 'myButton')
handleButtonClick("myButton", "Button clicked!");

/*
 * #2
 *
 * Задача: Розробка функції відстеження позиції курсору миші
 * Мета: Створити функцію trackMousePosition, яка встановлює обробник події для відстеження руху миші по документу та виводить в консоль координати курсору миші (X та Y).
 *
 * Вимоги до реалізації:
 * 1. Функціональність: Функція має відслідковувати рух миші по документу. При кожному русі миші функція має виводити в консоль координати clientX та clientY, які представляють позицію курсору відносно вікна переглядача.
 * 2. Реєстрація обробника події: Функція має використовувати document.addEventListener для реєстрації обробника події mousemove.
 * 3. Вивід даних: При спрацьовуванні події mousemove, функція має виводити рядок у форматі `"Mouse X: [X], Mouse Y: [Y]"`, де `[X]` та `[Y]` - це відповідні координати курсору миші.
 *
 */

function trackMousePosition(interval = 1) {
  let mouseX = 0;
  let mouseY = 0;

  interval *= 1000;

  const mouseHandler = function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  const keyHandler = function (key) {
    if (key.key === "Escape") {
      document.removeEventListener("keydown", keyHandler);
      document.removeEventListener("mousemove", mouseHandler);
      clearInterval(timer);
      console.log("Mouse tracking stopped.");
    }
  };

  const timer = setInterval(function () {
    console.log(`"Mouse X: [${mouseX}], Mouse Y: [${mouseY}]"`);
  }, interval);

  document.addEventListener("keydown", keyHandler);
  document.addEventListener("mousemove", mouseHandler);
}

console.log(trackMousePosition());

/*
 * #3
 *
 * Задача: Реалізація делегування подій для відстеження кліків на елементах списку
 * Мета: Створити функцію setupEventDelegation, яка дозволить встановити обробник подій на весь список, замість окремих елементів `<li>`. Функція повинна відстежувати кліки на елементах <li> у межах заданого списку і логувати текст "Item clicked: [Текст Елемента]", де "[Текст Елемента]" - це текст клікнутого елемента `<li>`, в консоль.
 *
 * Вимоги до реалізації:
 * 1. Вибір елемента списку: Функція повинна приймати селектор CSS як аргумент, що вказує на елемент списку `<ul>` або `<ol>`, до якого буде застосовано делегування подій.
 * 2. Встановлення обробника подій: Використовуючи метод addEventListener, функція має додати обробник для події `click` на весь список. Обробник повинен спрацьовувати при кліку на будь-який з елементів `<li>` у цьому списку.
 * 3. Логування кліків: Коли елемент <li> клікнуто, функція має вивести у консоль повідомлення у форматі "Item clicked: [Текст Елемента]", де "[Текст Елемента]" має бути текстом клікнутого елемента <li>. Текст елемента має бути обрізаним trim(), щоб видалити зайві пробіли на початку та в кінці.
 *
 */

// function createTestList() {
//   document.body.innerHTML = `
//     <ul id="testList">
//       <li>Item 1</li>
//       <li>Item 2</li>
//       <li>Item 3</li>
//     </ul>
//     `;
// }
// createTestList();

function setupEventDelegation(selector) {
  const list = document.querySelector(selector);
  list.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      console.log(`Item clicked: [${event.target.innerText}]`);
    }
  });
}

setupEventDelegation("#testList");

// Експорт функції для використання та тестування
// export { handleButtonClick, trackMousePosition, setupEventDelegation }
