import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { APP_TITLE } from "../../../constants";
import * as actions from "./../../../actions/register.action";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
  }

  showError = () => {
    if (this.props.registerReducer.isError) {
      this.props.showRegisterErrorAlerted(
        this.props.registerReducer.errorMessage
      );
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
                src="/images/po-financing-1-300x300.png"
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
              <p className="login-box-msg">
                You forgot your password? Here you can easily retrieve a new
                password.
              </p>
              <form action="recover-password.html" method="post">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.RequestNewPassword(
                          this.props.history,
                          this.state.email
                        );
                      }}
                      className="btn btn-primary btn-block"
                    >
                      Request new password
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              <p className="mt-3 mb-1">
                <Link to="/Login">Login</Link>
              </p>
              <p className="mb-0">
                <Link to="/register" className="text-center">
                  Register a new membership
                </Link>
              </p>
            </div>
            {/* /.login-card-body */}
            {this.showError()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  registerReducer: state.registerReducer,
});
const mapDispatchToProps = {
  ...actions,
};

//export default Register;
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
