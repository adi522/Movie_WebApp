import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { asyncloadmovie, removemovie } from '../store/actions/movieActions'
import Loading from '../components/Loading'
import noImage from '/noimage.jpg'
import HorizontalCards from './partials/HorizontalCards'
import CastCards from './partials/CastCards'

function MovieDetails() {

    const { pathname } = useLocation()

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { info } = useSelector((state) => state.movie)

    if (info && info.detail) {
        document.title = `${info.detail.belongs_to_collection?.name ?? info.detail.title ?? info.detail.original_title}`;
    }

    useEffect(() => {
        dispatch(asyncloadmovie(id));
        return () => {
            dispatch(removemovie())
        }

    }, [id])

    return info ? (
        <div className='relative w-screen h-screen overflow-x-auto'>

            <div className='background-image w-full h-full px-[10%]'
                style={{
                    background: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.5),rgba(0,0,0,0.8)) ,url(${info?.detail?.backdrop_path ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}` : noImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                <nav className='navbar text-white text-[1.5vw] px-[10%] flex gap-10 h-[10vh] items-center'>
                    <Link onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD]" title='Go back'></Link>
                    <a target='_blank' href={`https://www.wikidata.org/wiki/${info?.externalId?.wikidata_id}`} className="ri-global-line cursor-pointer hover:text-[#6556CD]" title='Wikidata'></a>
                    <a target='_blank' href={info?.detail?.homepage} className="ri-external-link-fill cursor-pointer hover:text-[#6556CD]" title='External Source'></a>
                    <a target='_blank' href={`https://www.imdb.com/title/${info?.externalId?.imdb_id}/`} className=" cursor-pointer hover:text-[#6556CD]" title='imdb rating'>imdb</a>
                </nav>


                <div className='Name-overview flex items-start gap-10 w-full'>
                    <img className='h-[40vh] object-cover rounded-lg flex justify-center items-center'
                        src={`https://image.tmdb.org/t/p/original/${info?.detail?.backdrop_path || info.profile_path}`} alt="" />
                    <div className='w-full'>
                        <h1 className='text-[3vw] text-white flex flex-nowrap'>{info?.detail?.belongs_to_collection?.name ?? info?.detail?.title ?? info.detail?.original_title
                        }</h1>
                        <h1 className='text-white text-[1.2vw]'>{info?.detail?.overview}</h1>
                        <div className='mt-5 mb-5 flex gap-3'>
                            <a target='_blank' href={`https://www.youtube.com/watch/${info?.videos?.key}`} className='text-slate-300 cursor-pointer bg-red-400 py-4 px-5 rounded-lg capitalize font-semibold  hover:text-white' title='Watch on Youtube'>
                                <i className='ri-play-fill mr-3' />
                                watch Trailer on Youtube</a>
                        </div>
                    </div>
                </div>

                <div className='vote flex text-white text-[1.2vw] gap-10 mt-5'>
                    <div className='flex gap-2'>
                        <i className="ri-star-s-fill text-yellow-400"></i>
                        <h1 className=''>{(info?.detail?.vote_average).toFixed(1)}</h1>
                    </div>
                    <div className='flex gap-2'>
                        <i className="ri-megaphone-line text-yellow-400"></i>
                        <h1 className=''>{(info?.detail?.release_date).split('-')[0]}</h1>
                    </div>
                    <div className='flex gap-2 '>
                        <h1 className=''>{(info?.detail?.genres.map((elem, index) => (<li key={index}>{elem.name}</li>)))}</h1>
                    </div>
                    <div className='flex gap-2'>
                        <i className="ri-time-line text-yellow-400"></i>
                        <h1 className=''>{(info?.detail?.runtime) + " min"}</h1>
                    </div>
                </div>

                <div className='platforms flex mb-5 text-white'>
                    <div>
                        <div className='flex flex-col gap-3 '>
                            <div className='Movie-name mt-5 flex text-white items-center'>
                                <h1 className='text-[3vw] text-white flex flex-nowrap'>{info?.detail?.belongs_to_collection?.name ?? info?.detail?.title ?? info.detail?.original_title
                                }</h1>
                                <h1 className='ml-2 text-[2vw]'>({info?.detail?.release_date.split('-')[0]})</h1>
                            </div>

                            <div className='flex gap-5 items-center'>
                                <h1>Available on Platform</h1>
                                {info.watchProvider && info.watchProvider.flatrate && info.watchProvider.flatrate.map((elem, index) => (
                                    <img title={elem.provider_name} key={index} className='w-10 h-10 object-cover' src={`https://image.tmdb.org/t/p/original/${elem.logo_path}`} alt='' />
                                ))}

                            </div>


                            <div className='flex gap-5 items-center'>
                                <h1>Available on Rent</h1>
                                {info.watchProvider && info.watchProvider.rent && info.watchProvider.rent.map((elem, index) => (
                                    <img title={elem.provider_name} key={index} className='w-10 h-10 object-cover' src={`https://image.tmdb.org/t/p/original/${elem.logo_path}`} alt='' />
                                ))}
                            </div>

                            <div className='flex gap-5 items-center'>
                                <h1>Available on Buy</h1>
                                {info.watchProvider && info.watchProvider.buy && info.watchProvider.buy.map((elem, index) => (
                                    <img title={elem.provider_name} key={index} className='w-10 h-10 object-cover' src={`https://image.tmdb.org/t/p/original/${elem.logo_path}`} alt='' />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-10'>
                    {info?.credits?.cast && info?.credits?.cast?.length > 0 ? (
                        <div>
                            <CastCards />
                        </div>
                    ) : (
                        <h1 className='text-white text-[3vw] text-center'>
                            Cast are not available
                        </h1>
                    )}
                </div>

                {info.similar && info.similar.length > 0 ? (
                    <div>
                        <h1 className='text-[2vw] text-white font-bold'>Similar</h1>
                        <HorizontalCards data={info.similar.map(item => ({
                            ...item,
                            media_type: 'movie',
                        }))} />
                    </div>
                ) : (
                    <h1 className='text-white text-[3vw] text-center'>
                        Similar items are not available
                    </h1>
                )}



                {info.recommendations && info.recommendations.length > 0 ? (
                    <div>
                        <h1 className='text-[2vw] text-white font-bold'>Recommendations</h1>
                        <HorizontalCards data={info.recommendations} />
                    </div>
                ) : (
                    <h1 className='text-white text-[3vw] text-center'>
                        Recommendations are not available
                    </h1>
                )}


            </div>
        </div >
    ) : <Loading />
}

export default MovieDetails
