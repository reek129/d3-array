const tape = require("tape-await");
const d3 = require("../");

tape("minIndex(array) returns the index of the least numeric value for numbers", (test) => {
  test.deepEqual(d3.minIndex([1]), 0);
  test.deepEqual(d3.minIndex([5, 1, 2, 3, 4]), 1);
  test.deepEqual(d3.minIndex([20, 3]), 1);
  test.deepEqual(d3.minIndex([3, 20]), 0);
});

tape("minIndex(array) returns the index of the least lexicographic value for strings", (test) => {
  test.deepEqual(d3.minIndex(["c", "a", "b"]), 1);
  test.deepEqual(d3.minIndex(["20", "3"]), 0);
  test.deepEqual(d3.minIndex(["3", "20"]), 1);
});

tape("minIndex(array) ignores null, undefined and NaN", (test) => {
  const o = {valueOf: () => NaN};
  test.deepEqual(d3.minIndex([NaN, 1, 2, 3, 4, 5]), 1);
  test.deepEqual(d3.minIndex([o, 1, 2, 3, 4, 5]), 1);
  test.deepEqual(d3.minIndex([1, 2, 3, 4, 5, NaN]), 0);
  test.deepEqual(d3.minIndex([1, 2, 3, 4, 5, o]), 0);
  test.deepEqual(d3.minIndex([10, null, 3, undefined, 5, NaN]), 2);
  test.deepEqual(d3.minIndex([-1, null, -3, undefined, -5, NaN]), 4);
});

tape("minIndex(array) compares heterogenous types as numbers", (test) => {
  test.equal(d3.minIndex([20, "3"]), 1);
  test.equal(d3.minIndex(["20", 3]), 1);
  test.equal(d3.minIndex([3, "20"]), 0);
  test.equal(d3.minIndex(["3", 20]), 0);
});

tape("minIndex(array) returns -1 if the array contains no numbers", (test) => {
  test.equal(d3.minIndex([]), -1);
  test.equal(d3.minIndex([null]), -1);
  test.equal(d3.minIndex([undefined]), -1);
  test.equal(d3.minIndex([NaN]), -1);
  test.equal(d3.minIndex([NaN, NaN]), -1);
});

tape("minIndex(array, f) returns the index of the least numeric value for numbers", (test) => {
  test.deepEqual(d3.minIndex([1].map(box), unbox), 0);
  test.deepEqual(d3.minIndex([5, 1, 2, 3, 4].map(box), unbox), 1);
  test.deepEqual(d3.minIndex([20, 3].map(box), unbox), 1);
  test.deepEqual(d3.minIndex([3, 20].map(box), unbox), 0);
});

tape("minIndex(array, f) returns the index of the least lexicographic value for strings", (test) => {
  test.deepEqual(d3.minIndex(["c", "a", "b"].map(box), unbox), 1);
  test.deepEqual(d3.minIndex(["20", "3"].map(box), unbox), 0);
  test.deepEqual(d3.minIndex(["3", "20"].map(box), unbox), 1);
});

tape("minIndex(array, f) ignores null, undefined and NaN", (test) => {
  const o = {valueOf: () => NaN};
  test.deepEqual(d3.minIndex([NaN, 1, 2, 3, 4, 5].map(box), unbox), 1);
  test.deepEqual(d3.minIndex([o, 1, 2, 3, 4, 5].map(box), unbox), 1);
  test.deepEqual(d3.minIndex([1, 2, 3, 4, 5, NaN].map(box), unbox), 0);
  test.deepEqual(d3.minIndex([1, 2, 3, 4, 5, o].map(box), unbox), 0);
  test.deepEqual(d3.minIndex([10, null, 3, undefined, 5, NaN].map(box), unbox), 2);
  test.deepEqual(d3.minIndex([-1, null, -3, undefined, -5, NaN].map(box), unbox), 4);
});

tape("minIndex(array, f) compares heterogenous types as numbers", (test) => {
  test.equal(d3.minIndex([20, "3"].map(box), unbox), 1);
  test.equal(d3.minIndex(["20", 3].map(box), unbox), 1);
  test.equal(d3.minIndex([3, "20"].map(box), unbox), 0);
  test.equal(d3.minIndex(["3", 20].map(box), unbox), 0);
});

tape("minIndex(array, f) returns -1 if the array contains no observed values", (test) => {
  test.equal(d3.minIndex([].map(box), unbox), -1);
  test.equal(d3.minIndex([null].map(box), unbox), -1);
  test.equal(d3.minIndex([undefined].map(box), unbox), -1);
  test.equal(d3.minIndex([NaN].map(box), unbox), -1);
  test.equal(d3.minIndex([NaN, NaN].map(box), unbox), -1);
});

tape("minIndex(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.minIndex(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("minIndex(array, f) uses the global context", (test) => {
  const results = [];
  d3.minIndex([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}
