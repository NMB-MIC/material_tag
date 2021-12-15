//web webStructure
import Header from "./components/webStructure/Header/Header";
import Menu from "./components/webStructure/Menu/Menu";
import Footer from "./components/webStructure/Footer/Footer";

//Autherize
import Login from "./components/autherize/Login";
import Register from "./components/autherize/Register/Register";
import verifyEmail from "./components/autherize/verifyEmail/verifyEmail";
import forgetPassword from "./components/autherize/forgetPassword/forgetPassword";
import changePassword from "./components/autherize/changePassword/changePassword";

//Materia Tags
import createMaterialTag from './components/materialTag/createMaterialTag'
import createMaterialTagA4 from './components/materialTag/createMaterialTagA4'

import createMaterialTag2 from './components/materialTag/createMaterialTag_control'
import createMaterialTagA42 from './components/materialTag/createMaterialTagA4_control'


//home
import home from "./components/home/index";

//Admin tools
import userManage from "./components/adminTools/userManage/userManage";
import editUser from "./components/adminTools/edit_user/edit_user";

import { APP_TITLE } from "./constants/index";

import { BrowserRouter as Router, Route, Redirect, Switch, } from "react-router-dom";
import React, { Component } from "react";
import { key, YES } from "./constants";
import { setApp } from "./actions/app.action";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as moment from "moment";

import "overlayscrollbars/css/OverlayScrollbars.css";

const MySwal = withReactContent(Swal);

const isLoggedIn = () => {
  return localStorage.getItem(key.LOGIN_PASSED) === YES;
};

const isPowerUser = () => {
  if (
    localStorage.getItem(key.USER_LV) === "power" ||
    localStorage.getItem(key.USER_LV) === "admin"
  ) {
    return true;
  } else {
    return false;
  }
};

const isLoginTimeOut = (value, unit) => {
  const loginTime = moment(localStorage.getItem(key.TIME_LOGIN))
    .add(value, unit)
    .toDate();
  if (loginTime < moment()) {
    localStorage.removeItem(key.LOGIN_PASSED);
    localStorage.removeItem(key.API_KEY);
    localStorage.removeItem(key.USER_NAME);
    localStorage.removeItem(key.USER_LV);
    localStorage.removeItem(key.USER_EMP);
    localStorage.removeItem(key.TIME_LOGIN);

    MySwal.fire({
      icon: "info",
      title: "Login timeout",
      text: "Please re login again...",
      showCancelButton: false,
    }).then(() => {
      window.location.replace("../login");
    });
    return true;
  } else {
    return false;
  }
};

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true && isLoginTimeOut(4, "h") === false ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

// Protected Route by user level
const SecuredLVRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true && isLoginTimeOut(1, "h") === false ? (
        isPowerUser() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.setApp(this);
  }

  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  redirectToCreateTag = () => {
    return <Redirect to="/MaterialTag/create" />;
  };

  render() {
    document.title = APP_TITLE;
    return (
      <Router>
        <div>
          {/* {isLoggedIn() && <Header />}
          {isLoggedIn() && <Menu />} */}
          {<Header />}
          {<Menu />}

          <Switch>
            {/* <Route path="/login" component={Login} />
            <Route path="/register" component={Register} /> */}
            {/* <Route path="/user/forgetPassword" component={forgetPassword} /> */}
            {/* <Route path="/verifyEmail/:username/:api_key" component={verifyEmail} /> */}
            {/* <SecuredRoute path="/user/changePassword" component={changePassword} /> */}

            {/* <SecuredRoute path="/home" component={home} /> */}

            {/* AdminTools */}
            {/* <SecuredLVRoute path="/adminTools/userManage" component={userManage} />
            <SecuredLVRoute path="/adminTools/editUser/username=:username&levelUser=:levelUser" component={editUser} /> */}

            {/* master */}
            <Route path="/MaterialTag/create" component={createMaterialTag} />
            <Route path="/MaterialTag/createA4" component={createMaterialTagA4} />

            <Route path="/MaterialTag/create_2" component={createMaterialTag2} />
            <Route path="/MaterialTag/createA4_2" component={createMaterialTagA42} />

            {/* default path */}
            <Route exact={true} path="/" component={this.redirectToCreateTag} />
            <Route exact={true} path="*" component={this.redirectToCreateTag} />
          </Switch>
          {/* {isLoggedIn() && <Footer />} */}
          {<Footer />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
});

const mapDispatchToProps = {
  setApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
