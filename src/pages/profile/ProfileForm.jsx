import React from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Media, Progress, Row } from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import Flatpickr from 'react-flatpickr'
import Maps from '../../components/sections/Maps';
import Api from '../../constants/Api';
import Select from 'react-select';
import Moment from 'moment';
import Axios from 'axios';


const options = [
    { value: 'Usia 65 Tahun', label: 'Usia 65 Tahun'},
    { value: 'Usia 67 Tahun', label: 'Usia 67 Tahun'},
    { value: 'Mengundurkan Diri', label: 'Mengundurkan Diri'},
    { value: 'Meninggal', label: 'Meninggal'}
  ]

class ProfileForm extends React.Component {
    constructor(props) {
        super(props); // ✅ We passed props
        this.state = {
            foto_notaris: null,
            isLoaded: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelected = this.handleChangeSelected.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }
    componentDidMount() {
        this._asyncRequest =  Api.get("user").then(
            (result) => {
                this._asyncRequest = null;
                this.setState({
                    isLoaded: true,
                    id : result.data.id
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    componentWillUnmount() {
        const CancelToken = Axios.CancelToken;
        const source = CancelToken.source();
        
        Api.get('user', {
          cancelToken: source.token
        }).catch(function (thrown) {
          if (Axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
          } else {
            // handle error
          }
        });

        // cancel the request (the message parameter is optional)
        source.cancel('Operation canceled by the user.');

      }
    handleChangeDate(event) {
        const value = event.value;
        const name = event.name;
        this.setState({
          [name]: value
        });
 
        this._asyncRequest = Api.put(`notaris/`+this.state.id, {
            id : this.state.id,
            [name]: value
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    handleChangeSelected(event) {
        const value = event.value.value;
        const name = event.name;
        this.setState({
          [name]: value
        });
 
        this._asyncRequest = Api.put(`notaris/`+this.state.id, {
            id : this.state.id,
            [name]: value
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    handleImageChange = (event) => {
        this.setState({
            foto_notaris : URL.createObjectURL(event.target.files[0])
          });
          let form_data = new FormData();
          form_data.append(
              'foto', 
              event.target.files[0], 
              event.target.files[0].name
              );
            form_data.append('_method','PUT');
            form_data.append('id',this.state.id);

            console.log(...form_data)

          Api.post('notaris/'+this.state.id, form_data).then(res => {
          
              console.log('res: ', res);
          })
          .catch(err => console.log('errer:', err))

    }

    
    handleUploadImage = () => {
        console.log(this.state.image)
        if(this.state.image){
            let form_data = new FormData();
            form_data.append(
                'image', 
                this.state.image, 
                this.state.image.name
                );
            Api.post('notaris', form_data, {
                headers: {
                  'content-type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        this._asyncRequest = Api.put(`notaris/`+this.state.id, {
        id : this.state.id,
            [name]: value
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const styles = {
            height: {
              height:'300px',
            },
          }

        return (
            <Card>
                <CardBody>
                    <h4 className="header-title mt-0 mb-1">Biodata Profil Notaris</h4>
                    <p className="sub-header">Silahkan isi biodata Notaris sebenar-benarnya.</p>
    
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
                                                    <Label for="profile_image" md={3}>
                                                        Foto Profil
                                                    </Label>
                                                    <Col md={9}>
                                                        <Input
                                                            type="file"
                                                            name="profile_image"
                                                            id="profile_image"
                                                            // value={this.state.foto_notaris ? this.state.foto_notaris : this.props.user.foto_notaris}
                                                            onChange={this.handleImageChange}
                                                        />

                                                        <Media height={100} src={this.state.foto_notaris} alt="Generic placeholder image" />
                                                     
                                                   
                                                    </Col>
                                                </FormGroup>
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
                                                            value={this.state.nama_notaris ? this.state.nama_notaris : this.props.user.nama_notaris}
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
                                                            value={this.state.email ? this.state.email : this.props.user.email}
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
                                                            value={this.state.tempat_lahir ? this.state.tempat_lahir : this.props.user.tempat_lahir}
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
                                                            value={this.state.tanggal_lahir ? this.state.tanggal_lahir : this.props.user.tanggal_lahir}
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
                                                            value={this.state.alamat_rumah ? this.state.alamat_rumah : this.props.user.alamat_rumah}
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
                                                            value={this.state.no_telepon_notaris ? this.state.no_telepon_notaris : this.props.user.no_telepon_notaris}
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
                                        id="data_kantor"
                                        render={({ next, previous }) => (
                                            <Form>
                                                <FormGroup row>
                                                    <Label for="alamat_kantor" md={3}>
                                                        Alamat Kantor Notaris
                                                    </Label>
                                                    <Col md={9}>
                                                        <Input
                                                            type="textarea"
                                                            name="alamat_kantor"
                                                            id="alamat_kantor"
                                                            rows="5"
                                                            placeholder="Alamat kantor"
                                                            value={this.state.alamat_kantor ? this.state.alamat_kantor : this.props.user.alamat_kantor}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="maps" md={3}>
                                                    </Label>
                                                    <Col md={9} style={styles.height}>
                                                        <Maps />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="no_telepon_kantor_notaris" md={3}>
                                                        No. Telepon Kantor
                                                    </Label>
                                                    <Col md={9}>
                                                        <Input
                                                            type="text"
                                                            name="no_telepon_kantor_notaris"
                                                            id="no_telepon_kantor_notaris"
                                                            placeholder="No telepon kantor"
                                                            value={this.state.no_telepon_kantor_notaris ? this.state.no_telepon_kantor_notaris : this.props.user.no_telepon_kantor_notaris}
                                                            onChange={this.handleChange}

                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <ul className="list-inline wizard mb-0">
                                                    <li className="previous list-inline-item">
                                                        <Button onClick={previous} color="info">
                                                            Kembali
                                                        </Button>
                                                    </li>
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
                                        id="legal_notaris"
                                        render={({ next, previous }) => (
                                            <Form>
                                               <FormGroup row>
                                                    <Label for="nomor_ijazah_mkn" md={3}>
                                                        No. dan Tanggal Ijazah MKN
                                                    </Label>
                                                    <Col md={5}>
                                                        <Input
                                                            type="text"
                                                            name="nomor_ijazah_mkn"
                                                            id="nomor_ijazah_mkn"
                                                            placeholder="No ijazah MKN"
                                                            value={this.state.nomor_ijazah_mkn ? this.state.nomor_ijazah_mkn : this.props.user.nomor_ijazah_mkn}
                                                            onChange={(date) => 
                                                                {this.handleChangeDate()}
                                                            }

                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Flatpickr 
                                                            className="form-control" 
                                                            options={{
                                                                enableTime: false,
                                                                altInput: true, 
                                                                altFormat: "F j, Y",
                                                                dateFormat: "Y-m-d",
                                                            }}
                                                            name="tanggal_ijazah_mkn"
                                                            value={this.state.tanggal_ijazah_mkn ? this.state.tanggal_ijazah_mkn : this.props.user.tanggal_ijazah_mkn}
                                                            onChange={(date) => {
                                                                this.handleChangeDate({
                                                                    name : 'tanggal_ijazah_mkn',
                                                                    value : Moment(date[0]).format('YYYY-MM-DD')
                                                                })
                                                              }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="bap_sumpah_jabatan" md={3}>
                                                        No. BAP Sumpah Jabatan
                                                    </Label>
                                                    <Col md={9}>
                                                        <Input
                                                            type="text"
                                                            name="bap_sumpah_jabatan"
                                                            id="bap_sumpah_jabatan"
                                                            placeholder="No BAP Sumpah Jabatan"
                                                            value={this.state.bap_sumpah_jabatan ? this.state.bap_sumpah_jabatan : this.props.user.bap_sumpah_jabatan}
                                                            onChange={this.handleChange}

                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="nomor_sk_pengangkatan" md={3}>
                                                        No. dan Tanggal SK Pengangkatan
                                                    </Label>
                                                    <Col md={5}>
                                                        <Input
                                                            type="text"
                                                            name="nomor_sk_pengangkatan"
                                                            id="nomor_sk_pengangkatan"
                                                            placeholder="No SK Pengangkatan"
                                                            value={this.state.nomor_sk_pengangkatan ? this.state.nomor_sk_pengangkatan : this.props.user.nomor_sk_pengangkatan}
                                                            onChange={this.handleChange}

                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Flatpickr 
                                                            className="form-control" 
                                                            options={{
                                                                enableTime: false,
                                                                altInput: true, 
                                                                altFormat: "F j, Y",
                                                                dateFormat: "Y-m-d",
                                                            }}
                                                            name="tanggal_sk_pengangkatan"
                                                            value={this.state.tanggal_sk_pengangkatan ? this.state.tanggal_sk_pengangkatan : this.props.user.tanggal_sk_pengangkatan}
                                                            onChange={(date) => {
                                                                this.handleChangeDate({
                                                                    name : 'tanggal_sk_pengangkatan',
                                                                    value : Moment(date[0]).format('YYYY-MM-DD')
                                                                })
                                                              }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="nomor_sk_penunjukan" md={3}>
                                                        No. dan Tanggal SK Penunjukan
                                                    </Label>
                                                    <Col md={5}>
                                                        <Input
                                                            type="text"
                                                            name="nomor_sk_penunjukan"
                                                            id="nomor_sk_penunjukan"
                                                            placeholder="No SK Penunjukan"
                                                            value={this.state.nomor_sk_penunjukan ? this.state.nomor_sk_penunjukan : this.props.user.nomor_sk_penunjukan}
                                                            onChange={this.handleChange}

                                                        />
                                                    </Col>

                                                    <Col md={4}>
                                                        <Flatpickr 
                                                            className="form-control" 
                                                            options={{
                                                                enableTime: false,
                                                                altInput: true, 
                                                                altFormat: "F j, Y",
                                                                dateFormat: "Y-m-d",
                                                            }}
                                                            name="tanggal_sk_penunjukan"
                                                            value={this.state.tanggal_sk_penunjukan ? this.state.tanggal_sk_penunjukan : this.props.user.tanggal_sk_penunjukan}
                                                            onChange={(date) => {
                                                                this.handleChangeDate({
                                                                    name : 'tanggal_sk_penunjukan',
                                                                    value : Moment(date[0]).format('YYYY-MM-DD')
                                                                })
                                                              }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="pemegang_protokol_sk_penunjukan" md={3}>
                                                        Pemegang Protokol Penunjukan
                                                    </Label>
                                                    <Col md={9}>
                                                        <Input
                                                            type="text"
                                                            name="pemegang_protokol_sk_penunjukan"
                                                            id="pemegang_protokol_sk_penunjukan"
                                                            placeholder="Pemegang Protokol"
                                                            value={this.state.pemegang_protokol_sk_penunjukan ? this.state.pemegang_protokol_sk_penunjukan : this.props.user.pemegang_protokol_sk_penunjukan}
                                                            onChange={this.handleChange}

                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <ul className="list-inline wizard mb-0">
                                                    <li className="previous list-inline-item">
                                                        <Button onClick={previous} color="info">
                                                            Kembali
                                                        </Button>
                                                    </li>
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
                                        id="no_dan_tanggal_sk"
                                        render={({ next, previous }) => (
                                            <Form>
                                                <FormGroup row>
                                                <Label for="nomor_sk_pindah" md={3}>
                                                    No. dan Tanggal SK Pindah
                                                </Label>
                                                <Col md={5}>
                                                    <Input
                                                        type="text"
                                                        name="nomor_sk_pindah"
                                                        id="nomor_sk_pindah"
                                                        placeholder="No SK Pindah"
                                                        value={this.state.nomor_sk_pindah ? this.state.nomor_sk_pindah : this.props.user.nomor_sk_pindah}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>

                                                <Col md={4}>
                                                    <Flatpickr 
                                                        className="form-control" 
                                                        options={{
                                                            enableTime: false,
                                                            altInput: true, 
                                                            altFormat: "F j, Y",
                                                            dateFormat: "Y-m-d",
                                                        }}
                                                        name="tanggal_sk_pindah"
                                                        value={this.state.tanggal_sk_pindah ? this.state.tanggal_sk_pindah : this.props.user.tanggal_sk_pindah}
                                                        onChange={(date) => {
                                                            this.handleChangeDate({
                                                                name : 'tanggal_sk_pindah',
                                                                value : Moment(date[0]).format('YYYY-MM-DD')
                                                            })
                                                          }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="wilayah_sebelum_pindah" md={3}>
                                                    Wilayah Sebelum Pindah
                                                </Label>
                                                <Col md={9}>
                                                    <Input
                                                        type="text"
                                                        name="wilayah_sebelum_pindah"
                                                        id="wilayah_sebelum_pindah"
                                                        placeholder="Wilayah sebelum pindah"
                                                        value={this.state.wilayah_sebelum_pindah ? this.state.wilayah_sebelum_pindah : this.props.user.wilayah_sebelum_pindah}
                                                        onChange={this.handleChange}

                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="nomor_sk_perpanjangan_jabatan" md={3}>
                                                    No. dan Tanggal SK Perpanjangan
                                                </Label>
                                                <Col md={5}>
                                                    <Input
                                                        type="text"
                                                        name="nomor_sk_perpanjangan_jabatan"
                                                        id="nomor_sk_perpanjangan_jabatan"
                                                        placeholder="No SK Perpanjangan"
                                                        value={this.state.nomor_sk_perpanjangan_jabatan ? this.state.nomor_sk_perpanjangan_jabatan : this.props.user.nomor_sk_perpanjangan_jabatan}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>

                                                <Col md={4}>
                                                    <Flatpickr 
                                                        className="form-control" 
                                                        options={{
                                                            enableTime: false,
                                                            altInput: true, 
                                                            altFormat: "F j, Y",
                                                            dateFormat: "Y-m-d",
                                                        }}
                                                        name="tanggal_sk_perpanjangan_jabatan"
                                                        value={this.state.tanggal_sk_perpanjangan_jabatan ? this.state.tanggal_sk_perpanjangan_jabatan : this.props.user.tanggal_sk_perpanjangan_jabatan}
                                                        onChange={(date) => {
                                                            this.handleChangeDate({
                                                                name : 'tanggal_sk_perpanjangan_jabatan',
                                                                value : Moment(date[0]).format('YYYY-MM-DD')
                                                            })
                                                          }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="nomor_sk_pemberhentian" md={3}>
                                                    No. dan Tanggal SK Perpanjangan
                                                </Label>
                                                <Col md={5}>
                                                    <Input
                                                        type="text"
                                                        name="nomor_sk_pemberhentian"
                                                        id="nomor_sk_pemberhentian"
                                                        placeholder="No SK Pemberhentian"
                                                        value={this.state.nomor_sk_pemberhentian ? this.state.nomor_sk_pemberhentian : this.props.user.nomor_sk_pemberhentian}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>

                                                <Col md={4}>
                                                    <Flatpickr 
                                                        className="form-control" 
                                                        options={{
                                                            enableTime: false,
                                                            altInput: true, 
                                                            altFormat: "F j, Y",
                                                            dateFormat: "Y-m-d",
                                                        }}
                                                        name="tanggal_sk_pemberhentian"
                                                        value={this.state.tanggal_sk_pemberhentian ? this.state.tanggal_sk_pemberhentian : this.props.user.tanggal_sk_pemberhentian}
                                                        onChange={(date) => {
                                                            this.handleChangeDate({
                                                                name : 'tanggal_sk_pemberhentian',
                                                                value : Moment(date[0]).format('YYYY-MM-DD')
                                                            })
                                                          }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="keterangan_pemberhentian" md={3}>
                                                    Keterangan Pemberhentian
                                                </Label>
                                                <Col md={9}>
                                                    <Select 
                                                    name="keterangan_pemberhentian"
                                                    options={options} 
                                                    value={this.state.keterangan_pemberhentian ? this.state.keterangan_pemberhentian : this.props.user.keterangan_pemberhentian}
                                                    onChange={(value) => {
                                                        this.handleChangeSelected({
                                                            name    : 'keterangan_pemberhentian',
                                                            value   :  value
                                                        })
                                                    }}
                                                    />
                                         
                                                </Col>
                                            </FormGroup>
                                            <ul className="list-inline wizard mb-0">
                                                <li className="previous list-inline-item">
                                                    <Button onClick={previous} color="info">
                                                        Kembali
                                                    </Button>
                                                </li>
                                                <li className="next list-inline-item float-right">
                                                    <Button onClick={next} color="success">
                                                        Lanjut
                                                    </Button>
                                                </li>
                                            </ul>
                                        </Form>
                                        )} />
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

export default ProfileForm
