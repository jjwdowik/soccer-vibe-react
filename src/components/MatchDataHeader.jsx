import React, { Component } from 'react';
import { Flex } from 'rebass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/fontawesome-free-brands';
import { space, typography } from 'styled-system';
import styled from 'styled-components';

const SpanSpacer = styled.span`
  ${space}
`

class MatchDataHeader extends Component {

  render() {
    let { showTwitterLogo, startTime, twitterHashtag } = this.props;
    return (
      <Flex
        style={{
          backgroundColor: "#e7e8e7",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px"
        }}
        p={3}>
        <div>{startTime}</div>
        {showTwitterLogo &&
          <div style={{marginLeft: "auto"}}>
            <SpanSpacer pr={2}>
              {twitterHashtag}
            </SpanSpacer>                 
            <FontAwesomeIcon icon={faTwitter} size="1x" color="#1da1f2" />
          </div>
        }
      </Flex>
    )
  }
}

export default MatchDataHeader;