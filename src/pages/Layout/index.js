import {Outlet} from "react-router-dom";

const Layout = () => {
    return (

        <div>
            这是Layout一级路
            <Outlet/>
        </div>
    )
}
export default Layout