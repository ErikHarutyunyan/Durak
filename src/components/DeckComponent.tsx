import * as React from 'react';
import { TypeCard } from '../types';

interface IDeckComponentProps {
  trump: TypeCard,
  cardBalance: number
}

const DeckComponent: React.FC<IDeckComponentProps> = ({ trump, cardBalance }) => {

  const trumps = {
    'hearth': { color: 'red', code: { __html: '&#9829;', }, },
    'diamonds': { color: 'red', code: { __html: '&#9830;' }, },
    'clubs': { color: 'black', code: { __html: '&#9827;' }, },
    'spades': { color: 'black', code: { __html: '&#9824;' }, },
  }


  return (
    <div className="deckInfo">
      <div
        className={trumps[trump].color}
        dangerouslySetInnerHTML={trumps[trump].code}
      />
      <div>{"The rest of the deck: " + cardBalance}</div>
    </div>
  );
};

export default DeckComponent;
