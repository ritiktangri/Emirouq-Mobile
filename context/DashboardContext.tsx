/* eslint-disable import/order */
import dayjs from 'dayjs';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  dashboardTradesService,
  getOverallStatsService,
  tagsStatsService,
} from '~/utils/services/dashboard';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useQuery } from './QueryContext';
import { useAuth } from './AuthContext';

dayjs.extend(weekOfYear);
const defaultProvider = {
  data: {} as any,
  loading: true,
  tagsStats: [] as any,
  dashboardTrades: {} as any,
  filters: {} as any,
  selectMonthYear: `${dayjs().format('MM')}-${dayjs().format('YYYY')}`,
  setFilters: () => {},
  getOverallStats: () => {},
  allServices: () => {},
  getWeeksInMonth: () => {},
  setSelectMonthYear: () => {},
};
const DashboardContext = createContext(defaultProvider);
export const useDashboard = () => useContext(DashboardContext);

const DashboardProvider = ({ children }: any) => {
  const [data, setData] = useState(defaultProvider.data);
  const { user } = useAuth();
  const [tagsStats, setTagsStats] = useState([]);
  const [selectPnl, setSelectPnl] = useState('netPnl');
  const [dashboardTrades, setDashboardTrades] = useState({});
  const [loading, setLoading] = useState(defaultProvider.loading);
  const { globalQueries } = useQuery();
  const [selectMonthYear, setSelectMonthYear] = useState(
    `${dayjs().format('MM')}-${dayjs().format('YYYY')}`
  );

  const getOverallStats = async () => {
    const res: any = await getOverallStatsService({
      query: {
        ...globalQueries,
        pnlType: selectPnl,
      },
    });
    setData(res?.data);
  };
  const getTagsStats = async () => {
    const res: any = await tagsStatsService({
      query: {
        ...globalQueries,
        pnlType: selectPnl,
      },
    });
    setTagsStats(res?.data);
  };
  const getDashboardTrades = async () => {
    const res: any = await dashboardTradesService({
      query: {
        ...globalQueries,
        pnlType: selectPnl,
      },
    });
    setDashboardTrades(res?.data);
  };

  const allServices = async () => {
    setLoading(true);
    await Promise.all([getOverallStats(), getTagsStats(), getDashboardTrades()]);
    setLoading(false);
  };
  useEffect(() => {
    if (user?.uuid) allServices();
  }, [globalQueries, user?.uuid, selectPnl]);

  function getWeeksInMonth(month: any, year: any) {
    const adjustedMonth = month - 1;
    const firstDay: any = dayjs().year(year).month(adjustedMonth).startOf('month');
    const lastDay: any = dayjs().year(year).month(adjustedMonth).endOf('month');

    const firstWeek = firstDay.week();
    const lastWeek = lastDay.week();

    let weeksInMonth = 0;

    if (lastWeek < firstWeek) {
      // December edge case
      weeksInMonth = 53 - firstWeek + 1;
    } else {
      weeksInMonth = lastWeek - firstWeek + 1;
    }

    const weeks = [];
    for (let i = 0; i < weeksInMonth; i++) {
      // Adjust week number to start from 0
      weeks.push(firstWeek + i - 1 >= 53 ? 0 : firstWeek + i - 1);
    }

    return weeks;
  }

  const monthRecord: any = useMemo(
    () => data?.weeklyStats?.filter((item: any) => item?.monthYear === selectMonthYear),
    [data?.weeklyStats, selectMonthYear]
  );
  const monthWeeks = useMemo(
    () => getWeeksInMonth(selectMonthYear?.split('-')?.[0], selectMonthYear?.split('-')?.[1]),
    [selectMonthYear]
  );

  const weeksList: any = useMemo(() => {
    return monthWeeks?.map((item: any, index: any) => {
      const data = monthRecord?.find((d: any) => d?.week === item);
      if (!data)
        return {
          id: index + 1,
          week: item,
          pnl: 0,
          trades: 0,
        };
      return {
        id: index + 1,
        week: data?.week,
        pnl: data?.totalPnl,
        trades: data?.totalTrades,
      };
    });
  }, [monthRecord, monthWeeks]);
  const value: any = useMemo(
    () => ({
      data,
      loading,
      tagsStats,
      getOverallStats,
      allServices,
      getWeeksInMonth,
      setSelectMonthYear,
      weeksList,
      selectMonthYear,
      dashboardTrades,
      setSelectPnl,
      selectPnl,
    }),
    [
      data,
      loading,
      getOverallStats,
      allServices,
      tagsStats,
      getWeeksInMonth,
      setSelectMonthYear,
      selectMonthYear,
      dashboardTrades,
      setSelectPnl,
      selectPnl,
    ]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export { DashboardContext, DashboardProvider };
