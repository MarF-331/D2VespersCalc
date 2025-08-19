import './App.css'
import Header from "./Components/Header.tsx";
import Card from "./Components/Card.tsx";

export default function App() {
  return (
    <>
      <Header/>
      <main>
        <Card/>
      </main>
      <footer>
          <p>Built by MarF-331</p>
      </footer>
    </>
  )
}