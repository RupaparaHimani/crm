import React from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,  Table, Button, Input, Badge, Pagination, PaginationItem, PaginationLink   } from "reactstrap";
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


class Billing extends React.Component {
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
          {this.props.ordered_billings.length >0 ?
            <Widget
              title={<p style={{ fontWeight: 700 }}>Billing</p>}
            >
              <Table responsive>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th className="hidden-sm-down">Programe</th>
                    <th className="hidden-sm-down">Patient</th>
                    <th className="hidden-sm-down">Amount</th>
                    {/* <th /> */}
                  </tr>
                </thead>
                <tbody>

                {this.props.ordered_billings
                  .slice(
                    currentPage * this.state.pageSize,
                    (currentPage + 1) * this.state.pageSize
                  )
                  .map((row, i) => 
                    <tr style={{cursor: 'pointer'}}  key={i}  >
                      <td >{row.id}</td>
                      <td  >
                        {
                          row.programID !== null
                          ?
                          this.get_program_name(row.programID)
                          :
                          row.programID
                        }
                        {
                          row.testID !== null
                          ?
                          this.get_test_name(row.testID)
                          :
                            this.get_paid_tests_name(row.testID) != ''
                            ? 
                            this.get_paid_tests_name(row.testID) 
                            :
                            row.testID
                        }

                        {
                          row.serviceID !== null
                          ?
                          this.get_service_name(row.serviceID)
                          :
                          row.testID
                        }

                      </td>
                      <td  >
                        {this.get_user_name(row.userID)}
                      </td>
                      <td  >
                      {
                      row.amount > 0
                      ?
                      <Badge color="success">{row.amount}</Badge>
                      :
                      <Badge color="danger">{row.amount}</Badge>
                      }
                      </td>
                      {/* <td>
                        <a onClick={event => this.onEdit(event, row)}><img src={require("../../images/edit.png")} width="20" height="25" /></a>
                     
                      </td> */}
                    </tr>
                  
                  )}
                </tbody>
              </Table>

              <div className="pagination-wrapper" style={{float: 'right',fontSize: '20px'}} >
                
                <Pagination aria-label="Page navigation example">
                  
                  <PaginationItem disabled={currentPage <= 0}>
                    
                    <PaginationLink
                      onClick={e => this.handleClick(e, currentPage - 1)}
                      previous
                      href="#"
                    />
                    
                  </PaginationItem>

                  {[...Array(pagesCount)].map((page, i) => 
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem disabled={currentPage >= pagesCount - 1}>
                    
                    <PaginationLink
                      onClick={e => this.handleClick(e, currentPage + 1)}
                      next
                      href="#"
                    />
                    
                  </PaginationItem>
                  
                </Pagination>
                
              </div>
            </Widget>
            : <p style={{ fontWeight: 700 }}>NO DATA FOUND</p> }
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

export default withRouter(connect(mapStateToProps)(Billing));
