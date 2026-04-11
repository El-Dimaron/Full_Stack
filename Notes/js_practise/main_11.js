function raffleOdds(totals, purchased) {
  let loseNum = 1;
  let loseDen = 1;

  for (let i = 0; i < totals.length; i++) {
    loseNum = loseNum * (totals[i] - purchased[i]);
    loseDen = loseDen * totals[i];
  }

  console.log(loseNum);
  console.log(loseDen);

  let winNum = loseDen - loseNum;
  let winDen = loseDen;

  return `${winNum}/${winDen}`;
}

console.log(raffleOdds([4, 4], [1, 1]));
console.log(raffleOdds([2, 3, 6], [1, 1, 1]));

// 1/2 * 1/3 * 1/6
// 1/2 * 2/3 * 5/6
