import React from 'react'
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import mapMarker from '../images/map-marker.png'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OrphanagesMap() {

    const navigation = useNavigation()
    
    function handleNavigateToOrphanageDetails(){
        navigation.navigate('OrphanageDetails');
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

                <Marker
                    calloutAnchor={{
                        x: 2.7,
                        y: 0.8,
                    }}
                    icon={mapMarker}
                    coordinate={
                        {
                            latitude: -23.8336437,
                            longitude: -46.1284163,
                        }

                    }>
                    <Callout
                        onPress={handleNavigateToOrphanageDetails}
                        tooltip={true}>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>Lar das Meninas</Text>
                        </View>
                    </Callout>

                </Marker>


            </MapView >


            <View style={styles.footer}>
                <Text style={styles.footerText}>2 Orfanatos Encontrados</Text>

                <TouchableOpacity style={styles.createOrphanageButton} onPress={() => { }}>
                    <Feather name="plus" size={20} color="#fff" ></Feather>
                </TouchableOpacity>
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
    calloutContainer:{
      width: 170,
      height: 46,
      paddingHorizontal:16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
  
    },
    calloutText:{
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5',
      fontSize: 14
    },
    footer:{
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
    footerText:{
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
    createOrphanageButton:{
      width:56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  