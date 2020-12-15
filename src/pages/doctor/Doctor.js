import React from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,  Table, Button } from "reactstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import s from "./Dashboard.module.scss";
import Widget from "../../components/Widget";
import stocksImg from "../../images/stocks.svg";
import { fetchUsers, createUser, getUser, updateUser, deleteUser } from "../../actions/user";
import ReactQuill from 'react-quill';
import { toast, ToastContainer } from 'react-toastify';
var validator = require("email-validator");

class Doctor extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      id: 0,
      fname: '',
      lname: '',
      email: '',
      number: '',
      password: '',
      confirm_password: '',
      toTimeMon : '',
      fromTimeMon : '',
      toTimeTue : '',
      fromTimeTue : '',
      toTimeWen : '',
      fromTimeWen : '',
      toTimeThr : '',
      fromTimeThr : '',
      toTimeFri : '',
      fromTimeFri : '',
      toTimeSat : '',
      fromTimeSat : '',
      toTimeSun : '',
      fromTimeSun : '',
      schedule : ''
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers('doctor'));
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("state from props", nextProps);
    if ( nextProps.user != null && nextProps.edit == true && prevState.id != nextProps.user.id ) {
      return {
        id: nextProps.user.id,
        fname: nextProps.user.first_name,
        lname: nextProps.user.last_name,
        email: nextProps.user.email,
        number: nextProps.user.number,
      };
    }
    return null;
  }

  createUser = (event) => {
    event.preventDefault();
      // var Mon = [this.state.toTimeMon,this.state.fromTimeMon];
      // var Tue = [this.state.toTimeTue,this.state.fromTimeTue];
      // var Wen = [this.state.toTimeWen,this.state.fromTimeWen];
      // var Thr = [this.state.toTimeThr,this.state.fromTimeThr];
      // var Fri = [this.state.toTimeFri,this.state.fromTimeFri];
      // var Sat = [this.state.toTimeSat,this.state.fromTimeSat];
      // var Sun = [this.state.toTimeSun,this.state.fromTimeSun];
      // var schedule = [Mon,Tue,Wen,Thr,Fri,Sat,Sun];

      var Mon = {'Monday' : this.state.toTimeMon +' - ' +this.state.fromTimeMon};
      var Tue = {'Tuesday' : this.state.toTimeTue +' - ' +this.state.fromTimeTue};
      var Wen = {'Wensday' : this.state.toTimeWen +' - ' +this.state.toTimeWen};
      var Thr = {'Thrusday' : this.state.toTimeThr +' - ' +this.state.toTimeThr};
      var Fri = {'Friday' : this.state.toTimeFri +' - ' +this.state.toTimeFri};
      var Sat = {'Saturday' : this.state.toTimeSat +' - ' +this.state.toTimeSat};
      var Sun = {'Sunday' : this.state.toTimeSun +' - ' +this.state.fromTimeSun};

      var schedule = {Mon,Tue};

      console.log("schedule",Mon,Tue,Wen,Thr,Fri,Sat,Sun)
      // return false

      if (this.state.fname==='' || this.state.lname==='' || this.state.email==='' || this.state.number==='') {
        toast.error("Please enter all the fields!");
      }else if (validator.validate(this.state.email)===false) {
        toast.error("Please enter a valid email address!");
      }else if (this.state.number.length!==10) {
        toast.error("Please enter a 10-digit mobile number!");
      }
      else {
          if(this.props.user == null){
            if (this.state.password ==='') {
                toast.error("Please enter password field!");
              }else if (this.state.password!==this.state.confirm_password) {
               toast.error("Both passwords should match!");
             }else{
            this.props.dispatch(createUser({fname: this.state.fname, lname: this.state.lname, email: this.state.email, number: this.state.number, password: this.state.password, user_type: 'doctor', type: 'offline'}));
          }
          }else{
            this.props.dispatch(updateUser({id: this.state.id, fname: this.state.fname, lname: this.state.lname, email: this.state.email, number: this.state.number, password: this.state.password, user_type: 'doctor'}));
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
    // var time = this.state.toMonTime +' - '+ this.state.fromMonTime;
    
    this.setState({[name]: e.target.value})


  }



  toggle = () => {
    this.setState({ title: '', description: '', imgurl: '' })
    this.setState({ modal: !this.state.modal})
  }

  onEdit = (event, id) => {
    event.preventDefault();
    this.props.dispatch(getUser({id: id}));
    this.setState({ modal: true })
  }

  onDelete = (event, id) => {
    event.preventDefault();
    this.props.dispatch(deleteUser({id: id}));
  }

  render() {
    const { users, user } = this.props;
    console.log("userrrrr", users);
    // console.log("userrrrr", this.state);
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
                      </td>
                    </tr>
                  )): 'NO DATA FOUND'}
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Register Doctor</ModalHeader>
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
                  <input className="form-control" id="password"  value={ this.state.password} onChange={(event) => this.onPasswordChange(event)}/>
                </div>
              </Col>
              <Col xl={6}>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm-Password</label>
                  <input className="form-control" id="confirm-password"  value={ this.state.confirm_password} onChange={(event) => this.onConfirmPasswordChange(event)}/>
                </div>
              </Col>
              </> : '' }
              </Row>
              <Row>
                <Col xl={4}>
                  <div className="form-group">
                    <h3>Monday</h3>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeMon" name="toTimeMon"  value={ this.state.toTimeMon} onChange={(event) => this.onNameChangeFun(event,'toTimeMon')}/>

                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="fromTimeMon" name="fromTimeMon"  value={ this.state.fromTimeMon} onChange={(event) => this.onNameChangeFun(event,'fromTimeMon')}/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl={4}>
                  <div className="form-group">
                    <h3>Tuesday</h3>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeTue" name="toTimeTue"  value={ this.state.toTimeTue} onChange={(event) => this.onNameChangeFun(event,'toTimeTue')}/>

                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="fromTimeMon" name="fromTimeMon"  value={ this.state.fromMonTime} onChange={(event) => this.onNameChangeFun(event,'fromTimeMon')}/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl={4}>
                  <div className="form-group">
                    <h3>Wensday</h3>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeWen" name="toTimeWen"  value={ this.state.toTimeWen} onChange={(event) => this.onNameChangeFun(event,'toTimeWen')}/>

                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="fromTimeWen" name="fromTimeWen"  value={ this.state.fromTimeWen} onChange={(event) => this.onNameChangeFun(event,'fromTimeWen')}/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl={4}>
                  <div className="form-group">
                    <h3>Thrusday</h3>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeThr" name="toTimeThr"  value={ this.state.toTimeThr} onChange={(event) => this.onNameChangeFun(event,'toTimeThr')}/>

                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="fromTimeThr" name="fromTimeThr"  value={ this.state.fromTimeThr} onChange={(event) => this.onNameChangeFun(event,'fromTimeThr')}/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl={4}>
                  <div className="form-group">
                    <h3>Friday</h3>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeFri" name="toTimeFri"  value={ this.state.toTimeFri} onChange={(event) => this.onNameChangeFun(event,'toTimeFri')}/>

                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="fromTimeFri" name="fromTimeFri"  value={ this.state.fromTimeFri} onChange={(event) => this.onNameChangeFun(event,'fromTimeFri')}/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl={4}>
                  <div className="form-group">
                    <h3>Saturday</h3>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeSat" name="toTimeSat"  value={ this.state.toTimeSat} onChange={(event) => this.onNameChangeFun(event,'toTimeSat')}/>

                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="fromTimeSat" name="fromTimeSat"  value={ this.state.fromTimeSat} onChange={(event) => this.onNameChangeFun(event,'fromTimeSat')}/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl={4}>
                  <div className="form-group">
                    <h3>Sunday</h3>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="toTimeSun" name="toTimeSun"  value={ this.state.toTimeSun} onChange={(event) => this.onNameChangeFun(event,'toTimeSun')}/>

                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form-group">
                    <input type="time" className="form-control" id="fromTimeSun" name="fromTimeSun"  value={ this.state.fromTimeSun} onChange={(event) => this.onNameChangeFun(event,'fromTimeSun')}/>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(event) => this.createUser(event)}>Create</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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
