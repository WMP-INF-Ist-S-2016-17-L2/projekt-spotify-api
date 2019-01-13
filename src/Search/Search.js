import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity, TextInput

} from 'react-native';

import {colors, padding} from '../theme';

export default class Search extends React.Component {

    state = {
        results: [],
        error: null,
        isLoaded: false,
        searchValue: '',
        tracks: [],
        activeIndex: null,
        showingPlaylists: false
    }


    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })

        this.runSearch();
    }

    runSearch = () => {
        const query = encodeURIComponent(this.state.searchValue);
        fetch(`https://api.spotify.com/v1/search?query=${query}&type=track,artist`,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.screenProps.currToken
                }

            })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error) { //Wystąpił błąd
                        this.setState({
                            error: result.error,
                            isLoaded: true
                        });
                    } else {
                        this.setState({ //Poprawna odpowiedź
                            tracks: result.tracks.items,
                            artists: result.artists.items,
                            isLoaded: true
                        });
                    }
                }
            )
    }

    selectPlaylist = () => {
        if (this.state.showingPlaylists) {
            this.setState({
                showingPlaylists: false
            });
        } else {
            this.setState({
                showingPlaylists: true
            });
        }
    }

    addToPlaylist = (i, e, playlist, track) => {

        fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.screenProps.currToken
                },
                body: JSON.stringify({
                    uris: [track]
                })

            })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error) { //Wystąpił błąd
                        this.setState({
                            error: result.error
                        });
                        return;
                    }
                },
                (error) => {
                    this.setState({error});
                    return;
                }
            )
    }

    render() {
        let tracks;

        if (this.state.tracks.length > 0) {
            tracks =
                <View>
                    <Text style={styles.title}>Tracks</Text>
                    {this.state.tracks.map(track => (
                        <View key={track.id} style={styles.listItem}>

                            <Text style={styles.trackName}>
                                {track.artists.map(artist => (
                                    <Text>{artist.name} - </Text>
                                ))}
                                {track.name}
                            </Text>

                            <TouchableOpacity onPress={this.selectPlaylist}>
                                <View>
                                    <Text style={styles.buttonText}>{this.state.showingPlaylists ? 'Hide playlists' : 'Add to playlist' }</Text>
                                </View>
                            </TouchableOpacity>


                            {this.props.screenProps.playlists.map(playlist => (
                                <TouchableOpacity key={playlist.id}
                                                  style={
                                                      this.state.showingPlaylists
                                                          ? styles.listItem
                                                          : styles.hidden
                                                  }

                                                  onPress={() => this.addToPlaylist(this, playlist.id, playlist.id, track.uri)}>
                                    <Text style={styles.playlistName}>{playlist.name}</Text>
                                </TouchableOpacity>
                            ))}

                        </View>
                    ))}
                </View>
        }

        return (
            <ScrollView style={styles.container}>

                <Text style={styles.heading}>Search for your favorite song</Text>
                <TextInput
                    placeholder='Search'
                    value={this.state.searchValue}
                    onChangeText={val => this.onChangeText('searchValue', val)}
                    style={styles.input}
                />

                {tracks}

            </ScrollView>
        );
    }
}

styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundPrimary,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    error: {
        color: colors.error
    },
    button: {
        height: 50,
        backgroundColor: colors.error,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        paddingHorizontal: padding.paddingHorizontal,
        paddingVertical: padding.paddingVertical
    },
    buttonText: {
        color: colors.primary
    },
    listItem: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        marginBottom: 3,
        padding: 8,
        display: 'flex',
        justifyContent: 'space-between'
    },
    trackName: {
        color: colors.textColor,
        fontSize: 15,
        paddingLeft: 2
    },
    input: {
        backgroundColor: '#ffffff',
        margin: 10,
        paddingHorizontal: 8,
        height: 50
    },
    title: {
        textAlign: 'center',
        color: colors.textColor,
        fontSize: 20,
        marginBottom: 15,
        marginTop: 15
    },
    playlistName: {
        color: colors.textColor,
        marginBottom: 10
    },
    hidden: {
        display: 'none'
    },
    artistName: {
        color: colors.fadedTextColor
    },
    heading: {
        fontSize: 26,
        textAlign: 'center',
        margin: 10,
        color: '#fff'
    }
});
