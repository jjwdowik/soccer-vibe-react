import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createCardClass } from '../utils';
import styled from 'styled-components';
import { space } from 'styled-system';
import { Box, Button } from 'rebass';
import NewMatchCard from './NewMatchCard';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SpanSpacer = styled.span(space)

class ActiveMatch extends Component {

  render() {
    let { matches, teamId, teamsByExternalId } = this.props;
    let activeMatchId = this.props.match.params.id;
    if(matches.length > 0) {
      let activeMatchData = matches.find(m => m.id == activeMatchId);
      let cardClass = createCardClass(activeMatchData, teamId, true);
      return (
        <Box width={1} mx={0} style={{maxWidth: "700px"}}>
          <Link to={{
              pathname: "/",
              state: this.props.location.state
            }}
          >
            <Button
              bg='#A50044'
              style={{cursor: "pointer"}}
              mt={3}
            >
              <FontAwesomeIcon icon="arrow-left" />
              <SpanSpacer ml={1}>Back</SpanSpacer>
            </Button>
          </Link>
          <NewMatchCard
            cardClass={cardClass}
            handleMatchClick={this.handleMatchClick}
            match={activeMatchData}
            isActive={true}
            homeTeamData={teamsByExternalId[activeMatchData.home_team_external_id]}
            awayTeamData={teamsByExternalId[activeMatchData.away_team_external_id]}
          />
        </Box>
      );
    } else {
      return (null);
    }
  }
}

export default ActiveMatch;
