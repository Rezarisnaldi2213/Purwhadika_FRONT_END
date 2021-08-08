const INITIAL_STATE = {
    id: null,
    username : "",
    email: "",
    password: "",
    role: "",
    errorLogin: false ,
    errorRegister: [false , ""],
    successRegister: false,
    cart: []
}




const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                role: action.payload.role,
                cart: action.payload.cart
            }
        case 'ERROR_LOGIN':
            return {
                ...state,
                errorLogin: true
            }
        case 'ERROR_LOGIN_FALSE':
            return {
                ...state,
                errorLogin: false
            }
        case 'LOG_OUT':
            return INITIAL_STATE
        case 'USERNAME_EMAIL_EXIST':
            return {
                ...state,
                errorRegister: [true, 'Username or Email Already Exist']
            }
        case 'RESET_REG_ERR':
            return {
                ...state,
                errorRegister: [false, '']
            }
        case 'SUCCESS_REGISTER':
            return {
                ...state,
                successRegister: true
            }
        default:
            return state
    }
}

export default userReducer