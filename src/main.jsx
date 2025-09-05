import React from "react"; 
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext';
import App from './App.jsx';
import './global.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <GoogleOAuthProvider clientId="423978083523-hc0nn6uq24drhtkmhrlmpodg09of86m0.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);