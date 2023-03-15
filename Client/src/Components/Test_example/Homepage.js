import { createRef, useState, useEffect } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    useLocation,
    useOutlet,
} from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Container } from 'react-bootstrap'
import Navbar from '../Navbar'
import Staticpage from './StaticPage'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import Core from '../Data';


const pages = Staticpage.pages()


const routes = [
    { path: '/', name: 'Home', element: Core.getitemgrid(), nodeRef: createRef() },
    { path: '/account', name: 'Account', element: pages.account, nodeRef: createRef() },
    { path: '/map', name: 'Map', element: pages.map, nodeRef: createRef() },
    { path: '/chat', name: 'Chat', element: Core.getchatpage(), nodeRef: createRef() }
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <Example />,
        children: routes.map((route) => ({
            index: route.path === '/',
            path: route.path === '/' ? undefined : route.path,
            element: route.element,
        })),
    },
])

function Example() {
    const [pageload, setpageload] = useState(false)
    const location = useLocation()
    const currentOutlet = useOutlet()
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {}


    useEffect(() => {

    })


    return (
        <>
            <Navbar routes={routes}></Navbar>
            <Container className="container">
                <SwitchTransition>
                    <CSSTransition
                        key={location.pathname}
                        nodeRef={nodeRef}
                        timeout={300}
                        classNames="page"
                        unmountOnExit
                    >
                        {(state) => (
                            <div ref={nodeRef} className="page">
                                {currentOutlet}
                            </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </Container>
        </>
    )
}
function HP() {
    return (<RouterProvider router={router} />)
}

export default HP;
