import React, { Component } from 'react';
import moment from 'moment';
import { createCardClass } from '../utils';
import NewMatchCard from './NewMatchCard';
import MatchLoader from './MatchLoader';
import { Box } from 'rebass';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AllMatchesWrapper extends Component {

  constructor() {
    super();
    this.renderMatch = this.renderMatch.bind(this);
    this.updateClickState = this.updateClickState.bind(this);
    this.state = {clicked: false}
  }

  updateClickState() {
    this.setState({clicked: true});
  }

  renderMatch(cardClass, matchData, teamsByExternalId, index) {
    return (
      <Box
        width={"350px"}
        mx={3}
        className={`restore-${matchData.id}`}
        key={"match-box-" + index}
      >
        <Link
          to={{ pathname: "/matches/" + matchData.id, state: matchData.id }}
          className="remove-link"
          onClick={this.updateClickState}>
          <NewMatchCard
            cardClass={cardClass}
            match={matchData}
            isActive={false}
            homeTeamData={teamsByExternalId[matchData.home_team_external_id]}
            awayTeamData={teamsByExternalId[matchData.away_team_external_id]}
          />
        </Link>
      </Box>
    )
  }

  filterMatches(matches, activeNavbarValue) {
    let currentTime = moment();
    return matches.filter((match) => {
      if(activeNavbarValue == "tracked") {
        return match.twitter_hashtag != null;
      } else if(activeNavbarValue == "upcoming") {
        return moment(match.start_time) > currentTime;
      } else {
        return true;
      }
    })
  }

  render() {
    let { matches, teamId, activeNavbarValue, teamsByExternalId } = this.props;
    let matchesLength = matches.length;
    matches = this.filterMatches(matches, activeNavbarValue);
    return (
      <React.Fragment>
        {matches.map((matchData, index) => {
          let cardClass = createCardClass(matchData, teamId, false);
          return (
            this.renderMatch(cardClass, matchData, teamsByExternalId, index)
          )
        })}
        {matchesLength == 0 &&
          <MatchLoader />
        }
      </React.Fragment>
    );
  }
}

export default AllMatchesWrapper;
