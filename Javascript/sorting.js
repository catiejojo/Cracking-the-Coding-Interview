module.exports = {
  mergeSort : mergeSort,
  radixSort : radixSort,
  quickSort : quickSort
}

/*
Merge Sort
-----------------------------------
Time Complexity Analysis | O(nlogn)
-----------------------------------
The divide() function gets called 2*(n-1) times. This is because it gets called
twice each split (once for each half of the list), and there are n-1 splits to
separate the list into n 1-element lists. In my implementation, the total calls
becomes 2*(n-1) + 1 b/c of the initial call from mergeSort. However, the work for
this function is constant (just computing the middle index, then adding the next
pair of divide() calls to the call stack).

The conquer() algorithm is a bit more complex. Since conquer() is only called
once (as opposed to twice like divide), and there's no initial call, it's only
called n-1 times. It creates 2 subarrays that, over the entire course of mergeSort(),
copies each of the n elements logn times (it copies the array once for each
"level" of depth of sorting, which is logn). It also goes through each of these
arrays once to merge them into a sorted list, which is O(r + l) where r and l are
the lengths of the right and left subarrays. Over the course of the mergeSort(),
this works out to go through every element in the n-element list nlogn times.

One potentially problematic factor is the use of shift() to pop the first element
of the arrays. This has a potential bottleneck with sufficiently long arrays since
the performance could be linear (in order to shift every element over by 1).

Therefore, the time complexity is O(n) + O(nlogn) for divide() and conquer(),
respectively, working out to a final time complexity of O(nlogn).

------------------------------------
Space Complexity Analysis | O(nlogn)
------------------------------------
Divide() does not allocate any space, though it does build up the call stack.
Conquer() allocates a subarray each time it is called with a cumulative size of
O(nlogn). These arrays are all empty by the end of the function, but even so,
depending on how JS handles garbage collection, this could work out to be a lot
of random arrays floating around.

One way to improve my solution is to use a buffer for sorting, rather than
making a bunch of copies (slices) of the array. This would involve adding
a "buffer" argument to divide() that gets passed to conquer(), then using
pointers to iterate through the origianl array, sorting the values into buffer,
then writing those values back into the original array. This would improve the
space complexity to be O(n) as it would have one array for the entire life of
mergeSort().
*/
function mergeSort(a) {
    var buffer = [];
    divide(a, buffer, 0, a.length - 1);
    return a;
}

function divide(a, buffer, start, end) {
    if (start < end) {
        var middle = Math.floor((start + end) / 2);
        divide(a, buffer, start, middle);
        divide(a, buffer, middle + 1, end);
        conquer(a, buffer, start, end);
    }
}

function conquer(a, buffer, start, end) {
    var middle = Math.floor((start + end) / 2);
    var left = start, right = middle + 1;
    var sortedIndex = start;
    while (left <= middle) {
        var next;
        if (right > end || a[left] < a[right]) {
            next = a[left++];
        } else {
            next = a[right++];
        }
        buffer[sortedIndex++] = next;
    }
    for (var i = start; i < sortedIndex; i++) {
        a[i] = buffer[i];
    }
}

/*
Radix Sort
--------------------------------
Time Complexity Analysis | O(kn)
--------------------------------
This algorithm will sort each element of the array into buckets k times, where
k is the number of digits of the max value. It will also empty the buckets k
times, which is also O(n) work. So it does n-work twice for every digit, k,
simplifying to O(kn).

--------------------------------
Space Complexity Analysis | O(n)
--------------------------------
While radix sort can be used for several different data types, this implementation
assumes ints. Therefore, there will be a maximum of 19 buckets (from -9 to 9), but
the maximum memory allocation will be O(n) because arrays in JS are sparse. This
means only the elements that actually contain data exist in the array, so unused
buckets do not actually take up any memory. In other languages, you would have to
allocate 19 buckets so there would be some additional memory overhead, but JS's
Hashtable implementation of arrays gets rid of this for you.
*/
function radixSort(a) {
    var allZeroes = false;
    var sigBit = 0, buckets = [];
    while (!allZeroes) {
        // console.log("FILLING BUCKETS");
        allZeroes = true;
        for (var i = 0; i < a.length; i++) {
            var bucket = getBucket(a[i], sigBit);
            // console.log(`buckets[${bucket}] = ${a[i]}`);
            if (allZeroes && bucket != 0) {
                allZeroes = false;
        	  }
            bucket += 10; //Accounting for negative buckets.
            buckets[bucket] = buckets[bucket] || [];
            buckets[bucket].push(a[i]);
        }
        emptyBuckets(a, buckets);
        sigBit++;
    }
    return a;
}

function emptyBuckets(a, buckets) {
    // console.log("EMPTYING BUCKETS");
    var index = 0;
    for (var i = 0; i < buckets.length; i++) {
        if (buckets[i]) {
            buckets[i].forEach(function (num) {
                // console.log(`a[${index}] = ${num}`);
                a[index++] = num;
            });
        }
    }
    buckets.length = 0;
}

function getBucket(number, sigBit) {
  // (16, 0) --> 6
  // (-16, 0) --> -6
  var isNegative = number < 0;
  var bucket = Math.floor(Math.abs(number) / Math.pow(10, sigBit)) % 10;
  return isNegative ? bucket * -1 : bucket;
}

/*
Quick Sort
---------------------------------------------------------------
Time Complexity Analysis | O(nlogn) average, O(n^2) worst-case
---------------------------------------------------------------
Quicksort iterates over recursively smaller subarrays, placing one number in
its definitive "right" place each loop. In worst case (a reverse sorted list),
this algorithm performs O(n^2) because it has to swap all elements for each
element in the list.

That being said, the runtime is typically more like O(nlogn) because of it's
divide and conquer approach. The swap() function runs in constant time, and
quickSort is called on average n-1 times (similar reasoning to Merge Sort, described
above).

--------------------------------
Space Complexity Analysis | O(1)
--------------------------------
This implementation doesn't allocate any memory other than a few pointers
(partition and pivot), but these are independent of the size of the array.
Even swapping is done in place. Therefore, quicksort has a fantastic O(1)
space complexity.
*/
function quickSort(a) {
    quickSortSection(a, 0, a.length - 1);
    return a;
}

function quickSortSection(a, start, end) {
    if (start >= end) {
        return;
    }
    var partition = start, pivot = a[end];
    for (var i = start; i < end; i++) {
        if (a[i] < pivot) {
            swap(a, partition++, i);
        }
    }
    swap(a, partition, end);
    quickSortSection(a, start, partition - 1);
    quickSortSection(a, partition + 1, end);
}

function swap(a, spot1, spot2) {
    a[spot2] = [a[spot1], a[spot1] = a[spot2]][0];
}
