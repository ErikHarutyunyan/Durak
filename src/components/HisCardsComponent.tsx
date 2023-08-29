import * as React from "react";
import { Card } from "../types";
import CardComponent from "./CardComponent";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface IHisCardsComponentsProps {
  cards: Card[];
}

const HisCardsComponents: React.FC<IHisCardsComponentsProps> = ({ cards }) => {
  const hisListSwiperRef = React.useRef<SwiperRef>(null);
  return (
    <div className="playerCards his">
      <Swiper
        ref={hisListSwiperRef}
        pagination={{
          type: "progressbar",
        }}
        spaceBetween={0}
        slidesPerView={6}
        modules={[Pagination]}>
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <CardComponent key={card.id} card={card} player="his" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HisCardsComponents;
