import React from 'react'
import { Card, CardBody, Col, Progress, Row } from 'reactstrap';

const UserBox = (props) => {
    
    return (
        <Card className="">
            <CardBody className="profile-user-box">
                <Row>
                    <Col>
                        <div className="text-center mt-3">
                            <img src={props.user.foto_notaris} alt=""
                                className="avatar-lg rounded-circle" />
                            <h5 className="mt-2 mb-0">{props.user.nama_notaris}</h5>
                            <h6 className="text-muted font-weight-normal mt-2 mb-4">Notaris {props.user.nama_kota_kab}</h6>

                            <Progress className="mb-4" value={60} color="success" style={{ 'height': '14px' }}>
                                <span className="font-size-12 font-weight-bold">Your Profile is <span className="font-size-11">60%</span> completed</span>
                            </Progress>

                        </div>

                        <div className="mt-5 pt-2 border-top">
                            <h4 className="mb-3 font-size-15">Alamat Kantor</h4>
                            <p className="text-muted mb-4">{props.user.alamat_kantor}</p>
                        </div>

                        <div className="mt-3 pt-2 border-top">
                            <h4 className="mb-3 font-size-15">Kotak</h4>
                            <div className="table-responsive">
                                <table className="table table-borderless mb-0 text-muted">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td>{props.user.email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Telepon Kantor</th>
                                            <td>{props.user.no_telepon_kantor_notaris}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Alamat Kantor</th>
                                            <td>{props.user.alamat_kantor}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-top">
                            <h4 className="mb-3 font-size-15">Skills</h4>
                            <label className="badge badge-soft-primary mr-1">UI design</label>
                            <label className="badge badge-soft-primary mr-1">UX</label>
                            <label className="badge badge-soft-primary mr-1">Sketch</label>
                            <label className="badge badge-soft-primary mr-1">Photoshop</label>
                            <label className="badge badge-soft-primary mr-1">Frontend</label>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default UserBox
