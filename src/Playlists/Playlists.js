import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Dimensions
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
                    <View style={styles.container}>
                    {this.props.screenProps.playlists.map(playlist => (
                        <View key={playlist.id} style={styles.thumbnailWrapper}>
                            {playlist.images.length > 0 ?
                                <TouchableWithoutFeedback onPress={() => this.viewPlaylist(playlist)}>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{uri: playlist.images[0].url}}
                                    />
                                </TouchableWithoutFeedback>
                                :
                                <TouchableWithoutFeedback onPress={() => this.viewPlaylist(playlist)}>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{uri: "https://www.fillmurray.com/150/150"}}
                                    />
                                </TouchableWithoutFeedback>
                            }

                            <Text style={styles.thumbnailText}>
                                {playlist.name}
                            </Text>
                        </View>
                    ))}
                    </View>
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
            <View style={styles.thumbnailWrapper}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    thumbnailWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
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
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 20

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

    thumbnail: {
        width: 150,
        height: 150,
        margin: 15
    },
    thumbnailText: {
        textAlign: 'center'
    }

})