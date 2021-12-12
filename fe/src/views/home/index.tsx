import React, { useEffect, useState } from 'react';
import { Pull, Cell, Toast, ActivityIndicator } from 'zarm';
import { get } from '@/service';
import { ResultProps } from '@/constants';
import Header from './components/Header';
import BillItem from './components/BillItem';
import { REFRESH_STATE, LOAD_STATE } from './config';
import { RefreshState, WheelValue, BillItemProps, BillList } from './constants';
import './index.less';

const Home = () => {
  /** 账单列表 */
  const [billList, setBillList] = useState<{
    date: string;
    bills: BillItemProps[];
  }>({
    bills: [],
    date: '2021-11',
  });
  /** 月份 总支出/总收入 */
  const [total, setTotal] = useState<{
    totalExpense: number;
    totalIncome: number;
  }>({ totalExpense: 0, totalIncome: 0 });

  /** 下拉刷新状态 */
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
  /** 上拉加载状态 */
  const [loading, setLoading] = useState(LOAD_STATE.normal);

  const [currentType, setCurrentType] = useState<number | string>('all')
  const [currentDate, setCurrentDate] = useState<string>('2021-11')
  useEffect(() => {
    refreshData();
  }, [currentType, currentDate]);

  /** 选择类型及时间时 触发列表查询请求 */
  const handleSearch = (type: number | string, date: string) => {
    console.log(type, date)
    setCurrentType(type)
    setCurrentDate(date)
  }

  // 下拉刷新数据
  const refreshData = async () => {
    setRefreshing(REFRESH_STATE.loading);
    const result: ResultProps = await get(`/api/bill/list?date=${currentDate}&type_id=${currentType}`);
    const {
      list = [] as BillItemProps[],
      totalExpense = 0,
      totalIncome = 0,
    } = result.data;
    console.log(result, list, 'data');
    setBillList({ ...billList, bills: list });
    setTotal({ totalExpense, totalIncome });
    setRefreshing(REFRESH_STATE.success);
  };

  // 加载更多数据
  const loadData = () => {
    setLoading(LOAD_STATE.loading);
    setTimeout(() => {
      const newList = [...billList.bills];
      new Array(5).fill('').forEach((i, idx) => {
        const item: BillItemProps = {
          amount: '25.00',
          date: '1623390740000',
          id: newList.length + idx,
          pay_type: 1,
          remark: '',
          type_id: 1,
          type_name: '餐饮' + Math.random().toString(36).slice(4),
        };
        newList.push(item);
      });
      setBillList({ ...billList, bills: newList });
      setLoading(LOAD_STATE.success);
    }, 1000);
  };

  return (
    <div className="home-container">
      <Header total={total} onSelected={handleSearch} />
      <div className="home-container__list">
        <Pull
          refresh={{
            state: refreshing,
            handler: refreshData as () => void,
            render: (refreshState: string | number, percent: number) => {
              const cls = 'custom-control';
              switch (refreshState) {
                case REFRESH_STATE.pull:
                  return (
                    <div className={cls}>
                      <ActivityIndicator loading={false} percent={percent} />
                      <span>下拉刷新</span>
                    </div>
                  );

                case REFRESH_STATE.drop:
                  return (
                    <div className={cls}>
                      <ActivityIndicator loading={false} percent={100} />
                      <span>释放立即刷新</span>
                    </div>
                  );

                case REFRESH_STATE.loading:
                  return (
                    <div className={cls}>
                      <ActivityIndicator type="spinner" />
                      <span>加载中</span>
                    </div>
                  );

                case REFRESH_STATE.success:
                  return (
                    <div className={cls}>
                      {/* <Icon type="right-round" theme="success" /> */}
                      <span>加载成功</span>
                    </div>
                  );

                case REFRESH_STATE.failure:
                  return (
                    <div className={cls}>
                      {/* <Icon type="wrong-round" theme="danger" /> */}
                      <span>加载失败</span>
                    </div>
                  );

                default:
              }
            },
          }}
          load={{
            state: loading,
            distance: 200,
            handler: loadData,
            render: (loadState: WheelValue) => {
              const cls = 'custom-control';
              switch (loadState) {
                case LOAD_STATE.loading:
                  return (
                    <div className={cls}>
                      <ActivityIndicator type="spinner" />
                    </div>
                  );

                case LOAD_STATE.failure:
                  return <div className={cls}>加载失败</div>;

                case LOAD_STATE.complete:
                  return <div className={cls}>我是有底线的</div>;
              }
            },
          }}
        >
          {(billList.bills || [])?.map((item: any, idx: number) => {
            return (
              <div key={idx} className="bills-item">
                <div className="bills-date">{item.date || ''}</div>
                {item?.bills?.map((i: BillItemProps, d: number) => (
                  <BillItem key={d} item={i} />
                ))}
              </div>
            );
          })}
        </Pull>
      </div>
    </div>
  );
};

export default Home;
