import React from 'react'
import ad1 from "../../Assets/ad1.webp"
import ad2 from "../../Assets/ad2.webp"
import ad3 from "../../Assets/ad3.webp"
import ad4 from "../../Assets/ad4.webp"
import ad5 from "../../Assets/ad5.webp"
import ad6 from "../../Assets/ad6.webp"
import ad7 from "../../Assets/ad7.webp"
import ad8 from "../../Assets/ad8.webp"
import ad9 from "../../Assets/ad9.webp"
import { Link } from 'react-router-dom'


const Ads = () => {
  return (
    <div className='w-full'>
        <div className='flex w-11/12 flex-row justify-center flex-wrap mx-auto'>
<img src={ad1} alt="" className=' w-1/3 pr-2 pb-2'/>
<img src={ad2} alt="" className='w-1/3 pr-2 pb-2'/>
<img src={ad3} alt="" className='w-1/3 pb-2 pr-2'/>
<Link to='/product/Nothing%20Phone%20(2)%20(White,%20256%20GB)%20%20(12%20GB%20RAM)'className='w-1/3 pr-2 pb-2 cursor-pointer'><img src={ad4} alt="" className=' '/></Link>
<img src={ad5} alt="" className='w-1/3 pr-2 pb-2 '/>
<img src={ad6} alt="" className='w-1/3 pr-2 pb-2'/>
<img src={ad7} alt="" className='w-1/3 pr-2 pb-2'/>
<img src={ad8} alt="" className='w-1/3 pr-2 pb-2'/>
<img src={ad9} alt="" className='w-1/3 pr-2 pb-2'/>




        </div>
    </div>
  )
}

export default Ads