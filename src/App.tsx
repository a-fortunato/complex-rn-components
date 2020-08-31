import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RouletteExample from './roulette/RouletteExample'

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="auto" />
        <RouletteExample />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
})
