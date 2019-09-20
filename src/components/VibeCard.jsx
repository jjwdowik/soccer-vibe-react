import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'rebass';
import { getAPIAuthToken, getBaseURL } from '../utils';
import VibeGraph from './VibeGraph';
import styled from 'styled-components';
import { space } from 'styled-system';

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

const graphPreview = {
  imageRendering: "pixelated"
}
class VibeCard extends Component {

  constructor(props) {
    super(props);
    this.hashtagRef = React.createRef();
    this.submitHashtag = this.submitHashtag.bind(this);
    this.state = {hashtag: this.props.match.twitter_hashtag, match_vibe_data: false};
  }

  componentDidMount() {
    if(this.props.match.twitter_hashtag) {
      let instance = axios.create({
      baseURL: getBaseURL(),
        timeout: 20000,
        headers: {'X-API-Auth-Token': getAPIAuthToken()}
      });
      var self = this;
      instance.get('/match_twitter_vibes?match_id='+this.props.match.id)
        .then(function (response) {
          self.setState({match_vibe_data: response.data});
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
    let hashtagExists = hashtag !== undefined && hashtag !== null;
    var divStyle = {
      fontSize: '24px',
      color: 'white',
      backgroundColor: 'black',
      padding: '16px',
    }
    var inputStyle = {
      width: '230px',
      height: '40px',
      fontSize: '.8em',
      marginRight: '8px',
    }
    var divWrapper = {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '16px',
    }
    return (
      <VibeWrapperDiv mt={4}>
        {hashtagExists &&
          <div>
            <div>Current tracked hashtag: {hashtag}</div>
            {match_vibe_data &&
              <div style={{ marginTop: '16px'}}>
                <h4>Overall Vibe is: {match_vibe_data.average_score}</h4>
                <VibeGraph match_vibe_data={match_vibe_data} />
              </div>
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
