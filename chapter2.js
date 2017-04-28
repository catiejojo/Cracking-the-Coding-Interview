// 2.1
function TwoWayNode(data, prev, next) {
  this.data = data;
  this.prev = prev;
  this.next = next;
}

TwoWayNode.prototype.delete = function () {
  if (this.prev != null) {
    this.prev.next = this.next;
  }
  if (this.next != null) {
    this.next.prev = this.prev;
  }
}

TwoWayNode.prototype.equals = function (node) {
  return this.data = node.data;
}

TwoWayNode.prototype.log = function(name) {
  console.log(`Node: ${name}`);
  console.log(`--data = ${this.data}`);
  console.log(`--prev = ${this.prev}`);
  console.log(`--next = ${this.next}`);
}

function removeDupes(node) {
  var check, runner;
  check = node;
  while (check != null) {
    runner = check.next;
    while (runner != null) {
      if (check.data == runner.data) {
        runner.delete();
      }
      runner = runner.next;
    }
    check = check.next;
  }
  return node; //optional
}

// 2.1 Tests
function listsAreEqual(node1, node2) {
  var runner1 = node1;
  var runner2 = node2;
  while (runner1 != null || runner2 != null) {
    if (runner2 == null || runner1 == null || !runner1.equals(runner2)) {
      if (runner1 != null) {
        runner1.log("Runner1");
      } else {
        console.log("Node: Runner1 is null!");
      }
      if (runner2 != null) {
        runner2.log("Runner2");
      } else {
        console.log("Node: Runner2 is null!");
      }
      return false;
    }
    runner1 = runner1.next;
    runner2 = runner2.next;
  }
  return true;
}

function makeNodesFromArray(a) {
  var node;
  var nextNode = null;
  a.forEach(function(data) {
    node = new TwoWayNode(data, null, nextNode);
    if (nextNode != null) {
      nextNode.prev = node;
    }
    nextNode = node;
  });
  return node;
}

console.log("***** 2.1 *****");
var tests1 =
[
  [makeNodesFromArray([1, 2, 2, 3, 4]), makeNodesFromArray([1, 2, 3, 4])],
  [makeNodesFromArray([1, 1, 1, 1]), makeNodesFromArray([1])],
  [makeNodesFromArray([1, 2, 3, 4]), makeNodesFromArray([1, 2, 3, 4])],
  [makeNodesFromArray([]), makeNodesFromArray([])],
  [makeNodesFromArray([1, 2, 3, 4, 4, 4, 5, 4, 1, 3, 3, 2]), makeNodesFromArray([1, 2, 3, 4, 5])]
]
tests1.forEach(function (test, index, array) {
  var result = listsAreEqual(removeDupes(test[0]), test[1]);
  console.log(`test${index + 1}: ${result}`);
});

// 2.5
function OneWayNode (data, next) {
  this.data = data;
  this.next = next;
}

OneWayNode.prototype.equals = function (node) {
  return this.data = node.data;
}

OneWayNode.prototype.log = function(name) {
  console.log(`Node: ${name}`);
  console.log(`--data = ${this.data}`);
  console.log(`--next = ${this.next}`);
}

function sumList(num1, num2) {
  var answer = new OneWayNode("start", null);
  var answerHead = answer;
  var sum, carry = 0, runner1 = num1, runner2 = num2;
  while (runner1 != null || runner2 != null || carry != 0) {
    sum = (runner1 == null ? 0 : runner1.data) + (runner2 == null ? 0 : runner2.data) + carry;
    answer.next = new OneWayNode(sum % 10, null);
    answer = answer.next;
    carry = Math.floor(sum/10.0);
  }
  return answerHead.next;
}

function makeOneWayNodesFromArray(a) {
  var node;
  var nextNode = null;
  a.forEach(function(data) {
    node = new OneWayNode(data, nextNode);
    nextNode = node;
  });
  return node;
}

console.log("***** 2.5 *****");
var tests5 =
[
  [makeOneWayNodesFromArray([7, 1, 6]), makeOneWayNodesFromArray([5, 9, 2]), makeOneWayNodesFromArray([2, 1, 9])],
  [makeOneWayNodesFromArray([7, 1, 6]), makeOneWayNodesFromArray([5, 9, 4]), makeOneWayNodesFromArray([2, 1, 1, 1])],
  [makeOneWayNodesFromArray([2, 1, 9]), makeOneWayNodesFromArray([0]), makeOneWayNodesFromArray([2, 1, 9])]
]
tests5.forEach(function (test, index, array) {
  var answer = sumList(test[0], test[1]);
  var result = listsAreEqual(answer, test[2]);
  console.log(`test${index + 1}: ${result}`);
});
