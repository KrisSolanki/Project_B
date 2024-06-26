import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './CafeList.css';
// import { useLocation  } from "react-router-dom";

import { NavLink } from 'react-router-dom';

// const CafeList = ({ setFilteredData }) => {
const CafeList = () => {


  console.log("ENTERED CAFE")
  const [data, setData] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cafelist/");
        const onlineCafes = response.data.filter(cafe => cafe.status.Status_Name === 'Online');
        setData(onlineCafes)

        // const deliveryCafes = response.data.filter(cafe => cafe.Delivery === true);
        // console.log("deliveryCafes",deliveryCafes)
        // setFilteredData(deliveryCafes);
        // if (typeof setFilteredData === 'function') {
        //   const deliveryCafes = response.data.filter(cafe => cafe.Delivery === true);
        //   setFilteredData(deliveryCafes);
        // }


      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  console.log("data:",data);
  // console.log("-----------------------------")
  // console.log("Filtered:"); // Log the filtered data

  return (
    <>
      <div>
        <h1>Cafe List</h1>
        <div className="container_C">
          {data.map((cafe) => (
            
            <div key={cafe.CafeID} className="product">
              <div className="both">

              <NavLink to={`/CafeList/${cafe.CafeID}`} className="nav-linkP">
              <div className="img">
              <img src={`http://127.0.0.1:8000/api${cafe.LogoImage}`} alt={cafe.CafeName} />
              </div>
              <div className="details">
                <div className="title">
              <h2 className='cafenametext'>{cafe.CafeName}</h2>

                </div>
              <div className="desc">
              <p>{cafe.Description}</p>
              </div>
              </div>
   

          </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
  )
}

export default CafeList
