import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import {colors} from "../theme";

export default class Playlists extends React.Component {

    viewPlaylist = (playlist) => {
        this.props.navigation.navigate('Playlist', {playlist});
    }

    render() {

        if (this.props.screenProps.playlists.length > 0) {
            return (
                <ScrollView>
                    {this.props.screenProps.playlists.map(playlist => (
                        <View key={playlist.id}>
                            {playlist.images.length > 0 ?
                                <TouchableWithoutFeedback onPress={() => this.viewPlaylist(playlist)}>
                                    <Image
                                        style={{width: 100, height: 100}}
                                        source={{uri: playlist.images[0].url}}
                                    />
                                </TouchableWithoutFeedback>
                                :
                                <TouchableWithoutFeedback onPress={() => this.viewPlaylist(playlist)}>
                                    <Image
                                        style={{width: 100, height: 100}}
                                        source={{uri: "https://www.fillmurray.com/150/150"}}
                                    />
                                </TouchableWithoutFeedback>
                            }

                            <Text>
                                {playlist.name}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

            );
        }
        if (this.props.screenProps.error) {
            return (
                <View style={styles.container}>
                    <Text style={styles.error}>
                        Wystąpił błąd podczas ładowania playlisty
                    </Text>
                    <Text>{this.props.screenProps.error.message}</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: '#fff'
    },
    error: {
        color: colors.error,
        textAlign: 'center'
    },
})