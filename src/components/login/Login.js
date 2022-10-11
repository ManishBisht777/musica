import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=5bcbd8541e76465481838de8f049a1fc&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
  return (
    <div>
      <a href={AUTH_URL}>Login plz</a>
    </div>
  );
};

export default Login;
