import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
const startingState = {
  food: 100,
  water: 100,
  love: 100,
  foodHandler: '',
  waterHandler: '',
  loveHandler: '',
  image: '/images/perfect.png',
  imageUpdateHandler: ''
};
const stateToImageMap = {
  dead: require('./images/dead.png'),
  food: require('./images/food.png'),
  happy: require('./images/happy.png'),
  love: require('./images/love.png'),
  'near-dead': require('./images/near-dead.png'),
  perfect: require('./images/perfect.png'),
  sad: require('./images/sad.png'),
  'very-happy': require('./images/very-happy.png'),
  'very-sad': require('./images/very-sad.png'),
  water: require('./images/water.png'),
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...startingState };
  }
  
  componentDidMount = () => {
    const foodHandler = setInterval(() => {
      this.alterVitals('food', -0.5);
    }, 500);
    const waterHandler = setInterval(() => {
      this.alterVitals('water', -0.8);
    }, 500);
    const loveHandler = setInterval(() => {
      this.alterVitals('love', -1);
    }, 500);
    
    this.setState({
      foodHandler,
      waterHandler,
      loveHandler
    })
  }
  
  componentWillUnmount = () => {
    const { foodHandler, waterHandler, loveHandler } = this.state;
    
    [ foodHandler, waterHandler, loveHandler ].forEach(handler => {
      clearInterval(handler);
    });
  }
  
  alterVitals = (vital, delta) => {
    const currentValue = this.state[ vital ];
    const { imageUpdateHandler } = this.state;
    
    this.setState({
      [vital]: Math.min(Math.max(currentValue + delta, 0), 100),
    });
    if (delta > 0) {
      clearTimeout(imageUpdateHandler);

      this.setState({
        vitalApplied: vital,
        imageUpdateHandler: setTimeout(() => this.setState({ vitalApplied: false}), 1000)
      });
    }
  }
  
  tommyImageLoader = (tommyState) => stateToImageMap[ tommyState ];
  
  whichTommy = () => {
    const { food, water, love, vitalApplied } = this.state;
    
    if (vitalApplied) {
      return vitalApplied;
    }
    if (food > 95 && water > 95 && love > 95){
      return 'perfect'
    }
    if (food > 80 && water > 80 && love > 80){
      return 'very-happy'
    }
    if (food > 60 && water > 60 && love > 60){
      return 'happy'
    }
    if (food > 40 && water > 40 && love > 40){
      return 'sad'
    }
    if (food > 20 && water > 20 && love > 20){
      return 'very-sad'
    }
    if (food > 10 && water > 10 && love > 10){
      return 'near-dead'
    }
    return 'dead'
    
  }
  
  
  render = () => {
    const { food, water, love } = this.state;

    return(
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.vitalIndicator}>
            <Text>Food: </Text>
            <View style={styles.barOuter}>
              <View style={[styles.bar, {
                width:`${food}%`,
                backgroundColor: 'red',
              }]} />
            </View>
          </View> 
          <View style={styles.vitalIndicator}>  
            <Text>Water: </Text>
            <View style={styles.barOuter}>
              <View style={[styles.bar, {
                width:`${water}%`,
                backgroundColor: 'blue',
              }]} />
            </View>
          </View>
          <View style={styles.vitalIndicator}>  
            <Text>Love: </Text>
            <View style={styles.barOuter}>
              <View style={[styles.bar, {
                width:`${love}%`,
                backgroundColor: 'pink',
              }]} />
            </View>
          </View>
        </View>
        <View style={styles.tommyContainer}>
            <Image
              style={{flex: 1, width: undefined, height: undefined}}
              source={this.tommyImageLoader(this.whichTommy())}
              resizeMode="contain"
            />
        </View>
        <View style={styles.body}>
          <Button color="red" title="Feed" onPress={() => this.alterVitals('food', 10)} />
          <Button title="Water (in its mouth)" onPress={() => this.alterVitals('water', 10)} />
          <Button color="pink" title="Pet" onPress={() => this.alterVitals('love', 10)} />
        </View>
      </View>
    )
  }
  // source={{uri: this.tommyImageLoader(this.whichTommy())}}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 40,
  },
  body: {
    flex: 0,
  },
  barOuter: {
    height: '10%',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
  },
  bar: {
    width: '60%',
    backgroundColor: 'blue',
    height: '100%',
  },
  vitalIndicator: {
    width: '25%'
  },
  tommyText: {
    fontWeight: 'bold',
    fontSize: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around'
  },
  tommyContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  }
});
