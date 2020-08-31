import React, { useCallback } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Text as SvgText } from 'react-native-svg'
import Roulette from './components/Roulette'

const AMOUNT = 360

function getColor(idx: number) {
  if (idx < AMOUNT * 0.25) {
    return 'green'
  } else if (idx < AMOUNT * 0.5) {
    return 'yellow'
  } else if (idx < AMOUNT * 0.75) {
    return 'orange'
  }
  return 'red'
}

function RouletteExample(): React.ReactElement {
  const renderItem = useCallback((idx: number, total: number) => {
    return (
      <SvgText textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">
        {Math.round((idx / total) * 100) + ' %'}
      </SvgText>
    )
  }, [])
  return (
    <View style={styles.container}>
      <Text>Interactive Roulette</Text>
      <Roulette
        amount={AMOUNT}
        svgStyle={styles.svg}
        getColor={getColor}
        renderSelected={renderItem}
      />
    </View>
  )
}

export default RouletteExample

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    alignItems: 'center',
  },
  svg: {
    backgroundColor: 'lightpink',
  },
})
