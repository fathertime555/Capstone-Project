import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Navlink(props) {
    return (
        <Nav.Link
            key={props.routes.path}
            as={NavLink}
            to={props.routes.path}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            end>
            {props.routes.name}
        </Nav.Link>
    )
}

export default Navlink