import {NavBar, DatePicker} from 'antd-mobile'
import './index.scss'
import {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from 'lodash'

const Month = () => {
    // 按月分组
    const billList = useSelector(state => state.bill.billList)
    /**
     * 使用useMemo,可以缓存函数执行的结果,通过返回值返回出去,当依赖函数改变useMemo会重新执行
     *
     */
        // map对象,月份作为key,数据是value
    const monthGroup = useMemo(() => {

            console.log("执行了")
            return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
        }, [billList])
    console.log(monthGroup)

    // 控制日期选择框的打开和关闭
    const [dateVisible, setDateVisible] = useState(false)
    // 控制时间显示
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY-MM')
    })

    // debug 监听dateVisible值,方便查看数据
    /**
     * 知识补充：
     * console.log 是同步函数
     * 在jsx内核中,默认先执行组件中的全部同步函数,再执行异步函数,而useState是异步函数,无法同情况监听
     * 需要展示useState中的数据可以使用useEffect动态同步监听
     */
    useEffect(() => {
        console.log(dateVisible)
    }, [dateVisible]);

    // 存放当前选择月份的数据内容
    const [currentMonthList, setCurrentMonthList] = useState([])

    const monthResult = useMemo(() => {
        const pay = currentMonthList.filter(item => item.type === "pay").reduce((a, c) => a + c.money, 0)
        const income = currentMonthList.filter(item => item.type === "income").reduce((a, c) => a + c.money, 0)
        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentMonthList]);
    // 确认回调
    const onConfirm = (date) => {
        setDateVisible(false)
        console.log(date)
        const dateFormat = dayjs(date).format('YYYY-MM')
        console.log(dateFormat)
        // monthGroup是一个map数组,直接使用数组获取数据形式就可以得到内容
        setCurrentMonthList(monthGroup[dateFormat])
        setCurrentDate(dateFormat)
    }
    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                            {currentDate + ''}月账单
                        </span>
                        {/*箭头控制,根据类名控制箭头朝向*/}
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        onCancel={() => setDateVisible(false)}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisible(false)}
                        max={new Date()}
                    />
                </div>
            </div>
        </div>
    )
}

export default Month