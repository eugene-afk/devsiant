export const baseURL = process.env.REACT_APP_ENV === 'production'?process.env.REACT_APP_API_URL + `${process.env.REACT_APP_PORT ? ':' + process.env.REACT_APP_PORT : ''}`
    :"http://127.0.0.1:5000"

