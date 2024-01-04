import { View, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles';
import { ListingGeo } from '@/interfaces/listingGeo';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering'

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 52.520008,
    longitude: 13.404954,
    latitudeDelta: 9,
    longitudeDelta: 9
}

const ListingsMap = memo(({ listings }: Props) => {
    const router = useRouter();
    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`)
    }

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count;

        return (
            <Marker
                key={`cluster-${id}`}
                onPress={onPress}
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1]
                }}>
                <View style={styles.marker}>
                    <Text
                        style={{
                            color: '#000',
                            textAlign: 'center',
                            fontFamily: 'mon-sb'
                        }}>
                        {points}
                    </Text>
                </View>
            </Marker>
        )
    }

    return (
        <View style={defaultStyles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
                clusterColor='#fff'
                clusterTextColor='#000'
                clusterFontFamily='mon-sb'
                renderCluster={renderCluster}>
                {listings.features.map((item: ListingGeo) => (
                    <Marker
                        key={item.properties.id}
                        onPress={() => onMarkerSelected(item)}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude
                        }} >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>€ {item.properties.price}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    marker: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        textShadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10
        }
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb'
    }
})
export default ListingsMap