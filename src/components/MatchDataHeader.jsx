import React, { Component } from 'react';
import { Flex } from 'rebass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/fontawesome-free-brands';

class MatchDataHeader extends Component {

  render() {
    let { showTwitterLogo, startTime } = this.props;
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
            <FontAwesomeIcon icon={faTwitter} size="1x" />
          </div>
        }
      </Flex>
    )
  }
}

export default MatchDataHeader;