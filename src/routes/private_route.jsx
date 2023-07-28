<<<<<<< HEAD
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/category";
import Router from './router';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import SignIn from "../scenes/Auth/signin";
import { useState } from "react";
import Intrest from "../scenes/Interest";
import Setting from "../scenes/setting";

function Private_route() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div>
        
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />

              <Routes>
                <Route exact path={Router.MAIN} element={<Dashboard/>} />
                <Route exact path={Router.CATEGORIE} element={<Team/>} />
                <Route exact path={Router.INTREST} element={<Intrest/>} />
                <Route exact path={Router.SETTING} element={<Setting/>} />

              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      
    </div>
  );
}

export default Private_route;
=======
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/category";
import Router from './router';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import SignIn from "../scenes/Auth/signin";
import { useState } from "react";
import Intrest from "../scenes/Interest";

function Private_route() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div>
        
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />

              <Routes>
                <Route exact path={Router.MAIN} element={<Dashboard/>} />
                <Route exact path={Router.CATEGORIE} element={<Team/>} />
                <Route exact path={Router.INTREST} element={<Intrest/>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      
    </div>
  );
}

export default Private_route;
>>>>>>> 6b2f24819b3e72ab1e9794ed5305bf1385bd4d64
