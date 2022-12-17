// import React,{useState,useEffect} from 'react'
// import {useParams} from 'react-router-dom'
// import axios from "axios";
// function Bookingscreen(props) {
//   const{roomid}=useParams()
// const[loading,setloading]=useState(true);
// const[error,seterror]=useState();
// const[room,setroom]=useState();

//   useEffect(()=>{
//     async function fetchMyapi(){
//     try{
//   setloading(true);
//   const data=(await axios.post("/api/rooms/getroombyid",{roomid:roomid})).data;
//   console.log(data)
//   setroom(data);
// setloading(false);
//     }catch(error){
// setloading(false);
// seterror(true);
//     }
//  } fetchMyapi();},[])


  

//   return (
//     <div>
//      (loading?(<h1>Loading...</h1>):error?(<h1>Error...</h1>):(<div>
      
      
//       <div className="row">
// <div className="col-md-5">
// <h1>{room.name}</h1>
// <img src={room.imageurls[0]} className='bigimg'/>


// </div>
// <div className="col-md-5">


// </div>

//       </div>
      
      
      
//       </div>))
    
//  </div>

//   )
// }

// export default Bookingscreen


import React, { useState, useEffect } from 'react'
import { createRoutesFromElements, useParams } from 'react-router-dom'
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';

function Bookingscreen(props) {
  const { roomid } = useParams()
  const { fromdate } = useParams()
  console.log("room id is: ",roomid)
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();
 

  console.log(room)
  useEffect(() => {
    async function fetchMyapi() {



    if(!localStorage.getItem("currentUser")){
      window.location.reload="/login"
    }
      try {
        setloading(true);
        console.log("heeh")
        const data = (await axios.post("/api/rooms/getroombyid", { roomid: roomid }));
        // console.log("the data from the axios", data.data)

        setroom(data.data);
      
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    } fetchMyapi();
  }, [])

async function bookRoom(){
  const totalamount=room.room.rentperday
const bookingDetails={
  room,
  userid:JSON.parse(localStorage.getItem("currentUser"))._id,
  fromdate,
  totalamount
}

try{
  const result=await axios.post('/api/bookings/bookroom',bookingDetails)
  alert("booked sucessfully")
}
catch(error){
console.log(error)
}
}


  return (
    loading?<h1><Loader/></h1>:error?(<Error/>):
    <div className="m-5">


        <div className="row justify content-center mt-5 bs">
          <div className="col-md-5">
            <h1>{room.room.name}</h1>
            <img src={room.room.imageurls[0]} className='bigimg' />


          </div>
          <div className="col-md-5">
<div style={{textAlign:"right"}}>
<h1>Booking Details</h1>
<hr/>
<p><b>Name : </b>{JSON.parse(localStorage.getItem("currentUser")).name}</p>
<p><b>Date : </b>{fromdate}</p>
</div> 
<div style={{textAlign:"right"}}>
  <hr/>
  <p><b>Max Count : </b>{room.room.maxcount}</p>
<p><b>Cost : </b>{room.room.rentperday}</p>
<p><b>Total Amount : </b>{room.room.rentperday}</p>
  </div>   
  
  
  <div style={{float:"right"}} >
    <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button></div></div>

        </div>



      </div>

  )
}

export default Bookingscreen