import { useEffect } from 'react';

const GoogleLoginButton = () => {
  useEffect(() => {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: 'YOUR_CLIENT_ID',
      });
      gapi.signin2.render('google-signin-button', {
        scope: 'profile email',
        width: 200,
        height: 50,
        longtitle: true,
        theme: 'dark',
      });
    });

    return () => {
      // Clean up any necessary resources or event listeners when the component unmounts
    };
  }, []);

  return (
    <div id="google-signin-button">
      {/* The container element for the Google login button */}
    </div>
  );
};

export default GoogleLoginButton;
