import React from "react";
import Navigation from "./navigation/Navigation";
import AuthProvider from "./context/auth/AuthProvider";
import AlertProviders from "./context/alert/AlertProvider";

const App: React.FC = () => {

  return (
    <>
      <AlertProviders>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </AlertProviders>
    </>
  );
}

export default App;