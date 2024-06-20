import React from 'react'
import "./searchResults.css"
export default function SearchResults({img, location, title, description, price, total, star}) {
  return (
    <div className='searchResult'>
      <img src={img} alt='' />
      <i className="material-icons searchResults_heart">favorite_border</i>
      <div className='searchResult_info'>
        <div className='searchResult_infoTop'>
          <p>{location}</p>
          {/* <h3>location</h3> */}
          <h3>{title}</h3>
          <p>----</p>
          <p>{description}</p>
        </div>
        <div className='searchResult_infoBottom'>
          <div className='searchResult_stars'>
            <p><strong>{star}</strong></p>
          </div>
          <div className='searchResult_price'>
          <h2>{price}</h2>
          <p>{total}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
