import React from 'react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <Link to="/login">Login</Link>
      <br/>
      <hr/>
      <Link to="/signup">SignUp</Link>
    </div>
  )
}

export default App