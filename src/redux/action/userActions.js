import Axios from "axios";

export const login = (email, password) => {

    return (dispatch) => {
        Axios.get(`http://localhost:2000/users?email=${email}&password=${password}`)
            .then(res => {
                console.log(res.data)
                if (res.data.length === 0) {
                    
                    return dispatch({
                        type: 'ERROR_LOGIN'
                    })
                } else {
                    
                    localStorage.setItem('idUser', res.data[0].id)

                    
                    console.log(res.data[0])
                    return dispatch({
                        type: 'LOGIN',
                        payload: res.data[0]
                    })
                }
            })
    }
}

export const errLoginFalse = () => {
    return (dispatch) => {
        return dispatch({
            type: 'ERROR_LOGIN_FALSE'
        })
    }
}

export const logout = () => {
    return (dispatch) => {
       
        localStorage.removeItem('idUser')

        return dispatch({
            type: 'LOG_OUT'
        })
    }
}

export const keepLogin = (id) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${id}`)
        .then(res => {
            return dispatch({
                type: 'LOGIN',
                payload: res.data
            })
        })
    }
}


