import { Card } from "../types";

// HisCards.ts և MyCards.ts ժառանգվելու են PlayerCards

// abstract
abstract class PlayerCards {
  abstract cards: Array<Card>;

  // խաղացողի քարտերն ա քչացնում
  reduceCard(id: number): void {
    this.cards = this.cards.filter((card) => card.id !== id);
  }

  // խաղացողին քարտ ենք ավելացնում
  addCards(cards: Array<Card>, flag: boolean): void {
    flag ? (this.cards = [...cards]) : (this.cards = [...this.cards, ...cards]);
  }

  clearCards(): void {
    this.cards = [];
  }
}

export default PlayerCards;
