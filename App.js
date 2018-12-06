import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import PlaylistsButton from './components/PlaylistsButton';
import Playlists from './components/Playlists';

import Tabs from './src';

import token from './src/components/Login/Token';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            apiToken: null
        }
    }

    async componentDidMount() {
        try {
            const tkn = await token();
            this.setState({
                apiToken: tkn
            });
            if ( this.state.apiToken) {
                this.loadPlaylists();
            }

        } catch (e) {
            console.log(e);
        }
    }

    addPlaylist = (playlist) => {
        const playlists = this.state.items
        playlists.push(playlist)
        this.setState({Playlists})
    }

    loadPlaylists = () => {

        if (this.state.apiToken != null) {

            fetch("https://api.spotify.com/v1/users/g5rfxuys94xd8wsdayhuh30lx/playlists?offset=0&limit=20",
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.state.apiToken
                    }

                })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.error) {
                            this.setState({
                                items: result.error,
                            });
                        } else {
                            this.setState({
                                items: result.items,
                            });
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
    }


    oldReturn = () => {
        return (

            <View style={styles.container}>
                <PlaylistsButton onGetPlaylists={this.handleClick}/>
                <Playlists playlists={this.state.items}/>
                <Tabs
                    screenProps={{
                        playlists: this.state.items,
                        addPlaylist: this.addPlaylist,
                        loadPlaylistsBtn: this.handleClick
                    }}
                />
            </View>
        );

    }


    render() {
        return (
            <Tabs
                screenProps={{
                    playlists: this.state.items,
                    addPlaylist: this.addPlaylist,
                    currToken: this.state.apiToken
                }}
            />
        );
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
