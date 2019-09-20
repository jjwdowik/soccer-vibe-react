import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Flex } from 'rebass';
import { getAPIAuthToken, getBaseURL, formatTeamsByExternalId } from './utils';
import AllMatchesWrapper from './components/AllMatchesWrapper';
import ActiveMatch from './components/ActiveMatch';
import Navbar from './components/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import theme from './theme';
import styled, { ThemeProvider } from 'styled-components'

import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

library.add(faArrowLeft)

// because Barcelona is the best team, we only support them in our application currently :)
const teamId = 81;

const MainFlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  margin-bottom: 30px;
`

class App extends Component {

  constructor() {
    super();
    this.state = {
      matches: [],
      teamId: teamId,
      activeNavbarValue: "tracked"
    };
    this.switchNavigation = this.switchNavigation.bind(this);
    this.transitionExited = this.transitionExited.bind(this);
  }


  componentDidMount() {
    let instance = axios.create({
    baseURL: getBaseURL(),
      timeout: 20000,
      headers: {'X-API-Auth-Token': getAPIAuthToken()}
    });
    var self = this;
    instance.get('/matches?team_id='+self.state.teamId)
      .then(function (response) {
        self.setState({
          matches: response.data["matches"],
          teams: response.data["teams"],
          teamsByExternalId: formatTeamsByExternalId(response.data["teams"])
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  switchNavigation(value) {
    this.setState({activeNavbarValue: value});
  }

  transitionExited() {
    let location = this.props.location;
    if (location.pathname != "/") {
      window.scroll(0,0)
    } else {
      const item = document.querySelector(
        ".restore-" + location.state
      );
      if (item) {
        const yCoordinate = item.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -70;
        window.scrollTo({
            top: yCoordinate + yOffset
        });
      }
    }
  }

  render() {
    let { matches, teamId, activeNavbarValue, teamsByExternalId } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <div className="App" style={{position: "relative"}}>
          <Navbar
              activeValue={activeNavbarValue}
              switchNavigation={this.switchNavigation}
          />
          <Route
            render={({ location }) => {
              return (
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    classNames="page-fade"
                    timeout={200}
                    in={true}
                    appear={true}
                    onExited={() => this.transitionExited()}
                  >
                    <MainFlexWrapper>
                      <Switch location={location}>
                        <Route
                          path="/"
                          exact
                          render={(props) =>
                            <AllMatchesWrapper
                              {...props}
                              matches={matches}
                              teamId={teamId}
                              activeNavbarValue={activeNavbarValue}
                              teamsByExternalId={teamsByExternalId}
                            />
                          }
                        />
                        <Route
                          path="/matches/:id"
                          render={(props) =>
                            <ActiveMatch
                              {...props}
                              matches={matches}
                              teamId={teamId}
                              teamsByExternalId={teamsByExternalId}
                            />
                          }
                        />
                        <Route render={() => <div>Not Found</div>} />
                      </Switch>
                    </MainFlexWrapper>
                  </CSSTransition>
                </TransitionGroup>
              );
            }}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
