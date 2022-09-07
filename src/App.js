import React from "react";
import {
  RecoilRoot
} from 'recoil';
import "./App.css";
import VotePage from "./pages/VotePage";

function App() {
  return (
    <RecoilRoot>
    <div className="App">
      <div className="app-container">
        <VotePage/>
      </div>
    </div>
    </RecoilRoot>
  );
}

export default App;
