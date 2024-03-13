import React from 'react'
import "../Cart/Cart.css"
import { MenuContext } from '../../Context/MenuContext';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import useRazorpay from 'react-razorpay';


const CartList = () => {
  const { addToCart, removeFromCart } = useContext(MenuContext);
  const [data, setData] = useState({
    cart: {},
    cart_items: [],
    menus: [],
    message: ''
  });
   useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('authTokens');
        const { access } = JSON.parse(accessToken);
        console.log('Access Token:', access);

        const response = await axios.get("http://127.0.0.1:8000/api/cart/", {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json',
          },
        });
       
        setData(response.data);



      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);



  const handleIncrement = async (cart_items) => {
    // Correctly update the local state
    setCartCounts1((prevCounts) => ({
      ...prevCounts,
      [cart_items.Cart_Item_ID]: (prevCounts[cart_items.Cart_Item_ID] || 0) + 1,
    }));

    try {
      const accessToken = localStorage.getItem('authTokens');
      const { access } = JSON.parse(accessToken);
      
      // Ensure the request body reflects the updated quantity
      const updatedQuantity = (cart_items.ItemQuantity || 0) + 1;

      await axios.put(
        `http://127.0.0.1:8000/api/cart/`,
        {
          Cart_Item_ID: cart_items.CartDetailsID,
          ItemQuantity: updatedQuantity,
          Cart_ID: data.cart.CartID,
          Item_ID: cart_items.Item_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
    console.log("data.cart.CartID", data.cart.CartID)
    console.log("cart_items", cart_items)
  };

  const [cartCounts1, setCartCounts1] = useState({});
  const handleDecrement = async (cart_items) => {
    ;
    console.log("Before update:", cartCounts1);
    setCartCounts1((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        [cart_items.CartDetailsID]: Math.max(0, (prevCounts[cart_items.CartDetailsID] || 0) - 1),
      };
      console.log("After update:", updatedCounts);
      return updatedCounts;
    });
    
    
    try {
      const accessToken = localStorage.getItem('authTokens');
      const { access } = JSON.parse(accessToken);

      // Ensure the request body reflects the updated quantity
      const updatedQuantity = Math.max(0, (cart_items.ItemQuantity || 0) - 1);
      console.log("access:", access)
      console.log("updatedQuantity", updatedQuantity)
      await axios.put(
        `http://127.0.0.1:8000/api/cart/`,
        {
          Cart_Item_ID: cart_items.CartDetailsID,
          ItemQuantity: updatedQuantity,
          Cart_ID: data.cart.CartID,
          Item_ID: cart_items.Item_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json',
          }
        }
      );
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
    console.log("data.cart.CartID", data.cart.CartID)
    console.log("cart_items", cart_items)
    console.log("cart_items.CartDetailsID", cart_items.CartDetailsID);
    console.log("cart_items.Item_ID", cart_items.Item_ID)
    console.log("Before decrement:", cartCounts1);
    console.log("Before decrement:", cartCounts1);
    console.log("cart_items.CartDetailsID", cart_items.CartDetailsID);
    console.log("cart_items1:", cart_items)
  };

  // Handle order and razorpay---------------------  
  const [Razorpay] = useRazorpay();
   
    
    const handleorder = () => {
      
      const accessToken = localStorage.getItem('authTokens');
      const { access } = JSON.parse(accessToken);
      
      axios.post(
       `http://127.0.0.1:8000/api/order/`,
       {
         
       },
       {
         headers: {
           Authorization: `Bearer ${access}`,
           'Content-Type': 'application/json',
         },
       }
    ).then(function (response) {
       console.log("Response", response.data.RAZORPAY_ORDER_ID);
       const orderid = response.data.RAZORPAY_ORDER_ID; // Assuming the order ID is in the response data

       const options = {
        key: "rzp_test_hcdXSoauARgkpH",
        name: "Acme Corp",
        description: "Test Transaction",
        order_id: orderid,
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      
      const rzp = new Razorpay(options);
      rzp.open();

    }).catch(function (error) {
      console.error('Error updating item quantity:', error);
    });
  };
  console.log("open", useRazorpay());
  console.log("Type of first element:", typeof useRazorpay()[0]);
  return (

    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
        {data.cart_items.map((cartItem) => (
          <div key={cartItem.CartDetailsID}>
            <p>ItemID: {cartItem.Item_ID}</p>
            leDecremen <p>Quantity: {cartItem.ItemQuantity}</p>
            <button onClick={() => handleIncrement(cartItem)}>+</button>
            {cartItem.ItemQuantity}
            <button onClick={() => handleDecrement(cartItem)}>-</button>
            <p>Subtotal: {cartItem.Subtotal}</p>
          </div>
        ))}
      </div>
      <div className="cart">
        <p>Total: {data.cart.Total}</p>
      </div>
      <div className="checkout">
        <button onClick={handleorder}>Checkout</button>
      </div>
      {data.cart_items.length === 0 && <h1>Your Cart is Empty</h1>}
      <div>
        <h1>Menus</h1>
        {data.menus.map((menu) => (
          <div key={menu.ItemID}>
            <p>Item Name: {menu.ItemName}</p>
            <p>Description: {menu.ItemDescription}</p>
            <p>Price: {menu.ItemPrice}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};


export default CartList
