import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '@/config'
import { defaultStyles } from '@/constants/Styles';

const adminAddHotel = () => {

    const [user, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('newData');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [guests_included, setGuest] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [beds, setBeds] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [review_scores_rating, setReviewScore] = useState('');
    const [number_of_reviews, setNumberof] = useState('');
    const [price, setPrice] = useState('');
    const [host_name, setHostName] = useState('');
    const [host_since, setHostSince] = useState('');
    const [description, setDescription] = useState('');
    const [pictures, setPictures] = useState('');
    const [hostPicture, setHostPicture] = useState('');

    let datas = {
        name: name,
        description: description,
        host_name: host_name,
        host_since: host_since,
        smart_location: location,
        room_type: type,
        bathrooms: bathrooms,
        bedrooms: bedrooms,
        beds: beds,
        price: price,
        guests_included: guests_included,
        number_of_reviews: number_of_reviews,
        review_scores_rating: review_scores_rating,
        hostPicture: hostPicture,
        pictures: hostPicture

    }

    const addHotel = () => {
        try {
            todoRef
                .add(datas)
                .then(() => {
                    Keyboard.dismiss();
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        todoRef
            .onSnapshot(
                querySnapShot => {
                    const users: any = []
                    querySnapShot.forEach((doc) => {
                        users.push({
                            id: doc.id,
                            name: name,
                            type: type,
                            location: location,
                            guests_included: guests_included,
                            bedrooms: bedrooms,
                            beds: beds,
                            bathrooms: bathrooms,
                            review_scores_rating: review_scores_rating,
                            number_of_reviews: number_of_reviews,
                            price: price,
                            host_name: host_name,
                            host_since: host_since,
                            description: description,
                            picture: pictures,
                            hostPicture: hostPicture
                        })
                    })
                    setUsers(users)
                }
            )
    }, [])

    return (
        <View style={styles.container}>
            <Animated.ScrollView>
                <Text>Name:</Text>
                <TextInput style={defaultStyles.inputField} placeholder='Name' value={name || ''} onChangeText={setName} />
                <Text>Type:</Text>
                <TextInput style={defaultStyles.inputField} placeholder='Type' value={type || ''} onChangeText={setType} />
                <Text>Location:</Text>
                <TextInput style={[defaultStyles.inputField, { marginBottom: 10 }]} placeholder='Location' value={location || ''} onChangeText={setLocation} />
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{}}>Rooms:</Text>
                    <TextInput style={defaultStyles.inputField} placeholder='Rooms' value={guests_included || ''} onChangeText={setGuest} />
                    <Text style={{}}>Bedrooms:</Text>
                    <TextInput style={defaultStyles.inputField} placeholder='Bedrooms' value={bedrooms || ''} onChangeText={setBedrooms} />
                    <Text style={{}}>Beds:</Text>
                    <TextInput style={defaultStyles.inputField} placeholder='Beds' value={beds || ''} onChangeText={setBeds} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{}}>Bathrooms:</Text>
                    <TextInput style={defaultStyles.inputField} placeholder='Bathrooms' value={bathrooms || ''} onChangeText={setBathrooms} />
                    <Text>Price (€ Night):</Text>
                    <TextInput style={defaultStyles.inputField} value={price || ''} placeholder='Price' onChangeText={setPrice} />
                </View>
                <Text>Picture Url:</Text>
                <TextInput style={defaultStyles.inputField} placeholder='Picture' value={pictures || ''} onChangeText={setPictures} />
                <Text>Host Picture Url:</Text>
                <TextInput style={defaultStyles.inputField} value={hostPicture || ''} placeholder='Host Picture Url' onChangeText={setHostPicture} />
                <Text>Host Name:</Text>
                <TextInput style={defaultStyles.inputField} placeholder='Host Name' value={host_name || ''} onChangeText={setHostName} />
                <Text>Host Since:</Text>
                <TextInput style={defaultStyles.inputField} value={host_since || ''} placeholder='Host Since' onChangeText={setHostSince} />
                <Text>Description:</Text>
                <TextInput style={defaultStyles.inputField} placeholder='Description' multiline={true} value={description || ''} onChangeText={setDescription} />
                <View style={{ marginBottom: 10 }} />
                <TouchableOpacity style={defaultStyles.btn} onPress={addHotel}>
                    <Text>Kaydet</Text>
                </TouchableOpacity>
            </Animated.ScrollView>
        </View >

    )
}


export default adminAddHotel

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})