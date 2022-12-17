import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';


function Room(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={props.room.imageurls[0]} className="smallimg" />
      </div>
   <div className="col-md-7">
    <h1>{props.room.name}
    </h1>
  <b>  <p>Max Count:{props.room.maxcount}</p>
    <p>Phone number:{props.room.phonenumber}</p>
    <p>Type:{props.room.type}</p>
    </b>
    <div style={{float:"right"}}>


{(props.fromdate&&(
  <Link to={`/book/${props.room._id}/${props.fromdate}`}>
  <button className="btn btn-primary m-2">Book Now</button>
  </Link>
))}


    
      <button className="btn btn-primary" onClick={handleShow}>View Details</button>
    </div>
    </div> 
 
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header >
          <Modal.Title>{props.room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>   
          {/* <Carousel>

{props.room.imageurls.map(url=>{
return      <div>
 <Carousel.Item>
<img
  className="d-block w-100 bigimg"
  src={url}

/>

</Carousel.Item></div>

})}

    </Carousel> */}

<Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={props.room.imageurls[0]}
          alt="First slide"
        />
           <p>{props.room.description}</p>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={props.room.imageurls[1]}
          alt="Second slide"
        />
    <p>{props.room.description}</p>
     
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={props.room.imageurls[2]}
          alt="Third slide"
        />

<p>{props.room.description}</p>
      </Carousel.Item>
    </Carousel>

    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Room