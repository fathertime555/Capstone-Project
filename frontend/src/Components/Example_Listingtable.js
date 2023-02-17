import { Table } from 'react-bootstrap';
import { useState } from 'react'


export default function ListingTable(props) {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {Object.keys(props.data[0]).map(val => {
                        return <th key={val}>{val}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {props.data.map(val => {
                    return <tr key={val.id} onClick={() => props.setlisting(val)}>
                        {Object.values(val).map((value, index) => (
                            <td key={index}>{value}</td>
                        ))}
                    </tr>
                })}
            </tbody>
        </Table>
    )
}