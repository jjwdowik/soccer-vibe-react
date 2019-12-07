import React, { Component } from 'react';
import { Heading, Flex, Box } from 'rebass';
import MatchDataHeader from './MatchDataHeader';
import styled from 'styled-components';
import { space, typography } from 'styled-system'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/fontawesome-free-brands';
import { white } from 'ansi-colors';

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

const SpanSpacer = styled.span`
  ${space}
`

const LogoImg = styled.img`
  max-height: ${props => props.isActive ? "90px" : "50px"};
`

const boxStyles = {
  display: "flex",
  justifyContent: "center"
}

const DivSpacer = styled.div(space);

class CenterAlignedMatchData extends Component {

  render() {
    let {
      awayScore,
      homeScore,
      awayTeam,
      homeTeam,
      startTime,
      isActive,
      homeTeamData,
      awayTeamData,
      showTwitterLogo,
      twitterHashtag
    } = this.props;
    let standardFontSize = isActive ? [6] : [ 4, 5 ];
    let teamFontSize = isActive ? [4] : [1];
    return (
      <React.Fragment>
        <MatchDataHeader
          showTwitterLogo={showTwitterLogo}
          startTime={startTime}
          twitterHashtag={twitterHashtag}
        />
        <Flex p={3}>
          <Box width="45%" style={boxStyles}>
            <div>
              {awayTeamData &&
                <LogoImg src={awayTeamData.crest_url}  />
              }
             </div>
            <NumberStat pl={3} fontSize={standardFontSize} style={{textAlign: "right"}}>{awayScore}</NumberStat>
          </Box>
          <Box width="10%" style={boxStyles}>
            <TeamNameSpacer fontSize={standardFontSize}>-</TeamNameSpacer>
          </Box>
          <Box width="45%" style={boxStyles}>
            <NumberStat pr={3} fontSize={standardFontSize} style={{textAlign: "left"}}>{homeScore}</NumberStat>
            <div>
              {homeTeamData &&
                <LogoImg src={homeTeamData.crest_url} />
              }
            </div>
          </Box>
        </Flex>
        <Flex px={3}>
          <Box width={1/2} style={{textAlign:"left"}}>
            <TeamNameSpacer fontSize={teamFontSize}>{awayTeam}</TeamNameSpacer>
          </Box>
          <Box width={1/2} style={{textAlign:"right"}}>
            <TeamNameSpacer fontSize={teamFontSize}>{homeTeam}</TeamNameSpacer>
          </Box>
        </Flex>
      </React.Fragment>
    )
  }

}

export default CenterAlignedMatchData;