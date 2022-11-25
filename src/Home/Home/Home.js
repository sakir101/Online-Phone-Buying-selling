import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import Products from '../Products/Products';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <Category></Category>
        </div>
    );
};

export default Home;