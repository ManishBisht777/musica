import { useState } from "react";
import AuthContext from "./authContext";

const AuthState = (props) => {
  const [authtoken, setauthtoken] = useState(null);

  setauthtoken("12245");

  return (
    <AuthContext.Provider value={authtoken}>
      {props.childern}
    </AuthContext.Provider>
  );
};

export default AuthState;
