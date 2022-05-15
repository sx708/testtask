import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import {
  HashRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'

const SYMBOLS = [ 'BTCUSDT', 'BNBBTC', 'ETHBTC' ]

class Orders extends Component {

  constructor() {
    super()
    this.state = {
      
    }
  }
  
  render() {
    const { width, height, plugins } = this.props
    
    return (
      <div style={{ width, height }}>
        <Form.Select value={this.props.plugins.get('symbol')} onChange={(e) => this.props.plugins.get('events').emit('newSymbol', e.target.value)}>
          {SYMBOLS.map((symbol) => (
            <option key={symbol} value={symbol}>{symbol}</option>
          ))}
        </Form.Select>
      </div>
    )
  }
}

export default Orders
