import { keyBy } from 'lodash';

export const getAPIAuthToken = () => {
  if(process.env.NODE_ENV !== 'production') {
    return ""
  } else {
    return "0504cbc82578b19935239ea870f87bf6"
  }
}

export const getBaseURL = () => {
  if(process.env.NODE_ENV !== 'production') {
    return "http://0.0.0.0:5100"
  } else {
    return "https://soccer-backend-app.herokuapp.com"
  }
}

export const getPusherKey = () => {
  if(process.env.NODE_ENV !== 'production') {
    return "5541cc9fe4a53edbb3d2"
  } else {
    return "420e1816823dfa6596d2"
  }  
}

export const createCardClass = (match, team_id, isActive) => {
  let cardClass = "card-not-played";
  let barcelona_side_id = match.home_team_external_id == team_id ? match.home_team_external_id : match.away_team_external_id;
  if(match.status == "FINISHED") {
    if(match.winner_external_id === null) {
      cardClass = "card-draw";
    } else {
      cardClass = match.winner_external_id == barcelona_side_id ? "card-win" : "card-loss"
    }
  }
  cardClass += isActive ? " active" : " card-animation-wrapper";
  cardClass += " card-wrapper";
  return cardClass;
}

export const formatTeamsByExternalId = (teams) => {
  return keyBy(teams, 'external_id');
}

export const getVibeColor = (value, defaultColor) => {
  let color = defaultColor;
  if(value != 0) {
    if(value > 0) {
      color = "#5AD674"
    } else if(value < 0) {
      color = "#FA5C62"
    }
  }  
  return color;
}
export const getVibeEmoji = (value) => {
  let emoji = "😐";
  if(value != 0) {
    if(value > 0) {
      emoji = "😀";
      if(value > 0.5) {
        emoji += "💪";
      }
    } else if(value < 0) {
      emoji = "🙁";
      if(value < -0.5) {
        emoji = "🥺";
      }
      if(value < -0.7) {
        emoji = "🤬";
      }
    }
  }  
  return emoji;
}
