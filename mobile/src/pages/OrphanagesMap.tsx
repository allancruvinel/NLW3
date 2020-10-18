import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import mapMarker from '../images/map-marker.png'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
  id:number,
  name: string,
  latitude: number,
  longitude: number,
}

export default function OrphanagesMap() {

  const navigation = useNavigation()
  

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, )

  //console.log(orphanages);

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails',{id});
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }



  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -23.8336437,
          longitude: -46.1284163,
          latitudeDelta: 0.010,
          longitudeDelta: 0.010
        }}>

        {orphanages.map(orphanage => {
          return (
            
            <Marker
              key={orphanage.id}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              icon={mapMarker}
              coordinate={
                {
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }

              }>
              <Callout
                onPress={()=>handleNavigateToOrphanageDetails(orphanage.id)}
                tooltip={true}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>

            </Marker>
          )
        })}


      </MapView >


      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} Orfanatos econtrados</Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" ></Feather>
        </RectButton>
      </View>


      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  calloutContainer: {
    width: 170,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    justifyContent: 'center',

  },
  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
});
