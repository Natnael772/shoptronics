const person = {
  name: "nnn",
};
// export default class user {
//   constructor(name) {
//     this.name = name;
//   }
// }
// export {sayHi as default}
export default function sayHi() {
  console.log("Hi");
}
// sayHi();
const alert = function () {
  console.log(`Module is evaluated ${person.name}`);
};

// alert();
export { alert, person };
