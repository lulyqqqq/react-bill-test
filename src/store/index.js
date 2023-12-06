// 组合子模块, 导出store实列

import billStore from "@/store/modules/billStore";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        bill: billStore
    }
})

export default store