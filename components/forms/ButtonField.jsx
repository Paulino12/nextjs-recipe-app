import React from 'react'

function ButtonField({
    type,
    btnText,
    ariaLabel,
    handleClick,
    className,
    disabled
}) {
    return (
        <>
            <button 
            onClick={handleClick} 
            type={type} 
            disabled={disabled} 
            aria-label={ariaLabel}
            className={`font-semibold px-3 text-white bg-violet-500 hover:bg-violet-600 active:bg-violet-600 
            focus:outline-none focus:ring focus:ring-violet-300 ${className}`}>
                {btnText}
            </button>
        </>
    )
}

export default ButtonField
