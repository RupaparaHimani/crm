import React from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,  Table, Button, Input } from "reactstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import s from "./Dashboard.module.scss";
import Widget from "../../components/Widget";
import stocksImg from "../../images/stocks.svg";
import { fetchTests, fetchPaidTests, createTest, updateTestPdf } from "../../actions/test";
import { fetchOfflineUsers } from "../../actions/user";
import ReactQuill from 'react-quill';
import { toast, ToastContainer } from 'react-toastify';
import FileSaver from 'file-saver';
import Swal from 'sweetalert2';
var validator = require("email-validator");

class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      user: 0,
      test: 0,
      url: '',
      selectedFile: null
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchTests());
    this.props.dispatch(fetchPaidTests());
    this.props.dispatch(fetchOfflineUsers());
  }

  onFileChange = (event, user_id, order_id) => {
    // event.preventDefault()
    console.log(user_id, order_id);
    var selectedFile = event.target.files[0]
    var url = URL.createObjectURL(new Blob([selectedFile] , {type:'application/pdf'}))
    this.setState({ selectedFileURL: url})
    this.props.dispatch(updateTestPdf({user_id: user_id, order_id: order_id, blob: url}));

    console.log(url);


    // FileSaver.saveAs(url, "test_result.pdf");
  }

  createSelectItemsUser = () => {
     let items = [];
     for (let i = 0; i < this.props.users.length; i++) {
        items.push(<option key={this.props.users[i].id} value={this.props.users[i].id} >{this.props.users[i].first_name} {this.props.users[i].last_name}</option>);
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
   onDropdownSelectedUser(e) {
     console.log("THE VAL", e.target.value);
     this.setState({user: e.target.value})
       //here you will see the current selected value of the select input
   }
   onDropdownSelectedTest(e) {
     this.setState({test: e.target.value})
       console.log("THE VAL", e.target.value);
       //here you will see the current selected value of the select input
   }

   createTest = (event) =>
   {
     event.preventDefault();
     this.props.dispatch(createTest({user_id: this.state.user, test_id: this.state.test}));
     this.setState({modal: false})
   }

  // static getDerivedStateFromProps(nextProps, prevState) {
    // if ( nextProps.user != null && nextProps.edit == true && prevState.id != nextProps.user.id ) {
    //   return {
    //     id: nextProps.user.id,
    //     fname: nextProps.user.first_name,
    //     lname: nextProps.user.last_name,
    //     email: nextProps.user.email,
    //     number: nextProps.user.number,
    //   };
    // }
    // return null;
  // }

  get_user_name = (condition) => {
    // console.log(condition);
    let fname = '';
      this.props.users.filter((e) => e.id === condition).map((key, i) => (
        fname = key.first_name + " " + key.last_name
      ))
    return fname
    };

    get_test_name = (condition) => {
      // console.log(condition);
      let name = '';
        this.props.tests.filter((e) => e.id === condition).map((key, i) => (
          name = key.name
        ))
      return name
      };

  toggle = () => {
    this.setState({ title: '', description: '', imgurl: '' })
    this.setState({ modal: !this.state.modal})
  }

  pdf_download = (event, pdf_blob) => {
    event.preventDefault();
    console.log(pdf_blob);
    if(pdf_blob.includes("blob:")){
      FileSaver.saveAs(blob, "test_result.pdf");
    }else{
      var blob = new Blob([pdf_blob], {type: 'application/pdf'});
      FileSaver.saveAs(blob, "test_result.pdf");
    }
  }

  render() {
    console.log(this.state);
    const { tests, paid_tests, users } = this.props;
    console.log("paid_tests", paid_tests);
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
          {paid_tests.length >0 ?
            <Widget
              title={<p style={{ fontWeight: 700 }}>Patients</p>}
            >
              <Table responsive>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th className="hidden-sm-down">UserName</th>
                    <th className="hidden-sm-down">Test</th>
                    <th className="hidden-sm-down">Result</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {paid_tests.map(row => (
                    <tr key={row.id} className={ row.pdf_blob == null ? s.borderRed : ''}>
                      <td>{row.id}</td>
                      <td>
                        {this.get_user_name(row.userID)}
                      </td>
                      <td>
                        {this.get_test_name(row.testID)}
                      </td>
                      <td >
                        {row.pdf_blob != null && row.pdf_blob != "" ? <a onClick={(e) => this.pdf_download(e, row.pdf_blob)}> Download </a> :
                          <>
                            <input type="file" id={row.id} style={{display:'none'}} onChange={(event) => this.onFileChange(event, row.userID, row.id)}/>
                            <label for={row.id} style={{cursor: 'pointer'}}>Upload Result</label>
                          </>
                        }
                      </td>
                      <td>
                        { /* <a onClick={event => this.onEdit(event, row.id)}><img src={require("../../images/edit.png")} width="20" height="25" /></a>
                        <a onClick={event => this.onDelete(event, row.id)}><img src={require("../../images/delete.png")} width="40" height="25"/></a> */}
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
          <ModalHeader toggle={this.toggle}>Create New Test</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="user">User</label>
              <Input type="select" onChange={(e) => this.onDropdownSelectedUser(e)} label="Users">
                  {this.createSelectItemsUser()}
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="test">Test</label>
              <Input type="select" onChange={(e) => this.onDropdownSelectedTest(e)}  label="Tests">
                  {this.createSelectItemsTest()}
              </Input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(event) => this.createTest(event)}>Create</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tests: state.test.tests,
  paid_tests: state.test.paid_tests,
  users: state.auth.offline_users,
});

export default withRouter(connect(mapStateToProps)(Test));
