import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate, Navigate, Links } from 'react-router-dom'
import { asyncloadperson, removeperson } from '../store/actions/peopleActions'
import Loading from './Loading'
import noImage from '/noimage.jpg'
import CastCards from './partials/CastCards'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from '../components/partials/Dropdown'

function PersonDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { info } = useSelector((state) => state.people)

    const [category, setCategory] = useState("movie")

    useEffect(() => {
        dispatch(asyncloadperson(id))
        return () => {
            dispatch(removeperson())
        }
    }, [category])

    const [showFullBio, setShowFullBio] = useState(false);

    const handleToggleBio = () => setShowFullBio(!showFullBio);

    const biography = info?.detail?.biography || "";
    const isLongBio = biography.length > 1000;


    if (info && info.detail) {
        document.title = `${info.detail.name ?? info.detail.original_title ?? info.detail.original_name}`;
    }


    return info ? (
        <div className=' text-white px-[5%] h-full w-full overflow-y-auto '>

            <nav className='navbar text-white text-[1.5vw] px-[10%] flex gap-10 h-[10vh] items-center'>
                <Link onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD]" title='Go back'></Link>
            </nav>

            <div className='imageNinfo w-full h-[50vh] flex gap-2 text-white'>
                <div className='w-[25%] h-[60vh] '>
                    <div>
                        <img className='h-[60vh] object-cover rounded-lg flex justify-center items-center border-2 border-zinc-100 p-5 '
                            src={`https://image.tmdb.org/t/p/original/${info?.detail?.profile_path}`} alt="" />
                    </div>
                    <div className='mt-5 flex gap-5 text-[1.5vw] '>
                        <Link title='Facebook' target='_blank' to={`https://www.facebook.com/${info?.external_ids?.instagram_id}/`} className="ri-facebook-circle-fill"></Link>
                        <Link title='Instagram' target='_blank' to={`https://www.instagram.com/${info?.external_ids?.instagram_id}/`} className="ri-instagram-line"></Link>
                        <Link title='Wikidata' target='_blank' to={`https://www.wikidata.org/wiki/${info?.external_ids?.wikidata_id}`} className="ri-global-line"></Link>
                        <Link title='imdb' target='_blank' to={`https://www.imdb.com/name/${info?.external_ids?.imdb_id}`} className="">imdb</Link>
                    </div>

                    <div className='personal-info text-zinc-400'>
                        <h1 className='text-[1.5vw] font-extralight mt-5 text-zinc-200'>Personal Info</h1>
                        <div>
                            <h1>Known for</h1>
                            <h1>{info?.detail?.known_for_department}</h1>
                        </div>

                        <div className='mt-3'>
                            <h1 className='text-zinc-200'>Birthday</h1>
                            <h1 className=''>{info?.detail?.birthday}</h1>
                        </div>

                        <div className='mt-3'>
                            <h1 className='text-zinc-200'>Death</h1>
                            <h1>{info?.detail?.deathday ? info?.detail?.deathday : "Still Alive"}</h1>
                        </div>

                        <div className='mt-3'>
                            <h1 className='text-zinc-200'>Gender</h1>
                            <h1>{info?.detail?.gender == 1 ? 'Female' : 'Male'}</h1>
                        </div>
                        <div className='mt-3'>
                            <h1 className='text-zinc-200'>Birth Place</h1>
                            <h1>{info?.detail?.place_of_birth}</h1>
                        </div>
                    </div>

                </div>

                <div className='flex flex-col w-[75%]'>
                    <div>
                        <div className=''>
                            <h1 className='text-[2.5vw] mb-2'>{info?.detail?.name}</h1>
                        </div>
                        <div>
                            <h1 className='text-[1.5vw] text-zinc-300'>Biography</h1>
                            {
                                info?.detail?.biography.length > 0 ? (
                                    <h1 className='text-zinc-300'>
                                        {showFullBio || !isLongBio
                                            ? info.detail.biography
                                            : `${info.detail.biography.slice(0, 1000)}...`}
                                        {isLongBio && (
                                            <span
                                                onClick={handleToggleBio}
                                                className='text-blue-500 cursor-pointer'
                                            >
                                                {showFullBio ? ' Show less' : ' Read more'}
                                            </span>
                                        )}
                                    </h1>
                                ) : (
                                    <p>No biography available yet.</p>
                                )
                            }
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h1 className='text-[1.5vw]'>Known For</h1>
                        {info?.combined_credits?.cast && info?.combined_credits?.cast?.length > 0 ? (
                            <div>
                                <HorizontalCards data={info?.combined_credits?.cast} />
                            </div>
                        ) : (
                            <h1 className='text-white text-[3vw] text-center'>
                                Known For are not available
                            </h1>
                        )}
                    </div>


                    <div className='pb-10'>
                        <div className='w-full flex justify-between mb-10 items-center'>
                            <h1 className='text-[2vw]'>Acting</h1>
                            <Dropdown title={category} options={["tv", "movie"]} changeFunc={(e) => setCategory(e.target.value)} />
                        </div>

                        <div className='w-full h-[60vh] overflow-y-auto border-[1px] border-zinc-400 shadow-md shadow-white text-zinc-400'>
                            <div className=''>
                                {info[category + "_credits"]?.cast.map((elem, index) => (
                                    <div key={index} className='h-20 px-2 hover:text-white hover:bg-gray-800 py-1'>
                                        <Link to={`/${category}/details/${elem.id}`} className=''>{elem.name || elem.title || elem.original_name || elem.original_title}</Link>
                                        <Link className='block'>{elem.character ? `Character Name: ${elem.character}` : "Character Name: N/A"}</Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    ) : <Loading />
}

export default PersonDetails
