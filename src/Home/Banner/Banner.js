import React from 'react';
import cover from '../../Asset/cover.png'

const Banner = () => {
    return (
        <div className='hero-content flex-col-reverse lg:flex-row justify-around items-center bg-gradient-to-r from-indigo-500 ... py-5 w-full'>
            <div>
                <h1 className='text-4xl lg:text-6xl font-bold text-white'>
                    Find Your <br />
                    Best Phone <br />
                    in Low Price
                </h1>
            </div>
            <div >
                <img src={cover} alt="Mobile" className='sm:h-48 lg:h-full' />
            </div>

        </div>
    );
};

export default Banner;