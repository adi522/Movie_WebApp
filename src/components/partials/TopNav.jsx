import axios from '../../utils/axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from "/noimage.jpg";

function TopNav() {
    const [query, setQuery] = useState('')
    const [searchData, setSearchData] = useState([])

    const getSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`)
            setSearchData(data.results)
        } catch (error) {
            console.log("Error", error)
        }
    }

    useEffect(() => {
        getSearches()
    }, [query])

    return (
        <div className='z-[100] w-full h-[10vh] text-white relative flex items-center justify-center'>
            <i className="text-[1.5vw] ri-search-2-line"></i>
            <input
                className='w-[65%] px-1 py-2 mx-5 border-[1px] outline-none rounded-full text-white text-[1.2vw] bg-transparent'
                type="text"
                placeholder='search movies here....'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {query.length > 0 && (
                <i onClick={() => setQuery("")} className="absolute right-[20%] text-[1.5vw] ri-close-large-fill cursor-pointer"></i>
            )
            }

            <div className='bg-zinc-300 w-[52vw] max-h-[50vh] absolute top-[100%] rounded-lg text-zinc-500 overflow-auto'>
                {searchData.map((data, index) => (
                    <Link to={`/${data.media_type}/details/${data.id}`} key={index} className='font-semibold w-[100%] flex justify-start items-center px-10 py-8 hover:text-black border-b-2 border-zinc-600 hover:bg-[#8C8A86]'>
                        <img
                            className='object-cover w-[15vw] h-[15vh] rounded-xl mr-3 shadow-lg'
                            src={
                                data.backdrop_path || data.profile_path ? `https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}` : noimage} alt="" />
                        <span className='ml-2'>{data.name || data.original_name || data.title || data.original_title}</span>
                    </Link>
                ))}

            </div>
        </div >
    )
}

export default TopNav