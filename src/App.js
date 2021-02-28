import {useEffect, useState, memo} from "react"
import './App.css';

let events = []

const App = () => {

  const [isInit, setIsInit] = useState(false)
  const [suggests, setSuggests] = useState([])

  useEffect(() => {
    fetch("./supports.json")
    .then(res=> res.text())
    .then(text=> JSON.parse(text))
    .then(_supports => {
      events = _supports.reduce((acc, cur) => {
        cur.events.forEach(event => {
          acc.push({
            supportName: cur.name,
            eventName: event.name,
            choices: event.choices
          })
        })
        return acc
      }, [])
      setIsInit(true)
    })
  }, [])

  const onInput = e => {
    const val = e.currentTarget.value
    if(!val) {
      setSuggests([])
      return
    }
    const matched = events.reduce((acc, cur) => {
      if(cur.eventName.indexOf(val) > -1){
        acc.push(cur)
      }
      return acc
    }, [])
    setSuggests(matched)
  }

  return (
    <div className="App">
      {isInit?(
        <div className="searchbox">
          <label for="searchbox__label">イベント名</label>
          <input id="searchbox__text" type="text" onInput={onInput}></input>
        </div>
      ):""}
      <SuggestedEvents events={suggests}></SuggestedEvents>
    </div>
  );
}

const SuggestedEvents = memo(({events}) => {
  return (
    <div class="suggestions">
    {events.map(event => {
      return (
        <>
          <h2>{event.eventName}</h2>
          <h5>{event.supportName}</h5>
          <ul>
          {event.choices.map(choice => {
            return (
              <>
                <li>{choice.name}</li>
                <div>{choice.detail}</div>
              </>
            )
          })}
          </ul>
        </>
      )
    })}
    </div>
  )
})

export default App;
