import React, {useEffect, useRef, useReducer, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Text, Block, Button, TextField} from 'components';
import * as images from 'assets/images';
import * as icons from 'assets/icons';
import {colors, sizes} from 'styles/theme';
import {userDetails} from 'utils';
import {HomeCard} from './Section/HomeCard';
import {LOCATION} from 'utils/constant';

import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import database, {firebase} from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

const Home = props => {
  const {navigation, route} = props;

  const LocationError = 'Unable To Get Location';

  const getCoords = async userKey => {
    // console.log('IOS,', userKey);
    await Geolocation.getCurrentPosition(
      async ({coords}) => {
        console.log(coords);
        await dbRef.child(userKey).update({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      err => {
        console.log(err);
        alert(LocationError);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 15000,
      },
    );
    // setLocation({lat:result.latitude,})
  };
  const CheckPermissions = async userKey => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('granted');
          // Geolocation.getCurrentPosition(
          //   async ({coords}) => {
          //     const user = await dbRef.child(userKey).update({
          //       lat: coords.latitude.toString(),
          //       lng: coords.longitude.toString(),
          //     });
          //   },
          // ,
          //   err => {
          //     alert(LocationError);
          //   },
          //   {
          //     enableHighAccuracy: false,
          //     timeout: 10000,
          //     maximumAge: 15000,
          //   },
          // );
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('DENIED');
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('never ask again ');
        }
      } catch (e) {}
    } else if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      getCoords(userKey);
      // check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      // console.log(result);
      // });
    }
  };

  useEffect(() => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(colors.themeColor);
  }, ['']);

  let AdUnitIdVideo =
    Platform.OS === 'ios'
      ? 'ca-app-pub-9004799515246618/9442186346'
      : 'ca-app-pub-9004799515246618/8751635796';
  const viewMap = loc => {
    let result = false;
    offerList.forEach(el => {
      console.log(el === loc);
      el === loc && (result = el);
    });

    let complete = false;
    AdMobRewarded.setAdUnitID(`${AdUnitIdVideo}`);
    AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());

    AdMobRewarded.addEventListener('adFailedToLoad', error => {
      complete = false;
      alert('Please Try Again Later.');
    });
    AdMobRewarded.addEventListener('rewarded', reward => {
      console.log('Watch Completed');
      complete = true;
    });
    AdMobRewarded.addEventListener('adClosed', () => {
      if (complete) {
        AdMobRewarded.removeAllListeners();
        AdMobInterstitial.removeAllListeners();
        navigation.navigate(LOCATION, {
          location: result,
        });
      } else {
        alert('You would have to watch atleast one video to move further');
      }
    });

    // navigation.navigate(LOCATION, {
    //   location: result,
    // });
  };
  // ===========================================================
  const dbRef = database().ref('/Treasure');
  let myId = 100;

  useEffect(() => {
    console.log('Mount Component');
    availableOffers();
    currentUserDetails();
  }, ['']);

  useEffect(() => {
    a();
    return () => a;
  }, ['']);

  const [newValueAdd, setNewValueAdded] = useState(false);

  const a = async () => {
    let newList = [];
    await dbRef.on('value', data => {
      console.log(' ON FUNCTION CALLED');
      console.log(data);
      data.forEach(el => {
        // console.log(el.val());
        newList.push(el.val());
        // setOfferList(el.val());
      });
      // console.log('NEW LIST NOW');
      // console.log(newList);
      setOfferList(newList);
      newList = [];
    });
  };
  // =========================================
  const [offerList, setOfferList] = useState([]);
  // IF UsER is ALREADY IN in database cheeck
  const checkMyUserIfAvailable = async () => {
    let found = false;
    await dbRef.once('value', data => {
      data.forEach(el => {
        el.val().id === myId && (found = el.key);
      });
    });
    return found;
  };
  // Create NEw User If Not in database
  // const addUser = async () => {
  //   const user = {
  //     id: 100,
  //     amount: '0',
  //     description: '00',
  //     name: 'Margzar-101',
  //     // lat: 31.5302177,
  //     lat: 31.504991,

  //     // lng: 74.2948511,
  //     lng: 74.2460353,
  //   };
  //   await database()
  //     .ref('/Treasure')
  //     .push(user);
  // };
  // Logged in user Details
  const currentUserDetails = async () => {
    const found = await checkMyUserIfAvailable();
    if (found) {
      CheckPermissions(found);
    }
    // } else {
    //   await addUser();
    // }
  };
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
  const sortByProperty = property => {
    return function(a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;

      return 0;
    };
  };
  // -----------------GET DISTANCE FROM ONE TO OTHER ENDED===================
  // fetch al nearest users
  const availableOffers = async () => {
    let offerArray = [];
    await dbRef.once('value', data => {
      data.forEach(async el => {
        if (el.val().id !== myId) {
          offerArray.push(el.val());
          // Geolocation.getCurrentPosition(
          //   ({coords}) => {
          //     let result = getDistanceFromLatLonInKm(
          //       coords.latitude,
          //       coords.longitude,
          //       el.val().lat,
          //       el.val().lng,
          //     );
          //     offerArray.push({
          //       rewardDetail: el.val(),
          //       distance: result,
          //     });
          //   },
          //   err => {
          //     alert(LocationError);
          //   },
          // );
        }
      });
    });
    // console.log('================');
    // setOfferList(offerArray);
    // console.log(offerArray);
    setOfferList(offerArray);
  };

  return (
    <ImageBackground
      source={images.homeBackDim}
      style={{
        width: '100%',
        // height: '105%',
        flex: 1,
        backgroundColor: colors.themeColor,
        // marginBottom: sizes.getHeight(50),
      }}>
      <Block center padding={[0, sizes.getWidth(1)]}>
        <Block style={styles.homeHeaderCon}>
          <Image source={icons.appNameLogo} style={styles.homeHeaderImg} />
        </Block>
        {offerList.length ? (
          <FlatList
            // data={userDetails}
            data={offerList}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({item, index}) => {
              return <HomeCard item={item} moveTo={loc => viewMap(loc)} />;
            }}
          />
        ) : (
          <Block middle center>
            <Text color={colors.primary} h1>
              No Offer Found.
            </Text>
          </Block>
        )}
        {/* <Block style={styles.homeBackCon}>
        <Image source={images.homeBackDim} style={styles.homeBack} />
      </Block> */}

        {/* <Button onPress={addUser} style={{borderWidth: 1}}>
          <Text>Add</Text>
        </Button> */}
      </Block>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeHeaderCon: {
    flex: 0,
    height: sizes.getHeight(10),
    marginBottom: sizes.getHeight(5),
    // borderWidth: 1,
  },
  homeHeaderImg: {
    resizeMode: 'contain',
    flex: 1,
  },
  homeBackCon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: -1,
  },
  homeBack: {
    resizeMode: 'contain',
    height: sizes.getHeight('103%'),
  },
});
