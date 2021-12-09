import axiosInstance from '../../../api/instance'
import { CONNECTION_ERROR } from '../../../constants/api'

export default async ({id}) => {
    const response = await axiosInstance().get("/projects/name/" + id)
    .catch((error) => {
        return {'data': CONNECTION_ERROR}
    })
    return response.data
}