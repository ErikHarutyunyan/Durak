import { makeObservable, observable } from "mobx";
import { game } from ".";
import { Card } from "../types";
import PlayerCards from "./PlayerCards";
import { audioStore } from "./AudioStore";

class MyCards extends PlayerCards {
  cards: Array<Card> = [];

  constructor() {
    super();
    makeObservable(this, {
      cards: observable,
    });
  }

  checkMyStep(card: Card, battleFieldCards: Card[]) {
    if (game.isMyAttack) {
      return this.myAttack(card, battleFieldCards);
    }

    return this.myDefense(card, game.attackCard);
  }

  myAttack(card: Card, battleFieldCards: Card[]) {
    if (
      !battleFieldCards.length ||
      battleFieldCards.some((c) => c.rank === card.rank)
    ) {
      audioStore.playAudio("swish");
      game.setAttackCard(card);
      this.reduceCard(card.id);
      return card;
    }
  }

  myDefense(card: Card, attackCard: Card) {
    const strongerCard =
      card.rank > attackCard.rank && card.type === attackCard.type;
    const strongerTrumpCard =
      attackCard.type !== game.trumpCard && card.type === game.trumpCard;

    if (strongerCard || strongerTrumpCard) {
      this.reduceCard(card.id);
      audioStore.playAudio("swish");
      return card;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MyCards();
