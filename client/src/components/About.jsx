import React from 'react'
import { features } from '../constants';
import styles from '../style';
import { layout } from '../style';
import Button from "./Button";

const FeatureCard=({icon, title, content})=>(
  <div className={`flex flex-row p-6 rounded-[20px] mb-6`}>
    <div className={`w-[64px] h-[64px] `}>
      <img src={icon} alt="icon" className='w-[50%] h-[50%] feature-card rounded-full ${styles.flexCenter} bg-dimBlue'/>

    </div>
    <div className='flex-1 flex felx-col ml-3'>
      <h4 className='font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1' >
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[23px] mb-1">
        {content}
      </p>
    </div>
  </div>
)
const About = () => (
  <section id="features" className={`${layout.section} ml-10`}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      You protect the society 
      <br className='sm:block hidden'/>
      We'll handle the security.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        With right platform, you can work in peace making society a better place.
      </p>

      <Button styles={`ml-4`} />
    </div>
    <div className={`${layout.sectionImg} flex-col`}>
    {features.map((feature, index)=>(
      <FeatureCard key={features.id}{...feature} index={index}/>
    ))}
    </div>
  </section>
  
)

export default About
