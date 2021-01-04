import React from "react";
// import { Table, Input, Button, Space } from 'antd';
// import Highlighter from 'react-highlight-words';
// import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Table, Input, Button, Badge, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import s from "./Dashboard.module.scss";
import Widget from "../../components/Widget";
import stocksImg from "../../images/stocks.svg";
import { createAppoinment,fetchAppoinment, getAppoinment, deleteAppoinment, updateAppoinment, getAppoinmentDrTime } from "../../actions/appoinment";
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
      interval_time : '',
      AllShift : [],
      id : 0,
      searchText: '',
    searchedColumn: '',
    currentPage: 0,
      pageSize : 20,
      pagesCount :  0
    }
  }

  componentDidMount() {
    // this.props.dispatch(fetchTests());
    this.props.dispatch(fetchOfflineUsers());
    var userLogin = JSON.parse(localStorage.getItem('loginUser'))
    if(userLogin.user_type == null || userLogin.user_type == 'staff'){
        this.props.dispatch(fetchAppoinment());
    }
   else if(userLogin.user_type == 'doctor'){
    this.props.dispatch(fetchAppoinment(userLogin.id));
   }
    
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
    // this.props.dispatch(getAppoinment({id: row.id}));
    // this.props.dispatch(getAppoinmentDrTime({doctorID : row.doctorID}))



    this.setState({ modal: true})
    var date = new Date(row.date);
    var formated_Date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    this.props.dispatch(getAppoinmentDrTime({doctorID : row.doctorID,date : formated_Date}))
    this.setState({
      id: row.id,
      user_Patient: row.patientID,
      user_Doctor: row.doctorID,
      ShiftDate: formated_Date,
      Doctor_shift: row.time,
      interval_time : row.interval_time
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
     items.push(<option key={0} value='' >Select Patients</option>);
     for (let i = 0; i < this.props.users.length; i++) {
       //console.log(i);
        items.push(<option key={this.props.users[i].id} value={this.props.users[i].id} >{this.props.users[i].first_name} {this.props.users[i].last_name}</option>);
     }

     return items;
   }

   createSelectItemsDoctors = () => {

    //console.log("this.props.doctors",this.props.doctors)
    let items = [];
    items.push(<option key={0} value='' >Select Doctors</option>);
    for (let i = 0; i < this.props.doctors.length; i++) {
      //console.log(i);
       items.push(<option key={this.props.doctors[i].id} value={this.props.doctors[i].id} >{this.props.doctors[i].first_name} {this.props.doctors[i].last_name}</option>);
    }

    return items;
  }

  createShiftItemsForDoctors = () => {
      let items = [];
      items.push(<option key={0} value='' >Select Shift</option>);
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

   createIntervalTimeForDoctors = () => {



    // var j = [];
    // var l = parseInt(res[0]);
    // var m = 0;
    // for(var i = 0; i < resTime; i++ ){
    //   l = parseInt(res[0]) + i + 1;
    //   m = parseInt(res[0]) + i;

    //   j.push('<li>'+m+'-'+l+'</li>');
    // }


      let items = [];
      let newItems = []
      var k = this.state.Doctor_shift;
      var res = k.split(" - ");
      var resTime = parseInt(res[1]) - parseInt(res[0]);
      var j = [];
      var l = parseInt(res[0]);
      var m = 0;


      if(resTime > 0){
        items.push(<option key={0} value='default'>Default</option>);
        for (let i = 0;  i < resTime; i++) {
          l = parseInt(res[0]) + i + 1;
          m = parseInt(res[0]) + i;
          var opt = m+'-'+l;

          console.log("opt_"+i,opt)
          console.log("opt_"+i,this.props.appoinmentsDrTime)

          // if(this.props.appoinmentsDrTime.length > 0){

          //   this.props.appoinmentsDrTime.forEach((val,key)=>{
          //     var date = new Date(val.date);
          //     var formated_Date1 = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
          //     console.log("opts_"+i,key,val,this.state.user_Doctor,this.state.user_Patient,formated_Date1,this.state.ShiftDate,opt,val.interval_time)

          //     // if(formated_Date1 == this.state.ShiftDate){

          //       // if(val.doctorID == this.state.user_Doctor){

          //         if(val.patientID == this.state.user_Patient ){

          //             // if(opt != val.interval_time){

          //                 items.push(<option key={i} value={opt}>{opt}</option>);
          //                 return
          //             // }

          //         }

          //        if(val.patientID != this.state.user_Patient){
          //           if(opt != val.interval_time){

          //             items.push(<option key={i} value={opt}>{opt}</option>);
          //             return
          //           }
          //       }

          //     //   }

          //     // }

          //         // if(val.doctorID == this.state.user_Doctor && opt == val.interval_time && formated_Date1 == this.state.ShiftDate && val.patientID == this.state.user_Patient ){
          //         //   items.push(<option key={i} value={opt}>{opt}</option>);
          //         // }
          //         // else if(val.doctorID == this.state.user_Doctor && opt == val.interval_time && formated_Date1 == this.state.ShiftDate ){

          //         // }
          //         // else if(val.doctorID == this.state.user_Doctor && opt != val.interval_time && formated_Date1 == this.state.ShiftDate ){
          //         //   items.push(<option key={i} value={opt}>{opt}</option>);
          //         // }
          //         // else{

          //         // }



          //   })
          // }
          // else{
            // items.push(<option key={i} value={opt}>{opt}</option>);
            newItems.push(opt)
          // }

        }
      }

      if(this.props.appoinmentsDrTime.length > 0){

        this.props.appoinmentsDrTime.forEach((val,key)=>{
          var date = new Date(val.date);
          var formated_Date1 = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

          // console.log("opts_"+i,key,val,this.state.user_Doctor,this.state.user_Patient,formated_Date1,this.state.ShiftDate,opt,val.interval_time)


            //   if(val.patientID == this.state.user_Patient ){

            //       // if(opt != val.interval_time){

            //           items.push(<option key={i} value={opt}>{opt}</option>);
            //           return
            //       // }

            //   }

            //  if(val.patientID != this.state.user_Patient){
            //     if(opt != val.interval_time){

            //       items.push(<option key={i} value={opt}>{opt}</option>);
            //       return
            //     }
            // }
            newItems.forEach((value,index,object)=>{
                  if(value == val.interval_time){

                    // if(this.state.user_Patient == val.val.patientID){
                    //   items.push(<option key={index} value={value}>{value}</option>);
                    // }
                    // else{
                      object.splice(index, 1)
                    // }

                  }
                  // else{
                  //   items.push(<option key={index} value={value}>{value}</option>);
                  // }
            })

        })
      }

        newItems.forEach((value,index,object)=>{


            items.push(<option key={index} value={value}>{value}</option>);

        })


      console.log("newItems",newItems)
      return items;
   }

   onDropdownSelectedUser(e) {
     //console.log("THE VAL", e.target.value);
     this.setState({user_Patient: e.target.value})
       //here you will see the current selected value of the select input
   }
   onDropdownSelectedDoctors(e) {
       this.setState({user_Doctor: e.target.value, Doctor_shift : ''})
      //  this.createShiftItemsForDoctors()
      // this.props.dispatch(getAppoinmentDrTime({doctorID : this.state.user_Doctor}))

   }

   onDropdownShiftItemsForDoctors(e) {
    this.setState({Doctor_shift: e.target.value})

    var date = new Date(this.state.ShiftDate);
    var formated_Date1 = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    this.props.dispatch(getAppoinmentDrTime({doctorID : this.state.user_Doctor,date : formated_Date1}))
    //console.log("Doctor_shift",e.target.value)

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

     this.setState({weekDay: weekDAy,Doctor_shift : ''});
     //console.log("date",e.target.value,date,formatedDate)
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

     if(this.state.id == 0){

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

      // this.props.dispatch(fetchAppoinment());

     this.setState({modal: false})
   }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   //console.log("--", nextProps);
  //   if ( nextProps.appoinment != null  && prevState.id != nextProps.appoinment.id ) {
  //     //console.log("nextProps.appoinment",nextProps.appoinment);
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
    // //console.log(condition);
    let fname = '';
      this.props.users.filter((e) => e.id === condition).map((key, i) => (
        fname = key.first_name + " " + key.last_name
      ))
    return fname
    };

  get_doctor_name = (condition) => {
    // //console.log(condition);
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

    // var date = new Date();
    // var formated_Date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`

    // this.setState({
    //   user_Patient: this.state.patientID,
    //   user_Doctor: this.state.doctorID,
    //   ShiftDate: formated_Date,
    //   Doctor_shift: this.state.time,
    // })
    // // this.createShiftItemsForDoctors()
    // var weekday = ["Sunday", "Monday", "Tuesday", "Wensday", "Thrusday", "Friday", "Saturday"];
    // var date = new Date(date);
    //  var n =  date.getDay()
    //  var weekDAy = weekday[n];
    //  this.setState({weekDay: weekDAy});
  }

  // getColumnSearchProps = dataIndex => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={node => {
  //           this.searchInput = node;
  //         }}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ width: 188, marginBottom: 8, display: 'block' }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
  //           Reset
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
  //       : '',
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //       setTimeout(() => this.searchInput.select(), 100);
  //     }
  //   },
  //   render: text =>
  //     this.state.searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //         searchWords={[this.state.searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  // handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   this.setState({
  //     searchText: selectedKeys[0],
  //     searchedColumn: dataIndex,
  //   });
  // };

  // handleReset = clearFilters => {
  //   clearFilters();
  //   this.setState({ searchText: '' });
  // };

  handleClick(e, index) {

    e.preventDefault();

    this.setState({
      currentPage: index
    });

  }

  render() {
    const { tests, paid_tests, users, appoinments } = this.props;
    const { currentPage } = this.state;
    var pagesCount = Math.ceil(appoinments.length / this.state.pageSize)
    //console.log("paid_tests", this.state);
    // const columns = [
    //   {
    //     title: 'Patients',
    //     key: 'Patients',
    //     render: (text, row) => (
    //       <>
    //         <span>{this.get_user_name(row.patientID)}</span>
    //       </>
    //     ),
    //     ...this.getColumnSearchProps('name'),
    //   },
    //   {
    //     title: 'Doctor',
    //     key: 'doctor',
    //     render: (text, row) => (
    //       <>
    //         <span>{this.get_doctor_name(row.doctorID)}</span>
    //       </>
    //     ),
    //   },
    //   {
    //     title: 'Date',
    //     key: 'Date',
    //     render: (text, row) => (
    //       <>
    //         <span>{this.convertDateFormate(row.date)}</span>
    //       </>
    //     ),
    //   },
    //   {
    //     title: 'Shift',
    //     key: 'time',
    //     dataIndex: 'time',
    //   },
    //   {
    //     title: 'Time',
    //     key: 'interval_time',
    //     dataIndex: 'interval_time',
    //   },
    //   {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text, row) => (
    //       <Space size="middle">
    //         <a onClick={event => this.onEdit(event, row)}><img src={require("../../images/edit.png")} width="20" height="25" /></a>
    //         <a onClick={event => this.onDelete(event, row.id)}><img src={require("../../images/delete.png")} width="40" height="25"/></a>
    //       </Space>
    //     ),
    //   },
    // ];

    return (
      <div className={s.root}>
      <ToastContainer />
        <Row>
          <Col xl={4} style={{ paddingBottom: '10px' }}>
            <Button color="primary" onClick={this.toggle}>Create</Button>{' '}
          </Col>
        </Row>
        {/* <Row>
          <Col xl={12} >
          {appoinments.length >0 ?
            <Widget
              title={<p style={{ fontWeight: 700 }}>Appoiment</p>}
            >
              <Table columns={columns} dataSource={appoinments} />
            </Widget>
            : <p style={{ fontWeight: 700 }}>NO DATA FOUND</p>

          }

          </Col>
        </Row> */}

        <Row>
          <Col xl={12}>
          {appoinments.length >0 ?
            <Widget
              title={<p style={{ fontWeight: 700 }}>Appointment</p>}
            >
              <Table responsive>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th className="hidden-sm-down">Patients</th>
                    <th className="hidden-sm-down">Doctors</th>
                    <th className="hidden-sm-down">Date</th>
                    <th className="hidden-sm-down">Shift</th>
                    <th className="hidden-sm-down">Time</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {appoinments.map(row => (
                    <tr key={row.id} >
                      <td>{row.id}</td>
                      <td>
                        {this.get_user_name(row.patientID)}
                      </td>
                      <td>
                        {this.get_doctor_name(row.doctorID)}
                      </td>
                      <td>
                      {this.convertDateFormate(row.date)}
                      </td>
                      <td>
                      {row.time}
                      </td>
                      <td>
                      {row.interval_time}
                      </td>
                      <td>
                        <a onClick={event => this.onEdit(event, row)}><img src={require("../../images/edit.png")} width="20" height="25" /></a>
                        <a onClick={event => this.onDelete(event, row.id)}><img src={require("../../images/delete.png")} width="40" height="25"/></a>
                      </td>
                    </tr>
                  ))}
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>{this.state.id == 0 ? 'Create Appointment' : 'Edit Appointment' }</ModalHeader>
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
              value={this.state.user_Doctor}
              >
                  {this.createSelectItemsDoctors()}
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="Date">Date</label>
              <Input type="date"
              name="Date"
              id="Date"
              min={formatedDate}
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
            <Button color="primary" onClick={(event) => this.createAppoinment(event)}>{this.state.id == 0 ? 'Create' : 'Update' }</Button>{' '}
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
  appoinment : state.appoinment.appoinment,
  appoinmentsDrTime : state.appoinment.appoinmentsDrTime

});

export default withRouter(connect(mapStateToProps)(Appoiment));
