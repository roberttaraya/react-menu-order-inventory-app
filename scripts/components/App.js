import React, { Component } from 'react';
import Catalyst from 'react-catalyst';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import h from '../helpers';
import reactMixin from 'react-mixin';

import Rebase from 're-base';
var base = Rebase.createClass('https://catch-of-the-day-9419c.firebaseio.com/');

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentDidMount = () => {
    var storeId = this.props.params.storeId;
    base.syncState(storeId + '/fishes', {
      context: this,
      state: 'fishes',
    })

    var localStorageKey = 'order-' + storeId;
    var localStorageData = localStorage.getItem(localStorageKey);

    if (localStorageData) {
      this.setState({
        order: JSON.parse(localStorageData),
      })
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    var localStorageKey = 'order-' + this.props.params.storeId;
    localStorage.setItem(localStorageKey, JSON.stringify(nextState.order))
  }

  addFish = (fish) => {
    var timestamp = (new Date()).getTime();
    this.state.fishes["fish-" + timestamp] = fish;
    this.setState({
      fishes: this.state.fishes,
    })
  }

  removeFish = (fishKey) => {
    this.state.fishes[fishKey] = null;
    this.setState({
      fishes: this.state.fishes,
    })
  }

  addOrder = (orderKey) => {
    this.state.order[orderKey] = this.state.order[orderKey] + 1 || 1;
    this.setState({
      order: this.state.order,
    });
  }

  removeOrder = (orderKey) => {
    delete this.state.order[orderKey];
    this.setState({
      order: this.state.order,
    });
  }

  loadSamples = () => {
    this.setState({
      fishes : require('../sample-fishes'),
    });
  }

  renderFish = () => {
    var fishes = this.state.fishes;
    return (
      Object.keys(fishes).map(key => {
        return (
          <Fish
            key={key}
            index={key}
            details={fishes[key]}
            addOrder={this.addOrder}
          />
        )
      })
    )
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {this.renderFish()}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeOrder={this.removeOrder}
        />
        <Inventory
          addFish={this.addFish}
          fishes={this.state.fishes}
          loadSamples={this.loadSamples}
          linkState={this.linkState.bind(this)}
          removeFish={this.removeFish}
        />
      </div>
    )
  }
};

reactMixin.onClass(App, Catalyst.LinkedStateMixin)
