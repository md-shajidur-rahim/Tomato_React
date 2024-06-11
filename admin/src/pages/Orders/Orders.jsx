import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

// Orders component for fetch and display a list of orders from a server, 
// allowing the status of each order to be updated
const Orders = ({ url }) => {

  // State to manage the list of orders
  const [orders, setOrders] = useState([]);

  // fetchAllOrders fetches the list of orders from the server
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error occured while fetching orders");
    }
  };

  // statusHandler updates the status of an order by sending a POST request to the server and refreshes the list
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    } else {
        toast.error("Error occured while updating order status");
    }
  };

  // useEffect calls fetchAllOrders when mounting to fetch the initial list of orders
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Renders a list of orders, displaying details like items, address, and phone, along with an option to change the order status
  return (
    <div className="order add">
      <h3>Order Page</h3>

      {/* For rendering a list of orders */}  
      <div className="order-list">
        {orders.map((order, index) => (

          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            
            {/* For displaying product items, address and phone */}  
            <div>

              <p className="order-item-found">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>

              <p className="order-item-name">
                {order.address.firstname + " " + order.address.lastName}
              </p>

              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>

              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            <p>Items : {order.item.length}</p>
            <p>${order.amount}</p>
            
            {/* For option to change the order status */} 
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>

        ))}
      </div>
    </div>
  );
};

export default Orders;