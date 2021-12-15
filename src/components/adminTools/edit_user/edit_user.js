import React, { Component } from "react";
import * as actions from "./../../../actions/manage_user.action";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { key } from "../../../constants";

class Edit_user extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username,
      levelUser: this.props.match.params.levelUser,
      editBy: localStorage.getItem(key.USER_NAME),
    };
  }

  showError = () => {
    if (this.props.manageUserReducer.isError) {
      this.props.showUserErrorAlerted(
        this.props.manageUserReducer.errorMessage
      );
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit user level Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Edit user level</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Username :</label>
                  <input
                    type="text"
                    value={this.state.username}
                    readOnly
                    className="form-control"
                    placeholder="Enter webboard category"
                  />
                </div>

                <div class="form-group">
                  <label>User level :</label>
                  <select
                    class="form-control"
                    value={this.state.levelUser}
                    onChange={(e) => {
                      this.setState({ levelUser: e.target.value });
                    }}
                    type="text"
                    className="form-control"
                  >
                    <option value="admin">Admin</option>
                    <option value="power">Power</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.updateUserLevel(this.props.history, this.state);
                  }}
                >
                  Submit
                </button>
                <div>{this.showError()}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  manageUserReducer: state.manageUserReducer,
});
const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit_user);
