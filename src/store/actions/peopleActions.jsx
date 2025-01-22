export { removeperson } from "../reducers/personSlice"
import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/person/${id}`)
        const combined_credits = await axios.get(`person/${id}/combined_credits`)
        const external_ids = await axios.get(`person/${id}/external_ids`)
        const images = await axios.get(`person/${id}/images`)
        const latest = await axios.get(`person/latest`)
        const movie_credits = await axios.get(`person/${id}/movie_credits`)
        const tv_credits = await axios.get(`person/${id}/tv_credits`)

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