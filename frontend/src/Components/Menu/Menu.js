import React, { useContext,useState } from 'react'
// import { useState } from 'react';
import { MenuContext } from '../../Context/MenuContext'
import './MenuList.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from '../Notification/Notification'

// import { useEffect } from 'react';
const Menu = ({data}) => {
    // const ( id ,itemname,price,description) = props.data
    const {addToCart} = useContext(MenuContext);
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
 const [notificationMessage, setNotificationMessage] = useState("");
 const [notificationColor, setNotificationColor] = useState("");
    
  
      const handleAddToCart = async (itemId) => {
          try {
            // const accessToken = localStorage.getItem('access_token');
            const accessToken = localStorage.getItem('authTokens');
            const { access } = JSON.parse(accessToken);
            console.log('Access Token:', access)

            // console.log('Access Token:', accessToken);
            // Make a POST request to your server's add-to-cart endpoint
            await axios.post('http://127.0.0.1:8000/api/cart/', {
              Item_ID: itemId,
              ItemQuantity: 1,
            },{
              headers: {
                Authorization: `Bearer ${access}`,
                'Content-Type': 'application/json', 
              },
          });
      
            addToCart(itemId);
            setNotificationMessage("Item added to successfully.");
            setNotificationColor("green");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          } catch (error) {
            console.error('Error adding item to cart:', error);
          }
        };  

        const handleViewCart = () => {
          navigate('/cart');
        };
      
  return (
    <>
    {showNotification && (
        <Notification message={notificationMessage} color={notificationColor} />
      )}
    <div className="container-item">
          {data.length > 0 && (
            <div className="cafe-details">
              <div className="cafe-logo">
                <img className='cafelogoimg' src={`http://127.0.0.1:8000/api${data[0].cafe.LogoImage}`} alt="" srcset="" />
              </div>
              <div className="cafe-name">
                {/* <p>{Items.cafe.CafeName}</p> */}
                <h1>{data[0].cafe.CafeName}</h1>
                {/* <h1>heloo</h1> */}
              </div>
              {/* <div className="status">
              {data[0].cafe.status}
              </div> */}

            </div>
             )}
      {data.map((Items) => (
        <div key={Items.ItemID} className=''>
            <div className="menu-card">
              <div className="grp">

              <div className="item-img">
              <img src={`http://127.0.0.1:8000/api${Items.ItemImage}`} alt="" srcset="" />
              </div>
              <div className="item-name">
                <h2>{Items.ItemName}</h2>

              </div>
              <div className="item-desc">
                <p>{Items.ItemDescription}</p>
              </div>
              </div>
              <div className="grp2">

              <div className="item-price">
                <p>Price: {Items.ItemPrice}</p>
              </div>
              <div className="item-add-to-card-btn">

              <button className="button" onClick={() => handleAddToCart(Items.ItemID)}>
                  Add to cart
                </button>
                
              <button
                className="button"
                onClick={handleViewCart}
              >
                View Cart
              </button>

              {/* <button className="button" onClick={() => addToCart(Items.itemId)}>Add to cart</button> */}
                {/* {showCarts[Items.ItemID] ? (
                 <div className="cart-controls">
                 <button onClick={() => removeFromCart(Items.ItemID)}>-</button>
                 <span>{Count[Items.ItemID]}</span>
                 <button onClick={() => addToCart(Items.ItemID)}>+</button>
               </div>
              ) : (
                // <button className="button" onClick={handleAddToCart(Items.ItemID)}>Add to Cart</button>
                // <button className="button" onClick={() => handleAddToCart(Items.ItemID)}>Add to Cart</button>
                // <button className="button" onClick={() => addToCart(Items.itemId)}> </button>
                )} */}
                </div>

            </div>
          </div>
        </div>


))}
      </div >
</>

  )
}

export default Menu
