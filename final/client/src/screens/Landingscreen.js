import React from 'react'
import { Link } from 'react-router-dom'

function Landingscreen() {
  return (
  <div className="HomeImageDiv">
<img
  className="HomePageImage"
  src="https://image.wedmegood.com/resized/1900X/uploads/city_bg_image/1/delhi_bg.jpeg"
/>
<div className="centered">
  Find the best services for your dream event with Sparkle
 <Link to="/home">
<button className="btn landing-btn" style={{color:"black",backgroundColor:"white"}}>Get started</button>
 </Link> </div>
<br/><br/><br/><br/>
 <footer className=" bss footers">
<p>
  If you are a vendor and want to list your product on our website<br/>
  Contact us at<br/>
vendorssparkle@gmail.com  938929839
</p>
 </footer>
</div>


  )
}

export default Landingscreen