export { removetv } from "../reducers/tvSlice"
import axiosInstance from '../../utils/axios'
import { loadtv } from "../reducers/tvSlice"

export const asyncloadtv = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axiosInstance.get(`/tv/${id}`)
        const credits = await axiosInstance.get(`/tv/${id}/credits`)
        const externalId = await axiosInstance.get(`/tv/${id}/external_ids`)
        const recommendations = await axiosInstance.get(`/tv/${id}/recommendations`)
        const similar = await axiosInstance.get(`/tv/${id}/similar`)
        const videos = await axiosInstance.get(`/tv/${id}/videos`)
        const watchProvider = await axiosInstance.get(`/tv/${id}/watch/providers`)

        let allTheData = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data,
            watchProvider: watchProvider.data.results,
            credits: credits.data,
        }

        dispatch(loadtv(allTheData))

    } catch (error) {
        console.log("Error", error)
    }
}