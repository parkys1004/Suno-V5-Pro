import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Function to mount the React app while preserving the 'index.html' file structure on disk
// but upgrading the runtime experience to a full React app.
const mountApp = () => {
  // Create a root element for React
  const rootElement = document.createElement('div');
  rootElement.id = 'react-root';
  rootElement.style.position = 'relative';
  rootElement.style.zIndex = '10';
  document.body.appendChild(rootElement);

  // Hide the static HTML content to avoid duplication and clashes,
  // effectively "upgrading" the page to the React version visually.
  Array.from(document.body.children).forEach((child) => {
    if (child.id !== 'react-root' && child.tagName !== 'SCRIPT') {
      (child as HTMLElement).style.display = 'none';
    }
  });

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
