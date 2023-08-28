import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const images = [
    '/livestock1.jpeg',
    '/livestock1.jpeg',
    '/livestock1.jpeg'

]

const CoverFlow = () => {
    return(
        <div>
                  <Swiper
                            spaceBetween={5}
                            pagination={true}
                            navigation={true}
                            modules={[Pagination, Navigation, EffectCoverflow]}

                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 100,
                                depth: 1000,
                                modifier: 1,
                                slideShadows: true,
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