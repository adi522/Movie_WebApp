import React from 'react'
import { Link } from 'react-router-dom'
import noImage from '/noimage.jpg'

function Cards({ data, title }) {

    return (
        <div className='w-full flex flex-wrap items-center justify-center'>
            {data.map((card, index) => (
                <Link title={`${card.name || card.title || card.original_name || card.original_title}`} to={`/${card.media_type || title}/details/${card.id}`} key={index} className='relative w-[30vh] mr-[3%] mb-[3%] hover:shadow-md hover:shadow-white flex flex-col  justify-center items-center' >
                    <img className='h-[40vh] object-cover rounded-lg ' src={`https://image.tmdb.org/t/p/original/${card.backdrop_path || card.profile_path || card.poster_path || noImage}`} alt="" />
                    <h1 className='text-zinc-500 text-center text-[1.2vw] font-semibold '>
                        {(card.name || card.title || card.original_name || card.original_title).slice(0, 50)}
                    </h1>
                    {card.vote_average &&
                        <div className='absolute text-white text-center right-[-10%] top-[60%] flex justify-center items-center rounded-full bg-yellow-500 w-[6vh] h-[6vh] hover:bg-[#6556CD]'>
                            {(card.vote_average).toFixed(1) * 10} <sup>%</sup>
                        </div>
                    }
                </Link>
            ))}
        </div>
    )
}

export default Cards
