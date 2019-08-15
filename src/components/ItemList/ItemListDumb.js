import React, { Fragment, Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Item from '../Item/Item';

const Modal = ({ showModal, closeModal }) => {
  return (
    <div className={`modal ${showModal ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-content">
        <div
          className="box"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="field is-grouped">
            <p className="control">
              <Link to="/login" className="button is-link">
                Login for faster checkout!
              </Link>
            </p>
            <p className="control subtitle has-text-centered">
              OR
            </p>
            <p className="control">
              <Link to="/checkout" className="button is-link">
                Continue as a guest.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="modal-close is-large"
        onClick={closeModal}
        aria-label="close"
      />
    </div>
  );
};

class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    // try to avoid double with App didMount request by using makingRequest
    !this.props.makingRequest && this.props.fetchItems();
  }

  goToCheckout = () => {
    if (!this.props.loggedIn && !this.state.showModal) {
      this.setState({ showModal: true });
    } else if (this.props.loggedIn) {
      this.props.history.push('/checkout');
    }
  };

  render() {
    const { items, makingRequest, total } = this.props;

    const renderEmpty = items.length === 0;
    const disableButton = renderEmpty || makingRequest;

    return (
      <Fragment>
        <Modal
          showModal={this.state.showModal}
          closeModal={_ => this.setState({ showModal: false })}
        />

        <section className="section">
          <div className="container has-text-centered">
            <h1 className="title">Cart</h1>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <ul className="list">
              {renderEmpty ? (
                <li className="list-item has-text-centered">Empty Cart</li>
              ) : (
                items.map(item => <Item key={item.id} item={item} />)
              )}
              <li className="list-item has-text-centered">
                Total: {total.toFixed(2)}
              </li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="field has-text-centered">
              <button
                className="button is-warning"
                type="button"
                disabled={disableButton}
                onClick={_ => this.goToCheckout()}
              >
                Checkout
              </button>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(ItemList);
