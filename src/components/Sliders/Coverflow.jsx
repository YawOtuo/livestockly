import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { deleteImage } from '../../views/detailView/api';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../redux/reducers/messages';

const images = [
    '/livestock1.jpeg',
    '/livestock2.jpeg',
    '/livestock1.jpeg'

]


const CoverFlow = (props) => {

    const dispatch = useDispatch()
    const handleDelete = (index) => {

        Swal.fire({
            title: 'Are you sure you want to delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success')
                deleteImage(props.animalId, index)
                    .then((res) => {
                        Navigate('/dashboard')
                        dispatch(addMessage("Deleted Data"))
                        dispatch(addMessage('Image editted successfully'))

                    })
                    .catch((err) => console.log(err))
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
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
                    props.images?.map((r, index) => (
                        <SwiperSlide>
                            <div className=''>
                                <img src={
                                    `https://res.cloudinary.com/daurieb51/image/upload/v1693905807/${r}.jpg`

                                } width={"100%"} alt="pic" />
                                <div className='flex flex-col bg-slate-500 absolute w-fit top-0 right-0'>

                                    <Button
                                        onClick={e => handleDelete(index)}
                                    ><MdOutlineDelete color='white' size={40} /></Button>

                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default CoverFlow