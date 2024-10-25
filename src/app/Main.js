import { StyleSheet, Text, Alert, View, TouchableOpacity, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';


export default function Main({ route, navigation }) {
    const { weatherData } = route.params;
    const [isAlertShown, setIsAlertShown] = useState(false);  // Флаг состояния для контроля показа Alert
    const [modalVisible, setModalVisible] = useState(false); // Состояние для отображения модального окна
    const [history, setHistory] = useState([]); 
     // Массив для истории запросов
    useEffect(() => {
        if (weatherData) {
        setHistory((prevHistory) => [weatherData, ...prevHistory]);
        }
    }, [weatherData]);

    useFocusEffect(
        React.useCallback(() => {
          setIsAlertShown(false);  // Сбрасываем флаг каждый раз, когда экран становится активным
        }, [])
      );
    useEffect(() => {
        if (!weatherData) {
          // Проверяем, что Alert ещё не был показан
          if (!isAlertShown) {
            setIsAlertShown(true);  // Устанавливаем флаг после показа Alert
    
            Alert.alert(
              'Error',
              'City not found. Please try again.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('Search', {history: history});  // Переход на экран "Search"
                  },
                },
              ],
              { cancelable: false }
            );
          }
        }
      }, [weatherData, isAlertShown, navigation]);
    
    if (!weatherData) {
        return <View style={styles.container}></View>;
    }

    const handleNavigateToSearch = () => {
        navigation.navigate('Search', { history }); // Передаем обновленный history
    };

    return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.iconButton} onPress={handleNavigateToSearch}>
        <FontAwesome5 name="search" style={styles.search1} size={24} color="black" />
    </TouchableOpacity>
        <View style={styles.weatherBox}>
        <Text style={styles.cityName}>{weatherData.name}</Text>
        <Text style={styles.tempText}>{weatherData.temp}°C</Text>
        <Text style={styles.descriptionText}>{weatherData.description}</Text>
        </View>

        {/* Button to open modal */}
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>More details</Text>
        </TouchableOpacity>

        {/* Modal window */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.modalContainer}>
            <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Detailed Information</Text>
            <Text style={styles.modalText}>City: {weatherData.name}</Text>
            <Text style={styles.modalText}>Temperature: {weatherData.temp}°C</Text>
            <Text style={styles.modalText}>Feels like: {weatherData.feels_like}°C</Text>
            <Text style={styles.modalText}>Min temperature: {weatherData.temp_min}°C</Text>
            <Text style={styles.modalText}>Max temperature: {weatherData.temp_max}°C</Text>
            <Text style={styles.modalText}>Pressure: {weatherData.pressure} hPa</Text>
            <Text style={styles.modalText}>Humidity: {weatherData.humidity}%</Text>
            <Text style={styles.modalText}>Wind speed: {weatherData.wind_speed} m/s</Text>

            {/* Button to close modal */}
            <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    </View>
    );
        
}


const styles = StyleSheet.create({
    search1: {
        textAlign: 'right',
        paddingBottom: 100
    },
    weatherBox: {
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        marginBottom: 150
        },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#00bfff',
    },
    input: {
      borderWidth: 1,
      borderColor: '#cccccc',
      padding: 12,
      marginVertical: 10,
      borderRadius: 8,
      backgroundColor: '#ffffff',
    },
    button: {
      backgroundColor: '#1f8cb9',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#333333',
      fontWeight: 'bold',
      fontSize: 16,
    },
    tempText: {
      fontSize: 90,
      fontWeight: '600',
      marginBottom: 10,
      color: '#333333',
      textAlign: 'center'
    },
    errorText: {
      color: '#FF4C4C',
      fontSize: 16,
      marginBottom: 10,
    },
    infoText: {
      fontSize: 16,
      color: '#666666',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон
    },
    modalView: {
      margin: 20,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      padding: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333333',
    },
    modalText: {
      fontSize: 16,
      color: '#333333',
      marginVertical: 5,
    },
    buttonClose: {
      backgroundColor: '#FF4C4C',
      borderRadius: 8,
      padding: 12,
      marginTop: 20,
      width: 100,
      alignItems: 'center',
    },
    textStyle: {
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    descriptionText: {
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 40
    },
    cityName: {
        fontSize: 40,
        textAlign: 'center'
      },
    item: {
        width: '100%',
        marginBottom: 30
    },
  });
  