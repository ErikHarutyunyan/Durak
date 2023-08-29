import * as React from "react";
import { Card } from "../types";
import backImgCard from "../assets/img/backFon.png";

interface ICardComponentProps {
  card: Card;
  onClick?: () => void;
  player: string;
}

const CardComponent: React.FunctionComponent<ICardComponentProps> = ({
  player,
  card,
  onClick,
}) => {
  const imgSrc: string = player === "his" ? backImgCard : card.img;
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className="card">
      <img src={imgSrc} alt="card" key="card.id" width={80} />
    </div>
  );
};

export default CardComponent;
