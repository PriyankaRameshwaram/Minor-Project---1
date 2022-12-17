import React, { useEffect,useState } from 'react'
import {Tabs} from "antd";
import axios, { Axios } from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
// import Swal from "sweetalert2";
import { Divider, Tag } from 'antd';

function Profilescreens() {

const user=JSON.parse(localStorage.getItem("currentUser"))

useEffect(() => {
  async function fetchMyAPI() {
if(!user){
  window.location.href="/login"

}
      
  }

  fetchMyAPI();
}, []);


  return (
    <div className="ml-3 mt-3">


<Tabs defaultActiveKey="1" >
    <Tabs.TabPane tab="Profile" key="1">
    <div className="col-md-6">
      <div className="bs">
      <h1>My Profile</h1>
      <br/>

<h1><b>Name : </b>{user.name}</h1>
<h1><b>Email : </b>{user.email}</h1>
<h1><b>Is Admin? : </b>{user.isAdmin?"YES":"NO"}</h1>
</div> </div>

    </Tabs.TabPane>
    <Tabs.TabPane tab="Bookings" key="2">
    <MyBookings/>
    </Tabs.TabPane>
    
  </Tabs>
    </div>
   
  )
}
export default Profilescreens;

export function MyBookings() {
  const user=JSON.parse(localStorage.getItem("currentUser"))
  const[bookings,setbookings]=useState([])
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      try{
        setloading(true)
const rooms=await axios.post("/api/bookings/getbookingsbyuserid",{userid:user._id})
        console.log(rooms.data)
        setbookings(rooms.data)
        setloading(false)
    }catch(error){
      console.log(error)
      setloading(false)
      seterror(true)
    }
    }
    fetchMyAPI();
  }, []);
  
  async function cancelBooking(bookingid,roomid){
try{

setloading(true)
const result=await (await axios.post("/api/bookings/cancelbooking",{bookingid,roomid})).data
alert("your booking is cancelled")
console.log(result)
setloading(false)

// Swal.fire("Congrats","Your booking has been canceled","success").then(result=>{
//   window.location.reload()
// })
}catch(error){
  console.log(error)
  setloading(false)
  // Swal.fire("Oops","Something went wrong","error")
  
}
}
  return (
    <div>
      <div className="col-md-6">

{loading && (<Loader/>)}
{bookings && (bookings.map(booking=>{
return <div className="bs">
 <h1>{booking.room}</h1><br/>
  <p><b>Booking Id:</b>{booking._id}</p>
  <p><b>Chek In:</b>{booking.fromdate}</p>
  <p><b>Amount:</b>{booking.totalamount}</p>
  <p><b>Status:</b>
  {booking.status=="cancelled"?(<Tag color="red">CANCELLED</Tag>):(<Tag color="green">CONFIRMED</Tag>)}
  
  </p>

{booking.status!=="cancelled"&&(<div className="text-right">
<button className="btn btn-danger" onClick={() => {cancelBooking(booking._id, booking.roomid);}}>CANCEL BOOKING</button>
</div>)}



  </div>

}))}
      </div>
      
    </div>
  )
}
