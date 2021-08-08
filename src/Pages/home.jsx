import React from 'react'
import { Carousel, Card, Button, Modal } from 'react-bootstrap'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import NavigationBar from '../component/NavigationBar'

class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            carousels: [],
            products: [],
            page: 1,
            prodPerPage: 3,
            maxPage: 0,
            show: false,
            setShow: false,
            
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:2000/slider')
            .then(res => {
                this.setState({ carousels: res.data })
                Axios.get('http://localhost:2000/products')
                    .then(res => {
                        this.setState({ products: res.data, maxPage: Math.ceil(res.data.length / this.state.prodPerPage) })
                    })
            })
    }

    onNextPage = () => {
        this.setState({ page: this.state.page + 1 })
    }

    onPrevPage = () => {
        this.setState({ page: this.state.page - 1 })
    }


    render() {
        return (
            <div style={styles.cont}>

                <NavigationBar />
                <div style={styles.container}>
                    <Carousel style={styles.carousel}>
                        {this.state.carousels.map((item, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block"
                                        src={item.image}
                                        alt="First slide"
                                        style={{ width: '80vw', height: '80vh', borderRadius: '15px' }}
                                    />
                                    <Carousel.Caption style={styles.caroCaption}>
                                        <h2>{item.title}</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                    <div style={styles.sectProducts}>
                        <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}> Our Products</h1>
                        <div style={styles.contProducts}>
                            {this.state.products.map((item, index) => {
                                console.log(item.name.length)
                                return (
                                    <Card variant="Secondary" style={{ width: '18rem', marginBottom: '15px', marginTop: '15px', padding: '15px' }} key={index}>
                                        <Card.Img variant="top" src={item.img} />
                                        <Card.Body style={styles.cardBody}>
                                            <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
                                            <Card.Text><strong>IDR {item.price.toLocaleString()}</strong></Card.Text>
                                            <div style={styles.contButton}>
                                                <Button variant="outline-dark"><i class="far fa-bookmark"></i></Button>
                                                <Button variant="outline-dark" as={Link} to={`/detail?${item.id}`}>
                                    <Modal show={this.props.setShow} onClick={() => this.setState({setShow : true})}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Modal heading</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="dark" onClick={() => this.setState({handleClose : false})}>
                                                Close
                                            </Button>
                                            <Button variant="dark" onClick={() => this.setState({handleClose : false})}>
                                                Add to cart
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <i className="fas fa-cart-plus"></i> BUY NOW
                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                )
                            })}



                        </div>

                    </div>
                </div>


                <footer style={styles.footer}>
                    <div style={styles.kontak}>
                        <h2 id="kontak">Contact Us</h2>
                    </div>
                    <div style={styles.footerList}>

                        <div style={styles.footerItem}>
                            <h6 style={styles.footerItemh6} > Product</h6>
                            <a href="/" style={{ color: 'white' }}>Download</a>
                            <a href="/" style={{ color: 'white' }} >Pricing</a>
                            <a href="/" style={{ color: 'white' }} >Locations</a>
                        </div>
                        <div style={styles.footerItem}>
                            <h6 style={styles.footerItemh6}>Engage</h6>
                            <a href="/" style={{ color: 'white' }} >FAQ</a>
                            <a href="/" style={{ color: 'white' }} >Tutorials</a>
                            <a href="/" style={{ color: 'white' }}>About Us</a>
                        </div>
                        <div style={styles.footerItem}>
                            <h6 style={styles.footerItemh6}>Earn Money</h6>
                            <a href="/" style={{ color: 'white' }}>Become Partners</a>
                        </div>
                    </div>
                   
                </footer>

            </div>
        )
    }
}

const styles = {
    cont: {
        backgroundColor: "white",
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundAttachment: "fixed",
        paddingTop: '3vh'

    },
    carousel: {
        height: '80vh',
        width: '80vw',
        marginTop: '10vh',
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    caroCaption: {
        backgroundColor: 'rgba(0, 0, 0, .1)',
        marginBottom: '5%',
        width: '45%',
        right: '0',
        left: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '20px'
    },
    sectProducts: {
        marginTop: '10px',
        marginLeft: '5vw',
        marginRight: '5vw',
    },
    contProducts: {
        // backgroundColor: 'salmon',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    cardBody: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // backgroundColor: 'salmon'
    },
    cardTitle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    footer: {
        backgroundColor: "rgba(27, 27, 27, 0.4)",
        color: 'white'
    },
    footerList: {
        display: "flex",
        justifyContent: "space-around",
        padding: "100px 0",
        marginTop: "1px",
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
        justifyContent: 'center',
    },
    kontak: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '45px'

    },


}



export default HomePage