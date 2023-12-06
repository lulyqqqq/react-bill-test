import {Outlet} from "react-router-dom";
import {Button} from "antd-mobile";

const Layout = () => {
    return (

        <div>
            这是Layout一级路由
            {/*测试全局样式*/}
            <Button color="primary">测试全局</Button>
            <div className="purple">
                <Button color="primary">测试局部</Button>
            </div>
            <Outlet/>
        </div>
    )
}
export default Layout