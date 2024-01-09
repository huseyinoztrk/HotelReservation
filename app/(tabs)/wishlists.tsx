import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '@/config'
import { Link } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Wishlist = () => {
    const todoRefWish = firebase.firestore().collection('Wishlist');
    const todoRef = firebase.firestore().collection('Data');
    const fetchWishId: any = [];
    const fetchedList: any = [];
    const List: any = [];
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        todoRefWish.onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                fetchWishId.push(doc.data());
            });
        });
        todoRef.onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                fetchedList.push(doc.data());
            });

        });
        List.length = 0;
        setTimeout(() => {
            const fetctItem = () => {
                fetchedList.forEach(item => {
                    for (let i = 0; i < fetchWishId.length; i++) {
                        if (fetchWishId[i].id === item.id) {
                            List.push(item);
                        }
                    }
                });
            }
            return fetctItem();
        }, 1);
    }, [refresh]);


    const renderItem = ({ item }) => (
        <View style={defaultStyles.container}>
            <Link href={`/listing/${item.id}`} asChild>
                <TouchableOpacity>
                    <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                        <Image source={{ uri: item.medium_url }} style={styles.image} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', gap: 4 }}>
                                <Ionicons name='star' size={16} />
                                <Text style={{ fontFamily: 'mon-sb' }}>{item.review_scores_rating / 20}</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'mon-sb' }}>€ {item.price}</Text>
                            <Text style={{ fontFamily: 'mon' }}> night</Text>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Link>

        </View>
    )

    return (
        <View style={defaultStyles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => setRefresh(!refresh)}>
                <Text>Get Wishlist</Text>
            </TouchableOpacity>
            <FlatList
                data={List}
                renderItem={renderItem}
            />
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
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    btn: {
        backgroundColor: Colors.primary,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Wishlist