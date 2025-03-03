import React from 'react';
import { Text, useWindowDimensions } from 'react-native';
import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';
import theme from '~/utils/theme';

const customHTMLElementModels = {
  p: HTMLElementModel.fromCustomModel({
    tagName: 'p',
    mixedUAStyles: {
      color: 'white',
    },
    contentModel: HTMLContentModel.block,
  }),
  strong: HTMLElementModel.fromCustomModel({
    tagName: 'strong',
    mixedUAStyles: {
      color: 'white', // Default color, adjust as needed
      backgroundColor: 'black',
    },
    contentModel: HTMLContentModel.block, // Or inline if it's purely for formatting
  }),
  span: HTMLElementModel.fromCustomModel({
    tagName: 'span',
    mixedUAStyles: {
      color: 'white', // Default color, adjust as needed
      // Add other default styles for <span> here if necessary
    },
    contentModel: HTMLContentModel.block, // Or inline if it's purely for formatting
  }),
};

const HtmlView = ({ source }: any) => {
  const html = {
    html: source,
  };
  const isHtml = typeof source === 'string' && source.trim().startsWith('<');
  const { width } = useWindowDimensions();

  if (!isHtml) {
    return <Text className="text-white">{source}</Text>;
  }
  const domVisitors = {
    onElement: (element: any) => {
      if (element.attribs && element.attribs.style) {
        delete element.attribs.style;
      }
    },
  };

  return (
    <RenderHtml
      contentWidth={width}
      source={html}
      customHTMLElementModels={customHTMLElementModels}
      domVisitors={domVisitors}
    />
  );
};
export default HtmlView;
