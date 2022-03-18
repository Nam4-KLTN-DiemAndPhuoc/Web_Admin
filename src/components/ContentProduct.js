import React from 'react';
import { useSelector } from 'react-redux';
import SearchCategory from './SearchCategory';
import SearchForm from './SearchForm';
import ProductTable from './Table/ProductTable';

const ContentProduct = () => {

    return (
        <div>
            <SearchCategory />
            <br />
            <ProductTable />
        </div>
    );
};

export default ContentProduct;