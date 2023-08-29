import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { hisCards, myCards, game, battleField } from "../store";
import HisCardsComponents from "./../components/HisCardsComponent";
import BattleFieldComponent from "./../components/BattleFieldComponent";
import MyCardsComponents from "../components/MyCardsComponent";
import DeckComponent from "../components/DeckComponent";
import MyActions from "../components/MyActions";
import GameOver from "../components/GameOver";
import { Card } from "../types";
import MuteAudioComponent from "../components/MuteAudioComponent";

const Main: React.FC = observer(() => {
  const startGame = (flag: boolean) => {
    const { firstMyCards, firstHisCards } = game.startGame();
    if (flag) {
      battleField.clearBattleField(myCards, hisCards, true);
      myCards.addCards(firstMyCards, flag);
      hisCards.addCards(firstHisCards, flag);
      window.location.reload();
    } else {
      myCards.addCards(firstMyCards, flag);
      hisCards.addCards(firstHisCards, flag);
    }
  };

  const hisAction = () => {
    // !game.isMyStep հասկացնում ենք որ համակարգիչը սկսի իրա քայլը անել
    if (!game.isMyStep) {
      // battleFieldCards մարտադաշտի խաղացողի քարտեր
      const battleFieldCards = [
        ...battleField.cards.his,
        ...battleField.cards.my,
      ];

      // hisJuniorCard այստեղ կհայտնվի այն քարտերը որոնք պետք ա խաղա համակարգիչը, դա կլինի թե պաշտպանվելու թե հարձակվելու քարտերը
      const hisJuniorCard = hisCards.defineCardForAction(battleFieldCards);

      if (hisJuniorCard) {
        battleField.addHisCard(hisJuniorCard);
      } else {
        battleField.clearBattleField(myCards, hisCards, false);
      }
    }
  };
  // @ts-ignore
  useEffect(startGame, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(hisAction, [game.isMyStep]);

  const clickMyCard = (card: Card) => {
    if (game.isMyStep) {
      const myStepCard = myCards.checkMyStep(card, [
        ...battleField.cards.my,
        ...battleField.cards.his,
      ]);
      if (myStepCard) {
        battleField.addMyCard(myStepCard);
      }
    }
  };

  const getCard = () => {
    // @ts-ignore
    myCards.addCards([...battleField.cards.my, ...battleField.cards.his]);
    game.toggleStep();
    game.setIsGetCard(true);
    battleField.clearBattleField(myCards, hisCards, false);
  };

  return (
    <div className="gameWrapper">
      <MuteAudioComponent />
      <DeckComponent
        trump={game.trumpCard}
        cardBalance={game.deckCards.length}
      />
      <HisCardsComponents cards={hisCards.cards} />
      <BattleFieldComponent cards={battleField.cards} />
      <MyCardsComponents cards={myCards.cards} onAttack={clickMyCard} />
      <MyActions
        isMyAttack={game.isMyAttack}
        battleField={battleField}
        onRepulsed={() =>
          battleField.clearBattleField(myCards, hisCards, false)
        }
        onGetCard={getCard}
      />
      <GameOver
        isShow={
          !game.deckCards.length &&
          (!myCards.cards.length || !hisCards.cards.length)
        }
        isMyWin={!myCards.cards.length}
        onRestartGame={startGame}
      />
    </div>
  );
});

export default Main;
