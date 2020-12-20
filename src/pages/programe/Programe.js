import React from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,  Table, Button, Input } from "reactstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import s from "./Dashboard.module.scss";
import Widget from "../../components/Widget";
import stocksImg from "../../images/stocks.svg";
import { createAppoinment,fetchAppoinment, getAppoinment, deleteAppoinment, updateAppoinment } from "../../actions/appoinment";
import { fetchOrderedProgram,getAllPrograms } from "../../actions/program";
import { fetchOfflineUsers,fetchDoctors } from "../../actions/user";
import ReactQuill from 'react-quill';
import { toast, ToastContainer } from 'react-toastify';
import FileSaver from 'file-saver';
import Swal from 'sweetalert2';
var validator = require("email-validator");
var date = new Date();

var formatedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

class Programe extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      modal1 : false,
      user: 0,
      test: 0,
      selectedFile: null,
      ShiftDate : '',
      user_Doctor : 0,
      user_Patient : 0,
      weekDay : '',
      Doctor_shift : '',
      interval_time : '',
      AllShift : [],
      allProgram : [],
      session_schedule : [],
      id : 0,
      programeID : '',
      userID : '',
      session: 0
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchOrderedProgram());
    this.props.dispatch(getAllPrograms());
    this.props.dispatch(fetchOfflineUsers());
    this.props.dispatch(fetchAppoinment());
    this.props.dispatch(fetchDoctors());
    // this.createShiftItemsForDoctors()
  }

  onFileChange = event => {
    Swal.fire({
        icon: 'error',
        type: 'error',
        text: 'Work In progress',
        showConfirmButton: true,
    });
  }

  clickOnRow = (val) =>{
    alert(this.get_program_name(val.programID));
  }

  onEdit = (event, row) => {
    event.preventDefault();
    // this.props.dispatch(getAppoinment({id: row.id}));


    this.setState({ 
      modal1: true,
      id : row.id,
      programeID : row.programID,
      userID : row.userID,
      session: row.purpose
    })
    // var date = new Date(row.date);
    // var formated_Date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`

    // this.setState({
    //   id: row.id,
    //   user_Patient: row.patientID,
    //   user_Doctor: row.doctorID,
    //   ShiftDate: formated_Date,
    //   Doctor_shift: row.time,
    //   interval_time : row.interval_time
    // })
    // // this.createShiftItemsForDoctors()
    // var weekday = ["Sunday", "Monday", "Tuesday", "Wensday", "Thrusday", "Friday", "Saturday"];
    // var date = new Date(row.date);
    //  var n =  date.getDay()
    //  var weekDAy = weekday[n];
    //  this.setState({weekDay: weekDAy});
  }

  onDelete = (event, id) => {
    event.preventDefault();
    if (window.confirm("Delete the item?")) {
      this.props.dispatch(deleteAppoinment({id: id}));
    }
  }

  createSelectItemsUser = () => {
     let items = [];
     items.push(<option key={-1} value='' >Select Patients</option>);
     for (let i = 0; i < this.props.users.length; i++) {
       console.log(i);
        items.push(<option key={this.props.users[i].id} value={this.props.users[i].id} >{this.props.users[i].first_name} {this.props.users[i].last_name}</option>);
     }

     return items;
   }

   createSelectItemsDoctors = () => {

    console.log("this.props.doctors",this.props.doctors)
    let items = [];
    items.push(<option key={-1} value='' >Select Doctors</option>);
    for (let i = 0; i < this.props.doctors.length; i++) {
      console.log(i);
       items.push(<option key={this.props.doctors[i].id} value={this.props.doctors[i].id} >{this.props.doctors[i].first_name} {this.props.doctors[i].last_name}</option>);
    }

    return items;
  }

  createShiftItemsForDoctors = () => {
      let items = [];
      items.push(<option key={-1} value='' >Select Shift</option>);
      for (let i = 0; i < this.props.doctors.length; i++) {

        if(this.props.doctors[i].id == this.state.user_Doctor){

          var schedule = this.props.doctors[i].schedule !== null ? JSON.parse(this.props.doctors[i].schedule) : '';

          for (let j = 0; j < schedule.length; j++) {

            if(schedule[j].day == this.state.weekDay){
              items.push(<option key={schedule[j].shiftone[0]} value={schedule[j].shiftone[0] +' - '+schedule[j].shiftone[1]} >{schedule[j].shiftone[0] } - {schedule[j].shiftone[1]}</option>);
              items.push(<option key={schedule[j].shifttwo[0]} value={schedule[j].shifttwo[0] +' - '+schedule[j].shifttwo[1]} >{schedule[j].shifttwo[0] } - {schedule[j].shifttwo[1]}</option>);
            }

          }

      }


    }
    return items;

  }
  createSelectItemsTest = () => {
     let items = [];
     for (let i = 0; i < this.props.tests.length; i++) {
          items.push(<option key={this.props.tests[i].id} value={this.props.tests[i].id}>{this.props.tests[i].name}</option>);
     }
     return items;
   }

   createIntervalTimeForDoctors = () => {

      let items = [];
      var k = this.state.Doctor_shift;
      var res = k.split(" - ");
      var resTime = parseInt(res[1]) - parseInt(res[0]);
      var j = [];
      var l = parseInt(res[0]);
      var m = 0;

      if(resTime > 0){
        for (let i = 0;  i < resTime; i++) {
          l = parseInt(res[0]) + i + 1;
          m = parseInt(res[0]) + i;
          var opt = m+'-'+l;
            items.push(<option key={i} value={opt}>{opt}</option>);
        }
      }
        
      return items;
   }

   onDropdownSelectedUser(e) {
     console.log("THE VAL", e.target.value);
     this.setState({user_Patient: e.target.value})
       //here you will see the current selected value of the select input
   }
   onDropdownSelectedDoctors(e) {
       this.setState({user_Doctor: e.target.value})
      //  this.createShiftItemsForDoctors()
   }

   onDropdownShiftItemsForDoctors(e) {
    this.setState({Doctor_shift: e.target.value})

    console.log("Doctor_shift",e.target.value)

  }

  onDropdownIntervalTimeForDoctors(e) {
    this.setState({interval_time: e.target.value})
  }

  convertDateFormate = (val) =>{
    var date = new Date(val);

    var formatedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    return formatedDate;
  }

   SelectDate = (e)=>{
    this.setState({ShiftDate: e.target.value});
    var weekday = ["Sunday", "Monday", "Tuesday", "Wensday", "Thrusday", "Friday", "Saturday"];


    var date = new Date(e.target.value);
     var n =  date.getDay()
     var weekDAy = weekday[n];
     var day = date.getDate();
     var month = date.getMonth() + 1;
     var year = date.getFullYear();

     this.setState({weekDay: weekDAy});
     console.log("date",e.target.value,date,formatedDate)

   }

   createAppoinment = (event) =>
   {
     event.preventDefault();

     if(this.props.appoinment == null && this.state.id == 0){

        this.props.dispatch(createAppoinment({
          patient_id: this.state.user_Patient,
          doctor_id: this.state.user_Doctor,
          date : this.state.ShiftDate,
          time : this.state.Doctor_shift,
          interval_time : this.state.interval_time

          }));

      }else{
        this.props.dispatch(updateAppoinment({
          id : this.state.id,
          patient_id: this.state.user_Patient,
          doctor_id: this.state.user_Doctor,
          date : this.state.ShiftDate,
          time : this.state.Doctor_shift,
          interval_time : this.state.interval_time

          }));
      }


     this.setState({modal: false})
   }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log("--", nextProps);
  //   if ( nextProps.appoinment != null  && prevState.id != nextProps.appoinment.id ) {
  //     console.log("nextProps.appoinment",nextProps.appoinment);
  //     var date = new Date(nextProps.appoinment.date);
  //     var formated_Date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  //     return {
  //       id: nextProps.appoinment.id,
  //       user_Patient: nextProps.appoinment.patientID,
  //       user_Doctor: nextProps.appoinment.doctorID,
  //       ShiftDate: formated_Date,
  //       Doctor_shift: nextProps.appoinment.time,
  //     };
  //   }
  //   return null;
  // }

  get_user_name = (condition) => {
    console.log("condition",this.props.users,condition);
    let fname = '';
      this.props.users.filter((e) => e.id === condition).map((key, i) => (
        fname = key.first_name + " " + key.last_name
      ))
    return fname
    };

    

    get_program_name = (condition) => {
      console.log("condition",this.props.allProgram,condition);
      let fname = '';
        this.props.allProgram.filter((e) => e.id === condition).map((key, i) => (
          fname = key.title
        ))
      return fname
      };

  get_doctor_name = (condition) => {
    // console.log(condition);
    let fname = '';
      this.props.doctors.filter((e) => e.id === condition).map((key, i) => (
        fname = key.first_name + " " + key.last_name
      ))
    return fname
    };
  toggle = () => {
    this.setState({
      title: '',
      description: '',
      imgurl: '',
      Date : '',
      user_Doctor : 0,
      user_Patient : 0,
      weekDay : '',
      Doctor_shift : '',
      interval_time : '',
      ShiftDate : '', 
      AllShift : [] ,
      id : 0
    })
    this.setState({ modal: !this.state.modal})
  }

  toggle1 = () => {
    this.setState({
      title: '',
      description: '',
      imgurl: '',
      Date : '',
      user_Doctor : 0,
      user_Patient : 0,
      weekDay : '',
      Doctor_shift : '',
      interval_time : '',
      ShiftDate : '', 
      AllShift : [] ,
      id : 0
    })
    this.setState({ modal1: !this.state.modal1})
  }
  generateRow  = (val) => {
    var rowData = []
    rowData.push
     ( <Row>
          <Col xl={1}>
            <div className="form-group">
              <h4>#</h4>
            </div>
          </Col>
          <Col xl={3}>
            <div className="form-group">
              <h4>Doctor</h4>
            </div>
          </Col>
          <Col xl={3}>
            <div className="form-group">
              <h4>Date</h4>
            </div>
          </Col>
          <Col xl={3}>
            <div className="form-group">
              <h4>shift</h4>
            </div>
          </Col>
          <Col xl={2}>
            <div className="form-group">
              <h4>interval</h4>
            </div>
          </Col>
        </Row>
     );
    for(var i = 1; i <= val; i++){
     rowData.push
     ( <Row>
          <Col xl={1}>
            <div className="form-group">
              <h4>{i}</h4>
            </div>
          </Col>
          <Col xl={3}>
            <div className="form-group">
            <Input  type="select" onChange={(e) => this.onDropdownSelectedDoctors(e)}  label="Doctors"
              value={this.state.user_Patients}
              >
                  {this.createSelectItemsDoctors()}
              </Input>
            </div>
          </Col>
          <Col xl={3}>
            <div className="form-group">
            <Input type="date"
              name="Date"
              id="Date"
              // defaultValue={this.state.Date}
              value={this.state.ShiftDate}
              onChange={(e) => this.SelectDate(e) }
              />
            </div>
          </Col>
          <Col xl={3}>
            <div className="form-group">
            <Input  type="select" onChange={(e) => this.onDropdownShiftItemsForDoctors(e)}  label="Doctors"
              value={this.state.Doctor_shift}
              >
                  {this.createShiftItemsForDoctors()}
                  {/* {this.state.AllShift} */}
              </Input>
            </div>
          </Col>
          <Col xl={2}>
            <div className="form-group">
            <Input  type="select" onChange={(e) => this.onDropdownIntervalTimeForDoctors(e)}  label="Doctors"
              value={this.state.interval_time}
              >
                  {this.createIntervalTimeForDoctors()}
                  {/* {this.state.AllShift} */}
              </Input>
            </div>
          </Col>
        </Row>
     );
     
    }
    return rowData
      
  }

  render() {
    const { tests, paid_tests, users, ordered_programs } = this.props;
    console.log("paid_tests", this.state);

    
    return (
      <div className={s.root}>
      <ToastContainer />
        <Row>
          <Col xl={4} style={{ paddingBottom: '10px' }}>
            <Button color="primary" onClick={this.toggle}>Create</Button>{' '}
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
          {ordered_programs.length >0 ?
            <Widget
              title={<p style={{ fontWeight: 700 }}>Appoiment</p>}
            >
              <Table responsive>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th className="hidden-sm-down">Programe</th>
                    <th className="hidden-sm-down">Patient</th>
                    <th className="hidden-sm-down">Session</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {ordered_programs.map(row => (
                    <tr style={{cursor: 'pointer'}}  key={row.id}  >
                      <td onClick={() => this.clickOnRow(row)} >{row.id}</td>
                      <td onClick={() => this.clickOnRow(row)} >
                        {this.get_program_name(row.programID)}
                      </td>
                      <td onClick={() => this.clickOnRow(row)} >
                        {this.get_user_name(row.userID)}
                      </td>
                      <td onClick={() => this.clickOnRow(row)} >
                      {row.purpose}
                      </td>
                      <td>
                        <a onClick={event => this.onEdit(event, row)}><img src={require("../../images/edit.png")} width="20" height="25" /></a>
                        <a onClick={event => this.onDelete(event, row.id)}><img src={require("../../images/delete.png")} width="40" height="25"/></a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Widget>
            : <p style={{ fontWeight: 700 }}>NO DATA FOUND</p> }
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Create Appoiment</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="user">Patients</label>
              <Input type="select" onChange={(e) => this.onDropdownSelectedUser(e)} label="Users"
              value={this.state.user_Patient}
              >
                  {this.createSelectItemsUser()}
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="Doctors">Doctors</label>
              <Input  type="select" onChange={(e) => this.onDropdownSelectedDoctors(e)}  label="Doctors"
              value={this.state.user_Patients}
              >
                  {this.createSelectItemsDoctors()}
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="Date">Date</label>
              <Input type="date"
              name="Date"
              id="Date"
              // defaultValue={this.state.Date}
              value={this.state.ShiftDate}
              onChange={(e) => this.SelectDate(e) }
              />
            </div>

            <div className="form-group">
              <label htmlFor="Doctors">Shift</label>
              <Input  type="select" onChange={(e) => this.onDropdownShiftItemsForDoctors(e)}  label="Doctors"
              value={this.state.Doctor_shift}
              >
                  {this.createShiftItemsForDoctors()}
                  {/* {this.state.AllShift} */}
              </Input>
            </div>

            <div className="form-group">
              <label htmlFor="Doctors">Interval Time</label>
              <Input  type="select" onChange={(e) => this.onDropdownIntervalTimeForDoctors(e)}  label="Doctors"
              value={this.state.interval_time}
              >
                  {this.createIntervalTimeForDoctors()}
                  {/* {this.state.AllShift} */}
              </Input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(event) => this.createAppoinment(event)}>Create</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
        </Modal>

        <Modal className="modal-lg" isOpen={this.state.modal1} toggle={this.toggle1} >
          <ModalHeader toggle={this.toggle1}>Create Appoiment</ModalHeader>
          <ModalBody>
            <Row>
                <Col xl={5}>
                  <div className="form-group">
                    <h4>Patient :</h4>
                  </div>
                </Col>
                <Col xl={7}>
                  <div className="form-group">
                    <h4>{this.get_user_name(this.state.userID)}</h4>
                  </div>
                </Col>
            </Row>

            <Row>
                <Col xl={5}>
                  <div className="form-group">
                    <h4>Programe :</h4>
                  </div>
                </Col>
                <Col xl={7}>
                  <div className="form-group">
                    <h4>{this.get_program_name(this.state.programeID)}</h4>
                  </div>
                </Col>
            </Row>

            <Row>
                <Col xl={5}>
                  <div className="form-group">
                    <h4>Session :</h4>
                  </div>
                </Col>
                <Col xl={7}>
                  <div className="form-group">
                    <h4>{this.state.session}</h4>
                  </div>
                </Col>
            </Row>

            <hr/>
            {
              
              this.generateRow(this.state.session)
              
            }
            

            {/* <div className="form-group">
              <label htmlFor="user">Patient</label>
              
            </div>
            <div className="form-group">
              <label htmlFor="Doctors">Programe</label>
            </div>
            <div className="form-group">
              <label htmlFor="Date">Session</label>
            </div> */}

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(event) => this.createAppoinment(event)}>Create</Button>{' '}
            <Button color="secondary" onClick={this.toggle1}>Cancel</Button>
        </ModalFooter>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  // tests: state.test.tests,
  // paid_tests: state.test.paid_tests,
  users : state.auth.offline_users,
  doctors : state.auth.doctors,
  appoinments : state.appoinment.appoinments,
  appoinment : state.appoinment.appoinment,
  ordered_programs : state.program.ordered_programs,
  program : state.program.program,
  allProgram : state.program.allProgram

});

export default withRouter(connect(mapStateToProps)(Programe));
