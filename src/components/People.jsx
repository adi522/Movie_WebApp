import { useNavigate } from 'react-router-dom'
import TopNav from "./partials/TopNav"
import Cards from './partials/Cards'
import axiosInstance from '../utils/axios'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

function People() {
    const navigate = useNavigate()
    const [category, setCategory] = useState('popular')
    const [perosn, setPerson] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    document.title = "People | " + category.toUpperCase();

    const getPerson = async () => {
        try {
            const { data } = await axiosInstance.get(`/person/${category}?page=${page}`)
            if (data.results.length > 0) {
                setPage(page + 1)
                setPerson((prevState) => [...prevState, ...data.results])
            } else {
                setHasMore(false)
            }
            setPage(page + 1)
        } catch (error) {
            console.log("Error", error)
        }
    }

    const refreshHandler = async () => {
        if (perosn.length === 0) {
            getPerson();
        } else {
            setPage(1)
            setPerson([])
            getPerson()
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category])

    return perosn.length > 0 ? (
        <div className='px-[3%] w-screen h-screen '>
            <div className='w-full h-[10%] flex justify-center items-center' >
                <div className='flex justify-center text-[1.5vw] text-zinc-300 '>
                    <i onClick={() => navigate(-1)} className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD]"></i>
                    <h1 className='font-semibold font-serif ml-2'>People</h1>
                </div>
                <TopNav />
            </div>

            <InfiniteScroll
                dataLength={perosn.length}
                next={getPerson}
                hasMore={hasMore}
                loader={<h1 className='text-white'>Loading...</h1>}
            >
                <Cards data={perosn} title="people" />
            </InfiniteScroll>

        </div>
    ) : <Loading />
}

export default People
