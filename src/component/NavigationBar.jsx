import React from 'react'
import {Navbar, 
Button,Nav,Dropdown,Badge,Image } from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/action'


class NavigationBar extends React.Component {
    render() {


        console.log(this.props.test)

        return (
            <Navbar fixed="top" style={styles.navbar} expand="lg" className="px-5">
           
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto" style={styles.navlink1}>
                <Nav.Link href="#home" style={styles.fontcolor1} >
                    <Link style={{color : "white"}} to="/">Home</Link> </Nav.Link>
              
                <Nav.Link href="#kontak" style={styles.fontcolor1} >
                <Link style={{color : "white"}} to="/contactus">Contact Us</Link>  </Nav.Link>
              </Nav>
              
                {this.props. role === 'user '
                ?
                <Button variant="outline-secondary"  onClick={this.onCart} as={Link} to="/cart" >  
              <i className="fas fa-cart-plus"></i><Badge bg="secondary"> {this.props.cart.length} </Badge>
              </Button>
                :
                null
                
                }
              

              <Dropdown style={{marginLeft: "10px"}}>
              <Dropdown.Toggle style={styles.button} id="dropdown-basic">
                          
                 {this.props.username ? this.props.username : "Username"}
                     </Dropdown.Toggle>
                        <Dropdown.Menu>
                        {
                        this.props.username
                             ?
                        <>
                        <Dropdown.Item >Profile</Dropdown.Item>
                        <Dropdown.Item as={Link} to={this.props.role === 'admin' ? "/historyadmin" : "/history"}> 
                        {this.props.role === 'admin' ? "History Admin" : "History"}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={this.props.logout} >Log Out</Dropdown.Item>
                        </>
                        :
                        <>
                        <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                       
                        </>
                        }
                        </Dropdown.Menu>
                    </Dropdown>
              
            </Navbar.Collapse>
          </Navbar>
        )
    }
}

const styles = {
    navbar: { 
        backgroundColor : 'rgba(27, 27, 27, 0.7)',
    },
    navlink1: {
        marginLeft : "20px",
        
        
    },
    button: {
        backgroundColor: "#6d6d6d" ,
        border : "none",
        textDecoration :"none"
    },
    fontcolor1: {
        color:"white" ,
        
        
    },
    image: {
        height : "70px", 
        margin : "-20px"
    }
}

const mapStateToProps = (state) => {

    return {

        test: state.userReducer,
        username: state.userReducer.username,
        cart: state.userReducer.cart,
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps, { logout })(NavigationBar)