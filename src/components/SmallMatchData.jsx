import React, { Component } from 'react';
import { Heading, Flex, Box } from 'rebass';
import MatchDataHeader from './MatchDataHeader';
import styled from 'styled-components';
import { space, typography } from 'styled-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/fontawesome-free-brands';

const TeamNameSpacer = styled.div`
  ${space}
  ${typography}
`
const NumberStat = styled.span`
  ${space}
  ${typography}
  flex: 1 1 auto;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
`
const LogoImg = styled.img`
  max-width: 80px;
  max-height: 80px;
`

const DivSpacer = styled.div(space);

class SmallMatchData extends Component {

  render() {
    let {
      awayScore,
      homeScore,
      awayTeam,
      homeTeam,
      startTime,
      awayTeamData,
      homeTeamData,
      showTwitterLogo,
      twitterHashtag
    } = this.props;
    return (
      <React.Fragment>
        <MatchDataHeader
          showTwitterLogo={showTwitterLogo}
          startTime={startTime}
          twitterHashtag={twitterHashtag}
        />
        <Flex p={3}>
          <Box width="45%" style={{display: "flex"}}>
            <div>
              {awayTeamData &&
                <LogoImg src={awayTeamData.crest_url} />
              }
             </div>
            <NumberStat pl={3} fontSize={5} style={{textAlign: "right"}}>{awayScore}</NumberStat>
          </Box>
          <Box width="10%" style={{display: "flex", justifyContent: "center"}}>
            <TeamNameSpacer fontSize={5}>-</TeamNameSpacer>
          </Box>
          <Box width="45%" style={{display: "flex"}}>
            <NumberStat pr={3} fontSize={5} style={{textAlign: "left"}}>{homeScore}</NumberStat>
            <div>
              {homeTeamData &&
                <LogoImg src={homeTeamData.crest_url}/>
              }
            </div>
          </Box>
        </Flex>
      </React.Fragment>
    )
  }

}

export default SmallMatchData;
