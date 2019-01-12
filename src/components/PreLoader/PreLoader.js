import {ActivityIndicator, StyleSheet, View} from "react-native";
import React from "react";
import {colors} from "../../theme";

const PreLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundPrimary
    }
});

export default PreLoader;