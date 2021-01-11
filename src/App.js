import Metrics from './components/metrics.js';
import React from 'react';
import axios from 'axios';
import Time from './components/time.js';
import Loader from 'react-loader-spinner'

import './App.css';

class App extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state={
      loading:true,
      time:'',
      metrics:'',
    }
  }
  componentDidMount() {
    this._isMounted = true;
    this.load();
    setInterval(function () {
      this.load();
    }.bind(this), 30000); 
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  async load() {
      this.setState({ loading: true })
    try {
      console.log('Initializing data loading.........');
      const metrics = "http://localhost:9091/metrics"
      const time = "http://localhost:9091/time"
      const that = this;
      const metricsPromise = axios.get(metrics, {
        headers: { authorization: 'mysecrettoken' }
      })
      const timePromise = axios.get(time,{
        headers: { authorization: 'mysecrettoken' }
      });

       Promise.all([timePromise, metricsPromise]).then((res) => {
        const time = res[0].data
        const metrics = res[1].data
        if (that._isMounted) {
          that.setState({ loading: false, time, metrics});
        }
      });
    } catch (error) {
      console.log('Error in attempting to load all resources, App.js', error);
    }
  }
  render() {
    const { metrics, loading, time } = this.state;

    if (loading) {
      return (
        <Loader/>
      );
    } else {
      return (
        <div className="App">
          <Time className="time" time={time} />
          <Metrics  metrics={metrics} />
        </div>
      );
    }
  }

}

export default App;
