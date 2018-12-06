import React from 'react';

import AddPlaylist from './AddPlaylist/AddPlaylist';
import Playlists from './Playlists/Playlists';
import Playlist from './Playlists/Playlist';
import Track from './Track/Track';

import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import {colors} from "./theme";

const PlaylistsNav = createStackNavigator({
    Playlists: {screen: Playlists},
    Playlist: {screen: Playlist},
    Track: {screen: Track}
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: '#fff'
    }
})

const Tabs = createBottomTabNavigator({
    Playlists: { screen: PlaylistsNav },
    AddPlaylist: { screen: AddPlaylist }
})

export default Tabs