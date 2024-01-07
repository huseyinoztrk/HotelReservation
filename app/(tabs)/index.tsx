import { View } from 'react-native'
import React, { useMemo, useState, useEffect } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingsData from '@/assets/data/airbnb-listings.json'
import ListingsMap from '@/components/ListingsMap'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingBottomSheet from '@/components/ListingBottomSheet'
import { firebase } from '@/config'

const Page = () => {
    const [category, setCategory] = useState('Tiny homes')
    const items = useMemo(() => listingsData as any, []);
    const geoitems = useMemo(() => listingsDataGeo, []);
    const todoRef = firebase.firestore().collection('Data');
    const [users, setUsers] = useState([]);

    const onDataChanged = (category: string) => {
        setCategory(category);
    }

    useEffect(() => {
        const unsubscribe = todoRef
            .onSnapshot(
                querySnapshot => {
                    const fetchedUsers: any = [];
                    querySnapshot.forEach((doc) => {
                        fetchedUsers.push(doc.data());
                    })
                    setUsers(fetchedUsers);
                }
            );

        // Cleanup
        return () => unsubscribe();
    }, []);

    return (
        <View style={{ flex: 1, marginTop: 80 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
                }}
            />
            {/* <Listings listings={items} category={category} /> */}
            <ListingsMap listings={geoitems} />
            <ListingBottomSheet data={users} category={category} />
        </View>
    )
}

export default Page