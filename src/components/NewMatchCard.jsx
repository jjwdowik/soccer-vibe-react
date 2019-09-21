import React, { Component } from 'react';
import VibeCard from './VibeCard';
import LeftAlignedMatchData from './LeftAlignedMatchData';
import CenterAlignedMatchData from './CenterAlignedMatchData';
import SmallMatchData from './SmallMatchData';
import moment from 'moment';
import { Card, Heading, Text, Flex } from 'rebass';
import styled from 'styled-components';
import { space } from 'styled-system';
import MediaQuery from 'react-responsive'

const SpanSpacer = styled.span(space);
const DivSpacer = styled.div(space);

const NumberStat = styled.span`
  ${space}
  text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
`

class NewMatchCard extends Component {

  render() {
    let { cardClass, match, isActive, homeTeamData, awayTeamData } = this.props;
    let homeScore = match.data.score.fullTime.homeTeam;
    let awayScore = match.data.score.fullTime.awayTeam;
    let showTwitterLogo = match.twitter_hashtag !== null;
    cardClass += " ui-card";
    console.log("what is start time...")
    console.log(match.start_time);
    console.log(moment(match.start_time).format('M/D/YYYY @ h:mm:ss a'))
    return (
      <React.Fragment>
        <MediaQuery minWidth={700}>
          <Card
            fontSize={1}
            fontWeight='bold'
            my={3}
            bg='#f6f6ff'
            borderRadius={8}
            boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'
            className={cardClass}
            onClick={this.props.handleMatchClick}
            data-match-id={match.id}
          >
            <CenterAlignedMatchData
              awayScore={awayScore}
              awayTeam={match.away_team}
              homeScore={homeScore}
              homeTeam={match.home_team}
              startTime={moment(match.start_time).format('M/D/YYYY @ h:mm:ss a')}
              isActive={isActive}
              homeTeamData={homeTeamData}
              awayTeamData={awayTeamData}
              showTwitterLogo={showTwitterLogo}
            />
            {(isActive && showTwitterLogo) &&
              <div>
                <VibeCard match={match} />
              </div>
            }
          </Card>
        </MediaQuery>
        <MediaQuery maxWidth={699}>
          <Card
            fontSize={1}
            fontWeight='bold'
            my={3}
            bg='#f6f6ff'
            borderRadius={8}
            boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'
            className={cardClass}
            onClick={this.props.handleMatchClick}
            data-match-id={match.id}
          >
            <SmallMatchData
              awayScore={awayScore}
              awayTeam={match.away_team}
              homeScore={homeScore}
              homeTeam={match.home_team}
              startTime={moment(match.start_time).format('M/D/YYYY')}
              isActive={isActive}
              homeTeamData={homeTeamData}
              awayTeamData={awayTeamData}
              showTwitterLogo={showTwitterLogo}
            />
            {(isActive && showTwitterLogo) &&
              <div>
                <VibeCard match={match} />
              </div>
            }
          </Card>
        </MediaQuery>
      </React.Fragment>
    );
  }
}

export default NewMatchCard;
