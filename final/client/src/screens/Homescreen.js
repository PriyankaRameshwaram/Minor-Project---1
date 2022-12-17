

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import {DatePicker,Space} from "antd";
import 'antd/dist/reset.css';
import moment from "moment";





function Homescreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);
  const[fromdate,setfromdate]=useState()
  const[duplicaterooms,setduplicaterooms]=useState([])
  const[searchkey,setsearchkey]=useState("")
  const[type,settype]=useState("all")
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        const obj = [];
        obj.push(data);
        // console.log([data]);
        setRooms(data.rooms);
        setduplicaterooms(data.rooms);
        // updateMyArray( arr => [...arr, `${arr.length}`])
        console.log(rooms);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);


  const onChange = (date) => {
    console.log(date.format("DD-MM-YYYY"));
    setfromdate((date.format("DD-MM-YYYY")))

var temprooms=[];
console.log(duplicaterooms)
for(const room of duplicaterooms){
  var availability=false
  if(room.currentbookings.length>0){
     for(const booking of room.currentbookings){
      // availability=false;
      if(date.format("DD-MM-YYYY")!==booking.fromdate){
    
        availability=true;
      }
      // else{
      //   break
      // }
     }


  }
  if(availability==true||room.currentbookings.length==0){

    temprooms.push(room)
  }
  
}setRooms(temprooms);
  };

    
function filterBySearch(){

  const temprooms=duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
  setRooms(temprooms)
  }
  
  function filterByType(e){
    settype(e)
  if(e!=="all"){
    const temprooms=duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
    setRooms(temprooms)}
    else{
  
      setRooms(duplicaterooms)
    }
    }
    
  return (
    <div className="container">

<div className=" bs row mt-5">

  <div className="col-md-3">
  <DatePicker format="DD-MM-YYYY" onChange={onChange} />
  </div>
  <div className="col-md-5">
 <input  type="text" className="form-control" placeholder="search" value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}}  onKeyUp={filterBySearch}/>
  
  </div>

  <div className="col-md-3">
<select className="form-control" value={type} onChange={(e)=>{filterByType(e.target.value)}}> 
  <option value="all">All</option>
  <option value="Venues">Venues</option>
  <option value="Caters">Caters</option>
  <option value="Decors">Decors</option>
</select>
</div>
</div>


      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1><Loader/></h1>
        ) : error ? (
   (<Error/>)
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate}/>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "antd/dist/antd.css";
// import { DatePicker, Space } from "antd";
// import moment from "moment";

// import Room from "../components/Room";
// import Loader from "../components/Loader";
// import Error from "../components/Error";

// import AOS from "aos";
// import "aos/dist/aos.css"; // You can also use <link> for styles
// // ..
// AOS.init({
//   duration: 1000,
// });

// const { RangePicker } = DatePicker;

// function Homescreen() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [rooms, setRooms] = useState([]);

//   const [fromDate, setFromDate] = useState();
//   const [toDate, setToDate] = useState();
//   const [duplicateRooms, setDuplicateRooms] = useState([]);
//   const [searchKey, setSearchKey] = useState("");
//   const [type, setType] = useState("all");

//   useEffect(() => {
//     async function fetchMyAPI() {
//       try {
//         setError("");
//         setLoading(true);
//         const data = (await axios.get("/api/rooms/getallrooms")).data;
//         //console.log(data);
//         setRooms(data);
//         setDuplicateRooms(data);
//       } catch (error) {
//         console.log(error);
//         setError(error);
//       }
//       setLoading(false);
//     }

//     fetchMyAPI();
//   }, []);

//   function filterByDate(dates) {
//     // console.log(moment(dates[0]).format("DD-MM-YYYY"));
//     // console.log(moment(dates[1]).format("DD-MM-YYYY"));
//     try {
//       setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
//       setToDate(moment(dates[1]).format("DD-MM-YYYY"));

//       var tempRooms = [];
//       for (const room of duplicateRooms) {
//         var availability = false;
//         if (room.currentbookings.length > 0) {
//           for (const booking of room.currentbookings) {
//             if (
//               !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
//                 booking.fromdate,
//                 booking.todate
//               ) &&
//               !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
//                 booking.fromdate,
//                 booking.todate
//               )
//             ) {
//               if (
//                 moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
//                 moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
//                 moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
//                 moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
//               ) {
//                 availability = true;
//               }
//             }
//           }
//         }
//         //
//         if (availability == true || room.currentbookings.length == 0) {
//           tempRooms.push(room);
//         }
//       }
//       setRooms(tempRooms);
//     } catch (error) {}
//   }

//   function filterBySearch() {
//     const tempRooms = duplicateRooms.filter((x) =>
//       x.name.toLowerCase().includes(searchKey.toLowerCase())
//     );
//     setRooms(tempRooms);
//   }
//   function filterByType(type) {
//     setType(type);
//     console.log(type);
//     if (type !== "all") {
//       const tempRooms = duplicateRooms.filter(
//         (x) => x.type.toLowerCase() == type.toLowerCase()
//       );
//       setRooms(tempRooms);
//     } else {
//       setRooms(duplicateRooms);
//     }
//   }

//   return (
//     <div className="container">
//       <div className="row mt-5 bs">
//         <div className="col-md-3">
//           <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
//         </div>

//         <div className="col-md-5">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="search rooms"
//             value={searchKey}
//             onChange={(e) => {
//               setSearchKey(e.target.value);
//             }}
//             onKeyUp={filterBySearch}
//           />
//         </div>
//         <div className="col-md-3">
//           <select
//             className="form-control"
//             value={type}
//             onChange={(e) => {
//               filterByType(e.target.value);
//             }}
//           >
//             <option value="all">All</option>
//             <option value="delux">Delux</option>
//             <option value="non-delux">Non-Delux</option>
//           </select>
//         </div>
//       </div>

//       <div className="row justify-content-center mt-5">
//         {loading ? (
//           <Loader></Loader>
//         ) : error.length > 0 ? (
//           <Error msg={error}></Error>
//         ) : (
//           rooms.map((x) => {
//             return (
//               <div className="col-md-9 mt-3" data-aos="flip-down">
//                 <Room room={x} fromDate={fromDate} toDate={toDate} />
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// export default Homescreen;





