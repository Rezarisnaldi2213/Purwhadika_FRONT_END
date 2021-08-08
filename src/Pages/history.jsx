import React from 'react'
import Axios from 'axios'
import NavigationBar from '../component/NavigationBar'
import {
    Accordion,
    Card,
    Button,
    Table,
    Image
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getHistory } from '../redux/action'

class HistoryPage extends React.Component {
    componentDidMount() {
        this.props.getHistory()
    }

    render() {
        if (!this.props.username) {
            return <Redirect to="/login" />
        }

        return (
            <div style={styles.background}>
            <div >
                <NavigationBar />
                <div style={{ marginTop: '10vh' }}>
                    <h1 style={{textAlign: 'center' , color : 'white' , padding : '2%'}}>History Page</h1>
                    <Accordion >
                        {this.props.history.map((item, index) => {
                            return (
                                <Card key={index} >
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={index.toString()}>
                                        Username: {item.username}, Time: {item.time}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={index.toString()}>
                                        <Table striped bordered hover variant="dark">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.products.map((item2, index2) => {
                                                    return (
                                                        <tr>
                                                            <td>{index2 + 1}</td>
                                                            <td><Image src={item2.image} style={{ width: '70px' }} rounded /></td>
                                                            <td>{item2.name}</td>
                                                            <td>IDR {item2.price.toLocaleString()},00</td>
                                                            <td>{item2.qty}</td>
                                                            <td>IDR {(item2.qty * item2.price).toLocaleString()},00</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Accordion.Collapse>
                                </Card>
                            )
                        })}
                    </Accordion>
                </div>
            </div> 
            <footer style={styles.footer}>
                    <div style={styles.kontak}>
                        <h2 id="kontak">Contact Us</h2>
                    </div>
                    <div style={styles.footerList}>
                        
                        <div style={styles.footerItem}>
                            <h6 style={styles.footerItemh6} > Product</h6>
                            <a href="#" style={{color :'white'}}>Download</a>
                            <a href="#" style={{color :'white'}} >Pricing</a>
                            <a href="#" style={{color :'white'}} >Locations</a>
                        </div>
                        <div style={styles.footerItem}>
                            <h6 style={styles.footerItemh6}>Engage</h6>
                            <a href="#" style={{color :'white'}} >FAQ</a>
                            <a href="#"style={{color :'white'}} >Tutorials</a>
                            <a href="#" style={{color :'white'}}>About Us</a>
                        </div>
                        <div style={styles.footerItem}>
                            <h6 style={styles.footerItemh6}>Earn Money</h6>
                            <a href="" style={{color :'white'}}>Become Partners</a>
                        </div>
                    </div>
                    
                </footer>
            </div>
        )
    }
}
const styles = {
    background: {
        backgroundColor: "white",        
        backgroundSize: 'cover',
        backgroundAttachment: "fixed" ,
        paddingTop: '3vh',
        height : 'auto' ,
        marginBottom: '-30px'
    },
    footer: {
        backgroundColor: "rgba(27, 27, 27, 0.4)",
        color: 'white'
    },
    footerList: {
        display: "flex",
        justifyContent: "space-around",
        padding: "100px 0",
        marginTop: "1px" ,
        color: 'white',
    },
    footerItem: {
        display: "flex",
        flexDirection: "column",
        color: 'white',
        textDecoration: 'none',
        
    },
    footerItemh6: {
        fontWeight: "700",
        fontSize: "20px",
        margin: "0",
        marginBottom: "10px",
        color: 'white',
        justifyContent : 'center' ,
    },
    kontak : {
        display: 'flex',
        justifyContent: 'center' ,
        marginTop: '45px'
        
    },
}


const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        history: state.historyReducer.history
    }
}

export default connect(mapStateToProps, { getHistory })(HistoryPage) 