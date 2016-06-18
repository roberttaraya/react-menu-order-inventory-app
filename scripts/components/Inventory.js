import React, { Component, PropTypes } from 'react';
import AddFishForm from './AddFishForm';

export default class Inventory extends Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired,
    fishes: PropTypes.object.isRequired,
    loadSamples: PropTypes.func.isRequired,
    linkState: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
  };

  renderInventory = () => {
    var linkState = this.props.linkState;
    var fishes = this.props.fishes;
    var fishKeys = Object.keys(fishes);

    return fishKeys.map(key => {
      return (
        <div className="fish-edit" key={key}>
          <input type="text" valueLink={linkState('fishes.' + key + '.name')} required />
          <input type="text" valueLink={linkState('fishes.' + key + '.price')} required />
          <select valueLink={linkState('fishes.' + key + '.status')}>
            <option value="available">Fresh!</option>
            <option value="unavailable">Sold Out!</option>
          </select>
          <textarea valueLink={linkState('fishes.' + key + '.desc')}></textarea>
          <input type="text" valueLink={linkState('fishes.' + key + '.image')} />
          <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {this.renderInventory()}
        <AddFishForm
          addFish={this.props.addFish}
          fishes={this.props.fishes}
        />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
};
