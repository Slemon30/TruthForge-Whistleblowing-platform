import React from 'react';
import styles from '../style';
import GetStarted from './GetStarted';
import { discount, bg1 } from '../assets';
const Hero = () => {
  return (
    <section id="home" className={'flex md:flex-row flex-col ${styles.paddingY}'}>
      <div className={'flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6'}>
      <p className={`${styles.paragraph}`}>
        <div
        className='flex flex-row items-center py-[3px] px-4
        bg-discount-gradient rounded[10px]mb-2 '>
          
          {/* <img src={discount} alt="discount"
          className='w-[32px] h-[32px]'/> */}
          <span className='text-white  '>100%</span>
          Protection {"  "}
          <span className='text-white'></span>
          
          
        </div>
        </p>
        <div className='flex flex-col justify-between items-center w-full'>
          <h1 className='flex-1 font-popppins font-semibold ss:text-[72px] text-[52px] text-white'>
            Welcome to <br className='sm:block hidden'/>
            <span className='text-gradient'>
            TRUTHFORGE
            </span> {" "}
          </h1>
          <h1 className='flex-1 font-popppins font-semibold ss:text-[72px] text-[52px] text-white'>
          Protection Platform</h1>
          <div className='ss:flex hidden md:mr-4 mr-0'>
            {/* <GetStarted/> */}
          </div>
        </div>
        

        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          We'll work to provide you you safecty and anonmity and everything you need to bring justice to cameras.
        </p>
      </div>
      {/* RIGHT SIDE OF THE SCREEN */}
      {/* <div>
      <img src={bg1} alt="biling"
      className='w-[95%] h-[95%] relative z-[5]'/>
      </div> */}
    </section>
  )
}

export default Hero
