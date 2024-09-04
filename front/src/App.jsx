import { useState } from 'react'
import EmpregadoList from './components/EmpregadoList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EmpregadoList />
    </>
  )
}

export default App
