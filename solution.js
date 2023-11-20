function generatePermutations(inputString) {
  const permutations = [];

  function permute(current, remaining) {
    if (remaining.length === 0) {
      permutations.push(current.substring(0, current.length - 1));
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const nextCurrent = current + remaining[i] + ' ';
      const nextRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
      permute(nextCurrent, nextRemaining);
    }
  }

  permute('', inputString);
  return permutations;
}

const makePairs = (arr) => {
  const pairs = [
    arr.join(''),
    `(${arr.slice(0, 3).join('')})${arr.slice(3).join('')}`,
    `(${arr.slice(0, 5).join('')})${arr.slice(5).join('')}`,
    `(${arr.slice(0, 3).join('')})${arr.slice(3, 4).join('')}(${arr.slice(4).join('')})`,
    `${arr.slice(0, 2).join('')}(${arr.slice(2, 5).join('')})${arr.slice(5).join('')}`,
    `${arr.slice(0, 2).join('')}(${arr.slice(2).join('')})`,
    `${arr.slice(0, 4).join('')}(${arr.slice(4).join('')})`,
  ];

  return pairs;
}

const solve = (n) => {
  return eval(n);
}

function solve24 (numStr) {
  // let operands = numStr.split('');
  const operators = ['+', '-', '/', '*'];

  let operandsCombo = {};

  let possible = generatePermutations(numStr);
  possible.forEach((val) => {
    if(!operandsCombo[val]) {
      operandsCombo[val] = val.split('');
    }
  });

  for(const keys in operandsCombo) {
    let expressionCombo = [];
    for(let i = 0; i < 64; i++) {
      let arr = [...operandsCombo[keys]];
      let bb = i.toString(4);
      while(bb.length < 3) {
        bb = '0'+bb;
      }

      arr[1] = operators[Number(bb[0])];
      arr[3] = operators[Number(bb[1])];
      arr[5] = operators[Number(bb[2])];
      expressionCombo.push(arr);
    }
    operandsCombo[keys] = expressionCombo;
  }

  let ans = 0;
  for(const keys in operandsCombo) {
    if(ans) {break;}
    for(let t = 0; t < operandsCombo[keys].length; t++) {
      if(ans) break;
      const arr = makePairs(operandsCombo[keys][t]);
      for(let i = 0; i < 7; i++) {
        if(solve(arr[i]) == 24) {
          ans = arr[i];
          return arr[i];
        }
      }
    }
  }
  // console.log(ans);
  return ans ? ans :"no solution exists";
}
