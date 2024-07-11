import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import TerminalOutput from "./TerminalOutput";
import InputArea from "./InputArea";
import Footer from "./Footer";
import ErrorMessage from "./ErrorMessage";
import WelcomeMessage from "./WelcomeMessage";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

// Just a little helper function so I don't have to continually update my age
const getAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const downloadFile = (uri: string, downloadName: string) => {
  const link = document.createElement("a");
  link.download = downloadName;
  link.href = uri;
  link.click();
  link.remove();
};

type TerminalProps = {
  terminalPrompt?: string;
  banner?: string;
  welcomeMessage?: string;
  footerShortcuts?: string[];
  footerFullforms?: string[];
};
const Terminal = (props: TerminalProps) => {
  const { 
    terminalPrompt = ">", 
    banner, 
    welcomeMessage, 
    footerShortcuts, 
    footerFullforms, 
  } = props;
  const [output, setOutput] = useState<(string | JSX.Element)[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(3);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const scrollLastCommandTop = () => {
    scrollRef.current?.scrollIntoView();
  };

  useEffect(scrollLastCommandTop, [output]);

  const echoCommands = [
    "help",
    "about",
    "projects",
    "career",
    "contact",
    "awards",
    "repo",
    "skills",
    "website",
  ] as const;
  type EchoCommand = typeof echoCommands[number];
  const utilityCommands = ["clear", "all", "cv", "exit"] as const;
  type UtilityCommand = typeof utilityCommands[number];
  const allCommands = [...echoCommands, ...utilityCommands] as const;
  type Command = typeof allCommands[number];

  function isEchoCommand(arg: string): arg is EchoCommand {
    return (echoCommands as ReadonlyArray<string>).includes(arg);
  }

  function isUtilityCommand(arg: string): arg is UtilityCommand {
    return (utilityCommands as ReadonlyArray<string>).includes(arg);
  }

  function isValidCommand(arg: string): arg is Command {
    return isEchoCommand(arg) || isUtilityCommand(arg);
  }

  const glow = (text: string) => {
    return <span className="terminal-glow">{text}</span>;
  };

  const commands: { [key in EchoCommand]: JSX.Element } = {
    help: (
      <div>
        <p>
          Wow, I thought the only people who would visit this site would be bots
          and spammers, guess I was wrong. Just type any of the commands below
          to get some more info. You can even type a few letters and press [tab]
          or '.' to autocomplete.
        </p>
        <dl>
          <dt>about</dt>
          <dd>Everything (well, not everything) about me</dd>
          <dt>projects</dt>
          <dd>Yeah, I've made some cool stuff before</dd>
          <dt>career</dt>
          <dd>My employment history</dd>
          <dt>skills</dt>
          <dd>I like to think I'm okay at some stuff</dd>
          <dt>awards</dt>
          <dd>A bit of boasting</dd>
          <dt>repo</dt>
          <dd>Take a look at some of my work</dd>
          <dt>cv</dt>
          <dd>Check out my CV [pdf - 197KB]</dd>
          <dt>contact</dt>
          <dd>This is where you can reach me</dd>
          <dt>website</dt>
          <dd>How I built this</dd>
          <dt>all</dt>
          <dd>Tell me everything</dd>
          <dt>exit</dt>
          <dd>Close this tab and exit. Hope you come back soon!</dd>
          <dt>clear</dt>
          <dd>Clears the terminal of all output</dd>
        </dl>
      </div>
    ),
    about: (
      <div>
        <p>
          Hey there! Thanks for taking such a keen interest in me. Here's the story of how you ended up staring at this website on your phone - I encoded the URL onto an NFC tag, and flashed the tag in front of your phone. NFC needs about 1 second to transmit data to devices - enough time for me to get the job done, and then to make a safe retreat out of arm's reach. Pretty cool, right?
        </p>
        <p>
          Don't worry - your phone is <b><i>not</i></b> being hacked, and none of your data is being stored to my database. The purpose of this interaction is to have you know everything about me as a Software Engineer and Tech Enthusiast.
        </p>
        <p>
          Right, so, where do I begin? Well, my parents met in... Nah, just kidding.
          <br />
          As you might know, my name is {glow("Vikramaditya Bhatnagar")}. I'm a{" "}
          {getAge(new Date(1997, 7, 22))} year old {glow("Computer Scientist")}{" "}
          born and raised in serene ol' Dehradun at the foothills of the Himalayas
          and currently living in Gurugram.
        </p>
        <p>
          I graduated from Symbiosis International Univeristy, Pune, with a Bachelor of Computer Applications degree. It comprised of three years of computer science courses, as well as a few business courses (ex: economics and stats).
        </p>
        <p>
          I also have a Master's degree in Computer Applications from IP University, New Delhi. It was during this time that I started my first programming-related job, working as a Full-Stack Software Developer at a startup. I was also a part of a few different bands while at Uni; highlights include going out on tour with Sunidhi Chauhan in October 2019, getting signed to a Record Label, and being on stage, making countless memories with some amazing people.
        </p>
        <p>
          As a Tech Enthusiast, I'm really interested in Machine Learning, the Blockchain and Cryptography, creating software solutions to help solve problems (particularly in the {glow("Fintech")} realm), and, well, creating stuff like this.
        </p>
        <p>
          My previous formal work experience includes:
          <ul>
          <li>
              writing an ETL pipeline for cleaning and studying bank data for the{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://jk.gov.in/jammukashmir/"
              >
                Jammu & Kashmir State Government
              </a>
              ;
            </li>
            <li>
              working on a website-building tool targeting developing countries, called{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://madewithover.com"
              >
                Softlink
              </a>
              ;
            </li>
            <li>
              creating Software Solutions for countless clients, domestic and foreign.
            </li>
          </ul>
        </p>
        <p>
          Nowadays I'm developing a method to download happiness from servers in Amsterdam... I wish! I am
          currently working at the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.adani.com/"
          >
          Adani Group 
          </a>
          &nbsp;as a Senior Software Engineer, working on the Backend Development of
          the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.adanione.com/"
          >
          AdaniOne Super-App
          </a>
          .
        </p>
        <p>
          Please feel free to get in touch with me to discuss any cool
          opportunities. My contact details can be found by typing 'contact',
          and if you would like to check out my {glow("CV")}, simply type 'cv'
          or click{" "}
          <a href="CV.pdf" download="Vikramaditya Bhatnagar - Curriculum Vitae.pdf">
            here
          </a>
          .
        </p>
      </div>
    ),
    projects: (
      <>
        <p>
          I've been tinkering for a while now. Why don't you check out a few of my public code repositories? Just type 'repo' to get the links.
        </p>
        <p>
          I'm always open to working on something cool on the side, so if you ever have something in mind, give me a holler! You can find my socials and contact information by typing 'contacts'.
        </p>
        <p>
          You can also check out my MCA thesis on developing{" "}
          <a href="MSc_Thesis.pdf" download="Vikramaditya Bhatnagar - MCA Thesis.pdf">
            an Encrypted File Sharing System that operates over the Blockchain
          </a>
          {" "}- this one took a while!
        </p>
      </>
    ),
    career: (
      <>
      <p className="changelog"><b>CAREER_CHANGELOG.md</b></p>
      <p>
        <dl>
          <dt>Dec 2023 - </dt>
            <dd>Adani Digital Labs, Gurugram</dd>
            <dd>Primary Duties: Backend Development · Solution Architecture</dd>
            <dd>Primary Engineer in the development of the <a href="https://www.adanione.com/lending" target="_blank" rel="noreferrer">Loan Lending Line of Business</a></dd>
            <br/>

          <dt>May 2022 - Dec 2023</dt>
            <dd>Appventurez Mobitech, Noida</dd>
            <dd>Primary Duties: Backend Development · DevOps · Database Management & Administration</dd>
            <dd>Secondary Duties: Solution Architecture · Front-End Development</dd>
            <dd>Frequent contributor to Project Management, Content Writing, Client Interaction</dd>
            <br/>

          <dt>Aug 2019 - May 2022</dt>
            <dd>Parth Technologies, Noida</dd>
            <dd>Primary Duties: Backend Development · Front-End Development</dd>
            <dd>Secondary Duties: DevOps (AWS)</dd>
        </dl>
      </p>
    </>
    ),
    contact: (
      <>
        <dl>
          <dt>Email</dt>
          <dd>
            <a
              href="mailto:vikramaditya.2207@gmail.com"
              target="_blank"
              rel="noreferrer"
            >vikramaditya.2207@gmail.com</a>
          </dd>
          <dt>Phone</dt>
          <dd>+91-9958196614</dd>
          <dt>LinkedIn</dt>
          <dd>
            <a 
              href="https://www.linkedin.com/in/vikramaditya-bhatnagar-a835a2162/"
              target="_blank"
              rel="noreferrer"
            >Vikramaditya Bhatnagar</a>
          </dd>
          <dt>Check out some of my music</dt>
          <dd>
            <a 
              href="https://www.instagram.com/vukrim/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </dd>
          <dt>Myspace</dt>
          <dd>Just kidding</dd>
          <dt>Book a 1:1 Consulting Call with me</dt>
          <dd>
            <a 
              href="https://topmate.io/vikramaditya_bhatnagar"
              target="_blank"
              rel="noreferrer"
            >Let's Connect!</a>
          </dd>
        </dl>
      </>
    ),
    awards: (
      <>
        <dl>
          <dt>2022</dt>
          <dd>'Rising Star' at <a href="https://www.appventurez.com/" target="_blank" rel="noreferrer">Appventurez</a> for the month of August</dd>

          <dt>2021</dt>
          <dd>Computer Science Merit Award (top 3 in Batch) - Sem VI (for Thesis)</dd>
          <dd>Computer Science Merit Award (top 3 in Batch) - Sem V</dd>

          <dt>2018</dt>
          <dd>IPU Common Entrance Test: All India Rank 18</dd>
          <dd>MAH MCA CET: Distinction (99.79 Percentile)</dd>
          <dd>Class Medal (1st place) for Advanced Programming in C</dd>

          <dt>2017</dt>
          <dd>Class Medal (1st place) for Programming in C</dd>

          <dt>2015</dt>
          <dd>International Mathematics Olympiad: Gold Medalist</dd>
          <dd>Political Science Batch Topper</dd>
          <dd>Co-founder of School's Model United Nations Club</dd>
          <dd>Student Council Member (Editorial Captain)</dd>

          <dt>2014</dt>
          <dd>Zonal Informatics Olympiad: All India Qualifier</dd>
        </dl>
      </>
    ),
    repo: (
      <>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Vikram1997-hue"
        >
          GitHub
        </a>{" "}
        - Unfortunately, I could only make a small subset of my projects
        public. I normally spend my time contributing to the{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://photos.app.goo.gl/qW7JYTuh4yo8fzhG8"
        >
          codebase at work
        </a>{" "};P
      </>
    ),
    skills: (
      <>
        <div className="terminal-heading">Languages</div>
        <dl>
          <dt>JavaScript / TypeScript</dt>
          <dd>
            [{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              #############
            </span>{" "}
            ]
          </dd>
          {/* <dt>Go</dt>
          <dd>
            [{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              ############
            </span>
            {"  "}
            ]
          </dd> */}
          {/* <dt>Java</dt>
          <dd>
            [{" "}
            <span style={{ color: "#42D100", textShadow: "0 0 5px #42D100" }}>
              ###########
            </span>
            {"   "}
            ]
          </dd> */}
          <dt>C / C++</dt>
          <dd>
            [{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px #99D100" }}>
              ########
            </span>
            {"      "}
            ]
          </dd>
          <dt>Python (pumping those numbers up)</dt>
          <dd>
            [{" "}
            <span style={{ color: "#D16200", textShadow: "0 0 5px #D16200", animation: "flicker 1.5s infinite alternate" }}>
              #####
            </span>
            {"         "}
            ]
          </dd>
        </dl>

        <div className="terminal-heading">Frameworks, Environments</div>
        <dl>
          <dt>Node.js</dt>
          <dd>
            [{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              #############
            </span>{" "}
            ]
          </dd>
          <dt>NestJS</dt>
          <dd>
            [{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              ############
            </span>{"  "}
            ]
          </dd>
          <dt>Express.js</dt>
          <dd>
            [{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              #############
            </span>{" "}
            ]
          </dd>
          <dt>Flutter</dt>
          <dd>
            [{" "}
            <span style={{ color: "#D16200", textShadow: "0 0 5px #D16200" }}>
              #####
            </span>
            {"         "}
            ]
          </dd>
          </dl>

          <div className="terminal-heading">Databases</div>
        <dl>
          <dt>MongoDB</dt>
          <dd>
            [{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              #############
            </span>{" "}
            ]
          </dd>
          <dt>PostGreSQL / MySQL / MSSQL Server</dt>
          <dd>
            [{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              ############
            </span>{"  "}
            ]
          </dd>
          <dt>Redis</dt>
          <dd>
            [{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px #99D100" }}>
              ########
            </span>
            {"      "}
            ]
          </dd>
          </dl>

        <div className="terminal-heading">Cloud &amp; Infrastructure</div>
        <dl>
        <dt>AWS</dt>
          <dd>
            [{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              ############
            </span>{"  "}
            ]
          </dd>
          <dt>GCP / Firebase</dt>
          <dd>
            [{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px #99D100" }}>
              #########
            </span>
            {"     "}
            ]
          </dd>
          <dt>
            Infrastructure <br />
            <span style={{ fontSize: "smaller" }}>
              (Docker, Jenkins, GitHub Actions, etc.)
            </span>
          </dt>
          <dd>
            [{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px #99D100" }}>
              #########
            </span>
            {"     "}
            ]
          </dd>
        </dl>

        <div className="terminal-heading">Front End</div>
        <dl>
          {/* <dt>React</dt>
          <dd>
            [{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              ############
            </span>
            {"  "}
            ]
          </dd> */}
          <dt>General Web Development</dt>
          <dd>
            [{" "}
            <span style={{ color: "#5BD100", textShadow: "0 0 5px #5BD100" }}>
              #########
            </span>
            {"     "}
            ]
          </dd>
          <dt>ReactJS</dt>
          <dd>
            [{" "}
            <span style={{ color: "#D16200", textShadow: "0 0 5px #D16200" }}>
              #####
            </span>
            {"         "}
            ]
          </dd>
        </dl>
      </>
    ),
    website: (
      <>
        <p>
          I built this website using {glow("React")} and {glow("TypeScript")}. The website has been hosted using {glow("GoDaddy")} (although I might switch to AWS sometime in the near future). For NFC encoding, I used a simple app called {glow("NXP TagWriter")} and an NFC tag I bought online. Some visual elements, like the menu at the bottom of the screen, are just for aesthetic purposes.
        </p>
        <p>
          Resources that made this project possible include -
          <dl>
            <dd>
              Forrest Knight's{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/watch?v=KtYby2QN0kQ"
              >
                video on the same topic 
              </a>
            </dd>
          </dl>
          <dl>
            <dd>
              Random ASCII art generators on the Internet (I used{" "}
                <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20"
              >
                this one by Patorjk 
              </a>
              )
            </dd>
          </dl>
          <dl>
            <dd>
              Craig Feldman's{" "}
                <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/craig-feldman/personal-website-react"
              >
                concept repo
              </a>
            </dd>
          </dl>
        </p>

        <p>
          The source code for this site can be found on{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Vikram1997-hue/vikTerminal"
          >
            GitHub
          </a>
          . If you're a fresher looking for a job, feel free to use this website for inspiration, or go ahead and copy some of the code! If you do, all I ask is that you give this site a mention, and add a star to the project on GitHub :)
        </p>
      </>
    ),
  };

  const processCommand = (input: string) => {
    logEvent(analytics, "command_received", { command: input });

    // Store a record of this command with a ref to allow us to scroll it into view.
    // Note: We use a ref callback here because setting the ref directly, then clearing output seems to set the ref to null.
    const commandRecord = (
      <div
        ref={(el) => (scrollRef.current = el)}
        className="terminal-command-record"
      >
        <span className="terminal-prompt">{terminalPrompt}</span>{" "}
        <span>{input}</span>
      </div>
    );

    // Add command to to history if the command is not empty
    if (input.trim()) {
      setHistory([...history, input]);
      setHistoryIndex(history.length + 1);
    }

    // Now process command (case-insensitive)
    const inputCommand = input.trim().toLowerCase();
    if (!isValidCommand(inputCommand)) {
      setOutput([
        ...output,
        commandRecord,
        <div className="terminal-command-output">
          <ErrorMessage command={inputCommand} />
        </div>,
      ]);
    } else if (isEchoCommand(inputCommand)) {
      setOutput([
        ...output,
        commandRecord,
        <div className="terminal-command-output">{commands[inputCommand]}</div>,
      ]);
    } else if (isUtilityCommand(inputCommand)) {
      switch (inputCommand) {
        case "clear": {
          setOutput([]);
          break;
        }
        case "all": {
          // Output all commands in a custom order.
          const allCommandsOutput = [
            "about",
            "awards",
            "skills",
            "projects",
            "career",
            "repo",
            "contact",
            "website",
            "exit",
          ].map((command) => (
            <>
              <div className="terminal-heading">{command}</div>
              <div className="terminal-command-output">
                {commands[command as EchoCommand]}
              </div>
            </>
          ));

          setOutput([commandRecord, ...allCommandsOutput]);
          break;
        }
        case "cv": {
          setOutput([...output, commandRecord]);
          downloadFile("CV.pdf", "Vikramaditya Bhatnagar - Curriculum Vitae.pdf");
          break;
        }
        case "exit": {
          // const newWindow = window.open("about:blank", "_self");
          // window.close();
          // newWindow?.close();
          window.opener = null;
          window.open("", "_self");
          window.close();
        }
      }
    }
  };

  const getHistory = (direction: "up" | "down") => {
    let updatedIndex;
    if (direction === "up") {
      updatedIndex = historyIndex === 0 ? 0 : historyIndex - 1;
    } else {
      updatedIndex =
        historyIndex === history.length ? history.length : historyIndex + 1;
    }
    setHistoryIndex(updatedIndex);
    return updatedIndex === history.length ? "" : history[updatedIndex];
  };

  const getAutocomplete = (input: string) => {
    const matchingCommands = allCommands.filter((c) => c.startsWith(input));
    if (matchingCommands.length === 1) {
      return matchingCommands[0];
    } else {
      const commandRecord = (
        <div
          ref={(el) => (scrollRef.current = el)}
          className="terminal-command-record"
        >
          <span className="terminal-prompt">{terminalPrompt}</span>{" "}
          <span>{input}</span>
        </div>
      );
      setOutput([...output, commandRecord, matchingCommands.join("    ")]);
      return input;
    }
  };

  const focusOnInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      // Prevent tab from moving focus
      event.preventDefault();
    }
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-container" tabIndex={-1} onKeyDown={focusOnInput}>
      <div className="terminal-content">
        {banner && <Banner banner={banner} />}
        {welcomeMessage && (
          <WelcomeMessage message={welcomeMessage} inputRef={inputRef} />
        )}
        <TerminalOutput outputs={output} />
        <InputArea
          setOutput={setOutput}
          processCommand={processCommand}
          getHistory={getHistory}
          getAutocomplete={getAutocomplete}
          inputRef={inputRef}
          terminalPrompt={terminalPrompt}
        />
      </div>
      <div className="footer">
        <Footer
          footerShortcuts={footerShortcuts}
          footerFullforms={footerFullforms}
        />
      </div>
    </div>
  );
};

export default Terminal;
