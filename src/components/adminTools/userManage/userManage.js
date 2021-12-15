import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/manage_user.action";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { APP_TITLE } from "../../../constants";
import _ from "lodash";

class UserManage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    this.props.getUser();
    document.title = APP_TITLE + " manage alert-mail";
    this.debounceSearch = _.debounce(this.props.getUserByKeyword, 500);
  }

  renderTableRow = () => {
    try {
      const { result, isFetching } = this.props.manageUserReducer;
      if (result != null && !isFetching) {
        return result.map((item) => (
          <tr key={item.username} role="row" className="odd">
            <td>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure to delete?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "No, cancel!",
                  }).then((result) => {
                    if (result.value) {
                      this.props.deleteUser(item.username);
                    }
                  });
                }}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure to edit?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, edit it!",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "No, cancel!",
                  }).then((result) => {
                    if (result.value) {
                      this.props.history.push(
                        `/adminTools/editUser/username=${item.username}&levelUser=${item.levelUser}`
                      );
                    }
                  });
                }}
                type="button"
                className="btn btn-warning"
              >
                Edit
              </button>
            </td>
            <td>{item.username}</td>
            <td>{item.empNumber}</td>
            <td>{item.levelUser}</td>
            <td>{item.divisionCode}</td>
            <td>{item.email}</td>
            <td>{item.lastWebsite}</td>
            <td>
              <Moment format="DD-MMM-YYYY hh:mm:ss">{item.createdAt}</Moment>
            </td>
            <td>
              <Moment format="DD-MMM-YYYY hh:mm:ss">{item.updatedAt}</Moment>
            </td>
          </tr>
        ));
      }
    } catch (error) {}
  };

  onChange = (e) => {
    e.persist();
    this.debounceSearch(e);
  };

  render() {
    return (
      <div className="content-wrapper" style={{ minHeight: 800 }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12" style={{ textAlign: "center" }}>
                <h1>
                  Manage
                  <small> Alert mail</small>
                </h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title">Alert mail table</h2>
                  </div>
                  {/* /.card-header */}

                  <div className="card-body">
                    <div className="input-group input-group-sm">
                      <input
                        onChange={(e) => this.onChange(e)}
                        type="search"
                        className="form-control input-lg"
                        placeholder="Enter search keyword"
                        style={{ borderRadius: 10 }}
                      />
                      <span className="input-group-append">
                        <Link
                          to="/master/create/alertMail"
                          style={{
                            float: "right",
                            marginLeft: 5,
                            borderRadius: 10,
                            width: 120,
                          }}
                          className="btn btn-success float-right"
                        >
                          Add
                        </Link>
                      </span>
                    </div>
                  </div>

                  <div className="card" style={{ margin: 10 }}>
                    <div
                      className="card-body table-responsive p-0"
                      style={{ maxHeight: 400 }}
                    >
                      <table
                        id="DivTable"
                        className="table table-head-fixed table-hover text-nowrap"
                        role="grid"
                        aria-describedby="example2_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="CSS grade: activate to sort column ascending"
                            >
                              Action
                            </th>
                            <th
                              className="sorting_asc"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-sort="ascending"
                              aria-label="Rendering engine: activate to sort column descending"
                            >
                              username
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Platform(s): activate to sort column ascending"
                            >
                              empNumber
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Engine version: activate to sort column ascending"
                            >
                              levelUser
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="CSS grade: activate to sort column ascending"
                            >
                              divisionCode
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="CSS grade: activate to sort column ascending"
                            >
                              email
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="CSS grade: activate to sort column ascending"
                            >
                              lastWebsite
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="CSS grade: activate to sort column ascending"
                            >
                              createdAt
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="CSS grade: activate to sort column ascending"
                            >
                              updatedAt
                            </th>
                          </tr>
                        </thead>
                        <tbody>{this.renderTableRow()}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>

              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
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

//export default Register;
export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
