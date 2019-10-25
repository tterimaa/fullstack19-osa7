import React from 'react'

const CustomInput = (props) => {
  return (
        <>
         <input
           type={props.type}
           value={props.value}
           onChange={props.onChange}
         />
        </>
  )
}

export default CustomInput