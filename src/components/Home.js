import React, { useEffect } from "react";
import NavBars from "./NavBars";
import Banner from "./Banner";
import Featured from "./Featured";
import Books from "./Books";
import Generes from "./Generes";

const Home = () => {
  return (
    <>
      <NavBars />
      <Banner />
      <Generes />
      <Featured />
      <Books />
    </>
  );
};

export default Home;
