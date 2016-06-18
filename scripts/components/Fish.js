import React, { Component, PropTypes } from 'react';
import h from '../helpers';

export default class Fish extends Component {
  static propTypes = {
    index: PropTypes.string.isRequired,
    details: PropTypes.object.isRequired,
    addOrder: PropTypes.func.isRequired,
  };

  handleAddToOrder = () => {
    var orderKey = this.props.index;
    this.props.addOrder(orderKey);
  }

  render() {
    var details = this.props.details;
    var isAvailable = details.status === "available" ? true : false;
    var buttonText = isAvailable ? "Add To Order" : "Sold Out!"
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.handleAddToOrder}>{buttonText}</button>
      </li>
    )
  }
}
