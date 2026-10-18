
import { useState, useEffect } from 'react'
import './App.css'

const osoite = 'http://localhost:3001/tehtavat'

function App() {
  const [tehtava, setTehtava] = useState('')
  const [tehtavat, setTehtavat] = useState([])

  useEffect(() => {
    fetch(osoite)
      .then(response => response.json())
      .then(data => setTehtavat(data))
  }, [])

  function lisaaTehtava() {
    if (tehtava.trim() === '') {
      return
    }

    fetch(osoite, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nimi: tehtava })
    })
      .then(response => response.json())
      .then(data => {
        setTehtavat([...tehtavat, data])
        setTehtava('')
      })
  }

  function poistaTehtava(id) {
    fetch(osoite + '/' + id, {
      method: 'DELETE'
    })
      .then(() => {
        setTehtavat(tehtavat.filter(t => t.id !== id))
      })
  }

  return (
    <div className="app">
      <h1>Tehtävälista</h1>

      <input
        type="text"
        value={tehtava}
        onChange={e => setTehtava(e.target.value)}
        placeholder="Kirjoita tehtävä"
      />

      <button onClick={lisaaTehtava}>
        Lisää
      </button>

      <ul>
        {tehtavat.map(t => (
          <li key={t.id}>
            {t.nimi}{' '}
            <button onClick={() => poistaTehtava(t.id)}>
              Poista
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
