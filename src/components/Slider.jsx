import React, { useEffect } from 'react'
import {useState,useEffect0} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection,getDocs,query,orderBy,limit} from 'firebase/firestore'
import {db} from '../firbase.config'
import SwiperCore,{Navigation,Pagination,Scrollbar,A11y} from 'swiper'
import {Swiper,SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from './Spinner'
import { async } from '@firebase/util'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Slider() {
    const [loading, setLoading]=useState(true)
    const [listings,setListings]=useState(null)
    
    const navigate=useNavigate()


    useEffect(()=>{
            const fetchLiting=async ()=>{
                const listingRef=collection(db,'listings')
                const q=query(listingRef,orderBy('timestamp','desc'),limit(5))
                const querySnap=await getDocs(q)
        
                let listings=[]
                querySnap.forEach(doc => {
                    return listings.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
        
                setListings(listings)
                setLoading(false)

            }

            fetchLiting()

    },[])

    if(loading){
        return <Spinner/>
    }

    if(listings.length===0){
      return <></>
    }

  return listings && (
    <>
    <p className="exploreHeading">Recommended</p>
    
   {/* this swiper not working <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='swiperSlideDiv'
              >
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>*/}
    </>
  )
}

export default Slider
