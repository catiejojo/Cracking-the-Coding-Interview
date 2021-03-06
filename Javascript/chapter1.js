// 1.1 First Stab
function stringIsUnique(str) {
  var charSet = {};
  var i, len, ch;
  for (i = 0, len = str.length; i < len; i++) {
    ch = str.charAt(i);
    if (charSet[ch] != undefined) {
      return false;
    }
    charSet[ch] = 1;
  }
  return true;
}

// 1.1 Using a set
function stringIsUnique2(str) {
  var charSet = new Set();
  var i, len, ch;
  for (i = 0, len = str.length; i < len; i++) {
    charSet.add(str.charAt(i));
  }
  return charSet.size == str.length;
}

// 1.1 Without additional data structures
function stringIsUnique3(str) {
  var marker = 0;
  var len = str.length;
  var i, ch;
  while (marker < len - 1) {
    ch = str.charAt(marker);
    for (i = marker + 1; i < len; i++) {
      if (ch == str.charAt(i)) {
        return false;
      }
    }
    marker++;
  }
  return true;
}

// 1.1 Tests
console.log("***** 1.1 *****");
var tests = ["hello", "abc", " ", " :D ", "abc123#$% ijk)(*&^"];
tests.forEach(function(test) {
  console.log("\"" + test + "\": " + stringIsUnique(test));
  console.log("\"" + test + "\": " + stringIsUnique2(test));
  console.log("\"" + test + "\": " + stringIsUnique3(test));
});

//TODO: sort characters using O(nlogn) sorting algorithm.

// 1.2 First Stab
function getMap(str) {
  var charMap = new Map();
  var i, len, ch;
  for (i = 0, len = str.length; i < len; i++) {
    ch = str.charAt(i);
    if (!charMap.has(ch)) {
      charMap.set(ch, 0);
    }
    charMap.set(ch, charMap.get(ch) + 1);
  }
  return charMap;
}
function stringsArePermutations(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }
  var map1 = getMap(str1);
  var map2 = getMap(str2);
  var i, len, ch;
  for (i = 0, len = str1.length; i < len; i++) {
    if (map1[str1.charAt(i)] != map2[str1.charAt(i)]) {
      return false;
    }
  }
  return true;
}

// 1.2 Tests
console.log("***** 1.2 *****");
var tests = [["banana", "ananab"], ["abc", " "], ["abc123#$% ijk)(*&^", "abc"]];
tests.forEach(function(test) {
  console.log("\"" + test[0] + "\" and \"" + test[1] + "\": " + stringsArePermutations(test[0], test[1]));
});

// 1.3 First Stab
function URLify(str) {
  var url = "";
  var len, i, ch;
  for (i = 0, len = str.length; i < len; i++) {
    ch = str.charAt(i);
    if (ch == ' ') {
      url += "%20";
    } else {
      url += ch;
    }
  }
  return url;
}

// 1.3 in place
// Strings in js are apparently immutable, so there isn't a clear way to do this in-place.
function URLify2(str) {
  return str.replace(/ /g, "%20");
}

// 1.3 Tests
console.log("***** 1.3 *****");
var tests = ["hello there", "abc", " ", "", "hello  there"];
tests.forEach(function(test) {
  console.log("\"" + test + "\": " + URLify(test));
  console.log("\"" + test + "\": " + URLify2(test));
});

// 1.4 First Stab
// Good questions to ask with this type of question:
// * Does case matter?
// * Spaces don't normally count in palindromes. Do they count here?
function palindromePermutation(str) {
  // Remove spaces and capital letters
  var possiblePalindrome = str.toLowerCase().replace(/ /g, "");
  var map = getMap(possiblePalindrome);
  var numberOfOddEntries = 0
  map.forEach(function(value, key, map) {
    if (value % 2 != 0) {
      numberOfOddEntries++;
    }
  });
  return numberOfOddEntries <= 1;
}

// 1.4 using Array.every
function palindromePermutation2(str) {
  // Remove spaces and capital letters
  var possiblePalindrome = str.toLowerCase().replace(/ /g, "");
  var map = getMap(possiblePalindrome);
  var numberOfOddEntries = 0
  var palArray = Array.from(map.values());
  var isPalindrome = palArray.every(function(value, index, array) {
    if (value % 2 != 0) {
      numberOfOddEntries++;
    }
    return numberOfOddEntries <= 1;
  });
  return isPalindrome;
}

// 1.4 Tests
console.log("***** 1.4 *****");
var tests = ["Tact coa", "abc"];
tests.forEach(function(test) {
  console.log("\"" + test + "\": " + palindromePermutation(test));
  console.log("\"" + test + "\": " + palindromePermutation2(test));
});

// 1.5 First Stab
// Things I learned in this problem:
// * Calling charAt() with an invalid index returns the empty string
// * substring() still works with invalid indices
// * substring()'s end argument is optional, and defaults to the end of the string
// * substring() is start (inclusive) to end (exclusive)
// * substring() is start (inclusive) to end (exclusive)
// * This algorithm is using the Levenshtein distance definition
function isOneAway(str1, str2) {
  var shorter, longer, i;
  if (str1.length > str2.length) {
    longer = str1;
    shorter = str2;
  } else {
    longer = str2;
    shorter = str1;
  }
  if (longer.length - shorter.length > 1) {
    // Avoid running the loop if there's no way the strings are equal
    return false;
  }
  for (i = 0; i < longer.length; i++) {
    if (shorter.charAt(i) != longer.charAt(i)) {
      if (longer.length == shorter.length) {
        // Treat as a character replace
        return (shorter.substring(i + 1) == longer.substring(i + 1))
      } else {
        // Treat as a charcter insertion into the longer string
        return (shorter.substring(i) == longer.substring(i + 1));
      }
    }
  }
  return true;
}

// 1.5 Related problem (not from the book)
// Find the (Levenshtein) edit distance between two strings.
//FIXME
function stringEditDistance(str1, str2) {
  var shorter, longer, i;
  if (str1.length > str2.length) {
    longer = str1;
    shorter = str2;
  } else {
    longer = str2;
    shorter = str1;
  }
  for (i = 0; i < longer.length; i++) {
    if (shorter.charAt(i) != longer.charAt(i)) {
      if (longer.length == shorter.length) {
        // Treat as a character replace
        return 1 + stringEditDistance(shorter.substring(i + 1), longer.substring(i + 1))
      } else {
        // Treat as a charcter insertion into the longer string
        return 1 + stringEditDistance(shorter.substring(i), longer.substring(i + 1));
      }
    }
  }
  return 0;
}

// TODO: function that returns words (in a given dictionary) that are closest..
// * create a try
// * when you traverse the try, you branch out
//     c
//  a    o
// b t  w
//
// cob -> cab, cow
// cb -> cab
// crow ->
//
// distanceLookup(trie, word, errorBudget)
// c, cob, 1
// a, ob, 1
// b, b, 0 => insert cab in results
// t, b, 0 => do nothing
// o, ob, 1
// w, b, 1 => insert cow in results
//
// c, cb, 1
// a, b, 1
// b, , 0 => /
// b, b, 0 => cab
// t, , 0 => /
// t, b, 0 => /
//
// c, crow, 1
// ...
// o, row, 1
// w, ow, 0 => /
// w, row, 0 => /
// o, ow, 0
// w, w, 0 => cow

// 1.5 Tests
console.log("***** 1.5 *****");
var tests = [["yay", "yayay"], ["banana", "canana"], ["abc", "def"],
  ["ccc", "cccc"], ["cccc", "caccc"], ["abcd", "aecd"],
  ["mango", "mango"], ["cat", "cow"], ["brick", "houses"],
  ["abc", "abcd"], ["abcd", "bcd"], ["banana", "cananb"]];
tests.forEach(function(test) {
  console.log("\"" + test[0] + "\" and \"" + test[1] + "\": " + isOneAway(test[0], test[1]));
  console.log("\"" + test[0] + "\" and \"" + test[1] + "\": " + stringEditDistance(test[0], test[1]));
});

// 1.6
// Assumption: Uppercase/lowercase are treated differently. ie: AAa becomes A2a1
function compressString(str) {
  var compressedString = "";
  var i, len, count;
  var currentChar = "";
  for (i = 0, len = str.length + 1; i < len; i++) {
    if (str.charAt(i) != currentChar) {
      compressedString += (currentChar == "") ? "" : currentChar + count;
      currentChar = str.charAt(i);
      count = 0;
    }
    count++;
  }
  return (compressedString.length < str.length) ? compressedString : str;
}

// 1.6 Tests
console.log("***** 1.6 *****");
var tests = ["aaaaaaaaa", "aaabbbbcddd", "", "abc"];
tests.forEach(function(test) {
  console.log(`\"${test}\": ${compressString(test)}`);
});

// 1.7
// Assumptions:
// * Array is square (NxN)
// * N = 1 pixel
// * Image is passed as a 2-dimensional array.
// Things I learned in this problem:
// * non-primitive data types are passed by reference by default, not value
// * if you want to pass an array by value, use array.slice()
// * 4 bytes = 32 bits = an int

// This solution assumes each entry is a pixel, not a byte
function rotateImage(img) {
  var ringCount = Math.ceil(img.length / 2.0);
  var count = 0;
  while (count < ringCount) {
    rotateRing(img, count);
    count++;
  }
}
function rotateRing(img, ringNumber) {
  var pixPos, pix, rotatedPixPos, rotatedPix, startPos, i, len;
  for (i = ringNumber, len = img[0].length; i < len - 1 - ringNumber; i++) {
    startPos = [ringNumber, i];
    pixPos = startPos;
    pix = img[pixPos[0]][pixPos[1]];
    do {
      rotatedPixPos = getRotatedPixPos(pixPos, len);
      var tmp = img[rotatedPixPos[0]][rotatedPixPos[1]];
      img[rotatedPixPos[0]][rotatedPixPos[1]] = pix;
      pixPos = rotatedPixPos;
      pix = tmp;
    } while (!arraysAreEqual(pixPos, startPos));
  }
}
function getRotatedPixPos(pixPos, imgSize) {
  return [pixPos[1], imgSize - 1 - pixPos[0]];
}
function arraysAreEqual(current, start) {
  var xEqual = current[0] == start[0];
  var yEqual = current[1] == start[1];
  return xEqual && yEqual;
}

// 1.7 using a 2D array of bytes (not pixels)
// TODO: look into array.splice()...it's twice as slow
function rotateImage2(img) {
  var ringCount = getRingCount(img.length);
  var count = 0;
  while (count < ringCount) {
    rotateRing2(img, count);
    count++;
  }
}
function getRingCount(length) {
  return Math.ceil(length / 2.0);
}
function swapPixels(img, firstPixel, secondPixel) {
  var tmp = img[secondPixel[0]].slice(secondPixel[1], secondPixel[1] + 4);
  for (var i = 0; i < 4; i++) {
    img[secondPixel[0]][secondPixel[1] + i] = img[firstPixel[0]][firstPixel[1] + i];
    img[firstPixel[0]][firstPixel[1] + i] = tmp[i];
  }
}
function rotateRing2(img, ringNumber) {
  var pixPos, pix, rotatedPixPos, rotatedPix, startPos, i, len;
  for (i = ringNumber, len = img.length; i < len - 1 - ringNumber; i++) {
    var topLeftPixelPosition = [ringNumber, i];
    var topRightPixelPosition = getRotatedPixPos(topLeftPixelPosition, len);
    var bottomRightPixelPosition = getRotatedPixPos(topRightPixelPosition, len);
    var bottomLeftPixelPosition = getRotatedPixPos(bottomRightPixelPosition, len);
    swapPixels(img, topLeftPixelPosition, bottomLeftPixelPosition);
    swapPixels(img, bottomLeftPixelPosition, bottomRightPixelPosition);
    swapPixels(img, bottomRightPixelPosition, topRightPixelPosition);
  }
}

// 1.7 Tests
console.log("***** 1.7 *****");
var simpleThree =
  [[1, 2, 3],
   [4, 5, 6],
   [7, 8, 9]];
var simpleFour =
  [[1, 2, 3, 4],
   [5, 6, 7, 8],
   [9, 10, 11, 12],
   [13, 14, 15, 16]];
var complexFour =
  [[1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4],
   [5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8],
   [9, 9, 9, 9, 0, 0, 0, 0, 11, 11, 11, 11, 12, 12, 12, 12],
   [13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16]];
 rotateImage(simpleFour);
 rotateImage2(complexFour);
 console.log(`Original version: ${simpleFour}`);
 console.log(`Better version: ${complexFour}`);

// 1.8
// Things I learned in this problem:
// * Remember indexing arrays is [y][x] not [x][y]
// * Array equality is determined by pointers, not values, so you can't use
//   Set() for coordinates (arrays of length 2).
function setZeros(zero, matrix) {
  var M = matrix[0].length, N = matrix.length;
  for (var i = 0; i < M; i++) {
    matrix[zero[1]][i] = 0;
  }
  for (i = 0; i < N; i++) {
    matrix[i][zero[0]] = 0;
  }
}
function zeroMatrix(matrix) {
  var zeros = [];
  var M = matrix[0].length;
  var N = matrix.length;
  for (var y = 0; y < N; y++) {
    for (var x = 0; x < M; x++) {
      if (matrix[y][x] == 0) {
        zeros.push([x, y]);
      }
    }
  }
  zeros.forEach(function (zero) {
    setZeros(zero, matrix);
  });
  return matrix;
}

// 1.8 boolean optimization
function getBooleanMatrix(size) {
  var matrix = [];
  for (var i = 0; i < size; i++) {
    matrix.push(false);
  }
  return matrix;
}
function zeroMatrix2(matrix) {
  var M = matrix[0].length;
  var N = matrix.length;
  var rowMatrix = getBooleanMatrix(M);
  var columnMatrix = getBooleanMatrix(N);
  for (var y = 0; y < N; y++) {
    for (var x = 0; x < M; x++) {
      if (matrix[y][x] == 0) {
        rowMatrix[x] = true;
        columnMatrix[y] = true;
      }
    }
  }
  for (var y = 0; y < N; y++) {
    for (var x = 0; x < M; x++) {
      if (rowMatrix[x] == true || columnMatrix[y] == true) {
        matrix[y][x] = 0
      }
    }
  }
  return matrix;
}


// 1.8 Tests
function arraysAreEqual(a1, a2) {
if (a1.length != a2.length || a1[0].length != a2[0].length) {
  return false;
}
for (var i = 0; i < a1.length; i++) {
  for (var j = 0; j < a1[0].length; j++) {
    if (a1[i][j] != a2[i][j]) {
      return false;
    }
  }
}
return true;
}
function cloneArray(a) {
  var M = a[0].length;
  var N = a.length;
  var aClone = new Array(N);
  aClone[2] = "hello";
  for (var y = 0; y < N; y++) {
    aClone[y] = new Array(M);
    for (var x = 0; x < M; x++) {
      aClone[y][x] = a[y][x];
    }
  }
  return aClone;
}

var initial =
[
  [1, 1, 0],
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];

var expected =
[
  [0, 0, 0],
  [1, 0, 0],
  [0, 0, 0],
  [1, 0, 0]
];

console.log("***** 1.8 *****");
var results = [zeroMatrix(cloneArray(initial)), zeroMatrix2(cloneArray(initial))];
results.forEach(function(result) {
  var areEqual = arraysAreEqual(result, expected);
  console.log(`3x3 test: ${areEqual}`);
  if (!areEqual) {
    console.log(`result: \n ${result}`);
    console.log(`expected: \n ${expected}`);
  }
});

// 1.9
function checkIfRotation(str1, str2) {
  return str1.length == str2.length && str1.concat(str1).includes(str2);
}

console.log("***** 1.9 *****");
var tests = [["waterbottle", "erbottlewat"], ["erbottlewat", "waterbottle"], ["abby", "baby"], ["ban", "banana"], ["kitty", "kitty"]];
tests.forEach(function (test) {
  console.log(`${test[0]} and ${test[1]}: ${checkIfRotation(test[0], test[1])}`);
})
