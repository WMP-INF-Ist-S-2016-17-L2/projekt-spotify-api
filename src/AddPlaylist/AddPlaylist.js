import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

import uuidV4 from 'uuid/v4'
import { colors } from "../theme";

export default class AddPlaylist extends React.Component {
    state = {
        playlist: '',
    }

    onChangeText = (key, value) => {
        console.log([key], value);
        this.setState({
            [key]: value
        })
    }
    submit = () => {
        console.log('submit')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Add Platlist</Text>
                <TextInput
                    placeholder='Playlist name'
                    value={this.state.playlist}
                    onChangeText={val => this.onChangeText('items', val)}
                    style={styles.input}
                />
                <TouchableOpacity onPress={this.submit}>
                    <View>
                        <Text>Add playlist</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        margin: 10,
        paddingHorizontal: 8,
        height: 10
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
        fontSize:30,
        textAlign: 'center',
        margin: 10,
        color: '#fff'
    }
})