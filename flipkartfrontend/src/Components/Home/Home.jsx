import React from 'react'
import Posters from './Posters'
import BestofElectronics from './BestofElectronics'
import BestofBeautyToys from './BestofBeautyToys'
import Ads from './Ads'
import BeforeFooter from './Footermin'
import BestofFashion from './BestOfFashion'

const Home = () => {
  return (
    <div className=''>
    <div className='flex flex-col w-full bg-gray-100'>
        <div className='w-full'><Posters/></div>
        <div><BestofElectronics/></div>
        <Ads/>
        <BestofFashion/>
        <BestofBeautyToys/>
        <BeforeFooter/>
        </div>
        </div>
  )
}

export default Home