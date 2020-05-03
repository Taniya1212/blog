import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import WritePage from './components/add-movie/add.component';
import Create from './components/add-movie/add-movie.components';
import Edit from './components/edit-movie/edit-movie.component';
import Show from './pages/create/show.component.js';
import blog from './pages/blog/blog.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument } from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class  App extends React.Component {
  unSubscribeFromAuth = null

  componentDidMount(){
    
    
    const {setCurrentUser} = this.props;
    this.unSubscribeFromAuth = 
    auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
        setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          
        });
       });
      }

      setCurrentUser(userAuth);
    });

  }
 
  componentWillUnmount (){
    this.unSubscribeFromAuth();
  }

  render(){
  return (
    <div >
      <Header ></Header>
      <Switch >
      <Route exact path='/' component={HomePage} ></Route>
      <Route  path='/write' component={WritePage} ></Route>
      <Route  path='/create' component={Create} ></Route>
      <Route  path='/show' component={Show} ></Route>
      <Route  path='/edit' component={Edit} ></Route>

      <Route  path='/blog' component={blog} ></Route>
      <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to = '/' />) : (<SignInAndSignUp></SignInAndSignUp>)}  ></Route>
      </Switch>
      
    </div>
  );
}}

const mapStateToProps   = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
   setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
