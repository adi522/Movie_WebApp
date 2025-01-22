import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { asyncloadtv, removetv } from '../store/actions/tvShowsActions'
import Loading from '../components/Loading'
import HorizontalCards from '../components/partials/HorizontalCards'
import noImage from '/noimage.jpg'
import CastCards from './partials/CastCards'

function TvDetails() {

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    const { info } = useSelector((state) => state.tvShows)

    if (info && info.detail) {
        document.title = `${info.detail.name ?? info.detail.title ?? info.detail.original_title ?? info.detail.original_name}`;
    }


    useEffect(() => {
        dispatch(asyncloadtv(id))
        return () => {
            dispatch(removetv())
        }
    }, [id])

    return info ? (
        <div className='w-screen h-screen overflow-x-auto'>
            <div className='w-full h-full px-[10%]'  // h-full
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.5),rgba(0,0,0,0.8)) ,url(https://image.tmdb.org/t/p/original/${info?.detail?.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top'
                }}>
                <nav className='text-white text-[1.5vw] px-[10%] flex gap-10 h-[10vh] items-center'>
                    <Link onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD]" title='Go back'></Link>
                    <a target='_blank' href={`https://www.wikidata.org/wiki/${info?.externalId?.wikidata_id}`} className="ri-global-line cursor-pointer hover:text-[#6556CD]" title='Wikidata'></a>
                    <a target='_blank' href={info?.detail?.homepage} className="ri-external-link-fill cursor-pointer hover:text-[#6556CD]" title='External Source'></a>
                    <a target='_blank' href={`https://www.imdb.com/title/${info?.externalId?.imdb_id}/`} className=" cursor-pointer hover:text-[#6556CD]" title='imdb rating'>imdb</a>
                </nav>

                <div className='flex items-start'>
                    <img className='h-[40vh] object-cover rounded-lg flex justify-center items-center'
                        src={`https://image.tmdb.org/t/p/original/${info?.detail?.backdrop_path || info.profile_path}`} alt="" />
                    <div className='Movie-name text-white items-center ml-[2%]'>
                        <div>
                            <h1 className='text-[3vw] text-white flex flex-nowrap font-bold'>{info?.detail?.name ?? info?.detail?.original_name ?? info?.detail?.title ?? info.detail?.original_title
                            }</h1>
                            <p>{info?.detail?.overview}</p>
                        </div>
                        <div className='mt-5'>
                            <a target='_blank' href={`https://www.youtube.com/watch?v=${((info?.videos?.results?.map((elem, index) => ((elem.key)))))}`} className='text-slate-300 cursor-pointer bg-[#6556CD] py-4 px-5 rounded-lg capitalize font-semibold  hover:text-white' title='Watch Trailer on Youtube'>
                                <i className='ri-play-fill mr-3' />
                                watch Trailer on Youtube</a>
                        </div>
                    </div>
                </div>


                <div className='Movie-name mt-5 flex text-white items-center'>
                    <h1 className='text-[3vw] text-white flex flex-nowrap font-bold'>{info?.detail?.name ?? info?.detail?.original_name ?? info?.detail?.title ?? info.detail?.original_title
                    }</h1>
                    <h1 className='text-[2vw] ml-[1vw] font-semibold'>({info?.detail?.first_air_date.split('-')[0]})</h1>
                </div>

                <div className='vote flex text-white text-[1.2vw] gap-10 mt-5'>
                    <div className='flex gap-2'>
                        <i className="ri-star-s-fill text-yellow-400"></i>
                        <h1 className=''>{(info?.detail?.vote_average).toFixed(1)}</h1>
                    </div>
                    <div className='flex gap-2'>
                        <i className="ri-megaphone-line text-yellow-400"></i>
                        <h1 className=''>{(info?.detail?.first_air_date).split('-')[0]}</h1>
                    </div>
                    <div className='flex gap-2 '>
                        <h1 className=''>{(info?.detail?.genres.map((elem, index) => (<li key={index}>{elem.name}</li>)))}</h1>
                    </div>
                    <div className='flex gap-2'>
                        <i className="ri-time-line text-yellow-400"></i>
                        <h1 className=''>{(info?.detail?.episode_run_time) + " min (per Episode)"}</h1>
                    </div>
                </div>

                <div className='mt-5 text-white flex flex-col text-[1.2vw]'>
                    <div className='flex gap-2 items-center'>
                        <h1>Available on Platform</h1>
                        <a target='_blank' href={info?.detail?.homepage} className="ri-external-link-fill cursor-pointer hover:text-[#6556CD]" title='External Source'></a>
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
                            media_type: 'tv',
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
        </div>
    ) : <Loading />
}

export default TvDetails



