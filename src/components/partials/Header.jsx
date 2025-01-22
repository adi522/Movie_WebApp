import React from 'react'
import { Link } from 'react-router-dom'
import noImage from "/noimage.jpg"

function Header({ wallpaper }) {


    return (
        <div style={{
            background: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.5),rgba(0,0,0,0.8)) , 
            url(https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path || wallpaper.profile_path})`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            overflow: 'hidden',
            backgroundRepeat: 'no-repeat'
        }} className='w-full h-[50vh] flex flex-col justify-end items-start p-[2%]' >
            <h1 className='text-white text-[3vw] capitalize font-bold font-serif'>
                {wallpaper.name || wallpaper.title || wallpaper.original_name || wallpaper.original_title || noImage}
            </h1>
            <p className='w-1/2 mt-2 text-white'>{wallpaper.overview.slice(0, 200)}
                <Link to={`/${wallpaper.media_type}/details/${wallpaper.id}`} className='text-blue-400'>...more</Link>
            </p>
            <div className='w-1/2 text-white flex gap-2 items-center justify-start mt-2 mb-2'>
                <p><i className="text-yellow-400 ri-star-line"></i> {wallpaper.vote_average.toFixed(1)}</p>
                <p><i className="text-yellow-400  ri-record-circle-fill"></i> {wallpaper.media_type.toUpperCase()}</p>
                <p><i className="text-yellow-400  ri-megaphone-line"></i> {(wallpaper.first_air_date ?? wallpaper.release_date ?? "undefined").split('-')[0]}</p>
            </div>
        </div>
    )
}

export default Header