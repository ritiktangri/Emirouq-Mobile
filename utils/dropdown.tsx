/* eslint-disable @typescript-eslint/no-unused-vars */
const dropdowns: any = [
  {
    id: '1',
    heading: 'Select PnL',
    key: 'selectPnl',
    selectedValue: '',
    data: [
      { id: '1', label: 'Net P&L', value: 'netPnl' },
      { id: '2', label: 'Gross P&L', value: 'grossPnl' },
    ],
  },
  {
    id: '2',
    heading: 'Open/Closed',
    key: 'status',
    selectedValue: '',
    data: [
      { id: '1', label: 'Open', value: 'open' },
      { id: '2', label: 'Close', value: 'close' },
    ],
  },
  {
    id: '3',
    heading: 'Trade Type',
    key: 'tradeType',
    selectedValue: '',
    data: [
      { id: '1', label: 'Stocks', value: 'stocks' },
      { id: '2', label: 'Options', value: 'option' },
    ],
  },
  {
    id: '4',
    heading: 'Result',
    key: 'result',
    selectedValue: '',
    data: [
      { id: '1', label: 'Win', value: 'win' },
      { id: '2', label: 'Lose', value: 'lose' },
    ],
  },
  {
    id: '5',
    heading: 'Ticket Type',
    key: 'ticketType',
    selectedValue: '',
    data: [
      { id: '1', label: 'Suggestion', value: 'suggestion' },
      { id: '2', label: 'Feedback', value: 'feedback' },
      { id: '3', label: 'Bug', value: 'bug' },
      { id: '4', label: 'Feature Request', value: 'feature-request' },
    ],
  },
];
const getPnlValue: any = {
  netPnl: 'Net P&L',
  grossPnl: 'Gross P&L',
};

const ticketTypes = [
  {
    label: 'Suggestion',
    value: 'suggestion',
  },
  {
    label: 'Feedback',
    value: 'feedback',
  },
  {
    label: 'Bug',
    value: 'bug',
  },
  {
    label: 'Feature Request',
    value: 'feature-request',
  },
];
export { dropdowns, getPnlValue, ticketTypes };
