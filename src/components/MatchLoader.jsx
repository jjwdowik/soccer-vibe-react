import React, { Component } from 'react';
import { Box } from 'rebass';
import NewMatchCard from './NewMatchCard';
import fakeMatch from '../data/fakeMatch.json';

class MatchLoader extends Component {

  renderFakeMatch(index) {
    return (
      <Box
        width={"350px"}
        mx={3}
        key={"match-box-" + index}
      >
        <NewMatchCard
          cardClass="card-not-played animated-background light-box"
          isActive={false}
          match={fakeMatch}
        />
      </Box>
    )
  }


  render() {
    let arr = [1,2,3,4];
    return (
      arr.map((item, index) => {
        return (this.renderFakeMatch(index))
      })
    )
  }

}

export default MatchLoader;