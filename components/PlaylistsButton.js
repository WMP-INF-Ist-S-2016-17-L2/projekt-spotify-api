import React from 'react';
import { Button } from 'react-native';

const PlaylistsButton = props => {
    return (
        <Button title="Get Playlists" onPress={props.onGetPlaylists} />
    );
};

export default PlaylistsButton;