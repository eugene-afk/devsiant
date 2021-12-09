import axiosInstance from '../../../api/instance'

export default async (file, toast, endpoint = '') => {

    const response = await axiosInstance().post(`/reports/import/${endpoint}`, file, {headers: { 'Content-Type': 'multipart/form-data' }}).then((res => {
        toast.success("Data imported successfully!")
    })).catch((error) => {
        toast.error("Failed.")
    })

    return response
}