import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

import { plugins, events } from 'components'

plugins.set('events', events)
plugins.set('symbol', 'BNBBTC')

const Orders = React.lazy(() => import('modules/Orders'))
const Pairs = React.lazy(() => import('modules/Pairs'))

import 'bootstrap/dist/css/bootstrap.min.css'
import './custom.css'

class App extends Component {

  constructor() {
    super()
  }
  
  componentDidMount() {
    events.on('newSymbol', (symbol) => {
      plugins.set('symbol', symbol)
      this.forceUpdate()
    })
  }
  
  render() {
    return (
      <Router>
        <Navbar bg='light' expand='lg'>
          <Container>
            <Navbar.Brand href='#'>Binance Orders</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href='#/'>Orders</Nav.Link>
                <Nav.Link href='#/symbols'>Pairs</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <Routes>
          <Route exact path='/' element={<React.Suspense fallback={<>...</>}><Orders plugins={plugins} /></React.Suspense>} />
          <Route path='/symbols' element={<React.Suspense fallback={<>...</>}><Pairs plugins={plugins} /></React.Suspense>} />
        </Routes>
      </Router>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('app') )
