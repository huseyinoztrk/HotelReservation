import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { SignedIn, useOAuth, useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook'
}

enum Admin {
    admin = 'admin',
    password = '1234'
}

const Page = () => {
    useWarmUpBrowser();
    const router = useRouter();
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn, setActive, isLoaded } = useSignIn();

    const adminPanel = async () => {
        if (Admin.admin === username && Admin.password === password) {
            router.back()
            if (!isLoaded) {
                return;
            }
            setLoading(true);
            try {
                const completeSignIn = await signIn.create({
                    identifier: username,
                    password
                });
                await setActive({ session: completeSignIn.createdSessionId });
            } catch (err: any) {
                alert(err.errors[0].message);
            } finally {
                setLoading(false)
            }
            router.push('/admin/adminPage')
        } else {
            alert('Wrong User')
        }
    }

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth
        }[strategy];

        try {
            const { createdSessionId, setActive } = await selectedAuth();
            console.log('~file: login.tsx31 ~ onSelectAuth ~ createdSessionId', createdSessionId)

            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                router.back();
            }
            else {
                console.log("createdSessionId is null")
            }
        } catch (err) {
            console.error('OAuth error: ', err);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 20, fontFamily: 'mon-sb' }}>Admin Account</Text>
            <TextInput
                autoCapitalize='none'
                placeholder='Username'
                placeholderTextColor={Colors.grey}
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                autoCapitalize='none'
                placeholder='Password'
                placeholderTextColor={Colors.grey}
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
                onChangeText={(text) => setpassword(text)}
                value={password}
                secureTextEntry={true}

            />
            <TouchableOpacity style={defaultStyles.btn}
                onPress={adminPanel}
            >
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.seperatorView}>
                <View style={{
                    flex: 1,
                    borderBottomColor: '#000',
                    borderBottomWidth: StyleSheet.hairlineWidth
                }} />
                <Text style={styles.seperator}>or</Text>
                <View style={{
                    flex: 1,
                    borderBottomColor: '#000',
                    borderBottomWidth: StyleSheet.hairlineWidth
                }} />
            </View>

            <View style={{ gap: 20 }}>
                {/* <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons name='call-outline' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Phone</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
                    <Ionicons name='md-logo-apple' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name='md-logo-google' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
                    <Ionicons name='md-logo-facebook' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26
    },
    seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30
    },
    seperator: {
        fontFamily: 'mon-sb',
        color: Colors.grey,
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb'
    }
})
export default Page;