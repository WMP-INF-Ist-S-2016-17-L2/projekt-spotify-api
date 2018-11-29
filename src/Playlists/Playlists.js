import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

export default class Playlists extends React.Component {

    viewPlaylist = (playlist) => {
        this.props.navigation.navigate('Playlist', {playlist});
    }

    render() {
        if (this.props.screenProps.playlists.length > 0) {
            return (
                <View>
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
                </View>

            );
        }
        return (
            <View><Text>playlist</Text></View>
        );

    }
}