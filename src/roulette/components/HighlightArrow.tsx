import React, { useMemo } from 'react'
import { Path } from 'react-native-svg'
import { RADIUS, STROKE_WIDTH } from '../config'
import { polarToCartesian } from '../helper'

interface Props {
  angle: number
}

function HighlightArrow({ angle }: Props): React.ReactElement {
  const data = useMemo(() => {
    const bottomCoords = polarToCartesian(angle, RADIUS + STROKE_WIDTH)
    const leftCoords = polarToCartesian(angle - 3, RADIUS + STROKE_WIDTH * 1.5)
    const rightCoords = polarToCartesian(angle + 3, RADIUS + STROKE_WIDTH * 1.5)

    return `M ${leftCoords.x} ${leftCoords.y} L ${rightCoords.x} ${rightCoords.y} L ${bottomCoords.x} ${bottomCoords.y} z`
  }, [angle])

  return <Path d={data} fill="white" stroke="white" />
}

export default HighlightArrow
