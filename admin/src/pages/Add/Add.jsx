import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
// For making HTTP requests
import axios from "axios";
// For displaying success or error messages
import { toast } from "react-toastify";

// Add component for adding a new food item through a form submission
const Add = () => {

  const url = "http://localhost:4000";

  // State to manage the uploaded image file
  const [image, setImage] = useState(null); // false

  // State to manage form input values
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  // onChangeHandler updates the data state when any input field changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  //const onImageChange = (event) => {
  //  console.log("File selected:", event.target.files[0]);
  //  setImage(event.target.files[0]);
  //};

  // onSubmitHandler handles form submission, constructs formData, sends it to the server, and handles the response
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null); //false
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error occured while adding the item");
    }
  };

  // For uploading product details
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>

        {/* For uploading an image */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            //onChange={onImageChange}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* For entering product name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>

        {/* For entering product description */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
          ></textarea>
        </div>

        {/* For entering product category */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* For entering product price */}
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>

        {/* A submit button to add the item */}
        <button type="submit" className="add-btn">
          ADD
        </button>

      </form>
    </div>
  );
};

export default Add;