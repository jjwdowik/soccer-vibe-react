import React, { Component } from 'react';
import styled from 'styled-components';
import { space, typography } from 'styled-system';
import moment from 'moment';

const DivSpacer = styled.div`
  ${space}
  ${typography}
`

const TweetSpacer = styled.div`
  ${space}
  ${typography}
  background-color: white;
  color: black;
  box-shadow: 0 4px 8px 0px rgba(0,0,0,0.25);
  border-radius: 5px;
`

const MainWrapper = styled.div`
  ${space}
  ${typography}
  background-color: #e7e8e7;
  color: black;
`
const TimeDivWrapper = styled.div`
  ${space}
  ${typography}
  color: #868686;
`

const TweetDivWrapper = styled.div`
  ${space}
  ${typography}
  color: black;
`

const SpanNew = styled.span`
  ${space}
  ${typography}
  color: #f66666;
`

class VibeTweets extends Component {

  render() {
    var { match_vibe_data, newIdStart } = this.props;
    var tweetCount = match_vibe_data.match_twitter_vibes.length
    var lastTenTweets = match_vibe_data.match_twitter_vibes.slice(tweetCount- 10, tweetCount).reverse();
    return (
      <MainWrapper mx={-3} px={3} pt={4}>
        <DivSpacer mb={4} fontSize={6}>Ten Recent Tweets</DivSpacer>
        {lastTenTweets.map((tweet) => {
          let isNew = newIdStart != false &&  newIdStart <= tweet.id;
          return (
            <TweetSpacer mb={3} p={3}>
              <TimeDivWrapper fontSize={1}>
              {moment(tweet.twitter_created_at).format('M/D/YY h:mm:ss a')}
              </TimeDivWrapper>
              <TweetDivWrapper mt={1}>
                {isNew && 
                  <SpanNew mr={2}>🔥 NEW 🔥</SpanNew>
                }
                {tweet.twitter_full_text}
              </TweetDivWrapper>
            </TweetSpacer>
          )
        })}
      </MainWrapper>
    )
  }

}

export default VibeTweets;