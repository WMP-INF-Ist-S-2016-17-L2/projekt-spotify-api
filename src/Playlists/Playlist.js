import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';

export default class Playlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            error: null
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
                            error: result.error
                        });
                    } else {
                        this.setState({ //Poprawna odpowiedź
                            tracks: result.items,
                        });
                    }
                }
            )
    }

    render() {
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
                </View>
            );
        }

        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Playlista jest pusta
                </Text>
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
    }
});