import * as React from "react";
import { audioStore } from "../store/AudioStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

const MuteAudioComponent = () => {
  const [muteState, setMuteState] = React.useState(true);

  const onMute = () => {
    setMuteState(!muteState);
    audioStore.toggleMute(muteState);
  };

  return (
    <button className="mute" onClick={onMute}>
      <FontAwesomeIcon icon={!muteState ? faVolumeMute : faVolumeUp} />
    </button>
  );
};

export default MuteAudioComponent;
