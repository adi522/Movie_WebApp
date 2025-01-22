import { useNavigate } from 'react-router-dom'
import TopNav from "./partials/TopNav"
import Dropdown from "./partials/Dropdown"
import Cards from './partials/Cards'
import axiosInstance from '../utils/axios'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

function Popular() {
    const navigate = useNavigate()
    const [category, setCategory] = useState('movie')
    const [popular, setPopular] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    document.title = "Popular | " + category.toUpperCase();

    const getPopular = async () => {
        try {
            const { data } = await axiosInstance.get(`${category}/popular?page=${page}`)
            if (data.results.length > 0) {
                setPage(page + 1)
                setPopular((prevState) => [...prevState, ...data.results])
            } else {
                setHasMore(false)
            }
            setPage(page + 1)
        } catch (error) {
            console.log("Error", error)
        }
    }

    const refreshHandler = async () => {
        if (popular.length === 0) {
            getPopular();
        } else {
            setPage(1)
            setPopular([])
            getPopular()
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category])

    return popular.length > 0 ? (
        <div className='px-[3%] w-screen h-screen '>
            <div className='w-full h-[10%] flex justify-center items-center' >
                <div className='flex justify-center text-[1.5vw] text-zinc-300 '>
                    <i onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD]"></i>
                    <h1 className='font-semibold font-serif ml-2'>Popular</h1>
                    <h1 className='text-sm flex items-center justify-center px-2'>({category})</h1>
                </div>
                <TopNav />
                <div className='flex gap-3'>
                    <Dropdown title={category} options={["tv", "movie"]} changeFunc={(e) => setCategory(e.target.value)} />
                </div>
            </div>

            <InfiniteScroll
                dataLength={popular.length}
                next={getPopular}
                hasMore={hasMore}
                loader={<h1 className='text-white'>Loading...</h1>}
            >
                <Cards data={popular} title={category} />
            </InfiniteScroll>

        </div>
    ) : <Loading />
}

export default Popular
