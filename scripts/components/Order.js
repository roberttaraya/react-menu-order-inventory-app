import React, { Component, PropTypes } from 'react';
import h from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

export default class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeOrder: PropTypes.func.isRequired,
  };

  renderOrder = () => {
    var fishes = this.props.fishes;
    var order = this.props.order;
    var orderKeys = Object.keys(order);

    return (
      orderKeys.map(key => {
        var fish = fishes[key];
        var count = order[key];
        var removeButton = <button onClick={this.props.removeOrder.bind(null, key)}>&times;</button>

        if (!fish) {
          return <li key={key}>Sorry, fish no longer available! {removeButton}</li>
        }

        return (
          <li key={key}>
            <span>
              <CSSTransitionGroup
                component="span"
                transitionName="count"
                transitionLeaveTimeout={250}
                transitionEnterTimeout={250}
              >
                <span key={count}>{count}</span>
              </CSSTransitionGroup>
              lbs {fish.name} {removeButton}
            </span>
            <span className="price">{h.formatPrice(count * fish.price)}</span>
          </li>
        )
      })
    )
  }

  renderTotal = () => {
    var fishes = this.props.fishes;
    var order = this.props.order;
    var orderKeys = Object.keys(order);
    var total = orderKeys.reduce((prevTotal, key) => {
      var fish = fishes[key];
      var count = order[key];
      var isAvailable = fish && fish.status === 'available';

      if (fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0);
      }

      return prevTotal;
    }, 0);

    return (
      <li className="total">
        <strong>Total:</strong>
        {h.formatPrice(total)}
      </li>
    )
  }

  render() {
    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <CSSTransitionGroup
          className="order"
          component='ul'
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.renderOrder()}
          {this.renderTotal()}
        </CSSTransitionGroup>
      </div>
    )
  }
};
