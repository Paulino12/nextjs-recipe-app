import React, { useEffect, useRef } from 'react'

function Input({
    name,
    inputLabel,
    forwardedRef,
    className,
    type,
    placeholder,
    value,
    handleChange,
    handleKeyDown,
    disabled,
    autoComplete,
    min,
    step,
    maxLength
}) {

    return (
        <>
            <input 
            name={name}// for nextauth signin process
            label={inputLabel}// for nextauth signin process
            ref={forwardedRef}
            value={value} 
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`block w-full px-1 md:px-3 py-2 border border-gray-300 rounded-sm shadow-sm
            placeholder-gray-400
            focus:outline-none focus:border-violet-500 focus:ring-violet-500
            ${disabled && 'bg-gray-200'} ${className}`}
            placeholder={placeholder}
            required
            autoComplete={autoComplete}
            maxLength={maxLength}
            type={type}
            min={min} step={step}
            disabled={disabled}
             />
        </>
    )
}

export default Input
