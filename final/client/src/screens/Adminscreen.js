import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getStaticContextFromError } from "@remix-run/router";


function Adminscreen() {


useEffect(()=>{

  async function FetchMyAPI() {

if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
   window.location.href="/home"

}

  }

  FetchMyAPI();

},[])
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontsize: "30px" }}>
        Admin Panel
      </h2>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          <div>
            <Bookings />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Items" key="2">
        {/* <div>
       < AdminRoomScreen/>
          </div> */}
           <div>
            <Rooms/>
          </div>
        </Tabs.TabPane>
{/* 
    <Tabs.TabPane tab="Add New Item" key="3">
          <h1><Addroom/></h1>
        </Tabs.TabPane>  */}

        <Tabs.TabPane tab="Users" key="4">
        <div>
            <Users/>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

// Booking list Components


export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(() => {
    async function FetchMyAPI() {
      try {
        const datas = await (
          await axios.get("/api/bookings/getallbookings")
        ).data;
        setbookings(datas);
        console.log(bookings);
        setloading(false);
      } catch (Error) {
        console.log(Error);
        setloading(false);
        seterror(Error);
      }
    }

    FetchMyAPI();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>
        {loading && <Loader />}

        <table className="table table-borded table-muted bs">
          <thead className="bs"  style={{
        color: 'rgb(255, 255, 255)',
        backgroundColor:"rgb(216, 0, 104)"
      }}>
            <tr>
            <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>



<tbody>

{bookings.length && (bookings.map(booking=>{

  return <tr className="bs">
<td>{booking._id}</td>
<td>{booking.userid}</td>
<td>{booking.room}</td>
<td>{booking.fromdate}</td>
<td>{booking.status}</td>



  </tr>
}))}


</tbody>


        </table>


      </div>
    </div>
  );
}



// Rooms list Components
export function Rooms() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(() => {
    async function FetchMyAPI() {
      try {
        const datas = await (
          await axios.get("/api/rooms/getallrooms")
        ).data;
        setbookings(datas.rooms);
        console.log(bookings);
        setloading(false);
      } catch (Error) {
        console.log(Error);
        setloading(false);
        seterror(Error);
      }
    }

    FetchMyAPI();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>
        {loading && <Loader />}

        <table className="table table-borded table-muted bs">
          <thead className="bs"  style={{
        color: 'rgb(255, 255, 255)',
        backgroundColor:"rgb(216, 0, 104)"
      }}>
            <tr>
            <th>Room Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Phone Number</th>
            </tr>
          </thead>



<tbody>

{bookings.length && (bookings.map(booking=>{

  return <tr className="bs">

 <td>{booking._id}</td>
 <td>{booking.name}</td>
 <td>{booking.type}</td>
 <td>{booking.rentperday}</td>
 <td>{booking.phonenumber}</td>

  </tr>
}))}


</tbody>


        </table>


      </div>
    </div>
  );
}



// Users list Components



export function Users() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(() => {
    async function FetchMyAPI() {
      try {
        const datas = await (
          await axios.get("/api/users/getallusers")
        ).data;
        setbookings(datas);
        console.log(bookings);
        setloading(false);
      } catch (Error) {
        console.log(Error);
        setloading(false);
        seterror(Error);
      }
    }

    FetchMyAPI();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>
        {loading && <Loader />}

        <table className="table table-borded table-muted bs">
          <thead className="bs"  style={{
        color: 'rgb(255, 255, 255)',
        backgroundColor:"rgb(216, 0, 104)"
      }}>
            <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin</th>
           
            </tr>
          </thead>



<tbody>

{bookings.length && (bookings.map(booking=>{

  return <tr className="bs">

 <td>{booking._id}</td>
 <td>{booking.name}</td>
 <td>{booking.email}</td>
 <td>{booking.isAdmin?"YES":"NO"}</td>


  </tr>
}))}


</tbody>


        </table>


      </div>
    </div>
  );
}








// Add Room Components




export function Addroom() {

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const[name,setname]=useState("")
  const[rentperday,setrentperday]=useState()
  const[maxcount,setmaxcount]=useState()
  const[description,setdescription]=useState()
  const[phonenumber,setphonenumber]=useState()
  const[type,settype]=useState()
  const[imageurl1,setimageurl1]=useState()
  const[imageurl2,setimageurl2]=useState()
  const[imageurl3,setimageurl3]=useState()

  async function addRoom(){


  




const newroom={
name,
rentperday,
maxcount,
description,
phonenumber,
type,
imageurls:{imageurl1,imageurl2,imageurl3}


}
try{
  setloading(true);
const result=await (await axios.post("/api/rooms/addroom",newroom)).data
console.log(result)
console.log(newroom)
setloading(false);
console.alert("Added Item Successfully")
}catch(error){
  console.log(error);
  setloading(false);
}
  }

  return (
    <div className="row">

<div className="col-md-5">


<input type="text" className="form-control"  placeholder="Item Name"
value={name} onChange={(e)=>{setname(e.target.value)}}
/>
<input type="text" className="form-control"  placeholder="Cost"
value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}/>
<input type="text" className="form-control"  placeholder="Max Count"
value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}/>
<input type="text" className="form-control"  placeholder="Description"
value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
<input type="text" className="form-control"  placeholder="Phone number"
value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}/>

</div>



<div className="col-md-5">
<input type="text" className="form-control"  placeholder="Type"
value={type} onChange={(e)=>{settype(e.target.value)}}/>
<input type="text" className="form-control"  placeholder="Image Url 1"
value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}/>
<input type="text" className="form-control"  placeholder="Image Url 2"
value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}/>
<input type="text" className="form-control"  placeholder="Image Url 3"
value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}/>


<div className="text-right">
  <button className="btn btn-primary mt-5" onClick={addRoom}>Add item</button>
</div>

</div>
    </div>
  )
}

