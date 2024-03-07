import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef, forceUpdate } from 'react'
import Markdown from 'react-markdown'
import { animated } from 'react-spring';

import speaker from './speaker.jpeg'
import submarine from './submarine.jpeg'
import controlPanel from './controlpanel.jpeg'
import hull from './hull.png'
import electrical from './electrical.jpeg'
import password from './password.jpeg'
import surfaced from './surfaced.jpeg'
import wreck from './wreck.jpeg'

import bytes from './bytes.png'

import shape0 from './shape0.svg'
import shape1 from './shape1.svg'
import shape2 from './shape2.svg'
import shape3 from './shape3.svg'
import shape4 from './shape4.svg'
import shape5 from './shape5.svg'
import shape6 from './shape6.svg'
import shape7 from './shape7.svg'
import shape8 from './shape8.svg'
import arrowhead from './arrowhead.png'
import heart from './heart.svg'
import brokenHeart from './broken_heart.svg'

import morsecode from './morsecode.wav'
import ocean from './ocean.mp3'

function getNonHiddenProperties(obj) {
  const nonHiddenProperties = [];
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) && !prop.startsWith("_")) {
      nonHiddenProperties.push(prop);
    }
  }
  return nonHiddenProperties;
}

function undupe(arr) {
  const uniqueObjects = new Map();
  const filteredArray = [];

  for (const obj of arr) {
    const nonHiddenProps = getNonHiddenProperties(obj); 
    const uniqueKey = JSON.stringify(obj, nonHiddenProps);

    if (!uniqueObjects.has(uniqueKey)) {
      uniqueObjects.set(uniqueKey, obj);
      filteredArray.push(obj);
    }
  }

  return filteredArray;
}

function newLog(log, logs, setLogs) {
  log.time = new Date(Date.now()).toTimeString('en-US', { hour12: false }).slice(0, 8)
  logs.push(log)
  setLogs(undupe(logs))
}

function Logs(props) {
  return (
    <div className="logs">
      <h1>log</h1>
      {props.logs.map(i => (
        <div className="log">
          <p style={{color: "grey", textAlign: "right"}}>{i.time}</p> <p style={{textAlign: "justify"}}>{i.text}</p>
        </div>
      ))}
    </div>
  )
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function DraggableCircle(props) {
  const circleStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: `conic-gradient(
      from 0deg,
      #f00 0%,
      #f0f 16.67%,
      #00f 33.33%,
      #0ff 50%,
      #0f0 66.67%,
      #ff0 83.33%,
      #f00 100%
    )`,
    transform: `rotate(${props.rotation}deg)`,
    cursor: 'grab', // Cursor style on hover
  };

  const bar = {
    width: '100px',
    height: '10px',
    borderRadius: '5px',
    backgroundColor: `hsl(${props.rotation}, 100%, 50%)`,
    marginBottom: '10px'
  }; 

  return (
    <div className="color">
      <img src={arrowhead} style={{width: '10px', height: '10px', transform: 'rotate(180deg)'}}/>
      <div style={circleStyle} />
      <div style={bar}/>
      <div style={{display: "flex", flexDirection: "row"}}>
        <button onClick={() => {
          props.setRotation(mod(props.rotation - 10, 360))
        }}>anti-clockwise</button>
        <button onClick={() => {
          props.setRotation(mod(props.rotation + 10, 360))
        }}>clockwise</button>
      </div>
    </div>
  );
}

function Clues(props) {
  return (
    <div className="clues">
      <h1>clues</h1>
      <img className="clue" src={props.clues[0]} style={{width: "90%"}}/>
      {props.clues.slice(1).map(i => (
        <div className="clue">
          {i} 
        </div>
      ))}
    </div>
  )
}

function App() {
  const [started, setStarted] = useState(false)
  const [logs, setLogs] = useState([])
  const [clues, setClues] = useState([])
  const [narration, setNarration] = useState("# welcome aboard the AQUA.")
  const [part, setPart] = useState(0)
  const [audioHintGiven, setAudioHintGiven] = useState(false)
  const [lives, setLives] = useState(3)
  
  useEffect(() => {
    if (!started) {
      newLog({
        text: "welcome to the game!",
        source: "welcome"
      }, logs, setLogs)
      newLog({
        text: "any actions you take in this escape room will show up here!",
        source: "welcome"
      }, logs, setLogs)
      new Audio(ocean).play()
      setStarted(true)
    }
    switch(part) {
      case 1:
        setNarration(`you are mariana grande, and you've just entered the belly of aqua, your state-of-the-art (and currently malfunctioning) private submarine. a storm has done a number on your luxurious ride, leaving a critical hull breach and a control panel on the fritz. \\
the clock is ticking: 60 minutes until aqua becomes an expensive metal coffin. your objective? patch the leak, bypass the faulty controls, and muscle this aquatic behemoth back to the surface. \\
remember, mariana, you may be a billionaire, but down here, even the richest can't buy their way out. time to put your survival skills to the test. \\
good luck.

**objective: get through the hatch and unlock the hull room.**
`)
        newLog({
          text: "entered part 1",
          source: "started part 1"
        }, logs, setLogs)
        break
      case 2:
        setClues(clues.concat([bytes]))
        newLog({
          text: "clue dropped!",
          source: "finished part 1"
        }, logs, setLogs)
        setNarration(`the airlock hisses, revealing a nightmare. sunlight blazes through a gaping hull wound, warping metal grotesquely. groans and hisses replace the ship's hum as the hull strains in space's grip. frigid, metallic air whips at your face. a toolbox falls. this is a hell check, not a hull check.

**objective: press the correct squares in the right order to fix the hull.**
`)
        newLog({
          text: "entered part 2",
          source: "started part 2"
        }, logs, setLogs)
        break
      case 3:
        setClues(clues.concat(["a2V5IG1vbnRoIG9mZnNldCBkYXkgKGhpbnQ6IGNvbnRyb2wgcm9vbSBoYXRjaCBwYXNzd29yZCk="]))
        newLog({
          text: "clue dropped!",
          source: "finished part 2"
        }, logs, setLogs)
        setNarration(`as you enter the dimly lit electrical room, you're met with a daunting array of wires and machinery. with a sense of urgency, you realize that restoring power is crucial for your escape. despite the overwhelming task ahead, you steel yourself and with each careful decision, you edge closer to success, knowing that failure is not an option in your quest for freedom.

**objective: drag the color wheel to fix the wires.**
`)
        newLog({
          text: "entered part 3",
          source: "started part 3"
        }, logs, setLogs)
        break
      case 4:
        setClues(clues.concat(["oeerw vnreu tfe h oeisotsfiv n i gteexh"]))
        newLog({
          text: "clue dropped!",
          source: "finished part 3"
        }, logs, setLogs)
        setNarration(`reaching control, your grip tightens on the handle. a surge of adrenaline fuels you as the heavy door swings open, revealing the mission's nerve center. the familiar hum of computers fills the air, illuminating the focused faces of the control team. relief washes over you - you're not alone. determined strides take you to your station, ready to contribute.

**objective: enter the password. here's a hint: the clues panel on your left.**
`)
        newLog({
          text: "entered part 4",
          source: "started part 4"
        }, logs, setLogs)
        break
      case 5:
        setNarration(`you breach the surface, lungs a furnace demanding air. sunlight, harsh and unfamiliar after the endless abyss, pierces your vision. the ocean, once a crushing prison, now sprawls before you, an endless blue tapestry. relief washes over you, a wave crashing over the terror that gripped you in the depths. but victory is short-lived. the vastness of the open water mocks your triumph. land. you need land. this isn't the end, just a new chapter in your fight for survival.`)
        newLog({
          text: "you're done",
          source: "exited ocean"
        }, logs, setLogs)
    }
  }, [part])

  function Game(props) {
    const [round, setRound] = useState(0)
    const [error, setError] = useState("")
    const [background, setBackground] = useState("rgba(40,44,52,0.50)")
    const [clicked, setClicked] = useState([])
    const [rotation, setRotation] = useState(0)

    function submit(id, answer) {
      setError("")
      const pin = document.getElementById(id).value;
      if (pin === answer) {
        if (part === 4) {
          setPart(5)
        } else if (part === 1) {
          if (round === 0) {
            setRound(1)
          } else if (round === 1) {
            setPart(2)
          }
        }
      } else if (answer) {
        newLog({
          text: `${id} ${clicked} invalid`,
          source: `part ${part} wrong`
        }, logs, setLogs)
        setError("wrong answer.")
        setLives(lives - 1)
      }
    }

    const audio = useRef(new Audio(morsecode))

    const twoArraysEqual = (a, b) => {
      return a.every(item => b.includes(item)) && b.every(item => a.includes(item))
    }

    useEffect(() => {
      if (background !== "rgba(255,0,0,0.25)") {
        if (part === 2) {
          if (!twoArraysEqual([0, 3, 5, 8].slice(0, clicked.length), clicked)) {
            setBackground("rgba(255,0,0,0.25)"); // Update background based on latest clicked
            setTimeout(() => setBackground("rgba(40,44,52,0.25)"), 500);
            newLog({
              text: `combination [${clicked.join(",")}] invalid`,
              source: "part 2 wrong"
            }, logs, setLogs)
            setLives(lives - 1)
            setClicked([]); // Reset clicked based on latest state
          } else if (twoArraysEqual(clicked, [0, 3, 5, 8])) {
            setPart(3)
            setClicked([])
          }
        } else if (part === 3) {
          let count = 0
          const answers = [0, 156, 36, 58]
          let wrong = false
          for (let item in clicked) {
            const diff = Math.abs(clicked[item] - answers[count]) % 360
            if (!(diff < 20 || Math.abs(diff - 360) < 20)) {
              setBackground("rgba(255,0,0,0.25)"); // Update background based on latest clicked
              setTimeout(() => setBackground("rgba(40,44,52,0.25)"), 500);
              newLog({
                text: `combination invalid`,
                source: "part 3 wrong"
              }, logs, setLogs)
              setLives(lives - 1)
              setClicked([])
              wrong = true
              break
            }
            count += 1
          }
          if (!wrong && clicked.length === 4) {
            setPart(4)
          }
        }
      }
    }, [clicked]); // Update effect when clicked or background changes

    useEffect(() => {
      if (lives <= 0) {
        setPart(6)
      }
    }, [lives])


    switch(part) {
      case 0:
        return (
          <div className="game" style={{backgroundImage: `linear-gradient(rgba(40,44,52,0.69), rgba(40,44,52,0.69)), url(${submarine})`}}>
            <button className="start" onClick={() => {setPart(1)}}>start</button>
          </div>
        )
      case 1:
        if (round === 0) {
          return (
            <div className="game" style={{backgroundImage: `linear-gradient(rgba(40,44,52,0.69), rgba(40,44,52,0.69)), url(${controlPanel})`}}>
              <h1>hatch: layer 1</h1>
              <div className="hint">
                <h2>listen to hint below</h2> 
                <img src={speaker}/>
                <audio controls onClick={() => {
                  if (!audioHintGiven) {
                    newLog({text: "morse code hint given", source: "morse code hint"}, logs, setLogs)
                    setAudioHintGiven(true)
                  }
                }}>
                  <source src={morsecode} type="audio/wav" />
                </audio>
              </div>
              <input id="pin" placeholder="enter PIN... (y4m2d2)"/>
              <button onClick={() => submit("pin", "20230618")}>submit</button>
              <p style={{color: "red"}}>{error}</p>
            </div>
          )
        } else if (round === 1) {
          return (
            <div className="game" style={{backgroundImage: `linear-gradient(rgba(40,44,52,0.69), rgba(40,44,52,0.69)), url(${controlPanel})`}}>
              <h1>hatch: layer 2</h1>
              <div className="hint">
                <h2>hint</h2>
                <p>kzkrezt zdgcfjzfe</p>
              </div>
              <input id="password" placeholder="enter password..."/>
              <button onClick={() => submit("password", "titanic implosion")}>submit</button>
              <p style={{color: "red"}}>{error}</p>
            </div>
          )
        }
      case 2:
        const shapes = [shape0, shape1, shape2, shape3, shape4, shape5, shape6, shape7, shape8]
        const synonymsArray = [ "evaluate, appraise, scrutinize", "steer, direct, guide", "maintain, preserve, support", "manage, govern, regulate", "comfort, soothe, reassure", "ready, organize, equip", "ease, relieve, mitigate", "warn, notify, caution", "mend, fix, repair" ]; 

        return (
          <div className="game" style={{backgroundImage: `linear-gradient(rgba(40,44,52,0.69), rgba(40,44,52,0.69)), url(${hull})`}}>
            <h1>assess - control - prepare - patch</h1>
            <div className="hint grid">
              {
                [...Array(9).keys()].map(count => {
                  return (
                    <div onClick={() => {
                      if (background !== "rgba(255,0,0,0.25)") {
                        if (!clicked.includes(count)) {
                          setClicked([...clicked, count])
                        } else if (clicked[clicked.length - 1] === count) {
                          setClicked(clicked.filter(c => c != count))
                        } 
                      }
                    }} 
                    style={{
                      backgroundImage: `${clicked.includes(count) ? "linear-gradient(rgba(0,255,0,0.25), rgba(0,255,0,0.25))" : `linear-gradient(${background}, ${background})`}, url(${shapes[count]})`, 
                      fontSize: "20px"
                    }}>
                      {synonymsArray[count]}
                    </div>
                  )
                })
              } 
            </div>
          </div>
        )
      case 3:
        const hints = [16711680, 65433, 16750848, 16774912]
        const answers = [0, 156, 36, 58]

        return (
          <div className="game" style={{backgroundImage: `linear-gradient(rgba(40,44,52,0.69), rgba(40,44,52,0.69)), url(${electrical})`}}>
            <h1>electrical room</h1>
            <DraggableCircle rotation={rotation} setRotation={setRotation} /> 
            <button onClick={() => {
              console.log(answers, rotation)
              if (background !== "rgba(255,0,0,0.25)") {
                setClicked([...clicked, rotation]) 
              }
            }}>submit</button>
            <h2>hints:</h2>
            <div>
              {[...Array(4).keys()].map(i => {
                return <div className="color-hint" style={
                  {
                    background: "none", 
                    color: i < clicked.length ? `hsl(${clicked[i]}, 100%, 50%)` : background === "rgba(40,44,52,0.50)" ? "white" : background
                  }
                }>
                  {hints[i]}
                </div>
              })}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="game" style={{backgroundImage: `linear-gradient(rgba(40,44,52,0.69), rgba(40,44,52,0.69)), url(${password})`}}>
            <h1>control panel</h1>
            <input id="control-password" placeholder="enter password..."/>
            <button onClick={() => submit("control-password", "ovrrdPrssur3")}>submit</button>
            <p style={{color: "red"}}>{error}</p>
          </div>
        )
      case 5:
        return (
          <div className="game" style={{backgroundImage: `linear-gradient(rgba(40,44,52,0.69), rgba(40,44,52,0.69)), url(${surfaced})`}}>
            <h1>good job!</h1>
            <h1>good luck floating on the water for the next few months</h1>
          </div>
        )
      case 6:
        return (
          <div className="game" style={{backgroundImage: `linear-gradient(rgba(40,44,52,0.69), rgba(40,44,52,0.69)), url(${wreck})`}}>
            <h1>game over</h1>
            <h1>you died</h1>
          </div>
        )
    }
  }

  function Lives(props) {
    return (
      <div className="lives">
        {
          [...Array(3).keys()].map(i => {
            console.log(i)
            return <img className="heart" src={i >= props.lives ? brokenHeart : heart} />
          })
        }
        <h2>{lives > 0 ? "you lose a life everytime you get a puzzle wrong. if you lose all three, the submarine will explode." : "meh i told you"}</h2>
      </div>
    )
  }

  return (
    <div className="App">
      <Clues clues={clues}/>
      <div className="body">
        <Markdown className="narration">{narration}</Markdown>
        <Game part={part}/>
        <Lives lives={lives}/>
      </div>
      <Logs logs={logs}/>
    </div>
  )
}

export default App;
