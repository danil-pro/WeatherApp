import { StyleSheet, Text, View, FlatList, TouchableOpacity,} from 'react-native';
import React, {useState, useCallback} from 'react';
import Form from '../form/Form';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Search({route, navigation }) {
    const [history, setHistory] = useState([]);

    // Получаем history каждый раз, когда экран Search становится активным
    useFocusEffect(
        useCallback(() => {
          if (route.params?.history) {
            setHistory((prevHistory) => {
              // Добавляем новые записи с уникальными идентификаторами только если их нет в истории
              const updatedHistory = route.params.history
                .filter((item) => !prevHistory.find((prevItem) => prevItem.name === item.name))
                .map((item) => ({
                  ...item,
                  id: Date.now() + Math.random(), // Генерация уникального идентификатора
                }));
              
              return [...prevHistory, ...updatedHistory];
            });
          }
        }, [route.params?.history])
      );
      
  
    const [city, setCity] = useState('');

    const delCity = (id) => {
        setHistory((prevHistory) => prevHistory.filter(item => item.id !== id));

    }
  
    const addCity = (values) => {
      setCity(values.city); // Присваиваем введенный город состоянию
      navigation.navigate('WeatherAPI', { city: values.city }); // Переход на WeatherAPI с передачей города
    };
  
    return (
      <View style={styles.container}>
        <Form addCity={addCity} />  
        <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            {/* Первый TouchableOpacity для перехода на Main */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Main', { weatherData: item })}
            >
              <Text style={styles.cityName}>{item.name}</Text>
              <Text style={styles.tempText}>{item.temp}°C</Text>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </TouchableOpacity>

            {/* Второй TouchableOpacity для удаления элемента */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => delCity(item.id)}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80, // Отступ сверху для поля поиска
        paddingHorizontal: 20, // Горизонтальные отступы
        backgroundColor: '#00bfff',
        width: '100%',
        height: '100%' // Фон приложения
         // Фон приложения
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
      },
      cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      card: {
        flex: 1,
        backgroundColor: '#4A90E2',
        borderRadius: 10,
        padding: 15,
        marginRight: 10, // Отступ для кнопки удаления
      },
      cityName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
      },
      tempText: {
        fontSize: 18,
        color: '#ffeb3b',
        marginBottom: 5,
      },
      descriptionText: {
        fontSize: 16,
        color: '#fff',
      },
      deleteButton: {
        position: 'absolute',
        right: 15,
        bottom: 10,
        color: '#333333',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
          },
      deleteButtonText: {
        color: '#333333',
      },
    

});