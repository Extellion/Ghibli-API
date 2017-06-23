import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  DeviceEventEmitter,
  TouchableHighlight,
  Share
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { SensorManager } from 'NativeModules';

const options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = 'https://ghibliapi.herokuapp.com'
    this.getMovies()
    this.state = {
      items: null,
      avatarSource: {},
      enable: false
    }
    this.baseOrientation = 0
    this.scrollview = null;
  }

  componentDidMount() {
    this.props.getProps();
  }

  getMovies() {
    fetch(`${this.baseUrl}/films`).then(resp => {
      return resp.json()
    }).then(json => {
      this.setState({
        movies: json
      })
    })
  }

  handleRequests(str) {
    let newStr = str
    fetch(`${this.baseUrl}/${str}`).then(resp => {
      return resp.json()
    }).then(json => {
      this.setState({
        movies: null,
        people: null,
        vehicles: null,
        species: null,
        locations: null
      })
      if(newStr == 'films') {
        newStr = 'movies'
      }
      this.setState({
        [newStr]: json
      })
    }).catch(err =>{
      console.log(err);
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.enable !== this.state.enable) {
      if(nextState.enable) {
        SensorManager.startGyroscope(100);
      } else {
        SensorManager.stopGyroscope();
      }
    }
    return true;
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('Gyroscope', data => {
      console.log(data);
      this.baseOrientation += data.x;
      if (this.scrollview !== null) {
        this.scrollview.scrollTo({
          x: 0,
          y: this.baseOrientation * 300,
          animated: true
        });
      }
    });
  }

  addPicture(index) {
    ImagePicker.showImagePicker({
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const avatarSource = {...this.state.avatarSource};
        avatarSource[index] = { uri: response.uri };

        this.setState({
          avatarSource
        });
      }
    });
  }

  activateGyroscope() {
    this.setState({
      enable: !this.state.enable
    })
  }

  shareThings(person) {
    Share.share({
      message: `Tiens, j'ai trouvé ce personnage, regarde un peu. Nom : ${person.name}. Sexe: ${person.gender}. Age: ${person.age}. Qu'est-ce que tu en penses ?!`,
    }, {
      dialogTitle: `Share ${person.name}`,
    })
  }

  render() {
    return (
      <View>
        <Button onPress={ this.handleRequests.bind(this, 'films') } title="Movies" color="#16a085" style={ styles.buttons }/>
        <Button onPress={ this.handleRequests.bind(this, 'people') } title="Peoples" color="#1abc9c" style={ styles.buttons }/>
        <Button onPress={ this.handleRequests.bind(this, 'locations') } title="Locations" color="#2ecc71" style={ styles.buttons }/>
        <Button onPress={ this.handleRequests.bind(this, 'species') } title="Species" color="#27ae60" style={ styles.buttons }/>
        <Button onPress={ this.handleRequests.bind(this, 'vehicles') } title="Vehicles" color="#3498db" style={ styles.buttons }/>
        <ScrollView style={styles.container} ref={ scrollview => {
          if (this.scrollview === null) {
            this.scrollview = scrollview;
          }
        }}>
          { this.state.movies &&
            this.state.movies.map((movie, key) => {
              return(
                <View key={key} style={styles.subContainer}>
                  <Text><Text style={{ fontWeight: 'bold' }}>Title: </Text>{ movie.title }</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Description: </Text>{ movie.description }</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Release Date: </Text>{ movie.release_date }</Text>
                </View>
              )
            })
          }
          { this.state.people &&
            this.state.people.map((person, key) => {
              return(
                  <View key={key} style={styles.subContainer}>
                    <Text><Text style={{ fontWeight: 'bold' }}>Name: </Text>{ person.name }</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Age: </Text>{ person.age }</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Gender: </Text>{ person.gender }</Text>
                    <Button onPress={ this.addPicture.bind(this, key)} title="Add Picture" color="#8e44ad" style={ styles.buttonsPeople } />
                    { this.state.avatarSource[key] &&
                      <Image source={this.state.avatarSource[key]} style={styles.imgPeople}/>
                    }
                    <Button onPress={ this.shareThings.bind(this, person)} title="Share" color="#8e44ad" style={ styles.buttonsPeople } />

                  </View>
              )
            })
          }
          { this.state.locations &&
            this.state.locations.map((location, key) => {
              return(
                <View key={key} style={styles.subContainer}>
                  <Text><Text style={{ fontWeight: 'bold' }}>Name: </Text>{ location.name }</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Climate: </Text>{ location.climate }</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Terrain: </Text>{ location.terrain }</Text>
                </View>
              )
            })
          }
          { this.state.vehicles &&
            this.state.vehicles.map((vehicle, key) => {
              return(
                <View key={key} style={styles.subContainer}>
                  <Text><Text style={{ fontWeight: 'bold' }}>Name: </Text>{ vehicle.name }</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Description: </Text>{ vehicle.description }</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Vehicle Class: </Text>{ vehicle.vehicle_class }</Text>
                </View>
              )
            })
          }
          { this.state.species &&
            this.state.species.map((specie, key) => {
              return(
                <View key={key} style={styles.subContainer}>
                  <Text><Text style={{ fontWeight: 'bold' }}>Name: </Text>{ specie.name }</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Eye Color: </Text>{ specie.eye_colors }</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Classification: </Text>{ specie.classification }</Text>
                </View>
              )
            })
          }
        </ScrollView>
        <TouchableHighlight onPress={ this.activateGyroscope.bind(this) } style={{ position: 'absolute', top: 550, right: 15, zIndex: 9999 }}>
          <Image source={require('./Giro.png')} style={{ width: 50, height: 50}}/>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    padding: 20,
  },
  buttons: {
    marginBottom: 5
  },
  buttonsPeopleTwo: {
    marginTop: 20,
  },
  imgPeople: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 150,
    marginLeft: 115
  }
});

export default App;
