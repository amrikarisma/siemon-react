import React from 'react'
import { Card, CardBody, Input, Row, Col } from 'reactstrap';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

// Style
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import { Link } from 'react-router-dom';

const columns = [
    {
        dataField: 'nama_notaris',
        text: 'Notaris',
        sort: true,
    },
    {
        dataField: 'total_akta',
        text: 'Akta',
        sort: true,
    },
    {
        dataField: 'total_legalisasi',
        text: 'Legalisasi',
        sort: true,
    },
    {
        dataField: 'total_warmerking',
        text: 'Warmaking',
        sort: true,
    },
    {
        dataField: 'file_name',
        text: 'Laporan',
        sort: false,
        formatter: (rowContent, row) => {
            return (   
                <Link to={row['file_name']} className="btn btn-sm btn-info">
                    Download
                </Link>
            )
          }
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
const LaporanContent = (props) => {
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;
    const records = props.data
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
                                    <ExportCSVButton {...props.csvProps} className="btn btn-primary">
                                        Export CSV
                                    </ExportCSVButton>
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

export default LaporanContent