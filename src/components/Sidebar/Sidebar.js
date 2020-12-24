import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup";
import {
  changeActiveSidebarItem
} from "../../actions/navigation";
import { logoutUser } from "../../actions/user";

import lightDashboardIcon from "../../images/light-dashboard.svg";
import darkDashboardIcon from "../../images/dark-dashboard.svg";
import lightTables from "../../images/tables.svg";
import darkTables from "../../images/tables-dark.svg";
import lightUI from "../../images/ui-elements.svg";
import darkUI from "../../images/ui-elements-dark.svg";
import lightTypography from "../../images/Typography.svg";
import darkTypography from "../../images/Typography-dark.svg";
import logo from "../../images/logo.svg";
import settingsIcon from "../../images/settings.svg";
import logoutIcon from "../../images/logout.svg";
import accountIcon from "../../images/account.svg";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
    activeItem: ""
  };

  constructor(props) {
    super(props);
    this.doLogout = this.doLogout.bind(this);
    // console.log("-----------", JSON.parse(localStorage.getItem('current_user')))
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {

    return (
        <div className={`${(!this.props.sidebarOpened && !this.props.sidebarStatic ) ? s.sidebarClose : ''} ${s.sidebarWrapper}`} id={"sidebar-drawer"}>
        <nav className={s.root}>
          <header className={s.logo}>
            <img src='http://mindlyftest.antimtechnologies.com/static/media/mind-lyf-04.8babbb2a.png' alt="logo" className={s.logoStyle} width="70" height="40"/>
            <span>Mind</span> LYF
          </header>
          {/*<h5 className={s.navTitle}>APP</h5> */}
          <ul className={s.nav}>
             <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Dashboard"
              isHeader
              link="/app/main/dashboard"
              index="main"
            >
              {window.location.href.includes("dashboard") ? (
                <img
                  src={darkDashboardIcon}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightDashboardIcon}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Counsellor"
              isHeader
              link="/app/main/counsellor"
              index="main"
            >
            <img
              src={accountIcon}
              alt="lightDashboard"
              width={"24px"}
              height={"24px"}
            />
            </LinksGroup>

          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Blog"
            isHeader
            link="/app/main/blog"
            index="main"
          >
          <img
            src={accountIcon}
            alt="lightDashboard"
            width={"24px"}
            height={"24px"}
          />
          </LinksGroup>

          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Doctor"
            isHeader
            link="/app/main/doctor"
            index="main"
          >
          <img
            src={accountIcon}
            alt="lightDashboard"
            width={"24px"}
            height={"24px"}
          />
          </LinksGroup>


          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Patient"
            isHeader
            link="/app/main/patient"
            index="main"
          >
          <img
            src={accountIcon}
            alt="lightDashboard"
            width={"24px"}
            height={"24px"}
          />
          </LinksGroup>
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Staff"
            isHeader
            link="/app/main/staff"
            index="main"
          >
          <img
            src={accountIcon}
            alt="lightDashboard"
            width={"24px"}
            height={"24px"}
          />
          </LinksGroup>

          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Appoinment"
            isHeader
            link="/app/main/appoiment"
            index="main"
          >
          <img
            src={accountIcon}
            alt="lightDashboard"
            width={"24px"}
            height={"24px"}
          />
          </LinksGroup>

          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Program"
            isHeader
            link="/app/main/programe"
            index="main"
          >
          <img
            src={accountIcon}
            alt="lightDashboard"
            width={"24px"}
            height={"24px"}
          />
          </LinksGroup>

          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Billing"
            isHeader
            link="/app/main/billing"
            index="main"
            exact={false}
            childrenLinks={[
              {
                header: "Payment",
                link: "/app/main/payment"
              }
            ]}
            >
          <img
            src={accountIcon}
            alt="lightDashboard"
            width={"24px"}
            height={"24px"}
          />
          </LinksGroup>

          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Test"
            isHeader
            link="/app/main/test"
            index="main"
          >
          <img
            src={accountIcon}
            alt="lightDashboard"
            width={"24px"}
            height={"24px"}
          />
          </LinksGroup>
        </ul>
          {/* <h5 className={s.navTitle}>TEMPLATE</h5>
          <ul className={s.nav}>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Typography"
              isHeader
              link="/app/typography"
              index="main"
            >
              {window.location.href.includes("typography") ? (
                <img
                  src={darkTypography}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightTypography}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Tables"
              isHeader
              link="/app/tables"
              index="main"
            >
              {window.location.href.includes("tables") ? (
                <img
                  src={darkTables}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightTables}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="UI Elements"
              isHeader
              link="/app/ui"
              index="ui"
              exact={false}
              childrenLinks={[
                {
                  header: "Notifications",
                  link: "/app/ui/notifications"
                },
                {
                  header: "Charts",
                  link: "/app/ui/charts"
                },
                {
                  header: "Icons",
                  link: "/app/ui/icons"
                },
                {
                  header: "Maps",
                  link: "/app/ui/maps"
                }
              ]}
            >
              {window.location.href.includes("ui") ? (
                <img
                  src={darkUI}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightUI}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
          </ul>
          <ul className={s.downNav}>
            <hr />
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Settings"
              isHeader
              index="main"
            >
              <img
                src={settingsIcon}
                alt="lightDashboard"
                width={"24px"}
                height={"24px"}
              />
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Account"
              isHeader
            >
              <img
                src={accountIcon}
                alt="lightDashboard"
                width={"24px"}
                height={"24px"}
              />
            </LinksGroup>
          */}
          <ul>
           <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Logout"
              isHeader
              onClick={() => this.doLogout()}
            >
              {window.location.href.includes("another-page") ? (
                <img
                  src={logoutIcon}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={logoutIcon}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    navbarType: store.navigation.navbarType,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
