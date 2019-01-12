import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ToastAndroid, Image, TouchableWithoutFeedback
} from 'react-native';
import {colors} from "../theme";

var SoundPlayer = require('react-native-sound');
var song = null;


export default class Track extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            error: null,
            pause: false,
            hasPreviewUrl: false,
            showingPlayButton: true
        }
    }

    componentWillMount() {
        if (this.props.navigation.state.params.track.track.preview_url != null) {
            this.setState({
                hasPreviewUrl: true
            });
        }
    }

    onPressButtonPlay() {
        song = new SoundPlayer(this.props.navigation.state.params.track.track.preview_url, undefined, (error) => {
            if (error)
                ToastAndroid.show('Error when init SoundPlayer :(((', ToastAndroid.SHORT);
            else {
                song.play((success) => {
                    if (!success)
                        ToastAndroid.show('Error when play SoundPlayer :(((', ToastAndroid.SHORT);
                });

                this.setState({
                    showingPlayButton: false,
                })
            }
        });
    }

    onPressButtonPause() {
        if (song != null) {
            if (this.state.pause) { // play resume
                song.play((success) => {
                    if (!success)
                        ToastAndroid.show('Error when play SoundPlayer :(((', ToastAndroid.SHORT);
                });

            }
            else song.pause();

            this.setState({pause: !this.state.pause});
        }
    }

    render() {
        let button;
        let error;

        if (this.state.showingPlayButton) {
            button = <TouchableOpacity onPress={this.onPressButtonPlay.bind(this)}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
        } else {
            button = <TouchableOpacity onPress={this.onPressButtonPause.bind(this)}>
                <Text style={styles.buttonText}>{this.state.pause ? 'Resume' : 'Pause'}</Text>
            </TouchableOpacity>
        }

        if (!this.state.hasPreviewUrl) {
            error = <Text style={styles.error}>Sorry, the song can't be played.</Text>;
            button = null;
        }

        return (
            <View style={styles.container}>
                <Image
                    style={{width: 200, height: 200}}
                    source={{uri: this.props.navigation.state.params.track.track.album.images[0].url}}
                />
                <View style={styles.listItem}>
                    <Text style={styles.songTitle}>{this.props.navigation.state.params.track.track.name}</Text>
                    <Text
                        style={styles.artists}>{this.props.navigation.state.params.track.track.artists.map(artist => (
                        <Text style={styles.artistName} key={artist.id}> {artist.name}</Text>
                    ))}</Text>

                </View>
                {button}
                {error}
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

    listItem: {
        borderBottomColor: '#000000',
        borderBottomWidth: 2
    },

    error: {
        color: colors.error
    },

    buttonText: {
        fontSize: 30,
        color: colors.textColor
    },

    songTitle: {
        marginTop: 5,
        color: colors.primary,
        textAlign: 'center'
    },

    artists: {
        color: colors.fadedTextColor,
        textAlign: 'center'
    }
});