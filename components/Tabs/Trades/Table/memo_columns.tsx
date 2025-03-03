// import React, { useMemo, useCallback, useState } from 'react';
// // ... other imports from your original code

// const colors = {
//   open: 'purple-500',
//   closed: 'amber-500',
//   win: 'green-500',
//   lose: 'red-500',
//   breakEven: 'blue-500',
//   true: 'green-500',
//   false: 'red-500',
// };

// const MemoizedCheckbox = React.memo(({ status, onPress }) => {
//   return <ThemedCheckbox className="w-full" value={status} onValueChange={onPress} />;
// });
// //Memoized Column Component
// const AccountColumn = React.memo(({ value, user }) => {
//   const accountName = user?.accounts.find((i) => i.uuid === value)?.accountName;
//   return (
//     <Text className="font-poppinsSemiBold text-xs text-dashboard_card_text">
//       {accountName || '- -'}
//     </Text>
//   );
// });
// const StatusColumn = React.memo(({ value }) => (
//   <View
//     className={`items-center rounded-md border ${
//       value === 'open' ? `border-${colors?.open}` : `border-amber-500`
//     }`}>
//     <Text
//       className={`
//                px-2 py-1 font-poppinsMedium text-xs capitalize
//             ${value === 'open' ? `text-${colors?.open}` : `text-amber-500`} text-xs`}>
//       {value}
//     </Text>
//   </View>
// ));
// const ResultColumn = React.memo(({ isBreakEven, result }) => (
//   <View
//     className={`items-center rounded-md border   ${
//       isBreakEven
//         ? `border-${colors.breakEven}`
//         : result === 'win'
//           ? `border-${colors.win}`
//           : result === 'lose'
//             ? `border-${colors.lose}`
//             : ''
//     }`}>
//     <Text
//       className={`
//                 px-4 py-1 font-poppinsMedium text-xs capitalize
//                 ${
//                   isBreakEven
//                     ? `text-${colors.breakEven}`
//                     : result === 'win'
//                       ? `text-${colors.win}`
//                       : result === 'lose'
//                         ? `text-${colors.lose}`
//                         : ''
//                 }`}>
//       {isBreakEven ? 'Break Even' : result || '- -'}
//     </Text>
//   </View>
// ));
// const TradeTypeColumn = React.memo(({ value }) => (
//   <Text className="text-xs uppercase text-dashboard_card_text">{value}</Text>
// ));
// const SymbolColumn = React.memo(({ symbol, underlyingSymbol }) => (
//   <Text className="text-xs uppercase text-dashboard_card_text">{underlyingSymbol || symbol}</Text>
// ));
// const OpenDateColumn = React.memo(({ openDate }) => (
//   <View>
//     <Text className="text-xs text-dashboard_card_text">{openDate?.date}</Text>
//     <Text className="text-xs text-dashboard_card_text">{openDate?.time}</Text>
//   </View>
// ));
// const CloseDateColumn = React.memo(({ status, closeDate }) => (
//   <View>
//     {status === 'closed' && (
//       <View>
//         <Text className="text-xs text-dashboard_card_text">{closeDate?.date}</Text>
//         <Text className="text-xs text-dashboard_card_text">{closeDate?.time}</Text>
//       </View>
//     )}
//   </View>
// ));

// const AvgEntryPriceColumn = React.memo(({ avgEntryPrice }) => (
//   <Text className="text-xs text-dashboard_card_text">
//     {toCurrency(round(avgEntryPrice, 4) || 0)}
//   </Text>
// ));
// const AvgExitPriceColumn = React.memo(({ avgExitPrice }) => (
//   <Text className="text-xs text-dashboard_card_text">
//     {toCurrency(round(avgExitPrice, 4) || 0)}
//   </Text>
// ));

// const NetPnlColumn = React.memo(({ status, netPnl }) => {
//   const isClosed = status === 'closed';
//   const isPositive = netPnl > 0;
//   const isZero = netPnl === 0 && isClosed;
//   return (
//     <View className="flex flex-col items-center">
//       {status === 'open' && <Text className="text-[10px] text-purple-500">(open)</Text>}
//       <Text
//         className={`font-poppinsMedium text-sm font-medium ${
//           isZero ? 'text-blue-500' : isPositive ? 'text-green-500' : 'text-red-500'
//         }`}>
//         {toCurrency(netPnl || 0)}
//       </Text>
//     </View>
//   );
// });

// const NetRoiColumn = React.memo(({ netRoi }) => {
//   const isPositive = round(netRoi, 2) > 0;
//   return (
//     <Text
//       className={`text-xs font-medium text-dashboard_card_text ${
//         isPositive ? 'text-green-500' : 'text-red-500'
//       }`}>
//       {round(netRoi, 2)}%
//     </Text>
//   );
// });

// const ExecutionsColumn = React.memo(({ executions }) => (
//   <Text className="text-xs text-dashboard_card_text">{executions?.length || '- -'}</Text>
// ));

// const CommissionColumn = React.memo(({ totalCommission }) => (
//   <Text className="text-xs text-dashboard_card_text">{toCurrency(totalCommission || 0)}</Text>
// ));
// const StrikeColumn = React.memo(({ strike }) => (
//   <Text className="text-xs text-dashboard_card_text">{strike ? toCurrency(strike) : '- -'}</Text>
// ));
// const InstrumentColumn = React.memo(({ instrument }) => (
//   <Text
//     className={`text-xs font-medium uppercase text-dashboard_card_text ${
//       instrument === 'call' ? 'text-green-500' : instrument === 'put' ? 'text-red-500' : ''
//     }`}>
//     {instrument || '- -'}
//   </Text>
// ));

// const ExpiryDateColumn = React.memo(({ expDate }) => (
//   <Text className="text-xs text-dashboard_card_text">
//     {expDate ? dayjs(expDate).format('YYYY-MM-DD') : '- -'}
//   </Text>
// ));

// const ContractMultiplierColumn = React.memo(({ contractMultiplier }) => (
//   <Text className="text-xs text-dashboard_card_text">
//     {contractMultiplier ? toCurrency(contractMultiplier) : '- -'}
//   </Text>
// ));
// const TableRow = React.memo(({ record, handleSelectItem, selectedItems, user }) => {
//   return (
//     <View>
//       <MemoizedCheckbox
//         key={record.tradeId}
//         status={selectedItems.includes(record.tradeId)}
//         onPress={() => handleSelectItem(record.tradeId)}
//       />
//       <AccountColumn value={record.accountId} user={user} />
//       <StatusColumn value={record.status} />
//       <ResultColumn isBreakEven={record.isBreakEven} result={record.result} />
//       <TradeTypeColumn value={record.tradeType} />
//       <SymbolColumn symbol={record.symbol} underlyingSymbol={record.underlyingSymbol} />
//       <OpenDateColumn openDate={record.openDate} />
//       <CloseDateColumn status={record.status} closeDate={record.closeDate} />
//       <AvgEntryPriceColumn avgEntryPrice={record.avgEntryPrice} />
//       <AvgExitPriceColumn avgExitPrice={record.avgExitPrice} />
//       <NetPnlColumn status={record.status} netPnl={record.netPnl} />
//       <NetRoiColumn netRoi={record.netRoi} />
//       <ExecutionsColumn executions={record.executions} />
//       <CommissionColumn totalCommission={record.totalCommission} />
//       <StrikeColumn strike={record.strike} />
//       <InstrumentColumn instrument={record.instrument} />
//       <ExpiryDateColumn expDate={record.expDate} />
//       <ContractMultiplierColumn contractMultiplier={record.contractMultiplier} />
//     </View>
//   );
// });

// export const getColumns = ({ selectedItems, handleSelectItem, user, trades }) => {
//   const transformedTrades = useMemo(() => {
//     return trades.map((trade) => {
//       const accountName = user?.accounts.find((i) => i.uuid === trade.accountId)?.accountName;
//       const openDate = formatDateInTimeZone({ date: trade.openDate, tz: user?.timeZone });
//       const closeDate = formatDateInTimeZone({ date: trade.closeDate, tz: user?.timeZone });
//       const isBreakEven =
//         trade?.breakEven ||
//         (trade?.[trade?.calculationMethod]?.netPnl === 0 && trade?.status === 'closed');
//       const netPnl = trade?.[trade?.calculationMethod]?.netPnl;
//       const netRoi = trade?.[trade?.calculationMethod]?.netRoi;
//       return {
//         ...trade,
//         accountName,
//         openDate,
//         closeDate,
//         isBreakEven,
//         netPnl,
//         netRoi,
//       };
//     });
//   }, [trades, user]);

//   return (
//     <FlatList
//       data={transformedTrades}
//       keyExtractor={(item) => item.tradeId}
//       renderItem={({ item }) => (
//         <TableRow
//           key={item.tradeId}
//           record={item}
//           handleSelectItem={handleSelectItem}
//           selectedItems={selectedItems}
//           user={user}
//         />
//       )}
//     />
//   );
// };
