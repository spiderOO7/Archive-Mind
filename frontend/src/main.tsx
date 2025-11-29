import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google'
const rootElement = document.getElementById('root');
const CLIENT_ID = "525367031863-fbg7r6t58v0mila2nqehoj1us52qrtvu.apps.googleusercontent.com";
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
      </GoogleOAuthProvider>
    </StrictMode>,
  );
}
