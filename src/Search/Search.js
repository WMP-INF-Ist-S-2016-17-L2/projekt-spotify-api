import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity, TextInput, TouchableWithoutFeedback, Image

} from 'react-native';

import {colors, padding} from '../theme';
// import Playlists from './Playlists';
// import PreLoader from "../components/PreLoader/PreLoader";

export default class Search extends React.Component {

    state = {
        results: [],
        error: null,
        isLoaded: false,
        searchValue: '',
        artists: [],
        tracks: []
    }


    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
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
                    console.log(result);
                }
            )
    }

    // viewTrack = (track) => {
    //     this.props.navigation.navigate('Track', {track});
    // }

    // deletePlaylist = () => {
    //     fetch("https://api.spotify.com/v1/playlists/" + this.props.navigation.state.params.playlist.id + "/followers",
    //         {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + this.props.screenProps.currToken
    //             }
    //
    //         })
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 if (result.error) { //Wystąpił błąd
    //                     this.setState({
    //                         error: result.error
    //                     });
    //                     return;
    //                 }
    //             },
    //             (error) => {
    //                 this.setState({error});
    //                 return;
    //             }
    //         )
    //
    //     this.props.navigation.navigate('Playlists');
    //     this.props.screenProps.removePlaylist(this.props.navigation.state.params.playlist)
    // }

    selectPlaylist = () => {
        console.log(this.props)
    }

    render() {
        console.log('tacks');
        console.log(this.state.tracks);
        let searchResults;
        let tracks;
        let artists;
        if (this.state.tracks.length > 0) {
            tracks =
                <View>
                    <Text style={styles.title}>Tracks</Text>
                    {this.state.tracks.map(track => (
                        <View key={track.id} style={styles.listItem}>
                            {console.log(track)}
                            <Text style={styles.buttonText}>
                                {track.name}
                            </Text>
                            <TouchableOpacity onPress={this.selectPlaylist} >
                                <View>
                                    <Text style={styles.buttonText}>Dodaj do playlisty</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

        }

        return (
            <ScrollView style={styles.container}>
                <TextInput
                    placeholder='Search'
                    value={this.state.searchValue}
                    onChangeText={val => this.onChangeText('searchValue', val)}
                    style={styles.input}
                />
                <TouchableOpacity onPress={this.runSearch} style={styles.button}>
                    <View>
                        <Text style={styles.buttonText}>Dodaj playliste</Text>
                    </View>
                </TouchableOpacity>

                {tracks}

            </ScrollView>
        );
    }


}
styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundPrimary
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
        color: '#ffffff'
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
        marginBottom: 15
    }

});
