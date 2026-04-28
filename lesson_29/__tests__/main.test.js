const main = require("../main");

// Run tests with:
//  npm test
//  npm run test:watch

// Age decipher

test("Negative numbers", () => {
  const negativeNumbers = [-1, -27, -2500];
  negativeNumbers.forEach((element) => {
    expect(main.ageClassification(element)).toBeNull();
  });
});

// Тест Zero не виконується. Логіка функції неправильна. Якщо ми хочемо очікувати null при аргументі 0, необхідно виправити код: return num < 1 ? null
// Або, як на мене, кращий варіант: return num <= 0 ? null

test("Zero", () => {
  expect(main.ageClassification(0)).toBeNull();
});

test("Out of Range Positive Numbers", () => {
  const positiveNumbers = [122.01, 150, 2000];

  positiveNumbers.forEach((element) => {
    expect(main.ageClassification(element)).toBeNull();
  });
});

test("Operational cases", () => {
  expect(main.ageClassification(1)).toBe("Дитинство");
  expect(main.ageClassification(24)).toBe("Дитинство");
  expect(main.ageClassification(24.01)).toBe("Молодість");
  expect(main.ageClassification(44)).toBe("Молодість");
  expect(main.ageClassification(44.01)).toBe("Зрілість");
  expect(main.ageClassification(65)).toBe("Зрілість");
  expect(main.ageClassification(65.1)).toBe("Старість");
  expect(main.ageClassification(75)).toBe("Старість");
  expect(main.ageClassification(75.01)).toBe("Довголіття");
  expect(main.ageClassification(90)).toBe("Довголіття");
  expect(main.ageClassification(90.01)).toBe("Рекорд");
  expect(main.ageClassification(122)).toBe("Рекорд");
});

test("Wrong data type", () => {
  expect(main.ageClassification("I love unity tests!")).toBeNull();
});

// Weekdays

test("Out of Range Numbers", () => {
  const outOfRangeNumbers = [9, 100, -10];

  outOfRangeNumbers.forEach((element) => {
    expect(main.weekFn(element)).toBeNull();
  });
});

test("Float Numbers", () => {
  expect(main.weekFn(1.5)).toBeNull();
});

test("Wrong data type", () => {
  expect(main.weekFn("2")).toBeNull();
});

test("Operational cases", () => {
  expect(main.weekFn(1)).toBe("Понеділок");
  expect(main.weekFn(3)).toBe("Середа");
  expect(main.weekFn(5)).toBe("П'ятниця");
});
