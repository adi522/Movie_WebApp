import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import noImage from '/noimage.jpg'

function CastCards() {
    const { pathname } = useLocation()
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const category = pathname.includes("movie") ? "movie" : "tvShows";

    const { info } = useSelector((state) => state[category])

    return info && (
        <>
            <h1 className='Cast text-[2vw] text-white font-bold '>Cast</h1>
            <div className=' w-full h-[45vh] rounded-lg flex overflow-x-auto overflow-y-hidden text-white mb-10'>
                <div className='credits w-full h-[45vh] rounded-lg flex overflow-x-auto overflow-y-hidden'>
                    {info?.credits?.cast && info?.credits?.cast.length > 0 ? (
                        info?.credits?.cast.map((elem, index) => (
                            <Link to={`/people/details/${elem.id}`} key={index} className='flex flex-col basis-[20vw] items-center mr-5 m-2'>
                                <img
                                    className='min-w-[30vh] w-[30vh] h-[35vh] object-fill rounded-md'
                                    src={
                                        elem.profile_path
                                            ? `https://image.tmdb.org/t/p/original/${elem.profile_path}`
                                            : noImage
                                    }
                                    alt=''
                                />

                                <div className='mt-2'>
                                    <h1 className='text-[1vw] text-white font-semibold break-words text-center'>{elem.name}</h1>
                                    <h1 className='text-[1vw] text-white font-extralight break-words text-center'>{elem.character}</h1>
                                </div>
                            </Link>

                        ))
                    ) : (
                        <h1 className='text-white text-[3vw] text-center'>
                            No credits available</h1>
                    )}
                </div>
            </div >
        </>
    )
}

export default CastCards
