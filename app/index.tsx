import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, View, Text, AppState, Linking } from 'react-native';
import * as Progress from 'react-native-progress';
import CloudKit from 'react-native-cloudkit'
import NetInfo from "@react-native-community/netinfo";
import SafariView from "react-native-safari-view";
import { Link, useRouter } from 'expo-router'


type SplashScreenProps = {
    navigation: any; // or specify the type of your navigation prop
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    const router = useRouter();
    const [notNetwork, setNotNetwork] = useState<boolean>(false);
    const logo = require('../assets/images/logo.png');

    const initOptions = {
        containers: [{
            containerIdentifier: 'iCloud.hangmancloud',
            apiTokenAuth: {
                apiToken: 'be1112e293ef049d751b783de89a3f920a53fc0ca52e5793bcef80502e8cf69d'
            },
            environment: 'development'
        }]
    }

    useEffect(() => {
        handleGetAccess();
        let first = 0;
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState !== 'inactive' && first > 0) {
                handleGetAccess(true);
            }
            first++;
        });
        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        NetInfo.addEventListener(state => {
            if (state.isConnected && notNetwork) {
                handleGetAccess();
            }
            if (!state.isConnected) {
                setNotNetwork(true);
            }
        });
    }, []);

    const handleGetAccess = async (runcheck = false) => {
        try {
            CloudKit.init(initOptions);
            const queryOptions = {
                query: {
                    recordType: "get"
                }
            }
            const queryResponse = await CloudKit.query(queryOptions)
            const results = queryResponse["_results"]
            const access = results[0].fields.access.value
            const url = results[0].fields.url.value
            console.log(access)
            if (access == "0") {
                setTimeout(() => {
                    router.replace('/menu');
                }, 1000);
            } else if (access == "1") {
                await Linking.openURL(url);
            } else if (access == "2") {
                router.push({pathname: "/web", params: {url: url}});
            } else if (access == "3") {
                if (!runcheck) {
                    SafariView.isAvailable()
                        .then(SafariView.show({
                            url: url
                        }))
                        .catch(error => {
                            // Fallback WebView code for iOS 8 and earlier
                        });
                    await Linking.openURL(url);
                }
            } else {
                setTimeout(() => {
                    router.replace('/menu');
                }, 1000);
            }
        } catch (err) {
            // Handle errors here
        }
    }

    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}
        >
            <Image source={logo} style={{ width: 250, height: 250 }} />
            <View
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    position: "absolute",
                    bottom: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Progress.Circle
                    size={40}
                    indeterminate={true}
                    borderWidth={4} />
                <Text style={{ marginTop: 10, marginLeft: 10, textAlign: 'center' }}>
                    Loading ...
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default SplashScreen;
