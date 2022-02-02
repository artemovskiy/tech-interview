const User = require('./User')
const fs = require('fs')
const database = require('./initDatabse')
const createPgClient = database.createPgClient;

class Shop {

  initShop(name, ownerId) {
    this.id = name;
    let connection = createPgClient()
    connection.query('SELECT * FROM users WHERE id = ' + ownerId, function (err, rows) {
      if (err) {
        throw err;
      } else {
        if(!rows.length) {
          console.error('owner not found')
        } else {
          let row = rows[0];
          this.setOwner(row[0], row[1])
        }
      }
    })
  }

  setOwner(id, name) {
    this.owner = new User();
    this.owner.id = id;
    this.owner.name = name;
  }

  printSaleGoods() {
    let that = this;
    let connection = createPgClient()
    connection.query('SELECT * FROM goods WHERE shop_id = ' + this.id, function (err, rows) {
      if (err) {
        throw err;
      } else {
        let positions = []

        rows.map(function (item) {
          if(item.is_sale == 'true') {
            positions.push({ name: item.item, price: item.price })
          }
        })

        fs.writeFileSync(that.id + '_goods.json', 'utf8', JSON.stringify(positions))
      }
    })
  }
}
