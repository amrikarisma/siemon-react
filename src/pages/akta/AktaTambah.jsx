import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

export class AktaTambah extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({value: event.target.value});
    }
    handleSubmit = (event) => {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="header-title mt-0">Tambah Akta</h4>    
                        <Row>
                            <Col lg={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label for="nomor_jurnal">Nomor Jurnal</Label>
                                        <Input type="number" min="0" name="nomor_jurnal" id="nomor_jurnal" placeholder="Nomor Jurnal"
                                        onChange={this.handleChange } />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="nomor_akta">Nomor Akta</Label>
                                        <Input type="number" min="0" name="nomor_akta" id="nomor_akta" placeholder="Nomor Akta" 
                                        onChange={this.handleChange } />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="jenis_akta">Sifat Akta</Label>
                                        <Input type="text" name="jenis_akta" id="jenis_akta" placeholder="Sifat Akta" 
                                        onChange={this.handleChange } />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="tanggal_akta">Tanggal Akta</Label>
                                        <Flatpickr value={new Date()} options={{enableTime: false}}
                                            onChange={date => { console.log(date) }}
                                            className="form-control" 
                                            name="tanggal_akta" id="tanggal_akta" 
                                            />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="penghadap">Jam Akta</Label>
                                        <Flatpickr value={new Date()}  options={{enableTime: true, noCalendar: true, dateFormat: "H:i",  time_24hr: true}}
                                                onChange={date => { console.log(date) }}
                                                className="form-control" 
                                                name="jam_akta" id="jam_akta" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="penghadap">Penghadap</Label>
                                        <Input type="datetime" name="penghadap" id="penghadap" placeholder="Penghadap"
                                        onChange={this.handleChange } />
                                    </FormGroup>
                                    <Button color="primary" type="submit">
                                        Tambah
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}

export default AktaTambah