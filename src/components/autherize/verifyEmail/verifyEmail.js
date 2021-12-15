import React, { Component } from "react";
import { APP_TITLE } from "./../../../constants/index";
import { key, YES, server, OK } from "./../../../constants/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { httpClient } from "./../../../utils/HttpClient";

const ReactSwal = withReactContent(Swal);

class VerifyEmail extends Component {
  componentDidMount = async () => {
    document.title = APP_TITLE + " Verify email";

    let username = this.props.match.params.username;
    let api_key = this.props.match.params.api_key;

    this.isMember();
    this.verifyEmail(username, api_key);

    //alert(username + "./" + randomKey)
  };

  verifyEmail = async (username, api_key) => {
    if (username != null && api_key != null) {
      let result = await httpClient.post(server.VERIFY_EMAIL_URL, { username, api_key });

      if (result.data.api_result === OK) {
        ReactSwal.fire({
          title: "OK...",
          html: "Your email has been verified <p>Please login</p>",
          icon: "success",
          timer: 2000,
        }).then(() => {
          this.props.history.push("/login");
        });

      } else {
        ReactSwal.fire({
          title: "Oops...",
          html: "Verrify email failed , please contact web admin",
          icon: "error",
          timer: 2000,
        }).then(() => {
          
        });
      }
    }
  };

  isMember = () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      document.getElementById("wrapper").className = "content-wrapper";
    } else {
      document.getElementById("wrapper").className = "";
    }
  };

  render() {
    return (
      <div id="wrapper" className="content-wrapper">
        <div
          id="capture"
          className="login-page"
          style={{ backgroundColor: "rgba(30, 30, 35, 0.8)", minHeight: 720 }}
        >
          <div
            className="login-box"
            style={{
              borderRadius: 8,
              backgroundColor: "whitesmoke",
              padding: 12,
            }}
          >
            <div className="login-logo">
              <img
                src="/images/NMB_logo.png"
                style={{ textAlign: "center", maxHeight: 70 }}
              />
              <br></br>
              <span
                class="iconify"
                data-icon="mdi:email-check"
                data-inline="false"
              ></span>
              <b>verify </b>
              email
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyEmail;
