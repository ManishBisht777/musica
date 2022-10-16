import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentPlaying } from "../../store/Songslice";
import { SearchTracks } from "../../utils/utils";

const Search = () => {
  const accesstoken = useSelector((state) => state.Auth.accessToken);

  const [SearchQuery, setSearch] = useState("");
  const [SearchResults, setSearchResults] = useState([]);
  const [playingtrack, setplayingtrack] = useState([]);

  const disptach = useDispatch();

  useEffect(() => {
    if (playingtrack.length === 0) return;

    const trackinfo = {
      trackurl: playingtrack.url,
      name: playingtrack.name,
      artist: playingtrack.artist,
      image: playingtrack.image,
      artistid: playingtrack.artistid,
    };

    disptach(SetCurrentPlaying(trackinfo));
  }, [playingtrack, disptach]);

  useEffect(() => {
    if (!SearchQuery) return setSearchResults([]);
    if (!accesstoken) return;

    let cancel = false;
    const getdata = async () => {
      setSearchResults(await SearchTracks(accesstoken, SearchQuery, cancel));
    };

    getdata();
    return () => (cancel = true);
  }, [SearchQuery, accesstoken]);

  return (
    <div className="search">
      <div className="search_box">
        <BsSearch />
        <input
          type="text"
          placeholder="serach your song here"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="search_song">
        {SearchResults &&
          SearchResults.map((result, index) => {
            return (
              <article
                className="song"
                key={index}
                onClick={() => {
                  setplayingtrack(result);
                  setSearchResults([]);
                }}
              >
                <div className="stylebx">
                  <img src={result.image} alt="" />
                </div>
                <div className="stylebx">
                  <p>{result.name}</p>
                  <p className="artist_name">{result.artist}</p>
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
