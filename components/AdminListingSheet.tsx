import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Listing } from '@/interfaces/listing'
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import AdminListings from './AdminListing';

interface Props {
    listings: Listing[];
    category: string;
}

const AdminListingSheet = ({ listings, category }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '100%'], []);
    const [refresh, setRefresh] = useState(0);

    return (
        <BottomSheet
            index={1}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleIndicatorStyle={{ backgroundColor: Colors.grey }}
            style={styles.sheetContainer}>
            <View style={{ flex: 1 }}>
                <AdminListings listings={listings} category={category} refresh={refresh} />
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 16,
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sheetContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1
        }
    }
})

export default AdminListingSheet