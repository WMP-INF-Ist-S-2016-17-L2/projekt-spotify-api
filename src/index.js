import React from 'react';

import AddPlaylist from './AddPlaylist/AddPlaylist';
import Playlists from './Playlists/Playlists';
import Playlist from './Playlists/Playlist';
import Track from './Track/Track';
import Search from './Search/Search';

import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import {colors} from "./theme";

const PlaylistsNav = createStackNavigator({
    Playlists: {screen: Playlists},
    Playlist: {screen: Playlist},
    Track: {screen: Track},
    Search: {screen: Search}
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: colors.darkTextColor
    }
})

const Tabs = createBottomTabNavigator({
    Playlists: { screen: PlaylistsNav },
    AddPlaylist: { screen: AddPlaylist },
    Search: {screen : Search}
}, {
    tabBarOptions: {
        activeTintColor: colors.darkTextColor,
        inactiveTintColor: colors.fadedTextColor,
        labelStyle: {
            fontSize: 12,
            fontWeight: "bold"
        },
        style: {
            backgroundColor: colors.primary,
        },
    }
})

export default Tabs