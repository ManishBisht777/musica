import React from "react";

const Login = () => {
  const handleClick = async () => {
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${
      process.env.REACT_APP_CLIENT_ID
    }&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <div>
      <button onClick={handleClick}>Connect Spotify</button>
    </div>
  );
};

export default Login;
