import { action, makeObservable, observable } from "mobx";
import { Card } from "../types";
import { game } from "./index";
import PlayerCards from "./PlayerCards";

class HisCards extends PlayerCards {
  cards: Array<Card> = [];

  constructor() {
    super();
    makeObservable(this, {
      cards: observable,
      defineCardForAttack: action,
    });
  }

  // Այս ֆունկցյան ընդունամ ա այն քարտերը որոնք կան մարտադաշտում
  defineCardForAction = (battleFieldCards: Card[]) => {
    // Եթե իմ հերթնա գրոհի, վերադարձնում են defineCardForDefense ֆունկցյան
    if (game.isMyAttack) {
      return this.defineCardForDefense(game.attackCard, battleFieldCards);
    }
    return this.defineCardForAttack(battleFieldCards);
  };

  // Հարձակվելու համար ֆունկցյա
  defineCardForAttack = (battleFieldCards: Card[]) => {
    if (this.cards.length) {
      let cardForAttack = null;
      if (!battleFieldCards.length) {
        const trumpCards = this.cards.filter(
          (card) => card.type === game.trumpCard,
        );
        const notTrumpCards = this.cards.filter(
          (card) => card.type !== game.trumpCard,
        );

        if (notTrumpCards.length) {
          cardForAttack = this.defineJuniorCard(notTrumpCards);
        } else {
          cardForAttack = this.defineJuniorCard(trumpCards);
        }
        game.setAttackCard(cardForAttack);
        return cardForAttack;
      }

      cardForAttack = this.defineJuniorExistCard(battleFieldCards);
      if (cardForAttack) {
        game.setAttackCard(cardForAttack);
      }
      return cardForAttack;
    }
  };

  // Պաշտպանվելու համար ֆունկցյա
  defineCardForDefense(attackCard: Card | null, battleFieldCards: Card[]) {
    if (attackCard) {
      const higherCards = this.cards.filter(
        (card) =>
          card.type === attackCard?.type && card.rank > attackCard?.rank,
      );

      const trumpCards = this.cards.filter(
        (card) => card.type === game.trumpCard,
      );

      if (higherCards.length) {
        return this.defineJuniorCard(higherCards);
      }

      if (attackCard.type !== game.trumpCard && trumpCards.length) {
        return this.defineJuniorCard(trumpCards);
      }

      this.addCards(battleFieldCards, false);
      game.toggleStep();
      game.setIsGetCard(true);
    }
  }

  defineJuniorExistCard(battleFieldCards: Card[]) {
    const existRankCards = this.cards.filter(
      (card) => !!battleFieldCards.find((c) => c.rank === card.rank),
    );
    return existRankCards.length ? this.defineJuniorCard(existRankCards) : null;
  }

  // Վերադարձնում ա, փոքր քարտը
  defineJuniorCard(cards: Card[]): Card {
    const juniorCard = cards.reduce((acc, curCurd) =>
      acc?.rank < curCurd?.rank ? acc : curCurd,
    );
    if (juniorCard) {
      this.reduceCard(juniorCard.id);
    }
    return juniorCard;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new HisCards();
