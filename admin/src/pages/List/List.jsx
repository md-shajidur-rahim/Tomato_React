import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

// List component for fetch and display a list of food items from the server, 
// with the ability to remove items from the list
const List = ({ url }) => {

  // State to manage the list of food items 
  const [list, setList] = useState([]);

  // Fetches the list of food items from the server
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error occured while fetching the list");
    }
  };

  // Removes a food item by sending a POST request to the server, then refreshes the list
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error occured while removing the item");
    }
  };

  // useEffect calls fetchList when mounting to fetch the initial list of food items
  useEffect(() => {
    fetchList();
  }, []);

  // Renders a table of food items with columns for product details 
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">

        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}$</p>

              {/* Option to remove the item */}
              <p onClick={() => removeFood(item._id)} className="cursor">x</p>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default List;