import React from "react";
import NavBars from "./NavBars";
import Banner from "./Banner";
import Featured from "./Featured";
import Books from "./Books";
import Generes from "./Generes";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <NavBars />
      <Banner />
      <Generes />
      <div className="container mx-auto">
      <Featured />
      <Books />
      </div>
      <Footer/>
     
    </>
  );
};

export default Home;
