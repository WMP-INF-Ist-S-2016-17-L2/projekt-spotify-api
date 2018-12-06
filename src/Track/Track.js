import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ToastAndroid, Image, TouchableWithoutFeedback
} from 'react-native';

var SoundPlayer = require('react-native-sound');
var song = null;


export default class Track extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            error: null,
            pause: false,
            hasPreviewUrl: false
        }

        // console.log(this.props.navigation.state.params);
        console.log(this.props.navigation.state.params.track.track.album.images[0].url);
    }

    componentWillMount() {

        if (this.props.navigation.state.params.track.track.preview_url != null) {
            this.setState({
                hasPreviewUrl: true
            });
        }
    }

    componentDidMount() {
        // this.getTracks()
        // console.log(this.props.navigation.state.params);
        // console.log(this.props.navigation.state.params.track.track.id);
    }

    onPressButtonPlay() {

        console.log(this.props.navigation.state.params.track.track.preview_url);
        song = new SoundPlayer(this.props.navigation.state.params.track.track.preview_url, undefined, (error) => {
            if (error)
                ToastAndroid.show('Error when init SoundPlayer :(((', ToastAndroid.SHORT);
            else {
                song.play((success) => {
                    if (!success)
                        ToastAndroid.show('Error when play SoundPlayer :(((', ToastAndroid.SHORT);
                });
            }
        });
    }


    onPressButtonPause() {
        if(song != null) {
            if(this.state.pause) // play resume
                song.play((success) => {
                    if(!success)
                        ToastAndroid.show('Error when play SoundPlayer :(((', ToastAndroid.SHORT);
                });
            else song.pause();

            this.setState({pause: !this.state.pause});
        }
    }

    getTracks = () => {
        fetch("https://api.spotify.com/v1/tracks/" + this.props.navigation.state.params.track.track.id,
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
                            error: result.error
                        });
                    } else {
                        this.setState({ //Poprawna odpowiedź
                            items: result.track,
                        });
                    }
                    console.log(result);
                }
            )
    }
    test() {
        console.log(this.state.tracks);
        if (this.state.tracks.length >  0) {
            return (
                <ScrollView>
                    {this.state.tracks.map(track => (
                        <View style={styles.listItem} key={track.added_at}>
                            {track.track.artists.map(artist => (
                                <Text key={artist.id}>{artist.name}</Text>
                            ))}
                            <Text>{track.track.name}</Text>
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
                    <Image
                        style={{width: 100, height: 100}}
                        source={{uri: this.props.navigation.state.params.track.track.album.images[0].url}}
                    />
                </View>
            );
        }




    }
    render() {
        if (this.state.hasPreviewUrl) {
            return (
                <View style={styles.container}>
                    <Image
                        style={{width: 200, height: 200}}
                        source={{uri: this.props.navigation.state.params.track.track.album.images[0].url}}
                    />

                    <TouchableOpacity onPress={this.onPressButtonPlay.bind(this)}>
                        <Text style={styles.buttonText}>Play</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onPressButtonPause.bind(this)}>
                        <Text style={styles.buttonText}>{this.state.pause ? 'Resume' : 'Pause'}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.container}>

                <Text style={styles.error}>Przepraszamy, ta piosenka nie może być otworzona</Text>
            </View>
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

    listItem: {
        borderBottomColor: '#000000',
        borderBottomWidth: 2
    },

    error: {
        color: '#ff0000'
    },
    buttonText: {
        fontSize: 30,
    }
});