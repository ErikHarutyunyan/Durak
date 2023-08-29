import { makeAutoObservable } from "mobx";
import { AudioPlayer } from "../types";
import { audio } from "../audio";

class AudioStore {
  audioElement: HTMLAudioElement | null = null;
  audioList: Array<AudioPlayer> = [];
  sound: any = null;

  constructor(audioList: Array<AudioPlayer>) {
    this.audioList = audioList;
    makeAutoObservable(this);
  }

  // setAudioElement(element: HTMLAudioElement) {
  //   this.audioElement = element;
  // }

  playAudio(name: string) {
    let audio = this.audioList.find((item) => item.name === name);
    if (audio && !audio.mute) {
      audio.isPlaying = !audio.isPlaying;
      this.sound = new Audio(audio.path);
      this.sound.play();
    }
  }

  toggleMute(flag: boolean) {
    this.audioList = this.audioList.map((item) => ({
      ...item,
      mute: flag,
    }));
    console.log(JSON.parse(JSON.stringify(this.audioList)));
  }
}

export const audioStore = new AudioStore(audio);
