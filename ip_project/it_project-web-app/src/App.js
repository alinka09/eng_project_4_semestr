import React from 'react'
import './App.css';
import ListCompany from'./Components/ListCompany'
import Header from './Components/Header'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Components/Main';
import LoginForm from './Components/LoginForm';
import AboutUs from './Components/AboutUs';
import CreateUpdateCompany from './Components/CreateUpdateCompany'
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_logged: localStorage.getItem('token') ? true: false,
      token: null,
      is_staff: localStorage.getItem('is_staff'),
      is_superuser: localStorage.getItem('is_superuser'),
    }

    this.setLoggedStatus = this.setLoggedStatus.bind(this)
    this.setisStaffIsSuperuser = this.setisStaffIsSuperuser.bind(this)
  }
  onChangeToken = e => {
    this.setState(e)
  }
  componentDidMount() {
    if(localStorage.getItem('token')!==undefined){
      this.setState({'is_logged':false})
    }
  }
  setisStaffIsSuperuser(is_staff,is_superuser) {
    this.setState({'is_staff':is_staff,'is_superuser':is_superuser})
  }
  setLoggedStatus(e) {
    this.setState({'is_logged':e});
  }
  render() {
    if(localStorage.getItem('token')===null||localStorage.getItem('token')===undefined) {
      return (
      <Router>
        <LoginForm
          token={this.state.token}
          url={this.state.url}
          is_logged={this.state.is_logged}
          setLogged={this.setLoggedStatus}
          is_staff={this.state.is_staff}
          is_superuser={this.state.is_superuser}
          set_status={this.setisStaffIsSuperuser}
        />
      </Router>
      )
    } else {
    return(
    <Router>
      <Header
          token={this.state.token}
          url={this.state.url}
          is_logged={this.state.is_logged}
          setLogged={this.setLoggedStatus}
          is_staff={this.state.is_staff}
          is_superuser={this.state.is_superuser}
          set_status={this.setisStaffIsSuperuser}
        />
      <Switch>
      <Route path='/Main'>
          <Main
            is_staff={this.state.is_staff}
            is_superuser={this.state.is_superuser}
          />
        </Route>
        <Route path='/ListCompany'>
          <ListCompany
            url = {this.state.url}
          />
        </Route>
        <Route path='/AboutUs'>
          <AboutUs></AboutUs>
        </Route>
        <Route path='/CreateUpdateCompany' component={CreateUpdateCompany}>
        </Route>
        {/* <Route path='/CreateUpdateCompany/:id' component={CreateUpdateCompany}> */}
        <Route path='/CreateUpdateCompany/?id=id'> render={(props)=> <CreateUpdateCompany {...props}/>}
        </Route>
      </Switch>
    </Router>
  )}}
}

export default App;
