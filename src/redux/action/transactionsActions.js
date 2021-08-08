import Axios from 'axios'

export const addCart = (id, data) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${id}`)
            .then(res => {
                let tempCart = res.data.cart
                tempCart.push(data)

                Axios.patch(`http://localhost:2000/users/${id}`, { cart: tempCart })
                    .then(res => {
                        Axios.get(`http://localhost:2000/users/${id}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })
    }
} 

export const delCart = (idUser, idProdCart) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${idUser}`)
            .then(res => {
                let tempCart = res.data.cart
                tempCart.splice(idProdCart, 1)

                Axios.patch(`http://localhost:2000/users/${idUser}`, { cart: tempCart })
                    .then(res => {
                        Axios.get(`http://localhost:2000/users/${idUser}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })
    }
}

export const saveCart = (idUser, idProdCart, qtyUpdate) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${idUser}`)
            .then(res => {
               
                let tempCart = res.data.cart

               
                let tempProd = res.data.cart[idProdCart]

                
                tempProd.qty = qtyUpdate

                
                tempCart.splice(idProdCart, 1, tempProd)

                
                Axios.patch(`http://localhost:2000/users/${idUser}`, { cart: tempCart })
                    .then(res => {
                        
                        Axios.get(`http://localhost:2000/users/${idUser}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })
    }
}
export const checkout = (idUser, dataTrans) => {
    return (dispatch) => {
       
        Axios.post('http://localhost:2000/history', dataTrans)
            .then(res => {
                let idUser = localStorage.getItem('idUser')

                Axios.get(`http://localhost:2000/history?idUser=${idUser}`)
                    .then(res => {
                        return dispatch({
                            type: 'GET_HISTORY',
                            payload: res.data
                        })
                    })
            })
            .then(res => {
              
                Axios.patch(`http://localhost:2000/users/${idUser}`, { cart: [] })
                    .then(res => {
                       
                        Axios.get(`http://localhost:2000/users/${idUser}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })
    }
}

export const getHistory = () => {
    return (dispatch) => {
        let idUser = localStorage.getItem('idUser')
        Axios.get(`http://localhost:2000/history?idUser=${idUser}`)
            .then(res => {
                return dispatch({
                    type: 'GET_HISTORY',
                    payload: res.data
                })
            })
    }
}