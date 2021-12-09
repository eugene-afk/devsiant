import axiosInstance from '../../../api/instance'
import { CONNECTION_ERROR } from '../../../constants/api'

const getBuffer = async () => {
    const response = await axiosInstance().get("/notes/buffer").catch((error) => {
        return {'data': CONNECTION_ERROR}
    })
    return response.data
}

export default getBuffer