import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import FriendsPage from "./Components/FriendsPage/FriendsPage";

import data from "./data.json";
import PersonImg from "./assets/17004.png";

import classes from "./App.module.css";

class App extends Component {
  state = {
    personData: null,
  };

  showFriendsHandler = (personData) => {
    this.setState({ personData: personData });
  };

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const friendsData = data.map((data) => {
      return (
        <div key={Math.random()} className={classes.Person}>
          <div className={classes.ImgContainer}>
            <img src={PersonImg} alt="some img" />
          </div>
          <div className={classes.PersonData}>
            <p>
              <span>Name: </span> {data.firstName} {data.surname}
            </p>
            <p>
              <span>Age: </span>
              {data.age ? data.age : "-"}
            </p>
            <p>
              <span>Gender: </span> {data.gender}
            </p>
          </div>
          <div className={classes.LinkContainer}>
            <Link className={classes.LinkToFriends} to="/Friends" onClick={() => this.showFriendsHandler(data)}>
              Show Friends
            </Link>
          </div>
        </div>
      );
    });

    return (
      <div className={classes.App}>
        <BrowserRouter>
          <h1>Social Network App</h1>
          <Route path="/Friends" render={() => <FriendsPage personData={this.state.personData} />} />
          <Route
            exact
            path="/"
            render={() => (
              <div className={classes.PersonsHeadlineContainer}>
                <h2>Social Network Users</h2>
                <div className={classes.AllPersonsContainer}>{friendsData}</div>
              </div>
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
