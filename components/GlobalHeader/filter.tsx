/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';

import { useModalize } from 'react-native-modalize';
import { useQuery } from '~/context/QueryContext';

type FilterProps = {
  status: string;
  tradeType: string;
  result: string;
  [key: string]: string;
};
const Filter = () => {
  const { ref, open, close }: any = useModalize(); // Specify Modalize type here
  const { globalQueries, setQuery }: any = useQuery();
  const [localFilter, setLocalFilter] = useState({
    status: '',
    tradeType: '',
    result: '',
  } as FilterProps);
  useEffect(() => {
    setLocalFilter(globalQueries);
  }, [globalQueries]);
  return <></>;
};

export default Filter;
