import React from 'react'

function Textarea({
    className,
    placeholder,
    value,
    handleTextArea
}) {
    return (
        <div>
            <textarea
            maxLength={250}
            className={`
                resize-none
                mb-2
                block
                w-full
                px-3
                py-1.5
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded-sm
                transition
                ease-in-out
                m-0
                focus:outline-none focus:border-violet-500 focus:ring-violet-500 ${className}`}
            rows="6"
            placeholder={placeholder}
            required
            value={value}
            onChange={handleTextArea}
            >
            </textarea>
        </div>
    )
}

export default Textarea
