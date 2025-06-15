import _ from "lodash";

console.error("hello world");

setTimeout(() => {
  console.log("setTimeout");
});

setInterval(() => {
  console.log("setInterval");
}, 1000);

const newArr = _.chunk([1, 2, 3, 4, 5], 2);
console.log(newArr);
