import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { key } from "../../../constants";

const userLV = localStorage.getItem(key.USER_LV)
class Menu extends Component {

  renderAdminTools = (pathname) => {
    if (userLV === 'admin' || userLV === "power") {
      return (
        <li className="nav-item has-treeview">
          <div
            className={pathname.includes("/adminTools") ? "nav-link active" : "nav-link"}
          >
            <i
              className="nav-icon iconify"
              data-icon="bx-bxs-user-detail"
            />
            <p>
              Admin tools
                      <i className="fas fa-angle-left right" />
            </p>
          </div>
          <ul className="nav nav-treeview" style={{ display: "none" }}>
            <li className="nav-item">
              <Link
                to="/adminTools/userManage"
                className={
                  pathname === "/adminTools/userManage"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="far fa-circle nav-icon" />
                <p>User manage</p>
              </Link>
            </li>
          </ul>
        </li>
      )
    }
  }

  renderManageMasters = (pathname) => {
    if (userLV === 'admin' || userLV === "power") {
      return (
        <li className="nav-item has-treeview">
          <div
            className={pathname.includes("/master") ? "nav-link active" : "nav-link"
            }
          >
            <i
              className="nav-icon iconify"
              data-icon="cil:list-numbered"
            />
            <p>
              Manage masters
                      <i className="fas fa-angle-left right" />
            </p>
          </div>
          <ul className="nav nav-treeview" style={{ display: "none" }}>
            <li className="nav-item">
              <Link
                to="/master/divisionCode"
                className={
                  pathname === "/master/divisionCode" ||
                    pathname === "/master/create/divisionCode"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="far fa-circle nav-icon" />
                <p>Division code</p>
              </Link>
            </li>
          </ul>
        </li>
      )
    }
  }

  renderMaterialTags = (pathname) => {
    return (
      <li className="nav-item has-treeview">
        <div
          className={pathname.includes("/MaterialTag") ? "nav-link active" : "nav-link"}
        >
          <i className="nav-icon iconify" data-icon="bx-bxs-package" />
          <p>
            Material Tag
            <i className="fas fa-angle-left right" />
          </p>
        </div>
        <ul className="nav nav-treeview" style={{ display: "none" }}>
          <li className="nav-item">
            <Link
              to="/MaterialTag/create"
              className={pathname === "/MaterialTag/create" ? "nav-link active"
                : "nav-link"
              }
            >
              <i className="far fa-circle nav-icon" />
              <p>Create material tag</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/MaterialTag/create_2"
              className={pathname === "/MaterialTag/create_2" ? "nav-link active"
                : "nav-link"
              }
            >
              <i className="far fa-circle nav-icon" />
              <p>Create material tag 2</p>
            </Link>
          </li>
        </ul>
      </li>
    )
  }

  render() {
    const { pathname } = this.props.location;
    return (
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        {/* Brand Logo */}

        <Link className="brand-link bg-primary" to="/home">
          <img
            src="/images/MRT_logo.png"
            alt="MIC Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">
            M.R.T.
          </span>
        </Link>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2" style={{ overflow: "auto" }}>
            <OverlayScrollbarsComponent>
              <ul
                className="nav nav-pills nav-sidebar flex-column nav-child-indent"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Material Tag */}
                {this.renderMaterialTags(pathname)}

                {/* manage masters */}
                {this.renderManageMasters(pathname)}

                {/* admin tools */}
                {this.renderAdminTools(pathname)}

              </ul>
            </OverlayScrollbarsComponent>
          </nav>
          {/* </OverlayScrollbarsComponent> */}
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}

export default withRouter(Menu);
