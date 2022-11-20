import React from 'react'

function Checkbox({
    type,
    value,
    name,
    handleChange,
    className,
    disabled,
    checked,
    defaultChecked
}) {
    return (
        <>
            <input 
            type={type} 
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            disabled={disabled}
            className={`mr-1 h-4 w-4 cursor-pointer ${className}`} />
        </>
    )
}

export default Checkbox
