import React, { useEffect, useState } from 'react'
import Sidenav from './partials/Sidenav'
import TopNav from './partials/TopNav'
import axiosInstance from '../utils/axios'
import Header from './partials/Header'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from './partials/Dropdown'
import Loading from "./Loading"

function Home() {
  const [wallpaper, setWallpaper] = useState(null)
  const [trending, setTrending] = useState(null)
  const [category, setCategory] = useState("all")

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axiosInstance.get('/trending/all/day')
      let randomData = data.results[(Math.random() * data.results.length).toFixed()]
      setWallpaper(randomData)
    } catch (error) {
      console.log("Error", error)
    }
  }

  const getTrendingData = async () => {
    try {
      const { data } = await axiosInstance.get(`/trending/${category}/day`)
      setTrending(data.results)
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    getTrendingData();
    !wallpaper && getHeaderWallpaper()
  }, [category])

  return wallpaper ? (
    <>
      <Sidenav />
      <div className='w-[100%] h-full overflow-auto overflow-x-hidden'>
        <TopNav />
        <Header wallpaper={wallpaper} />
        <div className='flex justify-between p-3'>
          <h1 className='text-zinc-400 font-semibold text-[2vw] mb-2'>Trending</h1>
          <Dropdown title={category} options={["tv", "movie", "all"]} changeFunc={(e) => setCategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : <Loading />
}

export default Home
