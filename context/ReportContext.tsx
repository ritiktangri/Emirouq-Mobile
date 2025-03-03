/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { useQuery } from './QueryContext';
import {
  dayReportsService,
  daysTillExpirationService,
  getTagsReport,
  instrumentReportService,
  monthReportsService,
  positionSizeService,
  priceReportService,
  reportSummaryService,
  rMultipleService,
  tagsReportService,
  volumeReportService,
  weekReportsService,
  winLossReportService,
} from '~/utils/services/report';
import { useGlobalSearchParams } from 'expo-router';
import { getCategoryWithTagsService } from '~/utils/services/category';

const defaultProvider = {
  trades: {},
  setTrades: () => {},
  loading: '',
};
const ReportContext = createContext(defaultProvider);
export const useReport = () => useContext(ReportContext);

const ReportProvider = ({ children }: any) => {
  const [reports, setReports] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [tagsReport, setTagsReport] = useState({} as any);
  const [chartReport, setChartReport] = useState({
    days: [],
    weeks: [],
    months: [],
    price: [],
    quantity: [],
    instrument: {
      symbolDistribution: [],
      symbolPerformance: [],
      symbolPerformanceLoss: [],
    },
    daysTillExpiration: [],
    rMultiple: [],
    positionSize: [],
    winLoss: [],
    tags: [],
  } as any);
  const [selectPnl, setSelectPnl] = useState('netPnl');
  const [loadingScreens, setLoadingScreens] = useState('');
  const { globalQueries }: any = useQuery();
  const [tags, setTags] = useState([]);
  const state = useGlobalSearchParams();
  const route: any = state.route;
  const getCategories = useCallback(async () => {
    const res: any = await getCategoryWithTagsService();
    setTags(res.data);
  }, []);
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const getDayReport = async (signal: any) => {
    const reportServices = {
      days: dayReportsService,
      weeks: weekReportsService,
      months: monthReportsService,
      price: priceReportService,
      quantity: volumeReportService,
      instrument: instrumentReportService,
      daysTillExpiration: daysTillExpirationService,
      rMultiple: rMultipleService,
      positionSize: positionSizeService,
      winLoss: winLossReportService,
      tags: tagsReportService,
    };
    const isTagRoute = route?.includes('tags');
    const newRoute = isTagRoute ? 'tags' : route;
    if (reportServices.hasOwnProperty(newRoute)) {
      setLoadingScreens(newRoute);
      const service = reportServices[newRoute as keyof typeof reportServices];
      try {
        const res: any = await service({
          query: { ...globalQueries, pnlType: selectPnl },
          ...(signal && { signal }),
          ...(isTagRoute && {
            pathParams: {
              id: route.replace('tags-', ''),
            },
          }),
        });
        setChartReport({
          [route]: res?.data || [],
        });
      } catch (error) {
        console.error(`Error fetching ${route} report:`, error);
      } finally {
        setLoadingScreens('');
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getDayReport(signal);
    return () => {
      controller.abort();
    };
  }, [route, globalQueries, selectPnl]);

  const getReportsSummary = async (signal: any) => {
    setLoading(true);
    const res: any = await reportSummaryService({
      query: {
        ...globalQueries,
        pnlType: selectPnl,
      },
      ...(signal && { signal }),
    });
    setReports(res?.data);
    setLoading(false);
  };
  const getTag = useCallback(async (signal: any) => {
    const res: any = await getTagsReport({
      query: globalQueries,
      ...(signal && { signal }),
    });
    setTagsReport(res?.data);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getReportsSummary(signal);
    getTag(signal);
    // Cleanup function to abort the request if the component unmounts or dependencies change
    return () => {
      controller.abort();
    };
  }, [globalQueries, selectPnl]);
  const value: any = useMemo(
    () => ({
      reports,
      loading,
      getReportsSummary,
      tagsReport,
      setSelectPnl,
      selectPnl,
      chartReport,
      setLoadingScreens,
      loadingScreens,
      tagsList: tags,
    }),
    [
      reports,
      loading,
      getReportsSummary,
      tagsReport,
      setSelectPnl,
      selectPnl,
      chartReport,
      setLoadingScreens,
      loadingScreens,
      tags,
    ]
  );

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};

export { ReportContext, ReportProvider };
