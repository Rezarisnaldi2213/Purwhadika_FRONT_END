import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
//Import Component
import NavigationBar from './component/NavigationBar';

//Import Pages
import HomePage from './Pages/home';
import LoginPage from './Pages/login';
import DetailPage from './Pages/pageDetail';
import CartPage from './Pages/cart';
import HistoryPage from './Pages/history';



import { keepLogin } from './redux/action'



class App extends React.Component {

    componentDidMount() {
        let id = localStorage.getItem('idUser')
        this.props.keepLogin(id)
      }

    render () {
        console.log(this.props.role)
        if (this.props.role === 'admin') {
          return (
            <div >
              <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/login" component={LoginPage} />
                <Route path="/detail" component={DetailPage} />
                
               
              </Switch>
            </div>
          )
        } 
        return (
          <div >
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/login" component={LoginPage} />
              <Route path="/detail" component={DetailPage} />
              <Route path="/cart" component={CartPage} />
              <Route path="/history" component={HistoryPage} />
             
              
            </Switch>
          </div>
        )
      }
    }

    const mapStateToProps = (state) => {
        return {
          role: state.userReducer.role
        }
      }
      
      export default connect(mapStateToProps, { keepLogin })(App);

