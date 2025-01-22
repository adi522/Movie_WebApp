import { useNavigate } from 'react-router-dom'
import TopNav from "./partials/TopNav"
import Dropdown from "./partials/Dropdown"
import Cards from './partials/Cards'
import axios from '../utils/axios'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

function TvShows() {
    const navigate = useNavigate()
    const [category, setCategory] = useState('airing_today')
    const [tvShows, setTvShow] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    document.title = "TV Show | " + category.toUpperCase();

    const getTvShow = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`)
            if (data.results.length > 0) {
                setPage(page + 1)
                setTvShow((prevState) => [...prevState, ...data.results])
            } else {
                setHasMore(false)
            }
            setPage(page + 1)
        } catch (error) {
            console.log("Error", error)

        }
    }

    const refreshHandler = async () => {
        if (tvShows.length === 0) {
            getTvShow();
        } else {
            setPage(1)
            setTvShow([])
            getTvShow()
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category])

    return tvShows.length > 0 ? (
        <div className='px-[3%] w-screen h-screen '>
            <div className='w-full h-[10%] flex justify-center items-center' >
                <div className='w-[25%] flex justify-center text-[1.5vw] text-zinc-300'>
                    <i onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD]"></i>
                    <h1 className='font-semibold font-serif ml-2 text-md'>Tv shows</h1>
                    <h1 className='text-sm flex items-center justify-center ml-2'>({category})</h1>
                </div>
                <TopNav />
                <div className='flex gap-3'>
                    <Dropdown title={category} options={["on_the_air", "popular", "top_rated", "airing_today"]} changeFunc={(e) => setCategory(e.target.value)} />
                </div>
            </div>

            <InfiniteScroll
                dataLength={tvShows.length}
                next={getTvShow}
                hasMore={hasMore}
                loader={<h1 className='text-white'>Loading...</h1>}
            >
                <Cards data={tvShows} title="tv" />
            </InfiniteScroll>

        </div>
    ) : <Loading />
}

export default TvShows
