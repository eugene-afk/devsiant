import { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/Provider'
import login from '../../context/actions/login'
import { useHistory } from "react-router-dom"
import isAuthenticated from '../../utils/isAuthenticated'
import { LOGOUT_USER } from '../../constants/actionTypes'

export default () => {
    const [form, setForm] = useState({})
    const history = useHistory()

    const {
        authDispatch,
        authState: {
            auth: { loading, error, data }
        }
    } = useContext(GlobalContext)

    const onChange = (e, {name, value}) => {
        setForm({...form, [name]: value})
    }

    const loginFormValid = !form.username?.length || !form.password?.length

    const onSubmit = () => {
        login(form)(authDispatch)(history)
    }

    useEffect(() => {
        if(data == null){
           return            
        }
        if(data.access_token){
            if(!isAuthenticated()){
                authDispatch({
                    type: LOGOUT_USER
                })
            }
            history.push('/')
        }
    }, [data])

    return { form, loading, loginFormValid, onSubmit, onChange, error }
}
