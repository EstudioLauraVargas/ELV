import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../Redux/Actions/actions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import backgroundImage from "../../lauraassets/sombras.png";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const CursosCarousel = () => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);

    useEffect(() => {
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');

        if (nextButton && prevButton) {
            nextButton.style.color = 'grey';
            prevButton.style.color = 'grey';
            nextButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            prevButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            nextButton.style.padding = '10px';
            prevButton.style.padding = '10px';
            nextButton.style.borderRadius = '50%';
            prevButton.style.borderRadius = '50%';
        }
    }, []);

    const handlecourseSelect = (course) => {
        // Acciones al seleccionar un curso
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4 md: mt-16 lg: mb-16">

            <div className="w-full max-w-4xl">

                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {/* Verifica si courses.data existe y es un array */}
                    {Array.isArray(courses.data) &&
                        courses.data.map((course) => (
                            <SwiperSlide
                                key={course.idCourse}
                                onClick={() => handlecourseSelect(course)}
                            >
                                <div
                                    className="relative bg-cover bg-center bg-no-repeat rounded-lg shadow-lg  flex flex-col items-center justify-center cursor-pointer"
                                    style={{
                                        backgroundImage: `url(${backgroundImage})`,
                                        backgroundSize: "cover",
                                        height: "300px", // Establece una altura base para pantallas pequeñas
                                    }}
                                >
                                    <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-6 text-center w-full flex flex-col items-center">
                                        <h3 className="text-lg md:text-2xl font-semibold text-white mb-2 uppercase">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-300 mb-2 text-center break-words max-w-lg md:px-6">
                                            {course.description}
                                        </p>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}

export default CursosCarousel;
