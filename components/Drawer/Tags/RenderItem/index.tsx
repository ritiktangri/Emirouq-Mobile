/* eslint-disable import/order */
import { useCallback, useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Accordion } from './accordion';
import theme from '~/utils/theme';
import Title from './title';
import Description from './description';
const RenderItem = ({ item, onEdit }: any) => {
  const accordionRef: any = useRef(null);

  const title = useCallback(() => <Title item={item} onEdit={onEdit} />, [item, onEdit]);

  const description = useCallback(
    ({ tag }: any) => <Description key={tag?.uuid} tag={tag} onEdit={onEdit} />,
    [item?.tags, theme]
  );

  return (
    <View className="mx-4 flex-1">
      <Accordion
        item={item}
        ref={accordionRef}
        buttonClassName="bg-gray-200 dark:bg-account_table_bg"
        title={title()}>
        <FlatList
          data={item?.tags}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          className="my-4 gap-y-4"
          renderItem={({ item: tag }: any) => description({ tag })}
          keyExtractor={(tag: any) => tag?.uuid}
        />
      </Accordion>
    </View>
  );
};

export default RenderItem;
