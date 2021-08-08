import React from 'react'
import NavigationBar from '../component/NavigationBar'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
    Table,
    Image,
    Button,
    FormControl, Modal
} from 'react-bootstrap'
import { delCart, saveCart,checkout } from '../redux/action'

class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            indexEdit: null,
            qty: null,
            error: [false, ""],
            askPass: false,
            toHistory: false
        }
    }

    showTableHead = () => {
        return (
            <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Action</th>
                </tr>
            </thead>
        )
    }

    showTableBody = () => {
        const { qty } = this.state
        return (
            <tbody>
                {this.props.cart.map((item, index) => {
                    if (index === this.state.indexEdit) {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Image src={item.image} style={{ width: '70px' }} rounded /></td>
                                <td>{item.name}</td>
                                <td>IDR {item.price.toLocaleString()},00</td>
                                <td>
                                    <div style={styles.inputEdit}>
                                        <Button variant="danger" onClick={this.onMinus} disabled={qty === 1 ? true : false}>
                                            <i className="fas fa-minus"></i>
                                        </Button>
                                        <FormControl
                                            style={{ width: '40%' }}
                                            value={this.state.qty}
                                            onChange={(e) => this.onChangeQty(e, item.stock)}
                                        />
                                        <Button variant="success" onClick={this.onPlus} disabled={qty === item.stock ? true : false}>
                                            <i className="fas fa-plus"></i>
                                        </Button>
                                    </div>
                                </td>
                                <td>IDR {(item.price * item.qty).toLocaleString()},00</td>
                                <td>
                                    <Button variant="success" className="mr-2" onClick={() => this.onSave(index)}>Save</Button>
                                    <Button variant="danger" onClick={() => this.setState({ indexEdit: null })}>Cancel</Button>
                                </td>
                            </tr>
                        )
                    }
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><Image src={item.image} style={{ width: '70px' }} rounded /></td>
                            <td>{item.name}</td>
                            <td>IDR {item.price.toLocaleString()},00</td>
                            <td>{item.qty}</td>
                            <td>IDR {(item.price * item.qty).toLocaleString()},00</td>
                            <td>
                                <Button variant="warning" onClick={() => this.onEdit(index)} className="mr-2">Edit</Button>
                                <Button variant="danger" onClick={() => this.onDelete(index)}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    onDelete = (index) => {
        this.props.delCart(this.props.id, index)
    }

    onEdit = (index) => {
        this.setState({ indexEdit: index, qty: this.props.cart[index].qty })
    }

    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
    }

    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
    }

    onChangeQty = (e, stockProd) => {
        let value = +e.target.value

        if (value <= 1) {
            this.setState({ qty: 1 })
        } else if (value > stockProd) {
            this.setState({ qty: stockProd })
        } else {
            this.setState({ qty: value })
        }
    }

    onSave = (index) => {
        this.props.saveCart(this.props.id, index, this.state.qty)
        this.setState({ indexEdit: null })
    }

    onCheckout = () => {
        if (this.props.cart.length === 0) {
            return this.setState({ error: [true, "Your Cart is Empty!"] })
        }

        this.setState({ askPass: true })
    }

    onOKPass = () => {
        if (this.refs.passwordUser.value !== this.props.password) {
            return this.setState({ error: [true, "Your Password Doesn't Match"] })
        }
        let data = {
            idUser: this.props.id,
            username: this.props.username,
            time: new Date().toLocaleString(),
            products: this.props.cart
        }

        this.props.checkout(this.props.id, data)

        this.setState({ askPass: false, toHistory: true })
    }
    

    

    render() {
        const { error, askPass, toHistory } = this.state

        if (!this.props.username) {
            return <Redirect to='/login' />
        }

        

        

        return (
            <div style={styles.background}>
            <div style={{ padding: '1%' }}>
                <NavigationBar />
                <h1 style={{ margin: '8vh', color: 'white' , textAlign: 'center' }}>Cart Page</h1>
                <Table style={styles.table} striped bordered hover variant="dark">
                    {this.showTableHead()}
                    {this.showTableBody()}
                </Table>
                <div style={styles.purchase}><Button variant="secondary" onClick={this.onCheckout} >Purchase Now</Button></div>
                <Modal show={error[0]} onHide={() => this.setState({ error: [false, ""] })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{error[1]}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ error: [false, ""] })} variant="">
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={askPass} onHide={() => this.setState({ askPass: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please Input Your Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            placeholder="Input Here..."
                            ref="passwordUser"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onOKPass} variant="dark">
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
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
        height : '100vh'
    },
    table: {
        textAlign: 'center' ,
        borderRadius : '15px'
    },
    inputEdit: {
        display: 'flex',
        width: '60%',
        justifyContent: 'space-around',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    purchase: {
        
        
       textAlign: 'center'
        
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        cart: state.userReducer.cart,
        id: state.userReducer.id,
        password: state.userReducer.password
    }
}

export default connect(mapStateToProps, { delCart, saveCart,checkout })(CartPage)