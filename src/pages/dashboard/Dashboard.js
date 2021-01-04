import React from "react";
import { Row, Col, Table } from "reactstrap";
import axios from "axios";import config from "../../config.js"
import Widget from "../../components/Widget";
import s from "./Dashboard.module.scss";
var userLogin = ''

class Dashboard extends React.Component {
  constructor() {
    super();
  }
  state = {
    total_patient: 0,
    total_online_patient: 0,
    total_offline_patient: 0,
    total_most_booked_program: 0,
    total_most_booked_test: 0,
    total_most_booked_service: 0,
    total_doctor_appoinment: 0,
    services: [],
    programs: [],
    tests: [],
  };

  componentDidMount() {
    userLogin = JSON.parse(localStorage.getItem('loginUser'))
    console.log("userLogin",userLogin)
    this.getTotalPatient();
    this.getTotalOnlinePatient();
    this.getTotalOfflinePatient();
    this.getTotalBookedProgram();
    this.getTotalBookedTest();
    this.getTotalBookedService();
    this.getServices();
    this.getPrograms();
    this.getTests();
    this.getDoctorAppontment();
  }
  getTotalPatient = () => {
    axios.get(config.baseURLApi+'get_patient_count')
    .then(function (response) {
      console.log(response.data.data.patient_count);
      return response;
    }).then((response) => this.setState({total_patient: response.data.data.patient_count}))
    .catch(function (error) {
      console.log(error);
    })
  }

  getTotalOnlinePatient = () => {
    axios.get(config.baseURLApi+'get_online_patient_count')
    .then(function (response) {
      return response;
    }).then((response) => this.setState({total_online_patient: response.data.data.online_patient_count}))
    .catch(function (error) {
      console.log(error);
    })
  }

  getTotalOfflinePatient = () => {
    axios.get(config.baseURLApi+'get_offline_patient_count')
    .then(function (response) {
      return response;
    }).then((response) => this.setState({total_offline_patient: response.data.data.offline_patient_count}))
    .catch(function (error) {
      console.log(error);
    })
  }

  getTotalBookedProgram = () => {
    axios.get(config.baseURLApi+'get_most_booked_program_count')
    .then(function (response) {
      return response;
    }).then((response) => this.setState({total_most_booked_program: response.data.data}))
    .catch(function (error) {
      console.log(error);
    })
  }
  getTotalBookedTest = () => {
    axios.get(config.baseURLApi+'get_most_booked_test_count')
    .then(function (response) {
      return response;
    }).then((response) => this.setState({total_most_booked_test: response.data.data}))
    .catch(function (error) {
      console.log(error);
    })
  }
  getTotalBookedService = () => {
    axios.get(config.baseURLApi+'get_most_booked_service_count')
    .then(function (response) {
      return response;
    }).then((response) => this.setState({total_most_booked_service: response.data.data}))
    .catch(function (error) {
      console.log(error);
    })
  }

  getServices = () => {
    axios.get(config.baseURLApi+'getservices')
    .then(function (response) {
      return response;
    }).then((response) => this.setState({services: response.data.data}))
    .catch(function (error) {
      console.log(error);
    })
  }


  get_service_name = (condition) => {
    // //console.log(condition);
    let title = '';
      this.state.services.filter((e) => e.id === condition).map((key, i) => (
        title = key.title
      ))
    return title
    };

    getPrograms = () => {
      axios.get(config.baseURLApi+'getprograms')
      .then(function (response) {
        return response;
      }).then((response) => this.setState({programs: response.data.data}))
      .catch(function (error) {
        console.log(error);
      })
    }


    get_programs_name = (condition) => {
      // //console.log(condition);
      let title = '';
        this.state.programs.filter((e) => e.id === condition).map((key, i) => (
          title = key.title
        ))
      return title
      };


      getTests = () => {
        axios.get(config.baseURLApi+'get_tests')
        .then(function (response) {
          return response;
        }).then((response) => this.setState({tests: response.data.data}))
        .catch(function (error) {
          console.log(error);
        })
      }


      get_test_name = (condition) => {
        // //console.log(condition);
        let name = '';
          this.state.tests.filter((e) => e.id === condition).map((key, i) => (
            name = key.name
          ))
        return name
        };


        getDoctorAppontment = () => {
          var self = this
          axios({
            method: 'get',
            url: config.baseURLApi+'get_doctor_appoinment_count',
            params: {
               doctor_id: `${userLogin.id}`,
            }
          })
          .then(function (response) {
            self.setState({total_doctor_appoinment: response.data.data.appoiment_count})
          })
          .catch(function (error) {
            console.log(error);
          })
        }

  render() {
    console.log("total_doctor_appoinment", this.state.total_doctor_appoinment);
    return (
      <div className={s.root}>
        <Row>
        {userLogin.user_type == 'doctor' ?
          <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>Total Appointments</p>}
            >
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h3 className={"fw-semi-bold mb-0"}>{this.state.total_doctor_appoinment}</h3>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                </Col>
              </Row>
            </Widget>
          </Col>
          :(userLogin.user_type == "''" ?
          <>
            <Col xl={4}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>Total Patients</p>}
              >
                <Row className={`justify-content-between mt-3`} noGutters>
                  <Col sm={8} className={"d-flex align-items-center"}>
                    <h3 className={"fw-semi-bold mb-0"}>{this.state.total_patient}</h3>
                  </Col>
                  <Col
                    sm={4}
                    className={"d-flex align-items-center justify-content-end"}
                  >
                  </Col>
                </Row>
              </Widget>
            </Col>
            <Col xl={4}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>Total Online Patients</p>}
              >
                <Row className={`justify-content-between mt-3`} noGutters>
                  <Col sm={8} className={"d-flex align-items-center"}>
                    <h3 className={"fw-semi-bold mb-0"}>{this.state.total_online_patient}</h3>
                  </Col>
                  <Col
                    sm={4}
                    className={"d-flex align-items-center justify-content-end"}
                  >
                  </Col>
                </Row>
              </Widget>
            </Col>
            <Col xl={4}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>Total Offline Patients</p>}
              >
                <Row className={`justify-content-between mt-3`} noGutters>
                  <Col sm={8} className={"d-flex align-items-center"}>
                    <h3 className={"fw-semi-bold mb-0"}>{this.state.total_offline_patient}</h3>
                  </Col>
                  <Col
                    sm={4}
                    className={"d-flex align-items-center justify-content-end"}
                  >
                  </Col>
                </Row>
              </Widget>
            </Col>
            <Col xl={4}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>Total Booked Program</p>}
              >
                <Row className={`justify-content-between mt-3`} noGutters>
                  <Col sm={8} className={"d-flex align-items-center"}>
                    <h3 className={"fw-semi-bold mb-0"}>{this.get_programs_name(this.state.total_most_booked_program.programID)} -> {this.state.total_most_booked_program.booked_program_count}</h3>
                  </Col>
                  <Col
                    sm={4}
                    className={"d-flex align-items-center justify-content-end"}
                  >
                  </Col>
                </Row>
              </Widget>
            </Col>
            <Col xl={4}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>Total Booked Service</p>}
              >
                <Row className={`justify-content-between mt-3`} noGutters>
                  <Col sm={8} className={"d-flex align-items-center"}>
                    <h3 className={"fw-semi-bold mb-0"}>{this.get_service_name(this.state.total_most_booked_service.serviceID)} -> {this.state.total_most_booked_service.booked_service_count} </h3>
                  </Col>
                  <Col
                    sm={4}
                    className={"d-flex align-items-center justify-content-end"}
                  >
                  </Col>
                </Row>
              </Widget>
            </Col>
            <Col xl={4}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>Total Booked Service</p>}
              >
                <Row className={`justify-content-between mt-3`} noGutters>
                  <Col sm={8} className={"d-flex align-items-center"}>
                    <h3 className={"fw-semi-bold mb-0"}>{this.get_test_name(this.state.total_most_booked_test.testID)} -> {this.state.total_most_booked_test.booked_test_count}</h3>
                  </Col>
                  <Col
                    sm={4}
                    className={"d-flex align-items-center justify-content-end"}
                  >
                  </Col>
                </Row>
              </Widget>
            </Col>
          </>
        : '')}
        </Row>

      </div>
    );
  }
}

export default Dashboard;
