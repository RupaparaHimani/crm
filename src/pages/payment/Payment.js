import React from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,  Table, Button,  Form, FormGroup, Label, Input, Badge, Pagination, PaginationItem, PaginationLink   } from "reactstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import s from "./Dashboard.module.scss";
import Widget from "../../components/Widget/Widget";
import { fetchAppoinment } from "../../actions/appoinment";
import { fetchOrderedProgram,getAllPrograms, updateProgram, createProgram, deleteProgram } from "../../actions/program";
import { fetchTests, fetchPaidTests } from "../../actions/test";
import { fetchOrderedBilling,fetchService } from "../../actions/billing";
import { fetchOfflineUsers,fetchDoctors } from "../../actions/user";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';


class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.pageSize = 20;
    this.pagesCount = Math.ceil(this.props.ordered_billings.length / this.pageSize);
    this.state = {
    
      currentPage: 0,
      pageSize : 20,
      pagesCount :  0
      
    };

  }

  componentWillMount() {
    this.props.dispatch(fetchOrderedProgram());
    this.props.dispatch(getAllPrograms());
    this.props.dispatch(fetchOfflineUsers());
    this.props.dispatch(fetchAppoinment());
    this.props.dispatch(fetchDoctors());
    this.props.dispatch(fetchOrderedBilling());
    this.props.dispatch(fetchTests());
    this.props.dispatch(fetchPaidTests());
    this.props.dispatch(fetchService());
  }

  componentDidMount() {


    // var num = Math.ceil(this.props.ordered_billings.length / this.state.pageSize)
    // console.log("num",num)
    // this.setState({
    //   pagesCount :num
    // })
  }

  onEdit = (event, row) => {
    event.preventDefault();
    this.setState({
      user: 0,
      test: 0,
    })
  }

  onDelete = (event, id) => {
    event.preventDefault();
    if (window.confirm("Delete the item?")) {
      this.props.dispatch(deleteProgram({id: id}));
    }
  }

   onDropdownSetStateName(e) {
     this.setState({[e.target.name]: e.target.value})
   }
  

  get_user_name = (condition) => {
    let fname = '';
      this.props.users.filter((e) => e.id === condition).map((key, i) => (
        fname = key.first_name + " " + key.last_name
      ))
    return fname
    };

    get_program_name = (condition) => {
      let fname = '';
        this.props.allProgram.filter((e) => e.id === condition).map((key, i) => (
          fname = key.title
        ))
      return fname
      };

      get_test_name = (condition) => {
      let fname = '';
        this.props.tests.filter((e) => e.id === condition).map((key, i) => (
          fname = key.name
        ))
      return fname
      };

      get_paid_tests_name = (condition) => {
        let fname = '';
          this.props.paid_tests.filter((e) => e.id === condition).map((key, i) => (
            fname = key.name
          ))
        return fname
        };

        get_service_name = (condition) => {
          let fname = '';
            this.props.allServices.filter((e) => e.id === condition).map((key, i) => (
              fname = key.title
            ))
          return fname
          };

        

  get_doctor_name = (condition) => {
    let fname = '';
      this.props.doctors.filter((e) => e.id === condition).map((key, i) => (
        fname = key.first_name + " " + key.last_name
      ))
    return fname
    };


  handleClick(e, index) {
    
    e.preventDefault();

    this.setState({
      currentPage: index
    });
    
  }

  render() {
    const { currentPage } = this.state;
    var pagesCount = Math.ceil(this.props.ordered_billings.length / this.state.pageSize)
    
    return (
      <div className={s.root}>
      <ToastContainer />
        <Row>
          <Col xl={12} >
            <Widget
              title={<p style={{ fontWeight: 700 }}>Payment</p>}
            >
              <Row>
                <Col xl={12} >
                <FormGroup>
                  <Label for="exampleSelect">Patients</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Bill No.</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                </Col>
              </Row>
              
              <br/>

                <Row>
                <Col xl={12} >
                  <Form inline >
                    <Col xl={2} >
                      
                        <FormGroup  >
                          <Label >
                            Total : 5000K
                          </Label>
                        </FormGroup>
                        
                      </Col>
                      <Col xl={2} >
                        <FormGroup  >
                          <Label >
                            Paid : 3000K
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col xl={6} >
                        <FormGroup  >
                        <Label for="payment" hidden>Pay Pending Amount*</Label>
                        <Input style={{width: '100%'}} type="number" name="payment" id="exampleEmail" placeholder="payment" />
                      </FormGroup>
                      </Col>
                      <Col xl={2} >
                        <FormGroup  >
                          <Button>Pay</Button>
                      </FormGroup>
                      </Col>
                  </Form>
                  </Col>
                </Row>
              
            </Widget>
          </Col>
        </Row>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  tests: state.test.tests,
  paid_tests: state.test.paid_tests,
  users : state.auth.offline_users,
  doctors : state.auth.doctors,
  appoinments : state.appoinment.appoinments,
  appoinment : state.appoinment.appoinment,
  ordered_programs : state.program.ordered_programs,
  program : state.program.program,
  allProgram : state.program.allProgram,
  ordered_billings  : state.billing.ordered_billings,
  allServices : state.billing.allServices


});

export default withRouter(connect(mapStateToProps)(Payment));
