/* eslint-disable import/order */

import React from "react";
import PriceRangeSlider from "./slider";
import CategorySelector from "./categories";
import LocationInput from "./location";
import SortByOptions from "./sorting";
import SortByDate from "./dateSorting";

// import { MemoizedSelectPnl } from './SelectPnl';
const MemoizedPriceRangeSelector = React.memo(PriceRangeSlider);
const MemoizedCategorySelector = React.memo(CategorySelector);
const MemoizedLocationInput = React.memo(LocationInput);
const MemoizedSorting = React.memo(SortByOptions);
const MemoizedDateSorting = React.memo(SortByDate);


export {
    MemoizedPriceRangeSelector,
    MemoizedCategorySelector,
    MemoizedLocationInput,
    MemoizedSorting,
    MemoizedDateSorting
};
