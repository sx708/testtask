import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import {
  HashRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import BigNumber from 'bignumber.js'

const arr500 = [ ...new Array(500) ]

class Orders extends Component {

  constructor() {
    super()
    this.state = {
      bids: [],
      asks: [],
    }
  }
  
  componentDidMount() {
    const processData = (data) => {
      if (data.u <= this.lastUpdateId) {
        return
      }
      
      let bids = [ ...this.state.bids ]
      let asks = [ ...this.state.asks ]
      
      data.b.map((bid) => {
        const itemIndex = bids.findIndex(i => i[0] === bid[0])
        if (itemIndex >= 0) {
          bids[itemIndex] = [ bid[0], bid[1], BigNumber(bid[0]).times(bid[1]).toFixed(8) ]
        } else {
          bids.push([ bid[0], bid[1], BigNumber(bid[0]).times(bid[1]).toFixed(8) ])
        }
      })
      
      data.a.map((ask) => {
        const itemIndex = asks.findIndex(i => i[0] === ask[0])
        if (itemIndex >= 0) {
          asks[itemIndex] = [ ask[0], ask[1], BigNumber(ask[0]).times(ask[1]).toFixed(8) ]
        } else {
          asks.push([ ask[0], ask[1], BigNumber(ask[0]).times(ask[1]).toFixed(8) ])
        }
      })
      
      bids = bids.filter((bid) => BigNumber(bid[1]).gt(0))
      asks = asks.filter((ask) => BigNumber(ask[1]).gt(0))
      
      bids = bids.sort((a, b) => {
        return BigNumber(a[0]).lt(b[0]) ? 1 : -1
      })
      asks = asks.sort((a, b) => {
        return BigNumber(a[0]).gt(b[0]) ? 1 : -1
      })
      
      this.setState({ bids: bids.slice(0, 500), asks: asks.slice(0, 500) })
    }
    
    let queue = []
    this.ws = new WebSocket('wss://stream.binance.com:9443/ws/' + this.props.plugins.get('symbol').toLowerCase() + '@depth')
    this.ws.onmessage = (data) => {
      data = JSON.parse(data.data)
      
      if (!this.lastUpdateId) {
        queue.push(data)
        return
      }
      
      if (queue.length) {
        queue.map((qdata) => {
          processData(qdata)
        })
        queue = []
      }
      
      processData(data)
    }
    
    fetch('https://api.binance.com/api/v3/depth?symbol=' + this.props.plugins.get('symbol') + '&limit=500', {
      headers: {
        origin: undefined,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.lastUpdateId = data.lastUpdateId
        data.bids.map((bid) => {
          bid[2] = BigNumber(bid[0]).times(bid[1]).toFixed(8)
        })
        data.asks.map((ask) => {
          ask[2] = BigNumber(ask[0]).times(ask[1]).toFixed(8)
        })
        this.setState({ bids: data.bids, asks: data.asks })
      })
  }
  
  componentWillUnmount() {
    this.ws.close()
  }
  
  render() {
    const { plugins } = this.props
    
    return (
      <Table hover>
        <thead>
          <tr>
            <th>Price</th>
            <th>Amount</th>
            <th className='d-none d-md-block'>Total</th>
            <th>Price</th>
            <th>Amount</th>
            <th className='d-none d-md-block'>Total</th>
          </tr>
        </thead>
        <tbody>
          {arr500.map((u, i) => this.state.bids[i] && this.state.asks[i] && <tr key={i}>
            <td>{this.state.bids[i] && this.state.bids[i][0]}</td>
            <td>{this.state.bids[i] && this.state.bids[i][1]}</td>
            <td className='d-none d-md-block'>{this.state.bids[i] && this.state.bids[i][2]}</td>
            <td>{this.state.asks[i] && this.state.asks[i][0]}</td>
            <td>{this.state.asks[i] && this.state.asks[i][1]}</td>
            <td className='d-none d-md-block'>{this.state.asks[i] && this.state.asks[i][2]}</td>
          </tr> || null)}
        </tbody>
      </Table>
    )
  }
}

export default Orders
