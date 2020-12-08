import React from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge
} from "reactstrap";
import s from "./Tables.modules.scss";
import axios from "axios";
import config from "../../config.js"

class Counsellor extends React.Component {
  constructor() {
    super();
    this.state = {
      counsellors: null,
    }
  }

  componentDidMount(){
    console.log(config.baseURLApi);
    axios.get(config.baseURLApi+'getCounsellors')
    .then(function (response) {
      // handle success
      return response;
      console.log(response);
    }).then((response) => this.setState({counsellors: response.data.data}))
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col lg={12}>
            <div className="table-responsive">
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Contact No</th>
                  </tr>
                </thead>
                {/* eslint-disable */}
                <tbody>
                {this.state.counsellors != null ? this.state.counsellors.map((counsellor) =>
                  <tr>
                    <td>{counsellor.id}</td>
                    <td>{counsellor.first_name}</td>
                    <td>{counsellor.last_name}</td>
                    <td>{counsellor.email}</td>
                    <td>{counsellor.number}</td>
                  </tr>)
                : ''}
                </tbody>
                {/* eslint-enable */}
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Counsellor;
