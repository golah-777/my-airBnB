import React, { useState } from 'react'
import "./banner.css"
import Search from '../Search/Search';
export default function Banner() {
  const [showSearch, setSearch] = useState(false);

  return (
    <div className='banner'>
      <div className='banner_search'>
        {showSearch && <Search/>}
        <button onClick={()=> setSearch((prev)=>!prev)} className='banner_searchButton'>{showSearch ? "hide": "Search Date"}</button>
      </div>
      <div className='banner_info'>
        <h1>Get out and stretch your imagination</h1>
        <h5>Plan a different kind of gateway to uncover the hidden gems near you.</h5>
        <button>Explore nearby</button>
      </div>
    </div>
  )
}
