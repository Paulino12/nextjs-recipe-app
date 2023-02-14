import React from 'react'

function Label({
    labelFor,
    className,
    text
}) {
    return (
        <>
            <label htmlFor={labelFor} className={`inline-block text-gray-900 font-medium text-xs md:text-sm ${className}`}>{text}</label>
        </>
    )
}

export default Label
