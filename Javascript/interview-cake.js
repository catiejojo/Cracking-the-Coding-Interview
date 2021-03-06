var colors = require('colors');
/*
  #1 | Trading Apple Stocks
  Write an efficient function that takes stockPricesYesterday and returns
  the best profit I could have made from 1 purchase and 1 sale of stock.
*/
function getBestTrade(prices) {
    if (prices.length < 2) {
      throw new Error("Getting a profit requires at least 2 prices");
    }
    var bestTrade = prices[1] - prices[0], bestBuy = prices[0];
    for (var i = 1; i < prices.length; i++) {
        if (prices[i] - bestBuy > bestTrade) {
            bestTrade = prices[i] - bestBuy;
        }
        bestBuy = Math.min(bestBuy, prices[i]);
    }
    return bestTrade;
}

/*
  #2 | Array of Products
  Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of
  integers and returns an array of the products.
  Example: [1, 7, 3, 4] --> [84, 12, 28, 21]
*/
function getProductsOfAllIntsExceptAtIndex (ints) {
    if (ints.length < 2) {
        throw new Error("Getting the product of numbers at other indices requires at least 2 numbers");
    }
    var products = [], curProduct = 1;
    for (var i = 0; i < ints.length; i++) {
        products[i] = curProduct;
        curProduct *= ints[i];
    }
    curProduct = 1;
    for (var j = ints.length - 1; j >= 0; j--) {
        products[j] *= curProduct;
        curProduct *= ints[j];
    }
    return products;
}

// Bonus: What if you could use division?
function getProductsOfAllIntsExceptAtIndex2 (ints) {
  var zeroLocations = [], productWithoutZeros = 1, products = [];
  for (var i = 0; i < ints.length; i++) {
    if (ints[i] == 0) {
      zeroLocations.push(i);
    }
    productWithoutZeros *= ints[i];
  }
  finalProduct = zeroLocations.length == 0 ? productWithoutZeros : 0;
  for (var j = 0; j < ints.length; j++) {
    products[j] = finalProduct/ints[j];
  }
  if (zeroLocations.length == 1) {
    products[zeroLocations[0]] = productWithoutZeros;
  }
  return products;
}

/*
  #15 | Fibonacci
  Write a function fib() that a takes an integer nn and returns the
  nth fibonacci number.
  Example: 0 -> 0, 1 -> 1, 2 -> 1, 3 -> 3, 4 -> 5 ...
*/
function fastFib(n) {
    var bitMap = [], matrix = [[1, 1], [1, 0]], fib = [[1, 0], [0, 1]];
    while (n > 0) {
        bitMap.push(n % 2);
        n >>= 1;
    }
    for (var i = 0; i < bitMap.length; i++) {
        if (bitMap[i] == 1) {
            fib = matrixMult(fib, matrix);
        }
		    matrix = matrixMult(matrix, matrix);
    }
    return fib[0][1];
}

// Note: this is not fast enough, but it gets the job done.
function matrixMult(m1, m2) {
	var m00 = m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0];
	var m01 = m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1];
	var m10 = m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0];
	var m11 = m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1];
  return [[m00, m01], [m10, m11]];
}

// Bottom-up approach. O(n) time, O(1) space.
function fib(num) {
    if (num < 2) {
        return num;
    }
    var counter = 2;
    var fib = 1, fibMinus1 = 1, fibMinus2 = 1;
    while (counter < num) {
        fib = fibMinus1 + fibMinus2;
        fibMinus2 = fibMinus1;
        fibMinus1 = fib;
        counter++
    }
    return fib;
}

// Earlier, recursive option. Also technically O(n), but evaluates
// to (2 * n) - 1 calls in avg. case. Also O(n) space with hash table
// and call stack.
function recursiveFib(num) {
    var memo = new Map();
    memo.set(0, 0);
    memo.set(1, 1);
    return tellFib(num, memo);
}

function tellFib(num, memo) {
    if (memo.has(num)) {
        return memo.get(num);
    }
    var fib = tellFib(num - 1, memo) + tellFib(num - 2, memo);
    memo.set(num, fib);
    return fib;
}

function benchmarkFib() {
  var randomizer = randomizerWithBound(1000000, 10000000);
  for (var i = 0; i < 10; i++) {
    var fibTest = randomizer();
    console.log(`Compute the ${fibTest}th fibonacci number`.magenta);
    console.time("Bottom Up")
    var bottomUp = fib(fibTest);
    console.timeEnd("Bottom Up")
    console.time("Matrix exponentiation")
    var fast = fastFib(fibTest);
    console.timeEnd("Matrix exponentiation")
    console.log();
  }
}

function randomizerWithBound(lowerBound, upperBound) {
  var randomizer = function () {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
  }
  return randomizer;
}

benchmarkFib();


function createMemo(x, y) {
    var memo = new Array(x);
    for (var i = 0; i < x; i++) {
        memo[i] = new Array(y);
    }
    return memo;
}

function makeChange(amt, denoms) {
    var memo = createMemo(amt, denoms.length);
    denoms = denoms.sort()
    if (amt <= 0 || denoms.length == 0) {
        throw new Error("You don't have any money!");
    }
    var total = getNumCombos(amt, denoms, memo);
    return total;
}

function getNumCombos(amt, denoms, memo, memoRowSize) {
    var total = 0;
    if (amt == 0) {
        return 1;
    } else if (amt < denoms[0]) {
        return 0;
    }
    if (memo[amt - 1][denoms.length - 1] != null) {
        return memo[amt - 1][denoms.length - 1];
    }

    for (var i = 0; i < denoms.length; i++) {
        if (amt >= denoms[i]) {
    		totalCallsAscending++;
        	total += getNumCombos(amt - denoms[i], denoms.slice(i), memo, memoRowSize);
        }
    }
    memo[amt - 1][denoms.length - 1] = total;
    return total;
}
