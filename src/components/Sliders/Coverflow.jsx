import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const images = [
    '/livestock1.jpeg',
    '/livestock2.jpeg',
    '/livestock1.jpeg'

]

const CoverFlow = () => {
    return (
        <div>
            <Swiper
                spaceBetween={25}
                pagination={{
                    clickable: true,
                }}
                navigation
                modules={[Pagination, Navigation]}
                grabCursor={true}
                slidesPerView={'2'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 100,
                    depth: 1000,
                    modifier: 1,
                    slideShadows: true,
                }}
                breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    480: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    968: {
                      slidesPerView: 1,
                      spaceBetween: 30,
                    },
                  }}
            >
                {
                    images.map((r) => (
                        <SwiperSlide>
                            <img src={r} width={"100%"} alt="pic" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default CoverFlow