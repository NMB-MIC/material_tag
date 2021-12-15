import React, { Component } from "react";
import { connect } from "react-redux";
import { key } from "../../../constants";
import * as actions from "../../../actions/register.action";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem(key.USER_NAME),
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  componentDidMount(){

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
      <div class="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>
                  Change password{" "}
                  <span
                    className="iconify"
                    data-icon="vaadin:password"
                    data-inline="false"
                  />
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Change password form</h3>
              </div>
              {/* /.card-header */}
              {/* form start */}
              <form role="form">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Old password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Old password"
                      onChange={(e) => {
                        this.setState({ oldPassword: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New password"
                      onChange={(e) => {
                        this.setState({ newPassword: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm new password"
                      onChange={(e) => {
                        this.setState({ confirmPassword: e.target.value });
                      }}
                    />
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.changePassword(this.state);
                    }}
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.history.goBack();
                    }}
                    className="btn btn-default float-right"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
          {this.showError()}
        </section>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
