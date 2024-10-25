import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import APIKey from '../../APIKey'

export default function WeatherAPI({ route }) {
  const { city } = route.params;  // Получаем город из параметров навигации
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const navigation = useNavigation(); // Используем хук навигации

  useEffect(() => {
    if (city && city.trim() !== '') {
      setIsLoading(true);
      fetch(`http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${APIKey}`)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.cod === "200" && result.list && result.list.length > 0) {
              const kelvinToCelsius = (kelvin) => kelvin - 273.15;
              const location = result.list[0];
              const extractedData = {
                name: location.name,
                temp: kelvinToCelsius(location.main.temp).toFixed(0),
                feels_like: kelvinToCelsius(location.main.feels_like).toFixed(0),
                temp_min: kelvinToCelsius(location.main.temp_min).toFixed(0),
                temp_max: kelvinToCelsius(location.main.temp_max).toFixed(0),
                pressure: location.main.pressure,
                humidity: location.main.humidity,
                wind_speed: location.wind.speed,
                description: location.weather[0].description,
              };

              setWeatherData(extractedData);
              setIsLoading(false);

              // Переход на экран Main с передачей данных
            } else {
              setIsLoading(false);
              setError('City not found');
            }
          },
          (error) => {
            setIsLoading(false);
            setError('Ошибка при получении данных.');
          }
        );
    }
  }, [city]);
  useEffect(() => {
    if (weatherData) {
      // Навигация на Main только после успешного получения данных
      navigation.navigate('Main', { weatherData: weatherData });
    } else if (error) {
      // Навигация с пустыми данными, если город не найден или произошла ошибка
      navigation.navigate('Main', { weatherData: '' });
    }
  }, [weatherData, error, navigation]);


  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    navigation.navigate('Main', { weatherData: '' });
  }

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#00bfff',
      },
})