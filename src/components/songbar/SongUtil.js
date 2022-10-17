import { useState, useEffect } from "react";

function SongUtil() {
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(true);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    const audio = document.getElementById("Song");
    const volume = document.getElementById("volume-slider");
    const mutevol = document.getElementById("mute");

    if (!audio) return;

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    };

    volume.addEventListener("input", (e) => {
      const value = e.target.value;
      audio.volume = value / 100;
    });

    mutevol.addEventListener("click", () => {
      if (audio.volume === 0) audio.volume = 1;
      else audio.value = 0;
    });

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [playing, clickedTime, curTime, duration]);

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
  };
}

export default SongUtil;
