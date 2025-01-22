import React from 'react'
import { Link } from 'react-router-dom'
import noImage from '/noimage.jpg'

function HorizontalCards({ data }) {

    return (
        <>
            <div className=' mt-5 w-full h-[52vh] rounded-lg flex overflow-x-auto overflow-y-hidden mb-10 '>
                {data.map((elem, index) => (
                    <div key={index} className='flex flex-col basis-[20vw] items-center mr-5 m-2 hover:shadow-lg hover:shadow-white hover:duration-300'>
                        <Link title={`${elem.title || elem.original_title || elem.name || elem.original_name}`} to={`/${elem.media_type}/details/${elem.id}`} key={index}>
                            <img
                                className='min-w-[30vh] w-[10vw] h-[20vh] object-contain rounded-md'
                                src={
                                    elem.backdrop_path
                                        ? `https://image.tmdb.org/t/p/original/${elem.backdrop_path || elem.poster_path}`
                                        : noImage
                                }
                                alt=''
                            />
                        </Link>
                        <div className=''>
                            <h1 className='text-[1vw] text-white font-semibold break-words text-center'>{elem.title || elem.original_title || elem.name || elem.original_name}</h1>
                        </div>
                        <div className='px-2 select-none mb-3 text-white overflow-y-auto'>
                            <span className='mt-2'>{elem.overview && elem.overview.slice(0, 110)}...</span>
                            <Link to={`/${elem.media_type}/details/${elem.id}`} className='text-blue-400'>Read more</Link>
                            <h1></h1>
                        </div>
                        <div className='flex justify-center gap-10 mt-auto top-[70%] text-white'>
                            <p><i className="text-yellow-400 ri-star-line"></i> {elem.vote_average && elem.vote_average.toFixed(1)}</p>
                            <p><i className="text-yellow-400 ri-record-circle-fill"></i> {elem.media_type === 'movie' ? 'Movie' : 'TV Series'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default HorizontalCards