import React, { Component, PropTypes } from 'react';

export default class AddFishForm extends Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired,
    fishes: PropTypes.object.isRequired,
  };

  createFish = (event) => {
    event.preventDefault();
    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value,
    }
    this.props.addFish(fish);
    this.refs.fishForm.reset();
  }

  render() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name" />
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status" >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc" ></textarea>
        <input type="text" ref="image" placeholder="URL to Image"/>
        <button type="sumbit">+ Add Item</button>
      </form>
    )
  }
};
