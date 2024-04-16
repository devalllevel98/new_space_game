import React, { useEffect, useRef } from "react";
import { BackHandler, View } from "react-native";
import WebView from "react-native-webview";
import { Link, useRouter, useLocalSearchParams } from 'expo-router'

interface RouteParams {
  url: string;
}

interface Props {
  route: {
    params: RouteParams;
  };
}

const WebviewScreen: React.FC<Props> = () => {
  const {url} = useLocalSearchParams()
  const route = useRouter();
  // const params = route.param; 
  const webview = useRef<WebView>(null);
  const onAndroidBackPress = () => {
    if (webview.current) {
      webview.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    console.log("route", route);
    console.log("param", url)
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []); // Never re-run this effect

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        scalesPageToFit={true}
        ref={webview}
      />
    </View>
  );
};

export default WebviewScreen;
