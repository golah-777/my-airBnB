import React from 'react'
import "./card.css"
export default function Card({src, title, discription, price }) {
  return (
    <div className='card'>
      <img src={src}  alt=''/>
      <div className='card_info'>
        <h2>{title}</h2>
        <h4>{discription}</h4>
        <h3>{price}</h3>
      </div>
    </div>
  )
}
