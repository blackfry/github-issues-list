import React, { Component } from 'react'
import IssuesList from './components/issues'
import './styles.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <IssuesList />
      </div>
    )
  }
}

export default App
