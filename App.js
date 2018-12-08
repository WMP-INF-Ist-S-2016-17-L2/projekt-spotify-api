import React, {Component} from 'react';

import Tabs from './src';

import token from './src/components/Token/Token';

export default class App extends Component {

    state = {
        items: [],
        apiToken: null,
        error: null
    }

    async componentDidMount() {
        try {
            const tkn = await token();
            this.setState({
                apiToken: tkn
            });

            if (this.state.apiToken) {
                this.loadPlaylists();
            }

        } catch (e) {
            console.log(e);
        }
    }

    addPlaylist = (playlist) => {
        const playlists = this.state.items
        playlists.push(playlist)
        this.setState({playlists});
    }

    removePlaylist = (playlist) => {
        var array = [...this.state.items];
        var index = array.indexOf(playlist);

        if (index !== -1) {
            array.splice(index, 1);
            this.setState({items: array});
        }
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
                                items: [],
                                error: result.error
                            });
                        } else {
                            this.setState({
                                items: result.items,
                            });
                        }
                    },
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                )
        }
    }

    render() {
        return (
            <Tabs
                screenProps={{
                    playlists: this.state.items,
                    addPlaylist: this.addPlaylist,
                    removePlaylist: this.removePlaylist,
                    currToken: this.state.apiToken,
                    error: this.state.error
                }}
            />
        );
    }
}
