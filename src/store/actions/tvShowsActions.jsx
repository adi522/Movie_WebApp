export { removetv } from "../reducers/tvSlice"
import axios from '../../utils/axios'
import { loadtv } from "../reducers/tvSlice"

export const asyncloadtv = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/tv/${id}`)
        const credits = await axios.get(`/tv/${id}/credits`)
        const externalId = await axios.get(`/tv/${id}/external_ids`)
        const recommendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const videos = await axios.get(`/tv/${id}/videos`)
        const watchProvider = await axios.get(`/tv/${id}/watch/providers`)

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