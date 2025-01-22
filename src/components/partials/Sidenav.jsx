import React from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

function Sidenav() {
    return (
        <div className=' text-white border-r-[1px] border-zinc-400 w-[20%] px-8 py-5 h-full'>
            <div className='flex gap-5 mb-7 text-[1.5vw]'>
                <i className="ri-movie-2-ai-line"></i>
                <h1 className='text-white font-sans'>Movie</h1>
            </div>
            <div className='text-[1.3vw] font-semibold'>
                <h1 className='mb-7'>New Feeds</h1>
            </div>
            <div className='px-3 flex flex-col gap-3 text-zinc-500 text-[1.2vw] leading-7'>
                <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white hover:scale-105 duration-300 rounded-xl p-2 ">
                    <i className="mr-2 ri-fire-line"></i> Trending
                </Link>
                <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white hover:scale-105 duration-300 rounded-xl p-2 ">
                    <i className="mr-2 ri-bard-fill"></i> Popular
                </Link>
                <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white hover:scale-105 duration-300 rounded-xl p-2 ">
                    <i className="mr-2 ri-movie-2-fill"></i> Movies
                </Link>
                <Link to="/tv_shows" className="hover:bg-[#6556CD] hover:text-white hover:scale-105 duration-300 rounded-xl p-2 ">
                    <i className="mr-2 ri-tv-2-line"></i> Tv Shows
                </Link>
                <Link to="/people" className="hover:bg-[#6556CD] hover:text-white hover:scale-105 duration-300 rounded-xl p-2 ">
                    <i className="mr-2 ri-team-fill"></i> People
                </Link>
            </div>
            <hr className='my-7' />
            <div className='px-3 flex flex-col gap-3 text-zinc-500 text-[1.2vw]' >
                <Link to="/about" className="hover:bg-[#6556CD] hover:text-white hover:scale-105 duration-300 rounded-xl p-2">
                    <i className="mr-2 ri-information-2-line"></i>About
                </Link>
                <Link to="/contact_us" className="hover:bg-[#6556CD] hover:text-white hover:scale-105 duration-300 rounded-xl p-2 ">
                    <i className="mr-2 ri-contacts-line"></i>Contact Us
                </Link>
            </div>
        </div >
    )
}

export default Sidenav
