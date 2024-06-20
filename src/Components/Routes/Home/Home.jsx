import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listing_list_success,
  listing_list_fail,
  listing_list_request,
} from "../../../Redux/Features/Listing/listingSlice";
import Banner from "../../Layouts/Banner/Banner";
import "./home.css";
import Card from "../../Layouts/Cards/Card";
import Header from "../../Layouts/Header/Header";
import Footer from "../../Layouts/Footer/Footer";
import axios from "axios";
import LoginSignInModal from "../../Layouts/Modal/LoginSignInModal";
export default function Home() {
  const listing = useSelector((state) => state.listing);
  const dispatch = useDispatch();
  const modal = useSelector(state =>state.modal.openCloseModal)
  console.log(modal)

  const { loading, listings } = listing;
  useEffect(() => {
    try {
      const fatchData = async () => {
        dispatch(listing_list_request());

        const dBData = await axios.get("http://localhost:5000/liatings");

        dispatch(listing_list_success(dBData.data));
      };

      fatchData();
    } catch (error) {
      dispatch(listing_list_fail(error));
    }

    const body = document.body
    
    if(modal){
      body.style.overflow = "hidden";
    }else{
      body.style.overflow = "scroll";
    }
    
  }, [dispatch,modal]);

  return (
    <>
      <Header />
      <div className="home" >
        <Banner />
        <div className="home_section">
          {listings.map((list) => (
            <Card
              key={list.id}
              src={list.img}
              title={list.title}
              discription={list.discription}
              price={list.price}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
