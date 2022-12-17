import React,{useState,CSSProperties} from 'react'

import HashLoader from "react-spinners/HashLoader";
function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    // const override: CSSProperties = {
    //     display: "block",
    //     margin: "0 auto",
    //     borderColor: "red",
    //   };
      
  return (
    <div >
   <div className="sweet-loading text-center">
    
      <HashLoader 
        color='#000'
        loading={loading}
        // cssOverride={override}
        size={80}
        
      />
    </div>
    </div>
  )
}

export default Loader