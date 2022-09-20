import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Hola</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App