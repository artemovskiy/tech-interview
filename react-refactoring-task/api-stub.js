const express = require('express')
const app = express()
const port = 3000

app.get('/users', (req, res) => {
  res.json({
    id: 1337,
    name: 'Alice',
  });
})

app.get('/goods', (req, res) => {
  res.json([
    {
      id: 1,
      item: 'iPhone 7',
      shopId: 54,
      is_sale: 'true',
      price: 120,
    },
    {
      id: 2,
      item: 'Play Station 5',
      shopId: 54,
      is_sale: 'false',
      price: 1000,
    },
    {
      id: 3,
      item: 'Mac Book Air 2021',
      shopId: 54,
      is_sale: 'false',
      price: 1500,
    },
    {
      id: 4,
      item: 'Mac Book Air 2017',
      shopId: 54,
      is_sale: 'true',
      price: 400,
    },
  ]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
