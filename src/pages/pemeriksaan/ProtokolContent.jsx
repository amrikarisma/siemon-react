import React from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Progress, Row } from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import Flatpickr from 'react-flatpickr'
import Api from '../../constants/Api';
import Moment from 'moment';

export class ProtokolContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded : false,
            nama_notaris : '',
            email : '',
            tempat_lahir : '',
            tanggal_lahir : '',
            user : '',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.asyncRequest = Api.get('user').then(
             (res) => {
                console.log(res)
                this.setState({
                    isLoaded : true,
                    user: res.data
                })
            }, 
            (error) => {
                console.log(error)
                this.setState({
                    isLoaded : true,
                    error
                })
                
            }
        )

    }
    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
          console.log('unmounted!')
        }
      }
    handleChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value

        this.setState({
            id : this.state.user.id,
            [name] : value
        })

        Api.put('pemeriksaan', {
            [name] : value
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error);
          });
    }

    render() {

        return (

            <Card>
                <CardBody>
                    <h4 className="header-title mt-0 mb-1">Pemeriksaan Protokol Notaris</h4>
                    <p className="sub-header">Silahkan isi form dibawah ini dengan sebenar-benarnya, guna Pemeriksaan Protokol Notaris Tahun 2020.</p>
    
                    <Wizard
                        render={({ step, steps }) => (
                            <React.Fragment>
                                <Progress
                                    animated
                                    striped
                                    color="success"
                                    value={((steps.indexOf(step) + 1) / steps.length) * 100}
                                    className="mb-3 progress-sm"
                                />
    
                                <Steps>
                                    <Step
                                        id="data_pribadi"
                                        render={({ next }) => (
                                            <Form>
                                                <FormGroup row>
                                                    <Label for="nama_notaris" md={3}>
                                                        Nama Notaris
                                                    </Label>
                                                    <Col md={9}>
                                                        <Input
                                                            type="text"
                                                            name="nama_notaris"
                                                            id="nama_notaris"
                                                            placeholder="Masukan Nama"
                                                            value={this.state.user.nama_notaris ? this.state.user.nama_notaris : ''}
                                                            onChange={this.handleChange}
                                                        />
                                                        
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="email" md={3}>
                                                        Email
                                                    </Label>
                                                    <Col md={9}>
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            placeholder="enter email"
                                                            value={this.state.user.email ? this.state.user.email : ''}
                                                            onChange={this.handleChange}

                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="tempat_lahir" md={3}>
                                                        Tempat/Tanggal Lahir
                                                    </Label>
                                                    <Col md={3}>
                                                        <Input
                                                            type="text"
                                                            name="tempat_lahir"
                                                            id="tempat_lahir"
                                                            placeholder="Masukan Tempat Lahir"
                                                            value={this.state.user.tempat_lahir ? this.state.user.tempat_lahir : ''}
                                                            onChange={this.handleChange}

                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Flatpickr 
                                                            className="form-control" 
                                                            options={{
                                                                enableTime: false,
                                                                altInput: true, 
                                                                altFormat: "F j, Y",
                                                                dateFormat: "Y-m-d",
                                                            }}
                                                            value={this.state.user.tanggal_lahir ? this.state.user.tanggal_lahir : ''}
                                                            onChange={(date) => {
                                                                this.handleChangeDate({
                                                                    name : 'tanggal_lahir',
                                                                    value : Moment(date[0]).format('YYYY-MM-DD')
                                                                })
                                                              }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="alamat_kantor" md={3}>
                                                        Alamat Rumah Notaris
                                                    </Label>
                                                    <Col md={9}>
                                                        <Input
                                                            type="textarea"
                                                            name="alamat_rumah"
                                                            id="alamat_rumah"
                                                            rows="5"
                                                            placeholder="Alamat rumah"
                                                            value={this.state.alamat_rumah ? this.state.alamat_rumah : ''}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="no_telepon_notaris" md={3}>
                                                        No. Telepon Rumah
                                                    </Label>
                                                    <Col md={9}>
                                                        <Input
                                                            type="text"
                                                            name="no_telepon_notaris"
                                                            id="no_telepon_notaris"
                                                            placeholder="No telepon"
                                                            value={this.state.no_telepon_notaris ? this.state.no_telepon_notaris : ''}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <ul className="list-inline wizard mb-0">
                                                    <li className="next list-inline-item float-right">
                                                        <Button onClick={next} color="success">
                                                            Lanjut
                                                        </Button>
                                                    </li>
                                                </ul>
                                            </Form>
                                        )}
                                    />
    
                                    <Step
                                        id="selesai"
                                        render={({ previous }) => (
                                            <Row>
                                                <Col sm={12}>
                                                    <div className="text-center">
                                                        <h2 className="mt-0">
                                                            <i className="mdi mdi-check-all"></i>
                                                        </h2>
                                                        <h3 className="mt-0">Selesai !</h3>
    
                                                        <p className="w-75 mb-2 mx-auto">
                                                            Biodata telah diisi hingga akhir. Jika ada data yang perlu diubah silahkan ulangi kembali saat ini atau lain waktu.
                                                        </p>
                                                        <p className="w-75 mb-2 mx-auto">
                                                            Klik <strong>Kirim</strong> untuk menyimpan biodata yang telah diisi.
                                                        </p>
                                                    </div>
                                                </Col>
    
                                                <Col sm={12}>
                                                    <ul className="list-inline wizard mb-0">
                                                        <li className="previous list-inline-item">
                                                            <Button onClick={previous} color="info">
                                                                Kembali
                                                            </Button>
                                                        </li>
    
                                                        <li className="next list-inline-item float-right">
                                                            <Button color="success">Kirim</Button>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        )}
                                    />
                                </Steps>
                            </React.Fragment>
                        )}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default ProtokolContent
