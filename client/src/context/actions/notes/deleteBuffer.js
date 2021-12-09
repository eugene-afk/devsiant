import axiosInstance from '../../../api/instance'
import { CONNECTION_ERROR } from '../../../constants/api'

const deleteBuffer = async () => {
    const response = await axiosInstance().delete("/notes/buffer").catch((error) => {
        return {'data': CONNECTION_ERROR}
    })
    return response.data
}

export default deleteBuffer