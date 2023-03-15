import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    useLocation,
    Navigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { StrictMode, useState, useEffect } from "react";
import Navbar from './Navbar'
import Core from './Core'
import Navlink from './Navlink';




/////////////////////////////////////////////////////////////////////

const PageLayout = ({ children }) => children;

const pageVariants = {
    initial: {
        opacity: 0
    },
    in: {
        opacity: 1
    },
    out: {
        opacity: 1
    }
};

const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.5
};

const AnimationLayout = () => {
    const { pathname } = useLocation();
    return (
        <PageLayout>
            <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                variants={pageVariants}
                transition={pageTransition}
            >
                <Outlet />
            </motion.div>
        </PageLayout>
    );
};

export default function Newhome() {
    const [login, setlogin] = useState(false);
    const [pages] = useState(Core.getpages());
    const [user] = useState(Core.getUser())
    const [routes, setroutes] = useState([]);
    const [routess, set_routes] = useState();
    const [nav, setnav] = useState(<></>);

    useEffect(() => {
        setlogin(user.islogin)
    }, [user])

    useEffect(() => {
        var _routes = {};
        Object.keys(pages).forEach(key => {
            _routes[key] = { path: pages[key].path, name: pages[key].name, element: pages[key].page, navlink: <Navlink routes={{ path: pages[key].path, name: pages[key].name }}></Navlink> }
        })
        set_routes(_routes);
    }, [pages])

    useEffect(() => {
        if (routess) {
            setroutes(Object.values(routess).map(val => {
                return <Route key={val.name} path={val.path} element={(val.name === 'Chat' || val.name === 'Account') ? (login ? val.element : <Navigate replace to={'/'} />) : val.element}></Route>
            }))
            setnav(<Navbar router_login={setlogin} routes={routess}></Navbar>)
        }
    }, [routess, login])


    return (<StrictMode>
        <Router>
            {nav}
            <Routes>
                <Route element={<AnimationLayout />}>
                    {routes}
                </Route>
            </Routes>
        </Router>
    </StrictMode>)
}
