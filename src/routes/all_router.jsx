import React, { useEffect, useState } from "react";
import Private_route from "./private_route";
import { Routes as Switch, Route, BrowserRouter } from "react-router-dom";
import Router from "./router";
import SignIn from "../scenes/Auth/signin";
import SignUp from "../scenes/Auth/signup";
import { Backdrop, CircularProgress } from "@mui/material";
function All_router() {
 // const [token, setToken] = useState("");
   // setToken(localStorage.getItem("usersdata"));
    const token = localStorage.getItem("usersdata");
 
  return (
    <div>
      <BrowserRouter>
        <Switch>
        
          {token === "" || token === null ? (
            <>
         
              <Route path={Router.MAIN} element={<SignIn />} />
            </>
          ) : (
            <>
              
              <Route exact path={Router.MAIN} element={<Private_route />} />
            </>
          )}
          <Route exact path="/signup" element={<SignUp />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default All_router;
