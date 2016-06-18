import React, { Component } from 'react';
import { History } from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';

export default class StorePicker extends Component {
  handleOnSubmit = (event) => {
    event.preventDefault();
    var storeId = this.refs.storeId.value
    this.history.pushState(null, '/store/' + storeId)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.handleOnSubmit}>
        <h2>Pick Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="submit" />
      </form>
    )
  }
}

reactMixin.onClass(StorePicker, History)
