import React, { Component } from 'react';
import axios from 'axios';
import { Button, Flex, Box } from 'rebass';
import { getAPIAuthToken, getBaseURL, getVibeColor, getVibeEmoji } from '../utils';
import VibeGraph from './VibeGraph';
import VibeTweets from './VibeTweets';
import styled from 'styled-components';
import { space } from 'styled-system';
import Pusher from 'pusher-js';
import AnimatedNumber from 'animated-number-react';


const VibeWrapperDiv = styled.div`
  ${space}
  font-size: 24px;
  color: white;
  background-color: black;
  padding: 16px;
`
const DivSpacer = styled.div`
  ${space}
`
const SpanSpacer = styled.span`
  ${space}
`
const EmojiWrapper = styled.span`
  ${space}
  vertical-align: middle;
`

const graphPreview = {
  imageRendering: "pixelated"
}

const pusher = new Pusher('5541cc9fe4a53edbb3d2', {
  cluster: 'us2',
  forceTLS: true
});

class VibeCard extends Component {

  constructor(props) {
    super(props);
    this.hashtagRef = React.createRef();
    this.submitHashtag = this.submitHashtag.bind(this);
    this.fetchVibes = this.fetchVibes.bind(this);
    this.state = {
      hashtag: this.props.match.twitter_hashtag, 
      match_vibe_data: false,
      averageScore: 0,
      startId: false,
      endId: false,
      newIdStart: false
    };
  }

  componentDidMount() {
    if(this.props.match.twitter_hashtag) {
      this.fetchVibes();
      const channel = pusher.subscribe('soccer-vibe');
      let that = this;
      channel.bind('new-vibes', function(data) {
        that.fetchVibes(data.start_id, data.end_id);
      });
    }
  }

  fetchVibes(startId = false, endId = false) {
    let instance = axios.create({
    baseURL: getBaseURL(),
      timeout: 20000,
      headers: {'X-API-Auth-Token': getAPIAuthToken()}
    });
    var self = this;
    instance.get('/match_twitter_vibes?match_id='+this.props.match.id)
      .then(function (response) {
        self.setState({
          match_vibe_data: response.data,
          averageScore: response.data.average_score,
          startId: startId,
          endId: endId,
          newIdStart: self.state.newIdStart || startId
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  submitHashtag() {
    const hashtag = this.hashtagRef.current.value;
    let matchId = this.props.match.id;
    let instance = axios.create({
    baseURL: getBaseURL(),
      timeout: 20000,
      headers: {'X-API-Auth-Token': getAPIAuthToken()}
    });
    var self = this;
    instance.get(`/matches/PD/update_hashtag?match_id=${matchId}&hashtag=${hashtag}`)
      .then(function (response) {
        self.setState({hashtag: hashtag});
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    let hashtag = this.state.hashtag;
    let match_vibe_data = this.state.match_vibe_data;
    let averageScore = this.state.averageScore;
    let hashtagExists = hashtag !== undefined && hashtag !== null;
    let color = getVibeColor(match_vibe_data.average_score, "white");
    let emoji = getVibeEmoji(match_vibe_data.average_score);
    const trackerValueStyle = {
      color: color,
      transition: 'all 1s ease-out',
    }    
    console.log("COMING IN HOT")
    console.log(averageScore)
    return (
      <VibeWrapperDiv mt={4}>
        {hashtagExists &&
          <div>
            <Box textAlign="center" fontSize={6}>
              <EmojiWrapper>{emoji}</EmojiWrapper>
              <SpanSpacer ml={2} style={trackerValueStyle}>
                <AnimatedNumber
                  duration={1000}
                  value={averageScore}
                  formatValue={n => parseFloat(n).toFixed(2)}
                />
              </SpanSpacer>
            </Box>
            {match_vibe_data &&
              <React.Fragment>
                <div style={{ marginTop: '16px'}}>
                  <VibeGraph match_vibe_data={match_vibe_data} />
                </div>
                <div style={{ marginTop: '16px'}}>
                  <VibeTweets 
                    match_vibe_data={match_vibe_data} 
                    newIdStart={this.state.newIdStart}
                  />
                </div> 
              </React.Fragment>             
            }
          </div>
        }
        {!hashtagExists &&
          <div>
            <DivSpacer mb={2}>Vibe not tracked for this match</DivSpacer>
            <div style={{width: '100%'}}>
              <img style={graphPreview} src="/graph_preview.png" width="100%"/>
            </div>
          </div>
        }
      </VibeWrapperDiv>
    );
  }
}

export default VibeCard;
