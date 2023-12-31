import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import listingsData from '@/assets/data/airbnb-listings.json'
import AdminListing from '@/components/AdminListingSheet'
import AdminListingSheet from '@/components/AdminListingSheet'

const adminPage = () => {
    const [category, setCategory] = useState('Tiny homes')
    const items = useMemo(() => listingsData as any, []);

    const onDataChanged = (category: string) => {
        setCategory(category);
    }

    return (
        <View style={{ flex: 1, marginTop: 80 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
                }}
            />
            <AdminListingSheet listings={items} category={category} />
        </View>
    )
}

export default adminPage