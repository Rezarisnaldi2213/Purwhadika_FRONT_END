import React from 'react'
import Axios from 'axios'
import NavigationBar from '../component/NavigationBar'
import {
    Carousel,
    Button,
    FormControl,
    Modal
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addCart } from '../redux/action'

class DetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            qty: 0,
            toLogin: false,
            toCart: false
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/products/${this.props.location.search.substring(1)}`)
            .then(res => {
                this.setState({ product: res.data })
            })
    }

    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
    }

    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
    }

    onCheckout = () => {
        const { product, qty } = this.state
        if (!this.props.username) {
            return this.setState({ toLogin: true })
        }

        
        let obj = {
            id: product.id,
            name: product.name,
            img: product.img,
            price: product.price,
            qty,
            stock: product.stock
        }
        

        this.props.addCart(this.props.id, obj)

        this.setState({toCart: true})


    }

    render() {
        const { product, qty, toLogin, toCart } = this.state

        console.log(this.props.dataUser)

        if (toLogin) {
            return <Redirect to="/login" />
        } else if (toCart){
            return <Redirect to="/cart" />
        }

        return (
            <>
                <div style={styles.background}>
                <NavigationBar />
                <div style={styles.contTitle}>
                    <h1>Detail Page</h1>
                    
                    {this.props.role === 'user'
                        ?
                        <Button variant="outline-dark" onClick={this.onCheckout}>Add to Cart</Button>
                        :
                        null
                    }
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={styles.contImg}>
                        <Carousel style={{ height: '70vh' }}>
                            {(product.images ? product.img : []).map((item, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block"
                                            style={styles.img} 
                                            src={item} 
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div style={styles.contDesc}>
                        <h1>{product.name ? product.name : ""}</h1>
                        <p>Description: {product.description ? product.description : ""}</p>
                        <p>Price: {product.price ? product.price : ""}</p>
                        <p>Stock: {product.stock ? product.stock : ""}</p>
                        <p>Quantity:</p>
                        <div style={{ display: 'flex',  justifyContent: 'space-around'}}>
                            <Button onClick={this.onMinus} variant="secondary" disabled={qty <= 0 ? true : false }>-</Button>
                            <FormControl
                                style={{ width: '50%', textAlign: 'center' }}
                                value={qty}
                                onChange={(e) => this.setState({ qty: +e.target.value })}
                            />
                            <Button onClick={this.onPlus} variant="secondary" disabled={qty === product.stock  ? true : false }  >+</Button>
                            <Button variant="outline-light" onClick={this.onCheckout} >Add to Cart</Button>    
                        </div>
                        
                    </div>
                </div>

                </div>
            </>
        )
    }
}

const styles = {
    background: {
        backgroundColor : "white",        
        backgroundSize: 'cover',
        backgroundAttachment: "fixed" ,
        paddingTop: '3vh'
    },
    contTitle: {
        marginTop : '58px' ,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1%',
        // backgroundColor: '#03506F',
        color: '#f8f9fa',
        justifyContent: 'center',
        padding: '10px'
    },
    contImg: {
        // backgroundColor: '#03506F',
        flexBasis: '40%',
        borderRadius: '0px'
    },
    contDesc: {
        backgroundColor: 'rgba(27, 27, 27, 0.7)',
        flexBasis: '60%',
        padding: '2%', 
        color: 'white',
        marginRight: '30px',
        borderRadius : '10px'
    },
    img: {
        height: '70%',
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '10px' ,
        opacity: "0.9"
    },
    footer: {
        backgroundColor: "rgba(27, 27, 27, 0.4)",
        color: 'white'
    },
    footerList: {
        display: "flex",
        justifyContent: "space-around",
        padding: "100px ",
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
        id: state.userReducer.id,
        dataUser : state.userReducer,
        role: state.userReducer.role
    }
}
export default connect(mapStateToProps, { addCart })(DetailPage)