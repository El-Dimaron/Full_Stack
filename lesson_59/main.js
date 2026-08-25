console.log("#59. JavaScript homework example file");

/*
 *
 * #1
 *
 * Технічне завдання для розробки функції "compressFile"
 *
 * Задача:
 * Розробити асинхронну функцію, що використовує алгоритм Gzip для компресії заданого файлу.
 * Функція має генерувати унікальне ім'я для компресованого файлу, якщо файл з таким іменем вже існує,
 * та забезпечувати високий рівень надійності та безпеки процесу компресії.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *    - `filePath`: Шлях до файлу, який потрібно компресувати.
 *
 * 2. Вихідні дані:
 *    - Функція повертає шлях до компресованого файлу як рядок.
 *
 * 3. Унікальність:
 *    - Перевірка наявності існуючих файлів з таким самим іменем і створення унікального імені файлу
 *      шляхом додавання номера до існуючого імені, якщо необхідно.
 *
 * 4. Обробка помилок:
 *    - Функція має ідентифікувати та коректно обробляти помилки читання, запису та доступу до файлів.
 *    - В разі помилок, функція має повертати відповідні повідомлення про помилку або коди помилок,
 *      що дозволяють користувачеві або іншим частинам програми адекватно реагувати на такі ситуації.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), включаючи асинхронні функції, стрімове API Node.js, та ESM
 *   для легкої інтеграції та тестування.
 * - Функція має бути написана таким чином, щоб її можна було експортувати та використовувати в інших частинах програми
 *   або тестових сценаріях.
 * - Забезпечення документації коду з описом параметрів, процесу роботи, виключень, які можуть бути сгенеровані,
 *   та прикладами використання.
 * - Підготовка функції для можливості легкого мокування та тестування за допомогою JEST.
 *
 */

import zlib from "zlib";
import { promisify } from "util";
import fs from "fs/promises";

async function checkFile(filePath) {
  try {
    await fs.access(filePath);
    // console.log("Файл існує");
    return true;
  } catch {
    // console.log("Файл не існує.");
    return false;
  }
}

function uniqueFilePath(filePath, extensionsNumber = 1) {
  let filePathArray = filePath.split(".");

  const startIndex = -1 - extensionsNumber;
  const endIndex = 0 - extensionsNumber;

  let fileName = filePathArray.slice(startIndex, endIndex).toString();

  const newFileName = fileName;

  const reversed = newFileName.split("").reverse().join("");

  let parsedNum = Number.parseInt(reversed);

  parsedNum = Number.parseInt(parsedNum.toString().split("").reverse().join(""));

  const fileNameIndex = filePathArray.indexOf(fileName);
  let currentNum = 1;
  let parsedNumLen = 0;

  if (parsedNum) {
    currentNum = parsedNum + 1;
    parsedNumLen = parsedNum.toString().length;
    fileName = fileName.slice(0, -parsedNumLen) + currentNum;
  } else {
    fileName = fileName + currentNum;
  }

  filePathArray.splice(fileNameIndex, 1, fileName);

  const newFilePath = filePathArray.join(".");
  return newFilePath;
}

const gzip = promisify(zlib.gzip);

async function compressFile(filePath) {
  const fileExists = await checkFile(filePath);

  if (!fileExists) {
    return console.error(`There is no file at "${filePath}"`);
  }

  const file = await fs.readFile(filePath);

  const compressed = await gzip(file);

  let compressedFilePath = filePath + ".gz";

  let compressedFileExists = await checkFile(compressedFilePath);

  while (compressedFileExists) {
    compressedFilePath = uniqueFilePath(compressedFilePath, 2);
    compressedFileExists = await checkFile(compressedFilePath);
  }

  await fs.writeFile(compressedFilePath, compressed);

  return compressedFilePath;
}

const filePath = "./example.txt";
// const compressedFilePath = await compressFile(filePath).catch(console.error);

/*
 *
 * #2
 *
 * Технічне завдання для розробки функції "decompressFile"
 *
 * Задача:
 * Розробити асинхронну функцію, яка використовує алгоритм Gzip для розпакування заданого компресованого файлу у вказане місце збереження. Функція має генерувати унікальне ім'я для розпакованого файлу, якщо файл з таким іменем вже існує, та забезпечувати високий рівень надійності та безпеки процесу розпакування.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - `compressedFilePath`: Шлях до компресованого файлу, який потрібно розпакувати.
 *  - `destinationFilePath`: Шлях, де буде збережено розпакований файл.
 *
 * 2. Вихідні дані:
 *  - Функція повертає шлях до розпакованого файлу як рядок.
 *
 * 3. Унікальність:
 *  - Перевірка наявності існуючих файлів з таким самим іменем і створення унікального імені файлу шляхом додавання номера до існуючого імені, якщо необхідно.
 *
 * 4. Обробка помилок:
 *  - Функція має ідентифікувати та коректно обробляти помилки читання, запису та доступу до файлів.
 *  - В разі помилок, функція має повертати відповідні повідомлення про помилку або коди помилок,
 *    що дозволяють користувачеві або іншим частинам програми адекватно реагувати на такі ситуації.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), включаючи асинхронні функції, стрімове API Node.js, та ESM для легкої інтеграції та тестування.
 * - Функція має бути написана таким чином, щоб її можна було експортувати та використовувати в інших частинах програми або тестових сценаріях.
 * - Забезпечення документації коду з описом параметрів, процесу роботи, виключень, які можуть бути сгенеровані, та прикладами використання.
 * - Підготовка функції для можливості легкого мокування та тестування за допомогою JEST.
 *
 */

const gunzip = promisify(zlib.gunzip);

async function decompressFile(compressedFilePath, destinationFilePath) {
  const compressedFile = await fs.readFile(compressedFilePath);

  const decompressed = await gunzip(compressedFile);

  let decompressedFileExists = await checkFile(destinationFilePath);

  while (decompressedFileExists) {
    destinationFilePath = uniqueFilePath(destinationFilePath);
    decompressedFileExists = await checkFile(destinationFilePath);
  }

  await fs.writeFile(destinationFilePath, decompressed);

  return destinationFilePath;
}

// decompressFile(compressedFilePath, "./source_decompressed.txt").catch(console.error);

// ! Перевірка роботи функцій стиснення та розпакування файлів
async function performCompressionAndDecompression() {
  try {
    const compressedResult = await compressFile("./files/source.txt");
    console.log(compressedResult);
    const decompressedResult = await decompressFile(compressedResult, "./files/source_decompressed.txt");
    console.log(decompressedResult);
  } catch (error) {
    console.error("Error during compression or decompression:", error);
  }
}
performCompressionAndDecompression();

export { compressFile, decompressFile };
