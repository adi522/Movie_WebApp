import React from 'react'
import { Link } from 'react-router-dom'
import noImage from '/noimage.jpg'

function HorizontalCards({ trending, title }) {

    return (
        <div className='w-full flex gap-3 overflow-y-hidden mb-5'
            style={{ scrollBehavior: 'smooth' }}>
            {trending.map((elem, index) => (
                <Link to={`/${elem.media_type}/details/:${elem.id}`} key={index} className='ml-2 min-w-[17%] rounded-lg flex flex-col bg-zinc-800 hover:bg-zinc-950 mb-3'>
                    <img
                        className='w-full h-40% bg-cover rounded-t-lg'
                        src={`https://image.tmdb.org/t/p/original/${elem.backdrop_path || elem.poster_path || noImage}`} alt="" />
                    <div className='flex justify-center items-center my-3'>
                        <h1 className='text-xl font-bold text-white'>{elem.title || elem.name || elem.original_title || elem.original_name}
                        </h1>
                    </div>
                    <div className='px-2 select-none mb-3 text-white'>
                        <span>{elem.overview && elem.overview.slice(0, 100)}</span>
                        <Link className='text-blue-400'>....Read more</Link>
                    </div>
                    <div className='flex justify-center gap-10 mt-auto top-[90%] text-white'>
                        <p><i className="text-yellow-400 ri-star-line"></i> {elem.vote_average && elem.vote_average.toFixed(1)}</p>
                        <p><i className="text-yellow-400  ri-record-circle-fill"></i> {elem.media_type.toUpperCase()}</p>
                    </div>
                </Link>
            ))}ml-2
        </div>
    )
}

export default HorizontalCards
