import axiosInstance from '../../../api/instance'
import { CONNECTION_ERROR } from '../../../constants/api'

const saveBuffer = async (text) => {
    const response = await axiosInstance().post("/notes/buffer", {'content': text}).catch((error) => {
        return {'data': CONNECTION_ERROR}
    })
    return response.data
}

export default saveBuffer