// Խաղաքարտերի տեսակները
export enum TypeCard {
  hearth = "hearth",
  diamonds = "diamonds",
  spades = "spades",
  clubs = "clubs",
}

// Ամեն մի քարտի բաղկացած հատկությունը
export interface Card {
  id: number;
  rank: number;
  type: TypeCard;
  img: string;
}

// Խաղացողների քարտերը
export interface CoupleCard {
  my: Card[];
  his: Card[];
}

// audio card

export interface AudioPlayer {
  id: number;
  name: string;
  isPlaying: boolean;
  path: string;
  mute: boolean;
}
