import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import CalendarSelect from '@/components/CalendarSelect'

const reverse = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    header: () => <CalendarSelect />
                }}
            />
        </View>
    )
}

export default reverse

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
})