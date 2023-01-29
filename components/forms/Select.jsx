import React from 'react'

function Select({
    className,
    options,
    value,
    handleChange,
    disabled,
    optionNumbers
}) {
    return (
        <>
            <select id="customScroll" className={`block h-full lg:px-0 py-1.5 border border-gray-300 rounded-sm text-xs lg:text-sm shadow-sm
            placeholder-gray-400
            focus:outline-none focus:border-violet-500 focus:ring-violet-500 ${disabled && 'bg-gray-200'} ${className}`}
            aria-label="Default select example"
            value={value}
            onChange={handleChange}
            disabled={disabled} >
                {
                    options.map((option, index) => {
                        return <option className='capitalize' key={index} value={option}>
                            {
                                `
                                    ${option} 
                                    ${!optionNumbers[option] ? '' : `(${optionNumbers[option]})`}
                                `
                            }
                            </option>
                    })
                }
            </select>
        </>
    )
}

export default Select
