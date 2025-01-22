export { removeperson } from "../reducers/personSlice"
import axiosInstance from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axiosInstance.get(`/person/${id}`)
        const combined_credits = await axiosInstance.get(`person/${id}/combined_credits`)
        const external_ids = await axiosInstance.get(`person/${id}/external_ids`)
        const images = await axiosInstance.get(`person/${id}/images`)
        const latest = await axiosInstance.get(`person/latest`)
        const movie_credits = await axiosInstance.get(`person/${id}/movie_credits`)
        const tv_credits = await axiosInstance.get(`person/${id}/tv_credits`)

        let allthePeopleData = {
            detail: detail.data,
            combined_credits: combined_credits.data,
            external_ids: external_ids.data,
            images: images.data,
            latest: latest.data,
            movie_credits: movie_credits.data,
            tv_credits: tv_credits.data,
        }

        dispatch(loadperson(allthePeopleData))

    } catch (error) {
        console.log("Error :", error)
    }

}