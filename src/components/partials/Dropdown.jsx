import React from 'react'

function Dropdown({ title, options, changeFunc }) {
    return (
        <div className='select'>
            <select defaultValue='0' onChange={changeFunc} name='format' id='format'>
                <option value="0" disabled>
                    {title}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown
