import React , { useEffect } from 'react'
// import Menu from '../Components/Menu/Menu';

function Aboutus({setProgress}) {

  useEffect(()=>{
    setProgress(30);
    setTimeout(()=>{
     setProgress(100);
    },0);
  }, [setProgress])

  return (
    <div>
      <h1>About Us</h1>
      <ul>
      
      </ul>
      
    </div>
  )
}

export default Aboutus
