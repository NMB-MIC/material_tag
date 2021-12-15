import React, { Component } from "react";
import { Animated } from "react-animated-css";
import { key, server, YES } from "../../constants/index";
import "react-slideshow-image/dist/styles.css";
// import { Zoom } from "react-slideshow-image";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import * as moment from "moment";
import { httpClient } from "../../utils/HttpClient";
import Axios from "axios";

class home extends Component {
  async componentDidMount() {
    this.isMember();


    // alert(JSON.stringify(this.state.topicData));
    window.scrollTo(0, 0);
  }

  isMember = () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      document.getElementById("wrapper").className = "content-wrapper";
    } else {
      document.getElementById("wrapper").className = "";
    }
  };

  loadingScreen(data) {
    if (data === null) {
      return (
        <div className="overlay">
          <i className="fas fa-3x fa-sync-alt fa-spin" />
          <div className="text-bold pt-2">Loading...</div>
        </div>
      );
    }
  }

  renderTopic = (category) => {
    try {
      // alert(category);
      if (this.state.topicData[category].length > 0) {
        return this.state.topicData[category].map((item) => (
          <div>
            <Link
              to={`/webboards/content/content_id=${item.id}&page=1`}
              className="list-group-item list-group-item-action"
              style={{ textAlign: "left" }}
            >
              {item.topic}
            </Link>
          </div>
        ));
      }
    } catch (error) { }
  };

  render() {
    return (
      <div className="content-wrapper" id="wrapper">
        <div
          className="col-sm-12"
          style={{ textAlign: "center", minHeight: 500 }}
        >
          <Animated animationIn="bounceIn">
            <div style={{ fontSize: 40 }}>
              <img
                src="/images/MRT_logo.png"
                alt="MIC Logo"
                className="img-fluid mb-3"
                style={{ maxHeight: 50 }}
              />
              <b>Material Receiving Tag</b>
              <small> Website</small>
            </div>
          </Animated>

          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6" style={{ textAlign: "left" }}></div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                  </ol>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-12">
                <Link to="/MaterialTag/create">
                  <div className="info-box">
                    <span className="info-box-icon bg-primary">
                      <i
                        className="nav-icon iconify"
                        data-icon="bx-bxs-package"
                      />
                    </span>
                    <div className="info-box-content">
                      <span
                        style={{ color: "black" }}
                        className="info-box-text"
                      >
                        Create material Tag
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </Link>
                {/* /.info-box */}
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                <Link to="/">
                  <div className="info-box">
                    <span className="info-box-icon bg-primary">
                      <i
                        className="nav-icon iconify"
                        data-icon="flat-color-icons:cancel"
                      />
                    </span>
                    <div className="info-box-content">
                      <span
                        style={{ color: "black" }}
                        className="info-box-text"
                      >
                        -
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </Link>
                {/* /.info-box */}
              </div>

              <div className="col-md-3 col-sm-6 col-12">
                <Link to="/">
                  <div className="info-box">
                    <span className="info-box-icon bg-primary">
                      <i
                        className="nav-icon iconify"
                        data-icon="flat-color-icons:cancel"
                      />
                    </span>
                    <div className="info-box-content">
                      <span
                        style={{ color: "black" }}
                        className="info-box-text"
                      >
                        -
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </Link>
                {/* /.info-box */}
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                <Link to="/e">
                  <div className="info-box">
                    <span className="info-box-icon bg-primary">
                      <i
                        className="nav-icon iconify"
                        data-icon="flat-color-icons:cancel"
                      />
                    </span>
                    <div className="info-box-content">
                      <span
                        style={{ color: "black" }}
                        className="info-box-text"
                      >
                        -
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </Link>
                {/* /.info-box */}
              </div>
            </div>
            <div>
              <div className="overlay-wrapper">
                {this.loadingScreen(1)}
                <div className="container-fluid">
                  <div className="row">

                  </div>
                  <div className="row">
                    <div className="col-lg-6"></div>
                    {/* /.col */}
                    <div className="col-lg-6">
                      <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                          <Link href="/Help">
                            <span
                              class="iconify"
                              data-icon="zmdi:pin-help"
                              data-inline="true"
                            ></span>{" "}
                            Help
                          </Link>
                        </li>
                        <li className="breadcrumb-item active">
                          <Link href="/ContactAdmin">
                            <span
                              class="iconify"
                              data-icon="clarity:help-info-solid"
                              data-inline="true"
                            ></span>{" "}
                            Contact Admin
                          </Link>
                        </li>
                      </ol>
                      {/* /.col */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Info */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(home);
