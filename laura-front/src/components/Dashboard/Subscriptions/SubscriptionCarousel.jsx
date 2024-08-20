import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions } from '../../../Redux/Actions/actions';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import backgroundImage from "../../../lauraassets/sombras.png"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Instala los módulos necesarios de Swiper


const SubscriptionCarousel = () => {
    const dispatch = useDispatch();
    const subscriptions = useSelector((state) => state.subscriptions);
  
    useEffect(() => {
      dispatch(fetchSubscriptions());
    }, [dispatch]);

    useEffect(() => {
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');
    
        if (nextButton && prevButton) {
          nextButton.style.color = 'grey';
          prevButton.style.color = 'grey';
    
          // Otras propiedades como background, padding, etc.
          nextButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          prevButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          nextButton.style.padding = '10px';
          prevButton.style.padding = '10px';
          nextButton.style.borderRadius = '50%';
          prevButton.style.borderRadius = '50%';
        }
      }, []);
  
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl p-4">
          <h2 className="text-4xl font-bold mb-4 text-center">Suscripciones Disponibles</h2>
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
            modules={[Autoplay, Pagination, Navigation]} // Usa los módulos aquí
            className="mySwiper"
          >
            {subscriptions.map((subscription) => (
              <SwiperSlide key={subscription.idSub}>
                <div
                  className="relative bg-cover bg-center bg-no-repeat rounded-lg shadow-lg p-8 flex flex-col items-center justify-center"
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    width: 'calc(100% + 50%)', // Ancho del slide
                  }}
                >
                  <div className="bg-black bg-opacity-50 rounded-lg p-16 text-center">
                    <h3 className="text-2xl font-semibold text-white mb-2">{subscription.typeSub}</h3>
                    <p className="text-gray-300 mb-2">{subscription.durationDays} días</p>
                    <p className="text-white text-xl font-bold">${subscription.price.toFixed(2)}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };
  
export default SubscriptionCarousel;

