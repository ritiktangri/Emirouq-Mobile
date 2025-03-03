/* eslint-disable import/order */
import { useRef } from 'react';
import { View } from 'react-native';
import { Accordion } from './accordion';
import { DefaultText as Text } from '~/components/common/DefaultText';
const Faqs = () => {
  const accordionRef: any = useRef(null);
  const data: any = [
    {
      _id: '66e0439eb576b182b0b06cdf',
      uuid: 'bab510e4-cf93-4c4b-bd9a-ac87ec2a4193',
      title: 'What is Tradelizer?',
      description:
        'Tradelizer is a tool designed for traders to log, track, and analyze their trades. This software allows users to record essential trade details such as entry and exit points, trade size, and their psychology when the trade is open. It enables tracking of profits and losses, while also calculating key metrics like win rate, risk/reward ratio, and overall performance.\n\nKey features often include:\n\nTrade Log: Record every trade, including dates, tickers, buy/sell prices, position size, and notes.\nRisk/Reward Tracking: Input your planned risk/reward ratio and compare it with actual outcomes.\nProfit & Loss (P&L) Tracking: Automatically calculate profits, losses, and net gains.\nPerformance Metrics: Track detailed statistics such as total return, win rate, average profit/loss, and maximum drawdown.\nTrade Analytics: Visualize trading patterns, trends, and improvements over time through charts and reports.\nRisk Management Tools: Help ensure trades align with your predefined risk parameters (e.g., stop-loss, take-profit).',
      status: true,
      createdAt: '2024-09-10T13:03:26.083Z',
      updatedAt: '2024-12-31T02:37:17.884Z',
      __v: 0,
    },
    {
      _id: '66e043bc0aff2e7904ac735e',
      uuid: 'c3878498-7707-4f61-b564-aadbd08db9a8',
      title: 'Can I use Tradelizer to place Trades?',
      description:
        "No, Tradelizer is not a broker. It is a trading journal software that helps you log, track, and analyze your trades. You can record details like entry/exit points, profit/loss, and risk/reward ratios, but it doesn't execute trades. You'll need a separate broker for trade execution.",
      status: true,
      createdAt: '2024-09-10T13:03:56.794Z',
      updatedAt: '2024-12-31T03:14:37.640Z',
      __v: 0,
    },
    {
      _id: '66e043e4b576b182b0b06ce8',
      uuid: '17d5bd63-49c1-4d5e-b642-0540b7ff8677',
      title: 'How can I cancel my subscription?',
      description:
        "To cancel your subscription, log in to your Tradelizer account and navigate to the settings or subscription section. There, you should find an option to cancel your subscription. Follow the provided instructions to complete the cancellation process. If you encounter any issues, you can also reach out to Tradelizer's customer support for assistance.",
      status: true,
      createdAt: '2024-09-10T13:04:36.857Z',
      updatedAt: '2024-09-10T13:04:36.857Z',
      __v: 0,
    },
    {
      _id: '66e044040aff2e7904ac7374',
      uuid: 'd611f631-423d-41cb-93f1-9b7d37c726fb',
      title: 'How can I change my plan to annual?',
      description:
        "To change your plan to an annual subscription, log in to your Tradelizer account and navigate to the subscription or billing section. Look for an option to change your subscription plan. Select the annual plan option and follow the prompts to complete the process. If you don't see an option to switch to an annual plan, you can reach out to Tradelizer's customer support for assistance.",
      status: true,
      createdAt: '2024-09-10T13:05:08.249Z',
      updatedAt: '2024-09-10T13:05:08.249Z',
      __v: 0,
    },
    {
      _id: '66e04419b576b182b0b06d05',
      uuid: '89cb54e8-6c4a-44b6-8ea8-d95177d66c35',
      title: 'Which brokers are supported?',
      description:
        'We support Interactive Brokers, QuesTrade, WealthSimple, Kraken, Fidelity, Coinbase, WebullUS, Zerodha, and Robinhood.',
      status: true,
      createdAt: '2024-09-10T13:05:29.614Z',
      updatedAt: '2024-10-03T19:26:05.735Z',
      __v: 0,
    },
    {
      _id: '66e044330aff2e7904ac73a2',
      uuid: '008456a1-1a44-4b80-b3d1-e538df532256',
      title: 'Testing Faq',
      description: 'For testing purpose',
      status: false,
      createdAt: '2024-09-10T13:05:55.471Z',
      updatedAt: '2024-09-21T13:44:14.382Z',
      __v: 0,
    },
    {
      _id: '67735e6317e641617b4218e2',
      uuid: 'e5472352-2b69-493b-a5a8-1303208120cd',
      title: 'Can I integrate my brokerage account with Tradelizer?',
      description:
        'Yes, Tradelizer supports integration with brokerage accounts in several ways. We offer automatic trade imports from select brokers, along with options for uploading trades via CSV files or entering them manually. This provides flexibility in how you can add your trades to the system based on your broker and preferences. If you need assistance with a specific broker, feel free to reach out, and we can help you explore the best option for your situation.',
      status: true,
      createdAt: '2024-12-31T03:00:51.664Z',
      updatedAt: '2024-12-31T03:00:51.664Z',
      __v: 0,
    },
    {
      _id: '67735f0111f4c8792e97035c',
      uuid: '8c161e3c-b5b5-4bb3-bda7-f9c024ebe661',
      title: ' Is Tradelizer suitable for all types of traders?',
      description:
        "Yes, Tradelizer is suitable for all types of traders. It supports a wide range of asset classes, including stocks, options, forex, and more. Whether you're involved in day trading, swing trading, or longer-term investing, the software is designed to accommodate various trading styles and strategies. It offers the flexibility you need to track and manage your trades across different markets and timeframes, helping you make informed decisions no matter what your trading approach is.",
      status: true,
      createdAt: '2024-12-31T03:03:29.425Z',
      updatedAt: '2024-12-31T03:03:29.425Z',
      __v: 0,
    },
    {
      _id: '6773600611f4c8792e97037b',
      uuid: '54aaf7a4-62bd-4146-a29f-8bfe53f42244',
      title: 'Do you offer a free trial or demo?',
      description:
        'Currently, we do not offer a free trial or demo of our software. All sales are final, and we encourage prospective users to carefully review our features and capabilities through the information available on our website. If you have any questions or need further clarification before making a purchase, our support team is happy to assist you and provide additional details to help you make an informed decision.',
      status: true,
      createdAt: '2024-12-31T03:07:50.147Z',
      updatedAt: '2024-12-31T03:07:50.147Z',
      __v: 0,
    },
  ];

  return (
    <View className="mx-4 mt-4 flex-1 gap-y-4">
      {data
        ?.filter((item: any) => item.status)
        ?.map((item: any) => {
          return (
            <Accordion
              key={item._id}
              ref={accordionRef}
              buttonClassName="bg-gray-200 dark:bg-account_table_bg "
              title={
                <View className="flex-1 " style={{}}>
                  <Text className="font-poppinsMedium text-black dark:text-white">
                    {item?.title}
                  </Text>
                </View>
              }>
              <View className="flex-1   bg-white p-4 dark:bg-drawer">
                <Text className="font-poppinsMedium text-sm leading-6 tracking-wide text-black dark:text-white ">
                  {item?.description}
                </Text>
              </View>
            </Accordion>
          );
        })}
    </View>
  );
};

export default Faqs;
