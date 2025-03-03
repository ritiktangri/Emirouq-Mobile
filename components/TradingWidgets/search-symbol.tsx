import React from 'react';
import WebView from 'react-native-webview';

const SearchSymbol = (symbol = 'usd') => {
  return (
    <WebView
      forceDarkOn
      style={{
        backgroundColor: 'lightgray',
      }}
      source={{
        uri: `https://www.tradingview.com/chart?symbol=${'usd'}`,
      }}
      useWebKit
      originWhitelist={['https://www.tradingview.com']}
      allowsInlineMediaPlayback
      incognito
    />
  );
};

export default SearchSymbol;
