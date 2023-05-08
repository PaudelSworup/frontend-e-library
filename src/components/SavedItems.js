import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";

const SavedItems = () => {
  const [items, setItems] = useState([]);

  const numberRegex = /^[0-9]/;

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      // Get the key for the current item
      const key = localStorage.key(i);

      // Check if the key starts with a number using the numberRegex
      if (numberRegex.test(key)) {
        // Retrieve the value for the current key
        const value = localStorage.getItem(key);

        // Parse the value as JSON (if necessary)
        const parsedValue = JSON.parse(value);

        // Add the key-value pair to the items object
        setItems((prevItems) => [...prevItems, { key, value: parsedValue }]);
      }
    }
  }, []);

  let uniqueItems = items.filter(
    (item, index, self) => index === self.findIndex((t) => t.key === item.key)
  );

  console.log(uniqueItems)

  return (
    <>
      <NavBars />

      <div>
        <h2 className="text-white">Saved Items</h2>
        <p className="text-[#9E9E9E]">
          Saved Books. Save books to keep track of the books you want to Request
          later. To unsave, just click on the bookmark icon again.
        </p>
      </div>

      {/* <div>
      {uniqueItems.map((data)=>{
        return <p className='text-white'>{data.value.title}</p>
      })}
    </div> */}
    </>
  );
};

export default SavedItems;
