import * as React from "react";
import { Card } from "../types";
import CardComponent from "./CardComponent";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
interface IMyCardsComponentsProps {
  cards: Card[];
  onAttack: (card: Card) => void;
}

const MyCardsComponents: React.FC<IMyCardsComponentsProps> = ({
  cards,
  onAttack,
}) => {
  const myListSwiperRef = React.useRef<SwiperRef>(null);

  return (
    <div className="playerCards my">
      <Swiper
        ref={myListSwiperRef}
        pagination={{
          type: "progressbar",
        }}
        spaceBetween={0}
        slidesPerView={6}
        modules={[Pagination]}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <CardComponent
              card={card}
              onClick={() => onAttack(card)}
              player="my"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MyCardsComponents;
