import React from 'react';
import mob1 from '../../Asset/slider/mob1.jpg';
import mob2 from '../../Asset/slider/mob2.jpg';
import mob3 from '../../Asset/slider/mob3.jpg';
import mob4 from '../../Asset/slider/mob4.jpg'

const About = () => {
    return (
        <div className="hero my-20 ">
            <div className='hero-content flex-col lg:flex-row w-full'>
                <div className='relative w-1/2 mx-5'>
                    <div className="carousel w-full h-80">
                        <div id="slide1" className="carousel-item relative w-full">
                            <img src={mob1} alt='' className="w-full lg:w-1/2 mx-auto" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide4" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide2" className="carousel-item relative w-full">
                            <img src={mob2} alt='' className="w-full lg:w-1/2 mx-auto" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide3" className="carousel-item relative w-full">
                            <img src={mob3} alt='' className="w-full lg:w-1/2 mx-auto"  />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide4" className="carousel-item relative w-full">
                            <img src={mob1} alt='' className="w-full lg:w-1/2  mx-auto" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-1/2'>
                    <p className='text-2xl text-red-600 font-bold'>About Us</p>
                    <h3 className="text-3xl font-bold text-blue-600">
                        Find Your <br />
                        Your best<br />
                        Collection
                    </h3>
                    <p className="py-6">This is old mobile collection site. Here you can select various type of phone in very low cost. If you want to sell item you can easily do it by register as a seller. This site is very much user friendly.</p>
                </div>
            </div>

        </div>
    );
};

export default About;