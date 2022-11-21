const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};

// const fs = require("fs");
// const path = require("path");
// module.exports = class Products {
//   constructor(title) {
//     this.title = title;
//   }

//   //store new product
//   save() {
//     const p = path.join(__dirname, "data", "products.json");
//     fs.readFile(p, (err, fileContent) => {
//       let products = [];
//       if (!err) {
//         products = JSON.parse(fileContent);
//       }
//       products.push(this);
//       console.log(this);
//       fs.writeFile(p, JSON.stringify(products), (err) => {
//         console.log(err);
//       });
//     });
//   }
// };
