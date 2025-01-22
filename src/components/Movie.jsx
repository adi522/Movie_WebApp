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
    const [category, setCategory] = useState('now_playing')
    const [movie, setMovie] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    document.title = "Movie | " + category.toUpperCase();

    const getMovie = async () => {
        try {
            const { data } = await axiosInstance.get(`/movie/${category}?page=${page}`)
            if (data.results.length > 0) {
                setPage(page + 1)
                setMovie((prevState) => [...prevState, ...data.results])
            } else {
                setHasMore(false)
            }
            setPage(page + 1)
        } catch (error) {
            console.log("Error", error)
        }
    }

    const refreshHandler = async () => {
        if (movie.length === 0) {
            getMovie();
        } else {
            setPage(1)
            setMovie([])
            getMovie()
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category])

    return movie.length > 0 ? (
        <div className='px-[3%] w-screen h-screen'>
            <div className='w-full h-[10%] flex justify-center items-center'>
                <div className='flex justify-center text-[1.5vw] text-zinc-300 '>
                    <i onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD]"></i>
                    <h1 className='block font-semibold font-serif ml-2'>Movie</h1>
                    <h1 className='text-sm flex items-center justify-center px-2'>({category})</h1>
                </div>
                <TopNav />
                <div className='flex gap-3'>
                    <Dropdown title={category} options={["popular", "top_rated", "upcoming", "now_playing"]} changeFunc={(e) => setCategory(e.target.value)} />
                </div>
            </div>

            <InfiniteScroll
                dataLength={movie.length}
                next={getMovie}
                hasMore={hasMore}
                loader={<h1 className='text-white'>Loading...</h1>}
            >
                <Cards data={movie} title="movie" />
            </InfiniteScroll>

        </div>
    ) : <Loading />
}

export default Popular
