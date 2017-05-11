//16.10
function findPopulationBoom(people) {
  var dateMap = new HashMap();
  var maxPop = 0, boomRange = [], curPop = 0, curRange;
  people.forEach( function (person) {
    if (!dateMap.has(person.birth)) {
      dateMap.set(person.birth, 0);
    }
    if (!dateMap.has(person.death + 1)) {
      dateMap.set(person.death + 1, 0);
    }
    dateMap.set(person.birth, dateMap.get(person.birth) + 1);
    dateMap.set(person.death + 1, dateMap.get(person.death + 1) + 1);

  }
  var timeline = sort(Array.from(dateMap.keys()));
  for (var i = 0; i < timeline.length; i++) {
    curPop += dateMap.get(timeline[i]);
    if (curPop > maxPop) {
      maxPop = curPop;
      boomRange = 0;
    }
    if (curPop == maxPop) {
      curRange = [timeline[i], timeline[i + 1 >= timeline.length ? i : i + 1]];
      boomRange.add(curRange);
    }
  }
  return boomRange;
}

// 16.17
function maxSum(array) {
  var curSum = 0, maxSum = 0;
  array.forEach( function (num) {
    curSum += num;
    maxSum = Math.max(curSum, maxSum);
    curSum = Math.max(curSum, 0);
  });
  return maxSum;
}

// 16.17 Tests
tests =
[
  [[1, -2, 0, 5, 2, 3, -4], 10],
  [[-1, -2, -3, -4, -5, 0], 0],
  [[1, 2, 3, 4, 5], 15]
]

tests.forEach( function (test, index, array) {
  var sum = maxSum(test[0]);
  var result = sum == test[1];
  console.log(`16.17 test${index + 1}: ${result}`);
});

// 16.24
function printAllPairs(a, sum) {
  var complement, map = new Map(), printNum = 0;
  a.forEach(function (num) {
      if (!map.has(num)) {
        map.set(num, 0);
      }
      map.set(num, map.get(num) + 1);
  });
  map.forEach( function (numCount, num, numMap) {
    complement = sum - num;
    printNum = 0;
    if (num == complement) {
      printNum = getNumCombinations(numCount, 2);
    } else if (num < complement && map.has(complement)) {
      printNum = numCount * map.get(complement);
    }
    for (var i = 0; i < printNum; i++) {
      console.log(`${num} + ${complement} = ${sum}`);
    }
  });
}

function getNumCombinations(n, r) {
  if (n < r) {
    return 0;
  }
  var count = 0, numCombinations = 1;
  while ((n - count) > r) {
    numCombinations *= n - count;
    count++;
  }
  numCombinations /= factorial(r);
  return numCombinations;
}

function factorial(number) {
  if (number == 0) {
    return 1;
  } else if (number < 0) {
    return undefined;
  } else {
    return number * factorial(number - 1);
  }
}

tests =
[
  [[3, 3, 4, 6], 7],
  [[3, 3, 3, 3, 4, 6, 0, 2, 2], 6],
  [[3, 3, 3, 3, 4, 6, 8, -2, 2], 6],
  [[0, 0, 0, 0], 1],
  [[-1, 1, 0, 5, 6, 7], 0]
]
tests.forEach( function (test) {
  console.log(`The array is: ${test[0]}`);
  console.log(`The sum is: ${test[1]}`);
  printAllPairs(test[0], test[1]);
});
