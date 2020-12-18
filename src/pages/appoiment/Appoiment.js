import React from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,  Table, Button, Input } from "reactstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import s from "./Dashboard.module.scss";
import Widget from "../../components/Widget";
import stocksImg from "../../images/stocks.svg";
import { createAppoinment,fetchAppoinment, getAppoinment, deleteAppoinment, updateAppoinment } from "../../actions/appoinment";
import { fetchOfflineUsers,fetchDoctors } from "../../actions/user";
import ReactQuill from 'react-quill';
import { toast, ToastContainer } from 'react-toastify';
import FileSaver from 'file-saver';
import Swal from 'sweetalert2';
var validator = require("email-validator");
var date = new Date();

var formatedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

class Appoiment extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      user: 0,
      test: 0,
      selectedFile: null,
      ShiftDate : '',
      user_Doctor : 0,
      user_Patient : 0,
      weekDay : '',
      Doctor_shift : '',
      AllShift : [],
      id : 0,
    }
  }

  componentDidMount() {
    // this.props.dispatch(fetchTests());
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
    // this.setState({ selectedFile: event.target.files[0]})
    // Set File Type
  // setFileType('pdf');

  // File Reader
  // const reader = new FileReader();

  // File Reader: On Load
  // reader.onload = () => {

    // File Data (Binary String)
    // const fileData = reader.result;

    // HOW CAN I CONVERT THE BINARY STRING TO TEXT?
    // HOW CAN I CONVERT THE BINARY STRING TO TEXT?
    // HOW CAN I CONVERT THE BINARY STRING TO TEXT?

    // Parsed Results
    // const parsedResults = null;

    // Set File
    // setFile(parsedResults);
  // };

  // File Reader: Read As Binary String
  // reader.readAsBinaryString(acceptedFiles[0]);
  }

  onEdit = (event, row) => {
    event.preventDefault();
    this.props.dispatch(getAppoinment({id: row.id}));


    this.setState({ modal: true})
    var date = new Date(row.date);
    var formated_Date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`

    this.setState({ 
      id: row.id,
      user_Patient: row.patientID,
      user_Doctor: row.doctorID,
      ShiftDate: formated_Date,
      Doctor_shift: row.time,
    })
    // this.createShiftItemsForDoctors()
    var weekday = ["Sunday", "Monday", "Tuesday", "Wensday", "Thrusday", "Friday", "Saturday"];
    var date = new Date(row.date);
     var n =  date.getDay()
     var weekDAy = weekday[n];
     this.setState({weekDay: weekDAy});
  }

  onDelete = (event, id) => {
    event.preventDefault();
    if (window.confirm("Delete the item?")) {
      this.props.dispatch(deleteAppoinment({id: id}));
    }
  }

  createSelectItemsUser = () => {
     let items = [];
     for (let i = 0; i < this.props.users.length; i++) {
       console.log(i);
        items.push(<option key={this.props.users[i].id} value={this.props.users[i].id} >{this.props.users[i].first_name} {this.props.users[i].last_name}</option>);
     }

     return items;
   }

   createSelectItemsDoctors = () => {

    console.log("this.props.doctors",this.props.doctors)
    let items = [];
    for (let i = 0; i < this.props.doctors.length; i++) {
      console.log(i);
       items.push(<option key={this.props.doctors[i].id} value={this.props.doctors[i].id} >{this.props.doctors[i].first_name} {this.props.doctors[i].last_name}</option>);
    }

    return items;
  }

  createShiftItemsForDoctors = () => {
      let items = [];
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
    // this.setState({AllShift : items})

  }
  createSelectItemsTest = () => {
     let items = [];
     for (let i = 0; i < this.props.tests.length; i++) {
          items.push(<option key={this.props.tests[i].id} value={this.props.tests[i].id}>{this.props.tests[i].name}</option>);
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
    //  this.createShiftItemsForDoctors()
      // alert([this.state.user_Doctor,weekDAy, day, month, year].join('/'));


      // let items = [];
      //   for (let i = 0; i < this.props.doctors.length; i++) {

      //     if(this.props.doctors[i].id == this.state.user_Doctor){

      //       var schedule = this.state.user_Doctor.schedule !== null ? JSON.parse(this.state.user_Doctor.schedule) : '';

      //       for (let j = 0; j < schedule.length; j++) {

      //         if(schedule[j].day == weekDAy){
      //           items.push(<option key={j} value={schedule[j].shiftone[0] +' - '+schedule[j].shiftone[1]} >{schedule[j].shiftone[0] } - {schedule[j].shiftone[1]}</option>);
      //           items.push(<option key={j} value={schedule[j].shifttwo[0] +' - '+schedule[j].shifttwo[1]} >{schedule[j].shifttwo[0] } - {schedule[j].shifttwo[1]}</option>);
      //         }

      //       }

      //   }

      //   // return items;
      // }

      // this.setState({AllShift: items});

   }

   createAppoinment = (event) =>
   {
     event.preventDefault();

     if(this.props.appoinment == null && this.state.id == 0){

        this.props.dispatch(createAppoinment({
          patient_id: this.state.user_Patient,
          doctor_id: this.state.user_Doctor,
          date : this.state.ShiftDate,
          time : this.state.Doctor_shift

          }));

      }else{
        this.props.dispatch(updateAppoinment({
          id : this.state.id,
          patient_id: this.state.user_Patient,
          doctor_id: this.state.user_Doctor,
          date : this.state.ShiftDate,
          time : this.state.Doctor_shift

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
    // console.log(condition);
    let fname = '';
      this.props.users.filter((e) => e.id === condition).map((key, i) => (
        fname = key.first_name + " " + key.last_name
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
      AllShift : [] ,
      id : 0
    })
    this.setState({ modal: !this.state.modal})
  }

  render() {
    const { tests, paid_tests, users, appoinments } = this.props;
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
          {appoinments.length >0 ?
            <Widget
              title={<p style={{ fontWeight: 700 }}>Appoiment</p>}
            >
              <Table responsive>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th className="hidden-sm-down">Patients</th>
                    <th className="hidden-sm-down">Doctor</th>
                    <th className="hidden-sm-down">Date</th>
                    <th className="hidden-sm-down">Shift</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {appoinments.map(row => (
                    <tr key={row.id} >
                      <td>{row.id}</td>
                      <td>
                        {/* {this.get_user_name(row.userID)} */}
                        {this.get_user_name(row.patientID)}
                      </td>
                      <td>
                        {this.get_doctor_name(row.doctorID)}
                        {/* {this.get_test_name(row.testID)} */}
                      </td>
                      <td>
                      {row.date}
                        {/* {this.get_test_name(row.testID)} */}
                      </td>
                      <td>
                      {row.time}
                        {/* {this.get_test_name(row.testID)} */}
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(event) => this.createAppoinment(event)}>Create</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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
  appoinment : state.appoinment.appoinment

});

export default withRouter(connect(mapStateToProps)(Appoiment));
