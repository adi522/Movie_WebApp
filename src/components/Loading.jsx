import React from 'react'
import loader from '/loading.gif'

function Loading() {

    return (
        <div className='w-full h-screen flex justify-center items-center select-none'>
            <img className='' src={loader} alt="" />

        </div >
    )
}

export default Loading