import React from 'react'
import {
    FormControl,
    InputGroup,
    Button,
    Modal } from 'react-bootstrap'

import { Link,Redirect} from 'react-router-dom'
import {connect}from 'react-redux'
import { login, errLoginFalse } from '../redux/action'

class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visibility: false ,
            error : false,
            
        }
    }

    onLogin = () => {
     
        let email = this.refs.email.value 
        let password = this.refs.password.value 
       

        if (!email || !password) {
            return this.setState({error:true})
        }

        this.props.login(email, password)
        
    }

    render () {
        if(this.props.username) {
            return <Redirect to="/" />
        }

        const { visibility } = this.state
        return (
            <div style={styles.cont}>
            <div style={styles.contForm}>
                <h1>Helooo,</h1>
                <h3 className="mb-4">Welcome !</h3>
                <label>Email</label>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                        <i class="fas fa-at"></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Input email"
                        ref="email"
                    />
                </InputGroup>
                <label>Password</label>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                            {visibility ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Input Password"
                        type={visibility ? "text" : "password"}
                        ref="password"
                        
                    />
                </InputGroup>
                <div style={styles.contButton}>
                    <Button  onClick={this.onLogin} variant="dark" style={styles.button}>Login</Button>
                </div>
                <p style={styles.goToRegis}>Do You Have an Account? <Link style={{ color: '#1b1b1b', fontWeight: 'bold' }} to="/registerpage">Register Here</Link></p>
            </div>
            <Modal show={this.state.error} >
                <Modal.Header >
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Please Input Right email or Password</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => this.setState({error : false})} variant="dark">Close</Button>
                
                </Modal.Footer>
            </Modal>
            <Modal show={this.props.errorLogin} >
            
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Your Account did'nt Exist!</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.errLoginFalse}  variant="dark">Close</Button>
                
                </Modal.Footer>
            </Modal>
        </div>
        )
    }
}

const styles = {
    cont: {
        backgroundColor: "white",        
        backgroundSize: 'cover',
        height: '130vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundAttachment: "fixed"
    },
    contForm: {
        width: '30vw',
        height: '70vh',
        marginTop: '15vh',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, .5)',
        padding: '2%'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px'
    },
    button: {
    
        border: 'none',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    goToRegis: {
        
        fontWeight: 'bold',
        textAlign: 'center'
    }
}


const mapStateToProps = (state) => {
    return {
        errorLogin: state.userReducer.errorLogin,
        username: state.userReducer.username
    }
}
export default connect(mapStateToProps, { login, errLoginFalse })(LoginPage)