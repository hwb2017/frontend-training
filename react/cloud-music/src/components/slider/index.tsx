import React, { useEffect, useState } from 'react';
import { SliderContainer } from './style';
import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/css/bundle';
import type { ReactElement } from 'react';
import type { Banner } from '../../api/request';

Swiper.use([Pagination, Autoplay]);

export interface SliderProps {
  bannerList: Banner[],
  children?: ReactElement
}

const Slider = (props: SliderProps) => {
  const [sliderSwiper, setSliderSwiper] = useState<Swiper | null>(null);
  const { bannerList } = props;

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: '.swiper-pagination'},
      });
      setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);
  return (
    <SliderContainer>
      <div className='before'></div>
      <div className='slider-container'>
        <div className='swiper-wrapper'>
          {
            bannerList.map((slider,index) => {
              return (
                <div className='swiper-slide' key={slider.imageUrl+index}>
                  <div className='slider-nav'>
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className='swiper-pagination'></div>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider);