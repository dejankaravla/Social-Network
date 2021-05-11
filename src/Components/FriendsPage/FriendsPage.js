import React, { Component } from "react";
import classes from "./FriendsPage.module.css";

import PersonImg from "../../assets/17004.png";
import data from "../../data.json";

export class FriendsPage extends Component {
  state = {
    friends: this.props.personData.friends,
  };

  render() {
    let friendsId = [];
    const friends = data.filter((item) => this.props.personData.friends.includes(item.id));
    const personFriends = friends.map((data) => {
      friendsId.push(...data.friends);
      return (
        <div key={Math.random()} className={classes.FriendsPerson}>
          <div className={classes.FriendsImgContainer}>
            <img src={PersonImg} alt="some img" />
          </div>
          <div className={classes.FriendsPersonData}>
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
        </div>
      );
    });

    const mutualFriendsFilter = data.filter((item) => {
      return friendsId.includes(item.id);
    });

    const mutualFriends = mutualFriendsFilter.map((data) => {
      if (this.props.personData === data) {
        return null;
      } else {
        return (
          <div key={Math.random()} className={classes.FriendsPerson}>
            <div className={classes.FriendsImgContainer}>
              <img src={PersonImg} alt="some img" />
            </div>
            <div className={classes.FriendsPersonData}>
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
          </div>
        );
      }
    });

    let suggestedFriendsData = data.filter((item, i) => {
      if (this.state.friends.length < 2 || item.friends.length < 2) {
        return null;
      } else {
        const mapp = this.state.friends.map((element, i) => item.friends.includes(element));
        const mapps = mapp.filter(Boolean);
        if (mapps.length < 2) {
          return null;
        } else return mapps;
      }
    });

    const suggestedFriends = suggestedFriendsData
      .map((data) => {
        if (this.props.personData === data) {
          return null;
        } else {
          return (
            <div key={Math.random()} className={classes.FriendsPerson}>
              <div className={classes.FriendsImgContainer}>
                <img src={PersonImg} alt="some img" />
              </div>
              <div className={classes.FriendsPersonData}>
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
            </div>
          );
        }
      })
      .filter((item) => item !== null);
    return (
      <div className={classes.FriendsPage}>
        <div className={classes.SelectedPerson}>
          <div className={classes.Person}>
            <div className={classes.ImgContainer}>
              <img src={PersonImg} alt="some img" />
            </div>
            <div className={classes.PersonData}>
              <p>
                <span>Name: </span> {this.props.personData.firstName} {this.props.personData.surname}
              </p>
              <p>
                <span>Age: </span>
                {this.props.personData.age ? this.props.personData.age : "-"}
              </p>
              <p>
                <span>Gender: </span> {this.props.personData.gender}
              </p>
            </div>
          </div>
        </div>
        <div className={classes.AllFriends}>
          <div className={classes.FriendsContainer}>
            <h2>Friends</h2>
            <div className={classes.Friends}>{personFriends}</div>
          </div>
          {suggestedFriends.length >= 1 ? (
            <div className={classes.FriendsContainer}>
              <h2>Suggested Friends</h2>
              <div className={classes.FriendsSuggested}>{suggestedFriends}</div>
            </div>
          ) : null}
          <div className={classes.FriendsContainer}>
            <h2>Mutual Friends</h2>
            <div className={classes.FriendsMutual}>{mutualFriends}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsPage;
