import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
        <div className="container">
          <h1 className="banner"></h1>
          <ul className="item-list">
            <li className="item-body">
              <img className="icon" src="https://gw.alicdn.com/tps/i1/TB1eSyDGFXXXXaRXVXXszjdGpXX-140-140.png?imgtag=avatar" alt="test image"/>
              <div className="desc">
                Item desc
                <div className="price">100</div>
              </div>
            </li>
          </ul>
        </div>
    );
  }
}