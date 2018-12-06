import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

import uuidV4 from 'uuid/v4'
import {colors} from "../theme";

export default class AddPlaylist extends React.Component {
    state = {
        playlist: '',
        result: '',
        error: null
    }

    onChangeText = (key, value) => {
        console.log([key], value);
        this.setState({
            [key]: value
        })
    }

    submit = () => {
        if (this.state.playlist === '') {return}

        fetch("https://api.spotify.com/v1/users/g5rfxuys94xd8wsdayhuh30lx/playlists",
            {
                method: 'POST',
                body: JSON.stringify({
                    "name": this.state.playlist,
                    "public": false
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
                <Text style={styles.heading}>Stwórz nową playliste</Text>
                <TextInput
                    placeholder='Nazwa playlisty'
                    value={this.state.playlist}
                    onChangeText={val => this.onChangeText('playlist', val)}
                    style={styles.input}
                />
                <TouchableOpacity onPress={this.submit} style={styles.button}>
                    <View>
                        <Text style={styles.buttonText}>Dodaj playliste</Text>
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
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonText: {
        color: '#fff'
    },
    container: {
        backgroundColor: colors.primary,
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