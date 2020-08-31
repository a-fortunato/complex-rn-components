import React from 'react'
import { Text } from 'react-native-svg'
import { getCardinalCoords } from '../helper'
import { CardinalPoint } from '../types'

interface Props {
  text: string
  cardinal: CardinalPoint
}

function CardinalText({ text, cardinal }: Props): React.ReactElement {
  const coords: { x: number; y: number } = getCardinalCoords(cardinal)
  return (
    <Text {...coords} textAnchor="middle" fill="white" fontSize={14}>
      {text}
    </Text>
  )
}

export default CardinalText
