/*
문제 : 문제 서술



*/

// -----------------------------------------------------------------------------------------

/*
풀이 : 문제 풀이 
*/

export function solution() {
  let str = 10;
  let weed = [9, 19, 20, 50, 80, 50, 20, 140];

  weed.forEach((el) => {
    if (str >= el) {
      str += el;
    } else {
      console.log(-1);
    }
  });

  return str;
}
