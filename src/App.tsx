import React from "react";
import "./App.css";
import Terminal from "./components/Terminal";

const getYear = () => {
  return new Date().getFullYear();
};

const welcomeMessage = `Welcome to my site, dear visitor.

Type 'help' to view a list of available commands (hit enter after typing your command).
`;


const bannerCondensed =
  "      .__ __   ___________                  .__              .__   \n" +
  "___  _|__|  | _\\__    ___/__________  _____ |__| ____ _____  |  |  \n" +
  "\\  \\/ /  |  |/ / |    |_/ __ \\_  __ \\/     \\|  |/    \\\\__  \\ |  |  \n" +
  " \\   /|  |    <  |    |\\  ___/|  | \\/  Y Y  \\  |   |  \\/ __ \\|  |__ \n" +
  "  \\_/ |__|__|_ \\ |____| \\___  >__|  |__|_|  /__|___|  (____  /____/ \n" +
  "              \\/            \\/            \\/        \\/     \\/      \n" +
  "  \u00A9 " +
  getYear();

const prompt = ">";

const footerShortcuts = ["^G", "^O", "^W", "^K", "^J", "^X", "^R", "^\\", "^U", "^T"];

const footerFullforms = [
  "Get Help", 
  "Write Out", 
  "Where Is", 
  "Cut Text", 
  "Justify", 
  "Exit", 
  "Read File", 
  "Replace", 
  "Paste Text", 
  "To Spell",
];

function App() {
  return (
    <Terminal
      welcomeMessage={welcomeMessage}
      banner={bannerCondensed}
      terminalPrompt={prompt}
      footerShortcuts={footerShortcuts}
      footerFullforms={footerFullforms}
    />
  );
}

export default App;
