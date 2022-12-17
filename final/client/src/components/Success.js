import React from 'react'

function Success(props) {
  return (
    <div>
        <div class="alert alert-success" role="alert">
  {/* This is a success alert—check it out! */}
  {props.message}
</div>
    </div>
  )
}

export default Success