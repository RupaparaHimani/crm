import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";
import uuid from "uuid/v4";
import s from "./BreadcrumbHistory.module.scss";

class BreadcrumbHistory extends Component {
  state = {
    date: "15 Jan 2020",
  };
  renderBreadCrumbs = () => {
    let route = this.props.url
      .split("/")
      .slice(1)
      .slice(1)
      .map((route) =>
        route
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")
      );
    const length = route.length;
    return route.map((item, index) =>
      length === index + 1 ? (
        <BreadcrumbItem key={uuid()} className={"active"}>
          {item}
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem key={uuid()}>{item}</BreadcrumbItem>
      )
    );
  };

  render() {
    return (
      <>
        {this.props.url !== "/app/chat" ? (
          <Row noGutters>
            <Col lg={5}>
              <Breadcrumb tag="nav" listTag="div">
                {this.renderBreadCrumbs()}
              </Breadcrumb>
            </Col>
            {this.props.url === "/app/main/dashboard" ? (
              <Col lg={7} className={`d-flex align-items-start justify-content-center pr-0 ${s.dashboardButtons} mt-1`}>
              </Col>
            ) : null}
          </Row>
        ) : null}
      </>
    );
  }
}

export default BreadcrumbHistory;
