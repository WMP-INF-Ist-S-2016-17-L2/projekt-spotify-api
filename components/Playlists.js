import React from 'react';
import { Button, Text, View, Image } from 'react-native';

const Playlists = props => {
    if (props.playlists.length > 0) {
        return (

            <View>
                {props.playlists.map(playlist => (
                    <View key={playlist.id}>
                        {console.log(playlist.images)}
                        {playlist.images.length > 0 ?
                            <Image
                                style={{width: 100, height: 100}}
                                source={{uri: playlist.images[0].url}}
                            />
                            : <Image
                                style={{width: 50, height: 60}}
                                source={{uri: "https://www.fillmurray.com/150/150"}}
                            />
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
        <View><Text>Brak playlist do wyświetlenia.</Text></View>
    );
};

export default Playlists;