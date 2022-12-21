const db = require("../util/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, price, description, imageUrl) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    db.execute(
      "INSERT INTO products(id,title,price,description,imageUrl) values(?,?,?,?,?)",
      [null, this.title, this.price, this.description, this.imageUrl]
    )
      .then()
      .catch();
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static deleteByid(id) {}

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id=?", [id]);
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
