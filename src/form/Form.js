import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity,} from 'react-native';
import { Formik } from 'formik';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Form({ addCity }) {

    const handleSearch = (props) => {
        props.handleSubmit();  // Отправка формы
        };
      
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ city: '' }}
        onSubmit={(values, actions) => {
          if (values.city.trim() !== '') {
            addCity(values); // Передача значения в родительский компонент (Search)
            actions.resetForm(); // Сброс формы
          } else {
            alert('Please enter a city');
          }
        }}
      >
        {(props) => (
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchButton}>
              <FontAwesome5 name="search" size={24} color="#ccc" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={props.handleChange('city')}
              value={props.values.city}
              placeholder="Enter city name..."
              placeholderTextColor="#ccc"
              onSubmitEditing={props.handleSubmit}  // Поиск при нажатии Enter
              returnKeyType="search"  // Меняет кнопку "Enter" на "Search" на клавиатуре

            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     paddingTop: 20, // Отступ сверху для поля поиска
    //     paddingHorizontal: 20, // Горизонтальные отступы
    //     backgroundColor: '#00bfff',
    // },
    searchButton: {
        width: 28,
    },
    headerContainer: {
        backgroundColor: '#1f8cb9',  // Синий фон для всего хедера
        paddingVertical: 20,         // Внутренний отступ сверху и снизу
        paddingHorizontal: 15,       // Внутренний отступ по бокам
      },
      searchContainer: {
        flexDirection: 'row',        // Горизонтальное расположение элементов
        backgroundColor: '#333333',  // Цвет фона строки поиска
        borderRadius: 15,            // Закругленные углы
        alignItems: 'center',        // Центрирование элементов по вертикали
        paddingVertical: 10,         // Внутренние отступы
        paddingHorizontal: 10,  
        marginBottom: 10
      },
      searchIcon: {
        backgroundColor: 'white'
      },
      input: {
        fontSize: 16,                // Размер текста
        backgroundColor: '#333333',
        color: 'white',
        placeholderTextColor: 'white'
      },
        });
