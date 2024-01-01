import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import listingsData from '@/assets/data/airbnb-listings.json'
import { Listing } from '@/interfaces/listing'
import Animated, { useAnimatedRef } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import defaultData from '@/assets/data/airbnb-listings.json'
import * as FileSystem from 'expo-file-system';

const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window');

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const listing: Listing = (listingsData as any[]).find((item) => item.id === id);
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const [name, setName] = useState(listing.name);
    const [type, setType] = useState(listing.room_type);
    const [location, setLocation] = useState(listing.smart_location);
    const [guests_included, setGuest] = useState<string>(listing.guests_included.toString());
    const [bedrooms, setBedrooms] = useState<string>(listing.bedrooms.toString());
    const [beds, setBeds] = useState<string>(listing.beds.toString());
    const [bathrooms, setBathrooms] = useState<string>(listing.bathrooms.toString());
    const [review_scores_rating, setReviewScore] = useState<string>(listing.review_scores_rating.toString());
    const [number_of_reviews, setNumberof] = useState<string>(listing.number_of_reviews.toString());
    const [price, setPrice] = useState<string>(listing.price.toString());
    const [host_name, setHostName] = useState<string>(listing.host_name.toString());
    const [host_since, setHostSince] = useState<string>(listing.host_since.toString());
    const [description, setDescription] = useState<string>(listing.description.toString());

    const filePath = `${FileSystem.documentDirectory}airbnb-listings.json`;

    const writeToJSONFile = async () => {
        const updatedData = {
            id: listing.id,
            listing_url: listing.listing_url,
            scrape_id: listing.scrape_id,
            last_scraped: listing.last_scraped,
            name: name,
            summary: listing.summary,
            space: listing.space,
            description: description,
            experiences_offered: listing.experiences_offered,
            neighborhood_overview: listing.neighborhood_overview,
            notes: listing.notes,
            transit: listing.transit,
            access: listing.access,
            interaction: listing.interaction,
            house_rules: listing.house_rules,
            thumbnail_url: listing.thumbnail_url,
            medium_url: listing.medium_url,
            picture_url: listing.picture_url,
            xl_picture_url: listing.xl_picture_url,
            host_id: listing.host_id,
            host_url: listing.host_url,
            host_name: host_name,
            host_since: host_since,
            host_location: listing.host_location,
            host_about: listing.host_about,
            host_response_time: listing.host_response_time,
            host_response_rate: listing.host_response_rate,
            host_acceptance_rate: listing.host_acceptance_rate,
            host_thumbnail_url: listing.host_thumbnail_url,
            host_picture_url: listing.picture_url,
            host_neighbourhood: listing.host_neighbourhood,
            host_listings_count: listing.host_listings_count,
            host_total_listings_count: listing.host_total_listings_count,
            host_verifications: listing.host_verifications,
            street: listing.street,
            neighbourhood: listing.neighbourhood,
            neighbourhood_cleansed: listing.neighbourhood_cleansed,
            neighbourhood_group_cleansed: listing.neighbourhood_group_cleansed,
            city: listing.city,
            state: listing.state,
            zipcode: listing.zipcode,
            market: listing.market,
            smart_location: location,
            country_code: listing.country_code,
            country: listing.country,
            latitude: listing.latitude,
            longitude: listing.longitude,
            property_type: listing.property_type,
            room_type: type,
            accommodates: listing.accommodates,
            bathrooms: bathrooms,
            bedrooms: bedrooms,
            beds: beds,
            bed_type: listing.bed_type,
            amenities: listing.amenities,
            square_feet: listing.square_feet,
            price: price,
            weekly_price: listing.weekly_price,
            monthly_price: listing.monthly_price,
            security_deposit: listing.security_deposit,
            cleaning_fee: listing.cleaning_fee,
            guests_included: guests_included,
            extra_people: listing.extra_people,
            minimum_nights: listing.minimum_nights,
            maximum_nights: listing.maximum_nights,
            calendar_updated: listing.calendar_updated,
            has_availability: listing.has_availability,
            availability_30: listing.availability_30,
            availability_60: listing.availability_60,
            availability_90: listing.availability_90,
            availability_365: listing.availability_365,
            calendar_last_scraped: listing.calendar_last_scraped,
            number_of_reviews: number_of_reviews,
            first_review: listing.first_review,
            last_review: listing.last_review,
            review_scores_rating: review_scores_rating,
            review_scores_accuracy: listing.review_scores_accuracy,
            review_scores_cleanliness: listing.review_scores_cleanliness,
            review_scores_checkin: listing.review_scores_checkin,
            review_scores_communication: listing.review_scores_communication,
            review_scores_location: listing.review_scores_location,
            review_scores_value: listing.review_scores_value,
            license: listing.license,
            jurisdiction_names: listing.jurisdiction_names,
            cancellation_policy: listing.cancellation_policy,
            calculated_host_listings_count: listing.calculated_host_listings_count,
            reviews_per_month: listing.reviews_per_month,
            geolocation: listing.geolocation,
            features: listing.features

        };
        const jsonDatas = JSON.stringify(updatedData);
        try {
            await FileSystem.writeAsStringAsync(filePath, jsonDatas);
            console.log('calisti')
        } catch (error) {
            console.log('hata: ', error)
        }
        // try {
        //     await fs.writeFile()
        // } catch (error) {
        //     console.log('veri kaydetme hatasi : ', error)
        // }


        // for (let i = 0; i < defaultData.length; i++) {
        //     if (defaultData[i].id === listing.id) {
        //         console.log('degerleri bas')
        //     }
        // }
    }

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                contentContainerStyle={{ paddingBottom: 100 }}
                scrollEventThrottle={16}
            >
                <Animated.Image source={{ uri: listing.xl_picture_url }} style={[styles.image]} />
                <View style={styles.infoContainer}>
                    <TextInput style={styles.name} value={name || ''} onChangeText={setName} />
                    <TextInput style={styles.location} value={type || ''} onChangeText={setType} />
                    <TextInput style={styles.location} value={location || ''} onChangeText={setLocation} />
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <TextInput style={styles.rooms} value={guests_included || ''} onChangeText={setGuest} />
                        <Text style={styles.rooms}>Rooms</Text>
                        <TextInput style={styles.rooms} value={bedrooms || ''} onChangeText={setBedrooms} />
                        <Text style={styles.rooms}>Bedrooms</Text>
                        <TextInput style={styles.rooms} value={beds || ''} onChangeText={setBeds} />
                        <Text style={styles.rooms}>Beds</Text>
                        <TextInput style={styles.rooms} value={bathrooms || ''} onChangeText={setBathrooms} />
                        <Text style={styles.rooms}>Bathrooms</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Ionicons name='star' size={16} />
                        <TextInput style={styles.ratings} value={review_scores_rating || ''} onChangeText={setReviewScore} />
                        <Text style={styles.rooms}> - </Text>
                        <TextInput style={styles.ratings} value={number_of_reviews || ''} onChangeText={setNumberof} />
                        <Text style={styles.rooms}>Reviews</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.footerText}>
                            <TextInput style={styles.footerPrice} value={price || ''} onChangeText={setPrice} />
                            <Text>€ Night</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.hostView}>
                        <Image source={{ uri: listing.host_picture_url }} style={styles.host} />
                        <View>
                            <TextInput style={{ fontWeight: '500', fontSize: 16 }} value={host_name || ''} onChangeText={setHostName} />
                            <TextInput value={host_since || ''} onChangeText={setHostSince} />
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <TextInput style={styles.description} multiline={true} value={description || ''} onChangeText={setDescription} />
                </View>
                <TouchableOpacity style={defaultStyles.btn} onPress={writeToJSONFile}>
                    <Text>Kaydet</Text>
                </TouchableOpacity>
            </Animated.ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        height: IMG_HEIGHT,
        width: width,
    },
    infoContainer: {
        padding: 24,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'mon-sb',
    },
    location: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: 'mon-sb',
    },
    rooms: {
        fontSize: 16,
        color: Colors.grey,
        marginVertical: 4,
        fontFamily: 'mon',
    },
    ratings: {
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.grey,
        marginVertical: 16,
    },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },
    hostView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    footerText: {
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    footerPrice: {
        fontSize: 18,
        fontFamily: 'mon-sb',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.primary,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    header: {
        backgroundColor: '#fff',
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
    },

    description: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: 'mon',
    },
})

export default Page