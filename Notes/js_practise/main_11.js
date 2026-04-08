function countBrackets(data) {
  if (!data || !data.includes(")")) {
    return false;
  }

  let openBrackets = 0,
    closeBrackets = 0;
  for (let i of data) {
    if (i === "(") {
      openBrackets += 1;
    } else if (i === ")") {
      closeBrackets += 1;
    }
  }
  return openBrackets === closeBrackets;
}

console.log(countBrackets("(( ))"));
console.log(countBrackets("(( )"));
console.log(countBrackets("abc ) def ( 123 @#$ ()"));
