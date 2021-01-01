import React from "react";
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,  Table, Button,  Form, FormGroup, Label, Input, Badge, Pagination, PaginationItem, PaginationLink   } from "reactstrap";
import { fetchAppoinment } from "../../actions/appoinment";
import { fetchOrderedProgram,getAllPrograms, updateProgram, createProgram, deleteProgram } from "../../actions/program";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchTests, fetchPaidTests } from "../../actions/test";
import { fetchOrderedBilling,fetchService } from "../../actions/billing";
import { fetchOfflineUsers,fetchDoctors } from "../../actions/user";


import "./styles.css";
const ref = React.createRef();

// function pdfGen() {
class pdfGen extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {

            Data : ''
        };
    
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
        componentWillMount() {

            
            
          }
    componentDidMount(){
        if(this.props.location.state == 'undefined'){

            // this.props.history.push({
            //     pathname: '/app/main/billing',
            //     // search: '?query=abc',
            //     // state: { detail: 'some_value' 
            //     // }
            // });
            console.log("here comes");
            this.props.router.push('/app/main/billing');
        }
        this.props.dispatch(fetchOrderedProgram());
            this.props.dispatch(getAllPrograms());
            this.props.dispatch(fetchOfflineUsers());
            this.props.dispatch(fetchAppoinment());
            this.props.dispatch(fetchDoctors());
            this.props.dispatch(fetchOrderedBilling());
            this.props.dispatch(fetchTests());
            this.props.dispatch(fetchPaidTests());
            this.props.dispatch(fetchService());

            this.setState({
                Data : this.props.location.state
            })
        console.log("PDF val1",this.props.location.state)
    }
    onvertDateFormate = (val) =>{
        var date = new Date(val);
    
        var formatedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        return formatedDate;
      }
    render() {

        // {
        //     this.props.location.state == undefined
        //     ? 
        //     <Redirect to="/app/main/billing" />
        //     :
        //     console.log("PDF val",this.props.location.state)
            
        // }
        const {row} = this.props.location.state != undefined ? this.props.location.state : this.state.Data
        
        return (

            <div className="App">
                <Button className="generatePDF"  color="success" ><Pdf targetRef={ref} filename="invoice.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Pdf</button>}
              </Pdf></Button>

              <Button className="backBillingPDF"  color="primary" >
              <Link to={{pathname: `/app/main/billing`, }} >
                          Back To Billing
                        </Link>
              </Button>

              
              
              <div class="page" ref={ref}>
                <div class="invoice-card">
                    <div class="invoice-title">
                        <div id="main-title">
                        <h4>INVOICE</h4>
                        <span>#{typeof row.id != undefined ? row.id : '' }</span>
                        </div>
                        
                        <span id="date">{typeof row.order_time != undefined ? this.onvertDateFormate(row.order_time) : '' }</span>
                    </div>
                    
                    <div class="invoice-details">
                        <table class="invoice-table">
                        <thead>
                            <tr>
                            <td>PROGRAM</td>
                            <td>PURPOSE</td>
                            <td>Total AMOUNT</td>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr class="row-data">
                            <td>$ <span>{
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
                        }</span></td>
                            <td id="unit">{typeof row.purpose != undefined ? row.purpose : '' }</td>
                            <td>{typeof row.totalAmount != undefined ? row.totalAmount : '' }</td>
                            </tr>
                            <tr class="calc-row">
                            <td colspan="2">Paid Amount</td>
                            <td>{typeof row.amount != undefined ? row.amount : '' }</td>
                            </tr>
                            
                            <tr class="calc-row">
                            <td colspan="2">Pending Amount</td>
                            <td>{typeof row.amount != undefined ? row.totalAmount - row.amount : '' }</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    
                </div>
                </div>
            </div>
        );
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
  
  export default withRouter(connect(mapStateToProps)(pdfGen));

// export default pdfGen
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);