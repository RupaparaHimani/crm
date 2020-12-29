import React from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,  Table, Button } from "reactstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { createReferral } from "../../actions/referral";
import s from "./Dashboard.module.scss";
import Widget from "../../components/Widget";
import stocksImg from "../../images/stocks.svg";
import { fetchUsers, createUser, getUser, updateUser, deleteUser } from "../../actions/user";
import ReactQuill from 'react-quill';
import { toast, ToastContainer } from 'react-toastify';
var validator = require("email-validator");
var timeArr = []
class Doctor extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      is_create: false,
      id: 0,
      fname: '',
      lname: '',
      email: '',
      number: '',
      password: '',
      confirm_password: '',
      toTimeMon1 : '',
      fromTimeMon1 : '',
      toTimeTue1 : '',
      fromTimeTue1 : '',
      toTimeWen1 : '',
      fromTimeWen1 : '',
      toTimeThr1 : '',
      fromTimeThr1 : '',
      toTimeFri1 : '',
      fromTimeFri1 : '',
      toTimeSat1 : '',
      fromTimeSat1 : '',
      toTimeSun1 : '',
      fromTimeSun1 : '',

      toTimeMon2 : '',
      fromTimeMon2 : '',
      toTimeTue2 : '',
      fromTimeTue2 : '',
      toTimeWen2 : '',
      fromTimeWen2 : '',
      toTimeThr2 : '',
      fromTimeThr2 : '',
      toTimeFri2 : '',
      fromTimeFri2 : '',
      toTimeSat2 : '',
      fromTimeSat2 : '',
      toTimeSun2 : '',
      fromTimeSun2 : '',

      schedule : '',

      sData : [],
      from: 'doctor',
      refer_to_name: '',
      refer_to_number: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers('doctor'));
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    // //console.log("state from props", nextProps);
    if ( nextProps.user != null && nextProps.edit == true && prevState.id != nextProps.user.id && prevState.is_create == false ) {
      var data = nextProps.user.schedule !== null ? JSON.parse(nextProps.user.schedule) : '';
      //console.log("data",data)
      return {
        id: nextProps.user.id,
        fname: nextProps.user.first_name,
        lname: nextProps.user.last_name,
        email: nextProps.user.email,
        number: nextProps.user.number,
        sData : nextProps.user.schedule != null ? data.length > 0 ? data[0].shiftone[0] : '' : '',
        toTimeMon1 : nextProps.user.schedule != null ? data.length > 0 ? data[0].shiftone[0] : '' : '',
        fromTimeMon1 : nextProps.user.schedule != null ? data.length > 0 ? data[0].shiftone[1] : '' : '',

        toTimeTue1 : nextProps.user.schedule != null ? data.length > 0 ? data[1].shiftone[0] : '' : '',
        fromTimeTue1 : nextProps.user.schedule != null ? data.length > 0 ? data[1].shiftone[1] : '' : '',

        toTimeWen1 : nextProps.user.schedule != null ? data.length > 0 ? data[2].shiftone[0] : '' : '',
        fromTimeWen1 : nextProps.user.schedule != null ? data.length > 0 ? data[2].shiftone[1] : '' : '',

        toTimeThr1 : nextProps.user.schedule != null ? data.length > 0 ? data[3].shiftone[0] : '' : '',
        fromTimeThr1 : nextProps.user.schedule != null ? data.length > 0 ? data[3].shiftone[1] : '' : '',

        toTimeFri1 : nextProps.user.schedule != null ? data.length > 0 ? data[4].shiftone[0] : '' : '',
        fromTimeFri1 : nextProps.user.schedule != null ? data.length > 0 ? data[4].shiftone[1] : '' : '',

        toTimeSat1 : nextProps.user.schedule != null ? data.length > 0 ? data[5].shiftone[0] : '' : '',
        fromTimeSat1 : nextProps.user.schedule != null ? data.length > 0 ? data[5].shiftone[1] : '' : '',

        toTimeSun1 : nextProps.user.schedule != null ? data.length > 0 ? data[6].shiftone[0] : '' : '',
        fromTimeSun1 : nextProps.user.schedule != null ? data.length > 0 ? data[6].shiftone[1] : '' : '',


        toTimeMon2 : nextProps.user.schedule != null ? data.length > 0 ? data[0].shifttwo[0] : '' : '',
        fromTimeMon2 : nextProps.user.schedule != null ? data.length > 0 ? data[0].shifttwo[1] : '' : '',

        toTimeTue2 : nextProps.user.schedule != null ? data.length > 0 ? data[1].shifttwo[0] : '' : '',
        fromTimeTue2 : nextProps.user.schedule != null ? data.length > 0 ? data[1].shifttwo[1] : '' : '',

        toTimeWen2 : nextProps.user.schedule != null ? data.length > 0 ? data[2].shifttwo[0] : '' : '',
        fromTimeWen2 : nextProps.user.schedule != null ? data.length > 0 ? data[2].shifttwo[1] : '' : '',

        toTimeThr2 : nextProps.user.schedule != null ? data.length > 0 ? data[3].shifttwo[0] : '' : '',
        fromTimeThr2 : nextProps.user.schedule != null ? data.length > 0 ? data[3].shifttwo[1] : '' : '',

        toTimeFri2 : nextProps.user.schedule != null ? data.length > 0 ? data[4].shifttwo[0] : '' : '',
        fromTimeFri2 : nextProps.user.schedule != null ? data.length > 0 ? data[4].shifttwo[1] : '' : '',

        toTimeSat2 : nextProps.user.schedule != null ? data.length > 0 ? data[5].shifttwo[0] : '' : '',
        fromTimeSat2 : nextProps.user.schedule != null ? data.length > 0 ? data[5].shifttwo[1] : '' : '',

        toTimeSun2 : nextProps.user.schedule != null ? data.length > 0 ? data[6].shifttwo[0] : '' : '',
        fromTimeSun2 : nextProps.user.schedule != null ? data.length > 0 ? data[6].shifttwo[1] : '' : '',

      };
    }
    return null;
  }

  createUser = (event) => {
    event.preventDefault();
      // var Mon = [this.state.toTimeMon1,this.state.fromTimeMon1];
      // var Tue = [this.state.toTimeTue1,this.state.fromTimeTue1];
      // var Wen = [this.state.toTimeWen1,this.state.fromTimeWen1];
      // var Thr = [this.state.toTimeThr1,this.state.fromTimeThr1];
      // var Fri = [this.state.toTimeFri1,this.state.fromTimeFri1];
      // var Sat = [this.state.toTimeSat1,this.state.fromTimeSat1];
      // var Sun = [this.state.toTimeSun1,this.state.fromTimeSun1];
      // var schedule = [Mon,Tue,Wen,Thr,Fri,Sat,Sun];

      var Mon = {day :'Monday', shiftone : [this.state.toTimeMon1,this.state.fromTimeMon1],  shifttwo : [this.state.toTimeMon2,this.state.fromTimeMon2] };

      var Tue = {day :'Tuesday', shiftone : [this.state.toTimeTue1,this.state.fromTimeTue1],  shifttwo : [this.state.toTimeTue2,this.state.fromTimeTue2] };

      var Wen = {day :'Wensday', shiftone : [this.state.toTimeWen1,this.state.fromTimeWen1],  shifttwo : [this.state.toTimeWen2,this.state.fromTimeWen2] };

      var Thr = {day :'Thrusday', shiftone : [this.state.toTimeThr1,this.state.fromTimeThr1],  shifttwo : [this.state.toTimeThr2,this.state.fromTimeThr2] };

      var Fri = {day :'Friday', shiftone : [this.state.toTimeFri1,this.state.fromTimeFri1],  shifttwo : [this.state.toTimeFri2,this.state.fromTimeFri2] };

      var Sat = {day :'Saturday', shiftone : [this.state.toTimeSat1,this.state.fromTimeSat1],  shifttwo : [this.state.toTimeSat2,this.state.fromTimeSat2] };

      var Sun = {day :'Sunday', shiftone : [this.state.toTimeSun1,this.state.fromTimeSun1],  shifttwo : [this.state.toTimeSun2,this.state.fromTimeSun2] };


      // var Tue = {'Tuesday' : this.state.toTimeTue1 +' - ' +this.state.fromTimeTue1};
      // var Wen = {'Wensday' : this.state.toTimeWen1 +' - ' +this.state.toTimeWen1};
      // var Thr = {'Thrusday' : this.state.toTimeThr1 +' - ' +this.state.toTimeThr1};
      // var Fri = {'Friday' : this.state.toTimeFri1 +' - ' +this.state.toTimeFri1};
      // var Sat = {'Saturday' : this.state.toTimeSat1 +' - ' +this.state.toTimeSat1};
      // var Sun = {'Sunday' : this.state.toTimeSun1 +' - ' +this.state.fromTimeSun1};

      // var schedule = this.state.sData;//[Mon,Tue,Wen,Thr,Fri,Sat,Sun];
      var schedule = [Mon,Tue,Wen,Thr,Fri,Sat,Sun];

      //console.log("schedule",schedule)
      // return false



      if (this.state.fname==='' || this.state.lname==='' || this.state.email==='' || this.state.number==='') {
        toast.error("Please enter all the fields!");
      }else if (validator.validate(this.state.email)===false) {
        toast.error("Please enter a valid email address!");
      }else if (this.state.number.length!==10) {
        toast.error("Please enter a 10-digit mobile number!");
      }
      else {
          if(this.props.user == null && this.state.id == 0){
            if (this.state.password ==='') {
                toast.error("Please enter password field!");
              }else if (this.state.password!==this.state.confirm_password) {
               toast.error("Both passwords should match!");
             }else{
            this.props.dispatch(createUser({fname: this.state.fname, lname: this.state.lname, email: this.state.email, number: this.state.number, password: this.state.password, user_type: 'doctor', type: 'offline', schedule : schedule}));
          }
          }else{
            this.props.dispatch(updateUser({id: this.state.id, fname: this.state.fname, lname: this.state.lname, email: this.state.email, number: this.state.number, password: this.state.password, user_type: 'doctor', schedule : schedule}));
          }
          this.setState({ modal: false })
      }

  }

  onFNameChange = event => {
    this.setState({ fname: event.target.value})
  }
  onLNameChange = event => {
    this.setState({ lname: event.target.value})
  }
  onEmailChange = event => {
    this.setState({ email: event.target.value})
  }
  onNumberChange = event => {
    this.setState({ number: event.target.value})
  }
  onPasswordChange = event => {
    this.setState({ password: event.target.value})
  }
  onConfirmPasswordChange = event => {
    this.setState({ confirm_password: event.target.value})
  }

  onNameChangeFun = (e,name) => {
    this.setState({[name]: e.target.value})

    
    
    if(name == 'toTimeMon1' || name == 'fromTimeMon1'){
      //console.log("timeArrtimeArr",this.state.toTimeMon1,this.state.fromTimeMon1)
      var localDate1 = new Date();
      var localDate2 = new Date();
  
      if(name == 'toTimeMon1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeMon1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeMon1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeMon1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeMon1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeMon1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeMon1 != '' && this.state.fromTimeMon1 != ''){
        if(localDate1 > localDate2){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }

    if(name == 'toTimeMon2' || name == 'fromTimeMon2'){
      //console.log("timeArrtimeArr",this.state.toTimeMon2,this.state.fromTimeMon2)
      var localDate3 = new Date();
      var localDate4 = new Date();
  
      if(name == 'toTimeMon2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeMon2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeMon2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeMon2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeMon2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeMon2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }

      
      if(this.state.toTimeMon1 != '' && this.state.fromTimeMon1 != ''){
        var localDate1 = new Date();
        var localDate2 = new Date();

        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeMon1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);

        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeMon1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);

        if(this.state.toTimeMon1 != '' || this.state.fromTimeMon1 != ''){
          if(localDate1 > localDate3 || localDate1 > localDate4 || localDate2 > localDate3 || localDate2 > localDate4){
            console.log("TimeChecklocalDate2",(localDate1 > localDate3 || localDate1 > localDate4 || localDate2 > localDate3 || localDate2 > localDate4))
            alert("Shift 2 Time is not greater than Shift 1.")
            this.setState({[name]: ''})
            return
          }
        }
      }

  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeMon1 != '' && this.state.fromTimeMon1 != ''){
        if(localDate3 > localDate4){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }

    if(name == 'toTimeTue1' || name == 'fromTimeTue1'){
      //console.log("timeArrtimeArr",this.state.toTimeTue1,this.state.fromTimeTue1)
      var localDate1 = new Date();
      var localDate2 = new Date();
  
      if(name == 'toTimeTue1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeTue1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeTue1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeTue1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeTue1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeTue1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeTue1 != '' && this.state.fromTimeTue1 != ''){
        if(localDate1 > localDate2){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }
  
    if(name == 'toTimeTue2' || name == 'fromTimeTue2'){
      //console.log("timeArrtimeArr",this.state.toTimeTue2,this.state.fromTimeTue2)
      var localDate3 = new Date();
      var localDate4 = new Date();
  
      if(name == 'toTimeTue2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeTue2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeTue2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeTue2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeTue2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeTue2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }

      if(this.state.toTimeTue1 != '' && this.state.fromTimeTue1 != ''){
        var localDate1 = new Date();
        var localDate2 = new Date();

        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeTue1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);

        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeTue1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);

        if(this.state.toTimeTue1 != '' || this.state.fromTimeTue1 != ''){
          if(localDate1 > localDate3 || localDate1 > localDate4 || localDate2 > localDate3 || localDate2 > localDate4){
            //console.log("TimeChecklocalDate2",localDate1,localDate2)
            alert("Shift 2 Time is not greater than Shift 1.")
            this.setState({[name]: ''})
            return
          }
        }
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeTue1 != '' && this.state.fromTimeTue1 != ''){
        if(localDate3 > localDate4){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }

    if(name == 'toTimeWen1' || name == 'fromTimeWen1'){
      //console.log("timeArrtimeArr",this.state.toTimeWen1,this.state.fromTimeWen1)
      var localDate1 = new Date();
      var localDate2 = new Date();
  
      if(name == 'toTimeWen1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeWen1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeWen1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeWen1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeWen1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeWen1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeWen1 != '' && this.state.fromTimeWen1 != ''){
        if(localDate1 > localDate2){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }
  
    if(name == 'toTimeWen2' || name == 'fromTimeWen2'){
      //console.log("timeArrtimeArr",this.state.toTimeWen2,this.state.fromTimeWen2)
      var localDate3 = new Date();
      var localDate4 = new Date();
  
      if(name == 'toTimeWen2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeWen2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeWen2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeWen2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeWen2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeWen2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }

      if(this.state.toTimeWen1 != '' && this.state.fromTimeWen1 != ''){
        var localDate1 = new Date();
        var localDate2 = new Date();
    
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeWen1;
    
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
    
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeWen1;
    
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
    
        if(this.state.toTimeWen1 != '' || this.state.fromTimeWen1 != ''){
          if(localDate1 > localDate3 || localDate1 > localDate4 || localDate2 > localDate3 || localDate2 > localDate4){
            //console.log("TimeChecklocalDate2",localDate1,localDate2)
            alert("Shift 2 Time is not greater than Shift 1.")
            this.setState({[name]: ''})
            return
          }
        }
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeWen1 != '' && this.state.fromTimeWen1 != ''){
        if(localDate3 > localDate4){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }

    if(name == 'toTimeThr1' || name == 'fromTimeThr1'){
      //console.log("timeArrtimeArr",this.state.toTimeThr1,this.state.fromTimeThr1)
      var localDate1 = new Date();
      var localDate2 = new Date();
  
      if(name == 'toTimeThr1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeThr1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeThr1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeThr1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeThr1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeThr1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeThr1 != '' && this.state.fromTimeThr1 != ''){
        if(localDate1 > localDate2){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }
  
    if(name == 'toTimeThr2' || name == 'fromTimeThr2'){
      //console.log("timeArrtimeArr",this.state.toTimeThr2,this.state.fromTimeThr2)
      var localDate3 = new Date();
      var localDate4 = new Date();
  
      if(name == 'toTimeThr2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeThr2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeThr2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeThr2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeThr2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeThr2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }

      if(this.state.toTimeThr1 != '' && this.state.fromTimeThr1 != ''){
        var localDate1 = new Date();
        var localDate2 = new Date();
    
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeThr1;
    
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
    
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeThr1;
    
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
    
        if(this.state.toTimeThr1 != '' || this.state.fromTimeThr1 != ''){
          if(localDate1 > localDate3 || localDate1 > localDate4 || localDate2 > localDate3 || localDate2 > localDate4){
            //console.log("TimeChecklocalDate2",localDate1,localDate2)
            alert("Shift 2 Time is not greater than Shift 1.")
            this.setState({[name]: ''})
            return
          }
        }
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeThr1 != '' && this.state.fromTimeThr1 != ''){
        if(localDate3 > localDate4){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }

    if(name == 'toTimeFri1' || name == 'fromTimeFri1'){
      //console.log("timeArrtimeArr",this.state.toTimeFri1,this.state.fromTimeFri1)
      var localDate1 = new Date();
      var localDate2 = new Date();
  
      if(name == 'toTimeFri1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeFri1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeFri1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeFri1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeFri1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeFri1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeFri1 != '' && this.state.fromTimeFri1 != ''){
        if(localDate1 > localDate2){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }
  
    if(name == 'toTimeFri2' || name == 'fromTimeFri2'){
      //console.log("timeArrtimeArr",this.state.toTimeFri2,this.state.fromTimeFri2)
      var localDate3 = new Date();
      var localDate4 = new Date();
  
      if(name == 'toTimeFri2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeFri2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeFri2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeFri2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeFri2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeFri2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }

      if(this.state.toTimeFri1 != '' && this.state.fromTimeFri1 != ''){
        var localDate1 = new Date();
        var localDate2 = new Date();
    
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeFri1;
    
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
    
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeFri1;
    
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
    
        if(this.state.toTimeFri1 != '' || this.state.fromTimeFri1 != ''){
          if(localDate1 > localDate3 || localDate1 > localDate4 || localDate2 > localDate3 || localDate2 > localDate4){
            //console.log("TimeChecklocalDate2",localDate1,localDate2)
            alert("Shift 2 Time is not greater than Shift 1.")
            this.setState({[name]: ''})
            return
          }
        }
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeFri1 != '' && this.state.fromTimeFri1 != ''){
        if(localDate3 > localDate4){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }

    if(name == 'toTimeSat1' || name == 'fromTimeSat1'){
      //console.log("timeArrtimeArr",this.state.toTimeSat1,this.state.fromTimeSat1)
      var localDate1 = new Date();
      var localDate2 = new Date();
  
      if(name == 'toTimeSat1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeSat1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeSat1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeSat1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeSat1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeSat1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeSat1 != '' && this.state.fromTimeSat1 != ''){
        if(localDate1 > localDate2){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }
  
    if(name == 'toTimeSat2' || name == 'fromTimeSat2'){
      //console.log("timeArrtimeArr",this.state.toTimeSat2,this.state.fromTimeSat2)
      var localDate3 = new Date();
      var localDate4 = new Date();
  
      if(name == 'toTimeSat2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeSat2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeSat2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeSat2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeSat2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeSat2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }

      if(this.state.toTimeSat1 != '' && this.state.fromTimeSat1 != ''){
        var localDate1 = new Date();
        var localDate2 = new Date();
    
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeSat1;
    
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
    
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeSat1;
    
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
    
        if(this.state.toTimeSat1 != '' || this.state.fromTimeSat1 != ''){
          if(localDate1 > localDate3 || localDate1 > localDate4 || localDate2 > localDate3 || localDate2 > localDate4){
            //console.log("TimeChecklocalDate2",localDate1,localDate2)
            alert("Shift 2 Time is not greater than Shift 1.")
            this.setState({[name]: ''})
            return
          }
        }
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeSat1 != '' && this.state.fromTimeSat1 != ''){
        if(localDate3 > localDate4){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }

    if(name == 'toTimeSun1' || name == 'fromTimeSun1'){
      //console.log("timeArrtimeArr",this.state.toTimeSun1,this.state.fromTimeSun1)
      var localDate1 = new Date();
      var localDate2 = new Date();
  
      if(name == 'toTimeSun1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeSun1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeSun1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeSun1'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeSun1 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeSun1;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeSun1 != '' && this.state.fromTimeSun1 != ''){
        if(localDate1 > localDate2){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }
  
    if(name == 'toTimeSun2' || name == 'fromTimeSun2'){
      //console.log("timeArrtimeArr",this.state.toTimeSun2,this.state.fromTimeSun2)
      var localDate3 = new Date();
      var localDate4 = new Date();
  
      if(name == 'toTimeSun2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker =  e.target.value;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
        
      }
      else if(this.state.toTimeSun2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeSun2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate3 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(name == 'fromTimeSun2'){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = e.target.value;
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }else if(this.state.fromTimeSun2 != ''){
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeSun2;
  
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate4 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
      }
  
      if(this.state.toTimeSun1 != '' && this.state.fromTimeSun1 != ''){
        var localDate1 = new Date();
        var localDate2 = new Date();
    
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.toTimeSun1;
    
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate1 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
    
        var dateFromPicker = "2020-01-01";
        var timeFromPicker = this.state.fromTimeSun1;
    
        var dateParts = dateFromPicker.split("-");
        var timeParts = timeFromPicker.split(":");
        localDate2 = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
    
        if(this.state.toTimeSun1 != '' || this.state.fromTimeSun1 != ''){
          if(localDate1 > localDate3 || localDate1 > localDate4 || localDate2 > localDate3 || localDate2 > localDate4){
            //console.log("TimeChecklocalDate2",localDate1,localDate2)
            alert("Shift 2 Time is not greater than Shift 1.")
            this.setState({[name]: ''})
            return
          }
        }
      }
      
      // //console.log("TimeChecklocalDate",localDate1,localDate2)
      if(this.state.toTimeSun1 != '' && this.state.fromTimeSun1 != ''){
        if(localDate3 > localDate4){
          //console.log("TimeChecklocalDate2",localDate1,localDate2)
          alert("start time should be smaller than end time!")
          this.setState({[name]: ''})
        }
      }
      
    }
    //console.log("time",e.target.value)
  }

  // Referral
  onReferToNameChange = event => {
    this.setState({ refer_to_name: event.target.value})
  }
  onReferToNumberChange = event => {
    this.setState({ refer_to_number: event.target.value})
  }

  toggle_referral = () => {
    this.setState({ refer_to_name: '', refer_to_number: '' })
    this.setState({ modal_referral: !this.state.modal_referral})
  }

  createRefer = (event) => {
    event.preventDefault();
    this.props.dispatch(createReferral({from: this.state.from, referral: this.state.id, refer_to_name: this.state.refer_to_name, refer_to_number: this.state.refer_to_number}))
    this.setState({ modal_referral: false})
  }

  onRefer = (event, id) => {
    event.preventDefault();
    this.setState({ id: id})
    this.setState({ modal_referral: true})
  }


  toggle = () => {
    this.setState({
      id : 0,
      title: '',
      is_create: true,
      description: '',
      imgurl: '',
      fname: '',
      lname: '',
      email: '',
      number: '',
      password: '',
      confirm_password: '',
      toTimeMon1 : '',
      fromTimeMon1 : '',
      toTimeTue1 : '',
      fromTimeTue1 : '',
      toTimeWen1 : '',
      fromTimeWen1 : '',
      toTimeThr1 : '',
      fromTimeThr1 : '',
      toTimeFri1 : '',
      fromTimeFri1 : '',
      toTimeSat1 : '',
      fromTimeSat1 : '',
      toTimeSun1 : '',
      fromTimeSun1 : '',

      toTimeMon2 : '',
      fromTimeMon2 : '',
      toTimeTue2 : '',
      fromTimeTue2 : '',
      toTimeWen2 : '',
      fromTimeWen2 : '',
      toTimeThr2 : '',
      fromTimeThr2 : '',
      toTimeFri2 : '',
      fromTimeFri2 : '',
      toTimeSat2 : '',
      fromTimeSat2 : '',
      toTimeSun2 : '',
      fromTimeSun2 : '',

      schedule : '',
      sData : []
    })
    this.setState({ modal: !this.state.modal})
  }

  onEdit = (event, id) => {
    event.preventDefault();
    this.props.dispatch(getUser({id: id}));
    this.setState({ modal: true, is_create: false })
  }

  onDelete = (event, id) => {
    event.preventDefault();
    if (window.confirm("Delete the item?")) {
      this.props.dispatch(deleteUser({id: id}));
    }
  }

  render() {
    const { users, user } = this.props;
    //console.log("userrrrr", users);
    //console.log("toTimeMon1", this.state.toTimeMon1);
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
            <Widget
              title={<p style={{ fontWeight: 700 }}>Doctors</p>}
            >
              <Table responsive>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th className="hidden-sm-down">Name</th>
                    <th className="hidden-sm-down">Email</th>
                    <th className="hidden-sm-down">Contact Number</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? users.map(row => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>
                        {row.first_name}  {row.last_name}
                      </td>
                      <td>
                        {row.email}
                      </td>
                      <td>
                        {row.number}
                      </td>
                      <td>
                        <a onClick={event => this.onEdit(event, row.id)}><img src={require("../../images/edit.png")} width="20" height="25" /></a>
                        <a onClick={event => this.onDelete(event, row.id)}><img src={require("../../images/delete.png")} width="40" height="25"/></a>
                        <a onClick={event => this.onRefer(event, row.id)} title="Referral"><img src={require("../../images/referral.png")} width="20" height="25"/></a>
                      </td>
                    </tr>
                  )): 'NO DATA FOUND'}
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>
        <Modal className="modal-lg" isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>
          {this.state.is_create == true ? "Register Doctor" : "Edit Doctor"}</ModalHeader>
          <ModalBody>
            <Row>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input className="form-control" id="email"  value={ this.state.email} onChange={(event) => this.onEmailChange(event)}/>
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="fname">FirstName</label>
                  <input className="form-control" id="fname"  value={ this.state.fname} onChange={(event) => this.onFNameChange(event)}/>
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="lname">LastName</label>
                  <input className="form-control" id="lname"  value={ this.state.lname} onChange={(event) => this.onLNameChange(event)}/>
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="number">Contact Number</label>
                  <input className="form-control" id="number"  value={ this.state.number} onChange={(event) => this.onNumberChange(event)}/>
                </div>
              </Col>
              { user == null ?
                <>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input className="form-control" id="password" type="password" value={ this.state.password} onChange={(event) => this.onPasswordChange(event)}/>
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm-Password</label>
                  <input className="form-control" id="confirm-password" type="password" value={ this.state.confirm_password} onChange={(event) => this.onConfirmPasswordChange(event)}/>
                </div>
              </Col>
              </> : '' }
              </Row>
              
              <Row>
                <Col xl={2}>
                  <div className="form-group">
                    <h5>Monday</h5>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                    <p>1st Shift</p>
                    <input type="time" className="form-control" id="toTimeMon1" name="toTimeMon1"  value={ this.state.toTimeMon1} onChange={(event) => this.onNameChangeFun(event,'toTimeMon1')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeMon1" name="fromTimeMon1"  value={ this.state.fromTimeMon1} onChange={(event) => this.onNameChangeFun(event,'fromTimeMon1')}/>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                  <p>2nd Shift</p>
                    <input type="time" className="form-control" id="toTimeMon2" name="toTimeMon2"  value={ this.state.toTimeMon2} onChange={(event) => this.onNameChangeFun(event,'toTimeMon2')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeMon2" name="fromTimeMon2"  value={ this.state.fromTimeMon2} onChange={(event) => this.onNameChangeFun(event,'fromTimeMon2')}/>
                  </div>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col xl={2}>
                  <div className="form-group">
                    <h5>Tuesday</h5>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                  {/* <p>1st Shift</p> */}
                    <input type="time" className="form-control" id="toTimeTue1" name="toTimeTue1"  value={ this.state.toTimeTue1} onChange={(event) => this.onNameChangeFun(event,'toTimeTue1')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeTue1" name="fromTimeTue1"  value={ this.state.fromTimeTue1} onChange={(event) => this.onNameChangeFun(event,'fromTimeTue1')}/>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                  {/* <p>2nd Shift</p> */}
                  <input type="time" className="form-control" id="toTimeTue2" name="toTimeTue2"  value={ this.state.toTimeTue2} onChange={(event) => this.onNameChangeFun(event,'toTimeTue2')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeTue2" name="fromTimeTue2"  value={ this.state.fromTimeTue2} onChange={(event) => this.onNameChangeFun(event,'fromTimeTue2')}/>
                  </div>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col xl={2}>
                  <div className="form-group">
                    <h5>Wednesday</h5>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                  {/* <p>1st Shift</p> */}
                    <input type="time" className="form-control" id="toTimeWen1" name="toTimeWen1"  value={ this.state.toTimeWen1} onChange={(event) => this.onNameChangeFun(event,'toTimeWen1')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeWen1" name="fromTimeWen1"  value={ this.state.fromTimeWen1} onChange={(event) => this.onNameChangeFun(event,'fromTimeWen1')}/>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                    {/* <p>2nd Shift</p> */}
                      <input type="time" className="form-control" id="toTimeWen2" name="toTimeWen2"  value={ this.state.toTimeWen2} onChange={(event) => this.onNameChangeFun(event,'toTimeWen2')}/>
                      &emsp;
                      <input type="time" className="form-control" id="fromTimeWen2" name="fromTimeWen2"  value={ this.state.fromTimeWen2} onChange={(event) => this.onNameChangeFun(event,'fromTimeWen2')}/>
                  </div>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col xl={2}>
                  <div className="form-group">
                    <h5>Thursday</h5>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                  {/* <p>1st Shift</p> */}
                    <input type="time" className="form-control" id="toTimeThr1" name="toTimeThr1"  value={ this.state.toTimeThr1} onChange={(event) => this.onNameChangeFun(event,'toTimeThr1')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeThr1" name="fromTimeThr1"  value={ this.state.fromTimeThr1} onChange={(event) => this.onNameChangeFun(event,'fromTimeThr1')}/>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                  {/* <p>2nd Shift</p> */}
                    <input type="time" className="form-control" id="toTimeThr2" name="toTimeThr2"  value={ this.state.toTimeThr2} onChange={(event) => this.onNameChangeFun(event,'toTimeThr2')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeThr2" name="fromTimeThr2"  value={ this.state.fromTimeThr2} onChange={(event) => this.onNameChangeFun(event,'fromTimeThr2')}/>
                  </div>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col xl={2}>
                  <div className="form-group">
                    <h5>Friday</h5>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeFri1" name="toTimeFri1"  value={ this.state.toTimeFri1} onChange={(event) => this.onNameChangeFun(event,'toTimeFri1')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeFri1" name="fromTimeFri1"  value={ this.state.fromTimeFri1} onChange={(event) => this.onNameChangeFun(event,'fromTimeFri1')}/>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeFri2" name="toTimeFri2"  value={ this.state.toTimeFri2} onChange={(event) => this.onNameChangeFun(event,'toTimeFri2')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeFri2" name="fromTimeFri2"  value={ this.state.fromTimeFri2} onChange={(event) => this.onNameChangeFun(event,'fromTimeFri2')}/>
                  </div>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col xl={2}>
                  <div className="form-group">
                    <h5>Saturday</h5>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeSat1" name="toTimeSat1"  value={ this.state.toTimeSat1} onChange={(event) => this.onNameChangeFun(event,'toTimeSat1')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeSat1" name="fromTimeSat1"  value={ this.state.fromTimeSat1} onChange={(event) => this.onNameChangeFun(event,'fromTimeSat1')}/>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                  <input type="time" className="form-control" id="toTimeSat2" name="toTimeSat2"  value={ this.state.toTimeSat2} onChange={(event) => this.onNameChangeFun(event,'toTimeSat2')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeSat2" name="fromTimeSat2"  value={ this.state.fromTimeSat2} onChange={(event) => this.onNameChangeFun(event,'fromTimeSat2')}/>
                  </div>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col xl={2}>
                  <div className="form-group">
                    <h5>Sunday</h5>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeSun1" name="toTimeSun1"  value={ this.state.toTimeSun1} onChange={(event) => this.onNameChangeFun(event,'toTimeSun1')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeSun1" name="fromTimeSun1"  value={ this.state.fromTimeSun1} onChange={(event) => this.onNameChangeFun(event,'fromTimeSun1')}/>
                  </div>
                </Col>
                <Col xl={5}>
                  <div className="form-group">
                  <input type="time" className="form-control" id="toTimeSun2" name="toTimeSun2"  value={ this.state.toTimeSun2} onChange={(event) => this.onNameChangeFun(event,'toTimeSun2')}/>
                    &emsp;
                    <input type="time" className="form-control" id="fromTimeSun2" name="fromTimeSun2"  value={ this.state.fromTimeSun2} onChange={(event) => this.onNameChangeFun(event,'fromTimeSun2')}/>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(event) => this.createUser(event)}>
            {this.state.is_create == true ? "Create" : "Update"}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.modal_referral} toggle={this.toggle_referral} >
        <ModalHeader toggle={this.toggle_referral}>Refer To Patient</ModalHeader>
        <ModalBody>
          <Row>
            <Col xl={12}>
              <div className="form-group">
                <label htmlFor="refer_to_name">Refer to Patient Name: </label>
                <input className="form-control" id="refer_to_name"  value={ this.state.refer_to_name} onChange={(event) => this.onReferToNameChange(event)}/>
              </div>
            </Col>
            <Col xl={12}>
              <div className="form-group">
                <label htmlFor="refer_to_number">Contact Number</label>
                <input className="form-control" id="refer_to_number"  value={ this.state.refer_to_number} onChange={(event) => this.onReferToNumberChange(event)}/>
              </div>
            </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(event) => this.createRefer(event)}>Create</Button>
            <Button color="secondary" onClick={this.toggle_referral}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.auth.users,
  user: state.auth.user,
  edit: state.auth.edit
});

export default withRouter(connect(mapStateToProps)(Doctor));
