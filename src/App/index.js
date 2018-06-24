import React, { Component } from 'react'
import CallbackFiller from 'cache-manager-web'

const Cache = CallbackFiller({store: 'memory', max: 100, ttl: 5})

class App extends Component {
  constructor (args) {
    super(args)
    this.state = {
      data: [],
      fetchTime: 0,
      fetchState: 'Waiting for fetch..'
    }
  }

  render () {
    const { data, fetchTime, fetchState } = this.state

    const getDate = () => {
      const cacheKey = 'javascript'
      const time = new Date().valueOf()
      Cache.wrap(cacheKey, async () => {
        // Get data from the network
        console.log('Fetch from Network')
        this.setState({
          fetchState: 'Fetching data from network...'
        })
        const data = await fetch(`https://www.subreddit.com/r/${cacheKey}.json`, {
          method: 'GET',
          mode: 'cors',
          cache: 'default'
        })
          .then(response => response.json())
          .then(json => json)
        return data
      }, (err, data) => {
        // Callback
        if (err) {
          console.log('err', err)
        } else {
          console.log('data', data)
          this.setState({
            data: data.data.children,
            fetchTime: `${new Date().valueOf() - time} ms`
          })
          this.setState({
            fetchState: `Complete fetch data`
          })
        }
      })
    }

    const cleanDate = () => {
      this.setState({
        data: [],
        fetchTime: 0,
        fetchState: 'Waiting for fetch..'
      })
    }

    const renderData = data.map((item, index) => {
      const { url, title } = item.data
      return (
        <div key={ index }>
          <a href={ url }>{ title }</a>
        </div>
      )
    })

    return (
      <div>
        <p>The cache is valid for 5 seconds</p>
        <p>
          { `fetch time: ${fetchTime}` }
        </p>
        <p>
          { `fetch state: ${fetchState}` }
        </p>
        <input type="button" onClick={ getDate } value="fetch"/>
        <input type="button" onClick={ cleanDate } value="clean"/>
        <div>
          { renderData }
        </div>
      </div>
    )
  }
}

export default App
