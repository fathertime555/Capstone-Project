import { Table } from 'react-bootstrap';


export default function ItemTable(props) {
    
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
                    return <tr key={val.id} onClick={()=>props.setitem(val)}>
                        {Object.values(val).map((value, index) => (
                            <td  key={index+val.id}>{value}</td>
                        ))}
                    </tr>
                })}
            </tbody>
        </Table>
    )
}