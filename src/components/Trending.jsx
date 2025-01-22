import { useNavigate } from 'react-router-dom'
import TopNav from "./partials/TopNav"
import Dropdown from "./partials/Dropdown"
import Cards from './partials/Cards'
import axiosInstance from '../utils/axios'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

function Trending() {
    const navigate = useNavigate()
    const [category, setCategory] = useState('all')
    const [duration, setDuration] = useState('day')
    const [trending, setTrending] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    document.title = "Trending | " + category.toUpperCase();

    const getTrending = async () => {
        try {
            const { data } = await axiosInstance.get(`/trending/${category}/${duration}?page=${page}`)
            if (data.results.length > 0) {
                setPage(page + 1)
                setTrending((prevState) => [...prevState, ...data.results])
            } else {
                setHasMore(false)
            }
            setPage(page + 1)
        } catch (error) {
            console.log("Error", error)
        }
    }

    const refreshHandler = async () => {
        if (trending.length === 0) {
            getTrending();
        } else {
            setPage(1)
            setTrending([])
            getTrending()
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category, duration])

    return trending.length > 0 ? (
        <div className='px-[3%] w-screen h-screen '>
            <div className='w-full h-[10%] flex justify-center items-center' >
                <div className='flex justify-center text-[1.5vw] text-zinc-300 '>
                    <i onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD]"></i>
                    <h1 className='font-semibold font-serif ml-2'>Trending</h1>
                    <h1 className='text-sm flex items-center justify-center px-2'>({category})</h1>
                    <h1 className='text-sm flex items-center justify-center'>({duration})</h1>
                </div>
                <TopNav />
                <div className='flex gap-3'>
                    <Dropdown title={category} options={["movie", "tv"]} changeFunc={(e) => setCategory(e.target.value)} />
                    <Dropdown title={duration} options={["week", "day"]} changeFunc={(e) => setDuration(e.target.value)} />
                </div>
            </div>

            <InfiniteScroll
                dataLength={trending.length}
                next={getTrending}
                hasMore={hasMore}
                loader={<h1 className='text-white'>Loading...</h1>}
            >
                <Cards data={trending} title={category} />
            </InfiniteScroll>

        </div>
    ) : <Loading />
}

export default Trending
