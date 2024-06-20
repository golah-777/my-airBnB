import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../Redux/Features/Counter/counterSlice";
import "./searchPage.css";
import Header from "../../Layouts/Header/Header";
import Footer from "../../Layouts/Footer/Footer";
import SearchResults from "../../Layouts/SearchResults/SearchResults";
export default function SearchPage() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  console.log(count)
  return (
    <>
      <Header />
      <div className="searchPage">
        <div className="searchPage_info">
          <p>62 stays - 26 august to 30 august - 2 guests</p>
          <h1>Stays nearby</h1>
          <button onClick={()=>dispatch(increment())}>Cancellation Flexibility</button>
          <button onClick={()=>dispatch(decrement())}>Type of place</button>
          <button>Price</button>
          <button>Rooms and beds</button>
          <button>More filters</button>
        </div>
        <SearchResults
          img="https://a0.muscache.com/im/pictures/miso/Hosting-914283179514095839/original/85cd9cd9-6d3c-421b-a551-87ff7f0eb5a0.jpeg?im_w=1200"
          location="Entire home in Hartbeespoort, South Africa"
          title="Luxury stay in hartbeesport"
          description="6 guests · 3 bedrooms · 4 beds · 3 baths"
          price="$500/night"
          total="$710 total"
          star={4.84}
        />
        <SearchResults
          img="https://a0.muscache.com/im/pictures/ced5bb00-461f-4e2e-9bef-d1867b05d496.jpg?im_w=720"
          location="Entire home in Sandton, South Africa"
          title="Golden Escape | Exclusive, Peaceful and Secure"
          description="10 guests · 4 bedrooms · 4 beds · 4.5 baths"
          price="$600/night"
          total="$800 total"
          star={4.87}
        />
        <SearchResults
          img="https://a0.muscache.com/im/pictures/8bd90b91-01e2-430f-9a5a-87ac7176c2b7.jpg?im_w=720"
          location="Entire chalet in Cullinan, South Africa"
          title="Thala - Thala"
          description="4 guests · 1 bedroom · 2 beds · 1 baths"
          price="$50/night"
          total="$71 total"
          star={4.91}
        />
        <SearchResults
          img="https://a0.muscache.com/im/pictures/miso/Hosting-54353583/original/8d74d1f6-439f-4b09-ad11-fc0540355119.jpeg?im_w=1200"
          location="Luxury stay in Sandton"
          title="Private Modern 10 bdrm Home tucked away in Sandton"
          description="16+ guests · 10 bedrooms · 11 beds · 10.5 baths"
          price="$600/night"
          total="$850 total"
          star={4.88}
        />
      </div>
      <Footer />
    </>
  );
}
