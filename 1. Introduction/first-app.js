//You can run code in nodejs in 2 ways:
//1. Execute files
//2. REPL

//REPL
//Read Evaluate Print Loop
//writing code in terminal is repl. it isnot saved while we close the terminal
// const fs = require("fs");
// fs.writeFileSync("hello.txt", "My first node.js code");
// console.log(fs);
// const express = require("express");
// console.log(express);
// const express = require("express");
// console.log(express);

import { alert, person as p } from "./alert.js";
p.name = "fff";
console.log(p.name);

import sayHi from "./alert.js";
sayHi();
//import.meta contains the info about the current module
console.log(import.meta.url);

//when we cnage the object property here in first-app.js, then the rest (second-app.js...) can see the new change. Because the mosule is executed only once.
//Exports are generated, and then they are shared between importers,
//so if something changes the object, other importers will see that.

//A module code is evaluated only the first time when imported
//If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers.

//The one-time evaluation has important consequences, that we should be aware of

// alert();


