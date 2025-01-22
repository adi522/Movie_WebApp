export { removemovie } from "../reducers/movieSlice"
import axiosInstance from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axiosInstance.get(`/movie/${id}`)
        const externalId = await axiosInstance.get(`/movie/${id}/external_ids`)
        const recommendations = await axiosInstance.get(`/movie/${id}/recommendations`)
        const similar = await axiosInstance.get(`/movie/${id}/similar`)
        const videos = await axiosInstance.get(`/movie/${id}/videos`)
        const credits = await axiosInstance.get(`/movie/${id}/credits`)
        const translations = await axiosInstance.get(`/movie/${id}/translations`)
        const watchProvider = await axiosInstance.get(`/movie/${id}/watch/providers`)

        let allTheData = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((movie) => movie.type === "Trailer"),
            watchProvider: watchProvider.data.results.IN,
            credits: credits.data,
            translations: translations.data,
        }

        dispatch(loadmovie(allTheData))

    } catch (error) {
        console.log("Error", error)
    }
}

