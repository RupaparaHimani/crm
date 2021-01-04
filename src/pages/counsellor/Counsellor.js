import React from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,  Table, Button, Input } from "reactstrap";
import s from "./Tables.modules.scss";
import axios from "axios";
import config from "../../config.js"
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

class Counsellor extends React.Component {
  constructor() {
    super();
    this.state = {
      counsellors: null,
      id : 0,
      modal: false,
      selectedFile : null,
      link : ''
    }
  }

  componentDidMount(){
    // console.log(config.baseURLApi);
    this.getAllCounsellers()

  }

  getAllCounsellers = () => {
    axios.get(config.baseURLApi+'getCounsellors')
    .then(function (response) {
      return response;
    }).then((response) => this.setState({counsellors: response.data.data,link : response.data.link}))
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
    });
  }

  onUpload  = (event, row) => {
    event.preventDefault();
    // this.props.dispatch(getAppoinment({id: row.id}));
    this.setState({
      id : row.id,
      modal: true,
      selectedFile : null
    })
  }

  onChangeHandler=(event)=>{

      if(event.target.files.length > 0 && event.target.files[0].type == 'application/pdf'){
        console.log(event.target.files[0])

        this.setState({selectedFile : event.target.files[0]})
      }
      else{
        toast.error("Please upload only PDF File");
        return
      }


  }

  toggle = () => {
    this.setState({
      id : 0,
      modal: false,
      selectedFile : null
    })
    this.setState({ modal: !this.state.modal})
  }

  UploadData = (event) => {
    event.preventDefault();

    if(this.state.id != 0){
      const data = new FormData()

      data.append('id', this.state.id)
      data.append('file', this.state.selectedFile)
      axios.post(config.baseURLApi+'uploadCounsellorPdf', data, { // receive two parameter endpoint url ,form data
      })
      .then(res => { // then print response status

        this.setState({
          id : 0,
          modal: false,
          selectedFile : null
        })

        Swal.fire({
            icon: 'success',
            type: 'success',
            text: 'Document uploaded successfully!',
            showConfirmButton: true,
            timer: 2000
        });
        this.getAllCounsellers()
        console.log(res)
      })

    }

  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col lg={12}>
            <div className="table-responsive">
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Contact No</th>
                    <th/>
                  </tr>
                </thead>
                {/* eslint-disable */}
                <tbody>
                {this.state.counsellors != null ? this.state.counsellors.map((counsellor) =>
                  <tr>
                    <td>{counsellor.id}</td>
                    <td>{counsellor.first_name}</td>
                    <td>{counsellor.last_name}</td>
                    <td>{counsellor.email}</td>
                    <td>{counsellor.number}</td>
                    <td>
                      {
                        counsellor.pdf_blob !== null && counsellor.pdf_blob != ''
                        ?
                        <a href={this.state.link+counsellor.pdf_blob} target="_blank" ><img src={require("../../images/file-view.png")} width="25" height="25" /></a>
                        :
                        <a onClick={event => this.onUpload(event, counsellor)}><img src={require("../../images/upload_file.png")} width="25" height="25" /></a>
                      }


                    </td>
                  </tr>)
                : ''}
                </tbody>
                {/* eslint-enable */}
              </Table>
            </div>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Upload course document</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="purpose">Become A Counsellor(Course)</label>
              {/* <Input name="purpose" type='number'
              name="purpose"
              value={this.state.purpose}
              onChange={(e) => this.onDropdownSetStateName(e) }
              required
              /> */}
              <Input
                type="file"
                name="file"
                onChange={this.onChangeHandler}
                accept="application/pdf"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(event) => this.UploadData(event)}>Upload</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Counsellor;
