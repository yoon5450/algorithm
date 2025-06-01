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

  for(let i = 0; i < weed.length; i++){
    if (str >= weed[i]) {
      str += weed[i];
    } else {
       str = -1;
       break;
    }
  };
  aa
  return str;
}
