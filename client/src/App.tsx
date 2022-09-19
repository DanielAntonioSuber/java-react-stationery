import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Route path='/' element={<h1>Hola</h1>} />
    </BrowserRouter>
  )
}

export default App