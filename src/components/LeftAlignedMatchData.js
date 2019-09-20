import React, { Component } from 'react';
import { Heading } from 'rebass';
import styled from 'styled-components';
import { space } from 'styled-system';

const SpanSpacer = styled.span(space);
const NumberStat = styled.span`
  ${space}
  text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
`
const DivSpacer = styled.div(space);

class LeftAlignedMatchData extends Component {

  render() {
    let { awayScore, homeScore, awayTeamImageName, awayTeam, homeTeamImageName, homeTeam, startTime } = this.props;
    return (
      <React.Fragment>
        <DivSpacer
          style={{textAlign: "left"}}
          pb={3}>{startTime}
        </DivSpacer>
        <Heading
          fontSize={[ 2 ]}
          color='primary'
          py={1}
          style={{textAlign: "left"}}
          className="ellipse-text"
         >
          <NumberStat pr={3}>{awayScore}</NumberStat>
          <img src={`/laliga-logos/${awayTeamImageName}.gif`} width="20px" />
          <SpanSpacer pl={1}>{awayTeam}</SpanSpacer>
          <div>
            <NumberStat pr={3}>{homeScore}</NumberStat>
            <img src={`/laliga-logos/${homeTeamImageName}.gif`} width="20px" />
            <SpanSpacer pl={1}>{homeTeam}</SpanSpacer>
          </div>
        </Heading>
      </React.Fragment>
    )
  }

}

export default LeftAlignedMatchData;