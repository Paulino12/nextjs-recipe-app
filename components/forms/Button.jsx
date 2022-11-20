import React from 'react'

function Button({
    type,
    btnText,
    handleClick,
    className,
    disabled
}) {
    return (
        <>
            <button onClick={handleClick} type={type} disabled={disabled} className={`font-semibold rounded-sm px-3 text-white bg-violet-500 hover:bg-violet-600 active:bg-violet-600 
            focus:outline-none focus:ring focus:ring-violet-300 ${className}`}>
                {btnText}
            </button>
        </>
    )
}

export default Button
