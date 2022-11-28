import React from 'react';
import About from '../About/About';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import Products from '../Products/Products';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <Category></Category>
            <About></About>
        </div>
    );
};

export default Home;