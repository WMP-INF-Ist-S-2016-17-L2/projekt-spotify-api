import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {colors, padding} from '../theme';
import Playlists from './Playlists';
import PreLoader from "../components/PreLoader/PreLoader";

export default class Playlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            error: null,
            isLoaded: false
        }
    }

    static navigationOptions = (props) => {
        return {
            title: props.navigation.state.params.playlist.name
        }
    }

    componentDidMount() {
        this.getTracks()
    }

    getTracks = () => {

        fetch("https://api.spotify.com/v1/playlists/" + this.props.navigation.state.params.playlist.id + "/tracks",
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
                            tracks: result.items,
                            isLoaded: true
                        });
                    }
                }
            )
    }

    viewTrack = (track) => {
        this.props.navigation.navigate('Track', {track});
    }

    deletePlaylist = () => {
        fetch("https://api.spotify.com/v1/playlists/" + this.props.navigation.state.params.playlist.id + "/followers",
            {
                method: 'DELETE',
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

        this.props.navigation.navigate('Playlists');
        this.props.screenProps.removePlaylist(this.props.navigation.state.params.playlist)
    }

    render() {

        if (!this.state.isLoaded) {
            return (
                <PreLoader/>
            );
        }

        if (this.state.tracks.length > 0) {
            return (
                <ScrollView style={styles.pageWrapper}>
                    {this.state.tracks.map(track => (
                        <View style={styles.listItem} key={track.added_at}>
                            <TouchableOpacity onPress={() => this.viewTrack(track)}>
                                <View>
                                    <Text style={styles.trackName}>{track.track.name}</Text>
                                    <View style={styles.artistWrapper}>
                                        {track.track.artists.map(artist => (
                                            <Text style={styles.artistName} key={artist.id}> {artist.name}</Text>
                                        ))}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                    ))}
                </ScrollView>
            );
        }

        if (this.state.error != null) {
            return (
                <View style={styles.container}>
                    <Text style={styles.error}>
                        Wystąpił błąd podczas ładowania playlisty
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Playlist is empty
                </Text>
                <TouchableOpacity
                    onPress={() => this.deletePlaylist()}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Delete playlist
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundPrimary
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: colors.textColor
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
        color: '#ffffff'
    },
    listItem: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        marginBottom: 3,
        padding: 8
    },
    trackName: {
        color: colors.textColor,
        fontSize: 15,
        paddingLeft: 2
    },
    pageWrapper: {
        backgroundColor: colors.backgroundPrimary
    },
    artistName: {
        color: colors.fadedTextColor
    },
    artistWrapper: {
        display: 'flex',
        flexDirection: 'row'
    }
});