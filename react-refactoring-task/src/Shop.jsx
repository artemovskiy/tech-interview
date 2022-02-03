import React, {useState, useEffect} from "react";
import GoodsItem from "./GoodsItem";

export default function Shop ({name, ownerId: ownerIdProp}){

  const [ownerId, setOwnerId] = React.useState(0)
  const [ownerName, setOwnerName] = React.useState('');
  useEffect(() => {
    fetch('/users?user_id='+ownerIdProp)
      .then(res => {
        res.json()
          .then(res => {
            setOwnerId(res.id);
            setOwnerName(res.name);
          })
          .catch(() => alert('error while parsing owner'))
      })
      .catch(() => alert('error while loading owner'))
  })

  const [goodsArray, setGoodsArray] = useState([])
  useEffect(() => {
    fetch('/goods?shop_id='+name)
      .then(res => {
        res.json()
          .then(res => {
            const array = []
            res.forEach(function (item) {
              if(item.is_sale == 'true') {
                array.push(<GoodsItem id={item.id} name={item.item} price={item.price} key={item.id}/>)
              }
            })
            setGoodsArray(array)
          })
      })
      .catch(err => console.error(err))
  }, [name])

  return (
    <div>
      {ownerName.length && ownerId != 0 ? <section className="owner">
        <span>Owner: {ownerName}</span>
      </section> : <section className="owner-loader"></section> }
      {goodsArray.length > 0 ? <section>
        {goodsArray}
      </section> : <section className="goods-loader"></section>}
    </div>
  )

}
