import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "./../../../actions/login.action";
import { APP_TITLE } from "./../../../constants/index";

// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// const MySwal = withReactContent(Swal);

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      lastWebsite: "purchase_webboard",
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " Login";
    this.props.autoLogin(this.props.history);
  }

  showError = () => {
    if (this.props.loginReducer.isError) {
      this.props.showLoginErrorAlerted(this.props.loginReducer.errorMessage);
    }
  };

  render() {
    return (
      <div
        class="hold-transition login-page"
        style={{ backgroundColor: "rgba(30, 30, 35, 0.8)" }}
      >
        <div
          className="login-box"
          style={{
            borderRadius: 8,
            backgroundColor: "WhiteSmoke",
            padding: 12,
          }}
        >
          <div className="login-logo">
            <a href="../Login">
              <img
                src="/images/MRT_logo.png"
                alt="MIC Logo"
                className="img-fluid mb-3"
                style={{ maxHeight: 100 }}
              />
              <br></br>
              <b>{APP_TITLE}</b>
            </a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start this website</p>
              <form>
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => {
                      this.setState({ username: e.target.value });
                    }}
                    type="text"
                    className="form-control"
                    placeholder="User name"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>

                {/* Alarm error Code */}
                {/* ternery condition */}
                {this.props.loginReducer.isError ? this.showError() : null}

                {/* Login */}
                <div className="row">
                  <div className="col-12">
                    <button
                      id="signIn"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.login(this.props.history, this.state);
                      }}
                      type="submit"
                      className="btn btn-block btn-primary"
                    >
                      Sign In
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>

              {/* Register */}
              <div className="row">
                <div className="col-12">
                  <button
                    onClick={() => this.props.history.push("/register")}
                    type="submit"
                    className="btn btn-block btn-default"
                    style={{ marginTop: 6 }}
                  >
                    Register
                  </button>
                </div>
                {/* /.col */}
              </div>
              <p class="mb-1" style={{ marginTop: 10 }}>
                <Link to="/user/forgetPassword">I forgot my password</Link>
              </p>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginReducer: state.loginReducer,
});

const mapDispatchToProps = {
  ...actions,
};

//export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
