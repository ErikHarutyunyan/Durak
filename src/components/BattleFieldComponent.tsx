import { observer } from "mobx-react-lite";
import * as React from "react";
import { CoupleCard } from "../types";
import CardComponent from "./CardComponent";
import { game } from "../store";

interface IBattleFieldComponentProps {
  cards: CoupleCard;
}

const BattleFieldComponent: React.FC<IBattleFieldComponentProps> = observer(
  ({ cards }) => {
    let checkStep = game.isMyAttack;
    return (
      <div className="battleFieldWrapper">
        <div
          className="battleField hi"
          style={
            checkStep ? { marginBottom: "-60px", position: "relative" } : {}
          }
        >
          {cards.his.map((card) => (
            <CardComponent card={card} key={card.id} player={""} />
          ))}
        </div>
        <div
          className="battleField my"
          style={!checkStep ? { marginTop: "-60px" } : {}}
        >
          {cards.my.map((card) => (
            <CardComponent card={card} key={card.id} player={""} />
          ))}
        </div>
      </div>
    );
  },
);

export default BattleFieldComponent;
