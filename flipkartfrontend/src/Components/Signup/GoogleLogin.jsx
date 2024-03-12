import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const GoogleLoginHandler = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const googleLogin = () => {
    window.location.href = 'https://flipkartclone2-o8uw.onrender.com/api/v1/auth/google/callback';
  };

  const { token, user: userString } = useParams();
console.log(token);
  useEffect(() => {
    if (token && userString) {
      const user = JSON.parse(decodeURIComponent(userString));
      setUser(user);
      navigate('/');
    }
  }, [setUser, navigate, token, userString]);

  return (
    <div>
      <p onClick={googleLogin}>Loading...</p>
    </div>
  );
};

export default GoogleLoginHandler;
