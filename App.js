import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PlaylistsButton from './components/PlaylistsButton';
import Playlists from './components/Playlists';

import Tabs from './src';

export default class App extends Component {


  state = {
    items: []
  }

  addPlaylist = (playlist) => {
      const playlists = this.state.items
      playlists.push(playlist)
      this.setState({ Playlists })
  }


  handleClick = () => {

    console.log('clic2');
      // let parsed = queryString.parse(window.location.search);
      // let accessToken = parsed.access_token;

      fetch("https://api.spotify.com/v1/users/g5rfxuys94xd8wsdayhuh30lx/playlists?offset=0&limit=20",
          {
              method: 'get',
              headers:{
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + 'BQC1PlgtnfvORMb1xxM-AKYCwB-Y3R0JXGCXzCellYrZZ81x7CiaeOJRVNW9jw1H1aaW4mMmRxLRo0I7oDdHImrlRlcdcQ4JPCuJi9ekLJQP00_ozSN9y18RU2WbZI5ezRYrgna8Ap-jEPRvB8mawvLKQD3oM2PfLisAE08ppwXn0eapHf3RcfqFo8azuBXOKi5cykZE2dw_2OfhqW1XdU-L-Dx8r6SKQPoTU-yIyATIGik8jUA'
              }

          })
          .then(res => res.json())
          .then(
              (result) => {
                  if (result.error) {
                      this.setState({
                          // isLoaded: true,
                          items: result.error,
                          // error: true,
                          // wasRequested: true
                      });
                  } else {
                      this.setState({
                          // isLoaded: true,
                          items: result.items,
                          // wasRequested: true
                      });
                      // this.props
                      // this.props.loadPlaylists(this.state);
                  }
                      console.log(result);
              },
              (error) => {
                  this.setState({
                      isLoaded: true,
                      error
                  });
              }
          )
  }


  oldReturn = () => {
      return (
          <View style={styles.container}>
              <PlaylistsButton onGetPlaylists={this.handleClick} />
              <Playlists playlists={this.state.items}/>
          </View>
      );

  }

  render() {
    return <Tabs
        screenProps={{
            playlists: this.state.items,
            addPlaylist: this.addPlaylist
        }}
    />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
