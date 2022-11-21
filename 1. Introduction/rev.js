const arr = ["Natnael", "Abel", "Biruk"];
const arr2 = [2, 7, 8, 9];
console.log(arr);

//spread operator ...
//expands an iterable array
console.log(...arr);
//is equivalent to console.log("Natnael", "Abel", "Biruk")
console.log(...arr2);

//rest parameter
//accepts multiple arguments
const printNums = function (...args) {
  console.log(args);
};

printNums(3);
printNums(3, 6, 89, 9);

//destructuring
const person = {
  name: "Natty",
  age: 21,
  dept: "software engineering",
};

// const printName = (personData) => {
//   console.log(personData.name);
// };

const printName = ({ name }) => {
  console.log(name);
};

const { dept } = person;
printName(person);
console.log(dept);

//destructurring: to access elements and properties from arrays and objects
const prog = ["Java", "C++", "C"];
const [p1, p2, p3] = prog;
console.log(p1, p2, p3);

//promises
let ctr = false;
let ctrValue = new Promise(function (resolve, reject) {
  if (ctr) resolve("ctr is defined");
  else reject("ctr isont defined");
});
ctrValue
  .then((result) => console.log(result))
  .catch((err) => console.error(`Error : ${err}`));
console.log(ctrValue);
