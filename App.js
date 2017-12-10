import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Game from './Game';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  render = () => {
    const { gameStarted } = this.state;

    return (<Game />);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
