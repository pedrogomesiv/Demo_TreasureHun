import React, {useEffect, useRef, useReducer, useState, Fragment} from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import {Text, Block, Button, TextField} from 'components';
import * as images from 'assets/images';
import * as icons from 'assets/icons';
import {colors, sizes} from 'styles/theme';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';
import database, {firebase} from '@react-native-firebase/database';
import {
  request,
  check,
  RESULTS,
  PERMISSIONS,
  checkMultiple,
} from 'react-native-permissions';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';
import {HOME} from 'utils/constant';
import Geolocation from '@react-native-community/geolocation';

// ------------------------------CODE STARTED

const Location = props => {
  const IOS_KEY = 'ca-app-pub-9004799515246618/8727870473';
  const AND_KEY = 'ca-app-pub-9004799515246618/3175875480';
  const {navigation, route} = props;
  const [location, setLocation] = useState({
    lat: 37.4218893,
    lng: 122.101602,
  });
  // ======================================================
  const [offerList, setOfferList] = useState([]);
  const dbRef = database().ref('/Treasure');
  let myId = 100;
  useEffect(() => {
    availableOffers();
  }, ['']);

  // -----------------GET DISTANCE FROM ONE TO OTHER===================
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const availableOffers = async () => {
    let offerArray = [];
    await dbRef.once('value', data => {
      data.forEach(el => {
        console.log('===database Data===');
        console.log(el.val());
        // if (el.val().id !== myId) {
        //   offerArray.push(el.val());
        //   // if (
        //   //   getDistanceFromLatLonInKm(
        //   //     31.5691501,
        //   //     74.2830362,
        //   //     el.val().lat,
        //   //     el.val().lng,
        //   //   ) < 1
        //   // ) {
        //   //   console.log('IN 1000 Metter Radius');
        //   //   offerArray.push(el.val());
        //   // } else {
        //   //   console.log('More Than 1000 Metter List');
        //   // }
        // }
      });
      setOfferList([]);
      setOfferList(offerArray);
    });
  };
  // ======================================================

  const [watchAdCompleted, setWatchAdCompleted] = useState(false);
  const [avaialbleOffersList, setAvailableOffersList] = useState();
  useEffect(() => {
    // getCurrentLocation();
    // data in array of nearest users
    console.log('=======USE EFFECT-------');
    console.log(route?.params.location);
    setAvailableOffersList(route?.params.location);
    let lat = route?.params.location.lat;
    let lng = route?.params.location.lng;
    setLocation({
      lat: lat,
      lng: lng,
    });
  }, ['']);

  // console.log('AVAIALBLE LIST');
  // console.log(avaialbleOffersList);

  // -------------------------------------------------------------------------------------

  const getCoords = async () => {
    await GeoLocation.getCurrentPosition(
      ({coords}) => {
        setLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        setShowMine(true);
        // await dbRef.child('')
      },
      err => {
        console.log(err);
        alert('Please Turn On Location ');
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 15000,
      },
    );
    // setLocation({lat:result.latitude,})
  };

  const getCurrentLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // ===============================================================
          getCoords();
          // ===============================================================
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('DENIED');
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('never ask again ');
          alert(
            'Please go to Android Settings > app > permission.\n\nAllow Location Permission',
          );
        }
      } catch (e) {
        console.log(e);
      }
    } else if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      getCoords();
    }
  };

  // UTID ID FOR APP AD
  let AdUnitId = Platform.OS === 'ios' ? IOS_KEY : AND_KEY;

  // ANDROID STATUS BAR
  useEffect(() => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(colors.themeColor);
  }, ['']);
  const [showMine, setShowMine] = useState(false);
  // console.log('========================LOCATION========================');
  // console.log(avaialbleOffersList);
  // console.log('========================LOCATION========================');
  // const {width, height} = Dimensions.get('screen');
  // const ASPECT_RATIO = width / height;
  // const LATITUDE_DELTA = 0.2;
  // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  // const [mylocation, setMyLocation]
  return (
    <Block middle center>
      {!showMine ? (
        <MapView
          rotateEnabled={true}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: parseFloat(avaialbleOffersList?.lat, 10) || 37.4218893,
            longitude: parseFloat(avaialbleOffersList?.lng, 10) || 122.101602,
            latitudeDelta: 0.0911,
            longitudeDelta: 0.0421,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <Circle
            strokeColor={colors.themeColor}
            strokeWidth={3}
            center={{
              // latitude: location?.lat || 37.4218893,
              // longitude: location?.lng || 122.101602,
              latitude: parseFloat(avaialbleOffersList?.lat, 10) || 37.4218893,
              longitude: parseFloat(avaialbleOffersList?.lng, 10) || 122.101602,
            }}
            radius={1000}
          />
        </MapView>
      ) : (
        <MapView
          rotateEnabled={true}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: location.lat || 37.4218893,
            longitude: location.lng || 122.101602,
            latitudeDelta: 0.0911,
            longitudeDelta: 0.0421,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <Circle
            strokeColor={colors.themeColor}
            strokeWidth={3}
            center={{
              // latitude: location?.lat || 37.4218893,
              // longitude: location?.lng || 122.101602,
              latitude: parseFloat(avaialbleOffersList?.lat, 10) || 37.4218893,
              longitude: parseFloat(avaialbleOffersList?.lng, 10) || 122.101602,
            }}
            radius={700}
          />
        </MapView>
      )}
      <Block style={styles.getLocationCon}>
        <Button
          onPress={getCurrentLocation}
          middle
          center
          style={{
            width: '100%',
            height: '100%',
            borderWidth: 0,
          }}>
          <Image source={icons.getLocation} style={styles.locationImg} />
        </Button>
      </Block>
      <Block style={styles.adMobCon}>
        <AdMobBanner
          adSize="fullbanner"
          adUnitID={AdUnitId}
          // testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.log(error)}
        />
      </Block>
      {/* <Block style={{borderWidth: 1, position:'absolute',}}>
        <Text color={colors.primary}>Back</Text>
      </Block> */}
    </Block>
  );
};

export default Location;

const styles = StyleSheet.create({
  getLocationCon: {
    // borderWidth: 1,
    position: 'absolute',
    width: sizes.getWidth(10),
    height: sizes.getHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 10,
    top: sizes.getHeight(3),
    right: sizes.getWidth(4),
  },
  locationImg: {
    resizeMode: 'contain',
    // flex: 0.6,
    height: '100%',
    width: '100%',
  },
  adMobCon: {
    flex: 0,
    position: 'absolute',
    // borderWidth: 1,
    // overflow: 'hidden',
    bottom: sizes.getHeight(2),
    width: sizes.getWidth('100%'),
    height: sizes.getHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
