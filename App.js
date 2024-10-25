import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, Alert, Image, View, FlatList, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import Form from './src/form/Form';
import WeatherAPI from './src/api/weatherApi';
import Navigate from './src/navigate/navigate';

export default function App() {

  return (
    <Navigate/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },

});
