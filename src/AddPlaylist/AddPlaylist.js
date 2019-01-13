import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {colors} from "../theme";

import Playlists from '../Playlists/Playlists';

export default class AddPlaylist extends React.Component {
    state = {
        playlist: '',
        result: '',
        error: null
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    submit = () => {
        if (this.state.playlist === '') {
            return
        }

        fetch("https://api.spotify.com/v1/users/g5rfxuys94xd8wsdayhuh30lx/playlists",
            {
                method: 'POST',
                body: JSON.stringify({
                    "name": this.state.playlist,
                    "public": true
                }),
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
                        this.props.screenProps.addPlaylist(result);
                        this.props.navigation.navigate('Playlists');
                    }
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Create new playlist</Text>
                <TextInput
                    placeholder='Playlist name'
                    value={this.state.playlist}
                    onChangeText={val => this.onChangeText('playlist', val)}
                    style={styles.input}
                />
                <TouchableOpacity onPress={this.submit} style={styles.button}>
                    <View>
                        <Text style={styles.buttonText}>Add playlist</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ffffff',
        margin: 10,
        paddingHorizontal: 8,
        height: 50
    },
    button: {
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonText: {
        color: colors.buttonTextColor,
        fontWeight: "bold"
    },
    container: {
        backgroundColor: colors.backgroundPrimary,
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: '#fff'
    }
})