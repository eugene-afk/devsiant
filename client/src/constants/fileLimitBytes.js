export const fileLimitBytes = (process.env.REACT_APP_MAX_FILE_SIZE !== undefined && 
                               process.env.REACT_APP_MAX_FILE_SIZE !== "" && 
                               process.env.REACT_APP_MAX_FILE_SIZE > 0)?process.env.REACT_APP_MAX_FILE_SIZE: 3221225472