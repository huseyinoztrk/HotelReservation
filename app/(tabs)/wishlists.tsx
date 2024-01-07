import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
    return (
        <View style={defaultStyles.container}>
            <TouchableOpacity>
                <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                    <Image source={{ uri: "https://a0.muscache.com/im/pictures/bced1392-9538-41df-92d9-f058a7188b0f.jpg?aki_policy=medium" }} style={styles.image} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>NAME</Text>
                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            <Ionicons name='star' size={16} />
                            <Text style={{ fontFamily: 'mon-sb' }}>REVİEW RAİTİNG</Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'mon' }}>ROOM TYPE</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'mon-sb' }}>€ PRİCE</Text>
                        <Text style={{ fontFamily: 'mon' }}> night</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: 16,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    info: {
        textAlign: 'center',
        fontFamily: 'mon-sb',
        fontSize: 16,
        marginTop: 4
    }
})

export default Page