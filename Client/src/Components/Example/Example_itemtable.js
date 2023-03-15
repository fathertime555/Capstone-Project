import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react'

export default function ItemTable(prop) {
    const [props, setprops] = useState(prop);
    useEffect(() => {
        setprops(prop)
    }, [prop])

    return (props.data.length > 0) ?

        <Table striped bordered hover>
            <thead>
                <tr>
                    {Object.keys(props.data[0].table).map(val => {
                        return <th key={val}>{val}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {props.data.map(val => {
                    return <tr key={val.itid} onClick={() => props.setitem(val)}>
                        {Object.values(val.table).map((value, index) => (
                            <td key={index + val.itid}>{value}</td>
                        ))}
                    </tr>
                })}
            </tbody>
        </Table> : <></>

}