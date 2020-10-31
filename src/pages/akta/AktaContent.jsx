import React, { useState } from 'react'
import { Card, CardBody, Input, Row, Col, Button, Form, FormGroup, Label } from 'reactstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

// Style
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import { Link } from 'react-router-dom';
const columns = [
    {
        dataField: 'nama_notaris',
        text: 'Name',
        sort: true,
    },
    {
        dataField: 'nomor_jurnal',
        text: 'No. Urut',
        sort: true,
    },
    {
        dataField: 'nomor_akta',
        text: 'No. Akta',
        sort: false,
    },
    {
        dataField: 'jenis_akta',
        text: 'Sifat Akta',
        sort: false,
    },
    {
        dataField: 'tanggal_akta',
        text: 'Tanggal',
        sort: false,
    },
    {
        dataField: 'jam_akta',
        text: 'Jam',
        sort: false,
    },
];

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];

const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
    <React.Fragment>
        <label className="d-inline mr-1">Show</label>
        <Input type="select" name="select" id="no-entries" className="custom-select custom-select-sm d-inline col-1"
            defaultValue={currSizePerPage}
            onChange={(e) => onSizePerPageChange(e.target.value)}>
            {options.map((option, idx) => {
                return <option key={idx}>{option.text}</option>
            })}
        </Input>
        <label className="d-inline ml-1">entries</label>
    </React.Fragment>
);



const AktaContent = (props) => {
    const { SearchBar } = Search;
    const records = props.data;
        return (
            <Card>
                <CardBody>
                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={records}
                        columns={columns}
                        search
                        exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                        {props => (
                            <React.Fragment>
                                <Row>
                                    <Col>
                                        <SearchBar {...props.searchProps} />
                                    </Col>
                                 
                                    <Col className="text-right">
                                            <Col>
                                           
                                                <Link to="akta/tambah" className="btn btn-md btn-success">
                                                    Tambah Akta Notaris
                                                </Link>
                                            </Col>
                                  
                                    </Col>
                                </Row>
    
                                <BootstrapTable
                                    {...props.baseProps}
                                    bordered={false}
                                    defaultSorted={defaultSorted}
                                    pagination={paginationFactory({ sizePerPage: 10, sizePerPageRenderer: sizePerPageRenderer, sizePerPageList: [{ text: '10', value: 10, }, { text: '50', value: 50 }, { text: '100', value: 100 }, { text: 'All', value: records.length }] })}
                                    wrapperClasses="table-responsive"
                                />
                            </React.Fragment>
                        )}
                    </ToolkitProvider>
                </CardBody>
            </Card>
        );
 

};

export default AktaContent