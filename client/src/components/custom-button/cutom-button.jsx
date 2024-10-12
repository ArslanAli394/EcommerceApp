import React from 'react'

const CustomButton =({children,...otherButtonProps})=>{
    return(
        <button {...otherButtonProps}>
            {children}
        </button>
    )
}
export default CustomButton;