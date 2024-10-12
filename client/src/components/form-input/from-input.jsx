import React from 'react'


const FormInput =({handleChange, ...otherFormProps})=>{
    return(
            <input onChange={handleChange} {...otherFormProps}/>
    )
}
export default FormInput;