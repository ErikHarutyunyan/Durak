import { action, makeObservable, observable } from "mobx";
import { Card, TypeCard } from "../types";
import { cards as allCards } from "../cards";

/*
 * trumpCard - Կոզր քարտի
 * isMyStep - Ցույց ա տալիս իմ հերթն ա խաղալու թե չե
 * isGetCard - Ցույց ա տալիս ինչ որ մեկը քարտերը հավաքել ա, թե չե, օգնում ա հասկանաք փոխենք isMyStep-ը, թե չե
 * isMyAttack - Ցույց ա տալիս իմ գալու քայլը
 * deckCards - Կալոդում առկա քարտերը
 * attackCard - Ցույց ա տալիս քցած քարտը 
 * */
class Game {
  trumpCard: TypeCard = TypeCard.diamonds;
  isMyStep: boolean = false;
  isGetCard: boolean = false;
  isMyAttack: boolean = false;
  attackCard: Card = allCards[0];
  deckCards: Array<Card> = [];

  // mobX-ով հետևող հատկություները և ֆունկցյաները
  constructor() {
    makeObservable(this, {
      isMyStep: observable,
      deckCards: observable,
      isMyAttack: observable,
      attackCard: observable,
      isGetCard: observable,
      reduceCards: action,
    });
  }

  toggleStep() {
    this.isMyStep = !this.isMyStep;
  }

  toggleAttack() {
    this.isMyAttack = !this.isMyAttack;
  }

  setIsGetCard(isGetCard: boolean) {
    this.isGetCard = isGetCard;
  }

  setAttackCard(card: Card) {
    this.attackCard = card;
  }

  // Այս ֆունկցիաով հասկանում ենք ով ա, առաջինը քայլելու
  defineStep(myCards: Card[], hisCards: Card[]) {
    const myJuniorTrumpRank = this.defineJuniorTrumpCard(myCards);
    const hisJuniorTrumpRank = this.defineJuniorTrumpCard(hisCards);

    if (myJuniorTrumpRank) {
      if (myJuniorTrumpRank < hisJuniorTrumpRank || !hisJuniorTrumpRank) {
        this.toggleStep();
        this.toggleAttack();
      }
    }
  }

  // Այս ֆունկցիաով մենք խարնում ենք կալոդի քարտերը և վերցնում ենք խաղի կոզրը
  mixDeck() {
    this.deckCards = this.deckCards.sort(() => Math.random() - 0.5);
    this.trumpCard = this.deckCards[35].type;
  }

  startGame() {
    this.deckCards = allCards;
    this.mixDeck();

    const firstHisCards = this.reduceCards(6);
    const firstMyCards = this.reduceCards(6);

    this.defineStep(firstMyCards, firstHisCards);

    return { firstHisCards, firstMyCards };
  }


  // Այս ֆունկցիաով հասկանում ենք ում մոտ ա, ամենափոքր կոզր քարտը 
  defineJuniorTrumpCard(cards: Card[]) {
    const trumpRanks = cards
      .filter((card) => card.type === this.trumpCard)
      .map((card) => card.rank);

    if (trumpRanks.length) {
      return Math.min(...trumpRanks);
    }

    return 0;
  }

  // Այս ֆունկյան քչացնում ա կալոդի քարտերը, երբ որ քաշում են խաղացողները քարտերը
  // countCards քանակը քարտերի որոնք պետք ա հանվի
  reduceCards(countCards: number): Array<Card> {
    const removedCard = this.deckCards.splice(0, countCards);
    return removedCard;
  }

  // ընդունումա my և his store-րը և հասկանում ա, ինքան քարտ ա մեզ պետք քաշելու համար
  addPlayersCards(my: any, his: any) {
    const myNeed = 6 - my.cards.length;
    const hisNeed = 6 - his.cards.length;
    my.addCards(this.reduceCards(myNeed > 0 ? myNeed : 0));
    his.addCards(this.reduceCards(hisNeed > 0 ? hisNeed : 0));
  }
}

export default Game;
