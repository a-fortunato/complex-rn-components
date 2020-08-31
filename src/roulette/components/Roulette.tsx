import React, { useCallback, useMemo, useState } from 'react'
import { PanResponder, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { SVG_SIZE, RADIUS, STROKE_WIDTH, PORTIONS } from '../config'
import {
  polarToCartesian,
  getPortionDegree,
  getArcsMiddleAngle,
  cartesianToPolarDegrees,
} from '../helper'
import { CardinalPoint } from '../types'
import CardinalText from './CardinalText'
import HighlightArrow from './HighlightArrow'

interface Props {
  amount: number
  children?: React.ReactElement | React.ReactElement[]
  scale?: number
  hidePortions?: number[]
  svgStyle?: StyleProp<ViewStyle>

  renderSelected?(idx: number, total: number): React.ReactElement

  getColor(idx: number): string
}

function Roulette({
  amount,
  getColor,
  children,
  scale = 1,
  hidePortions,
  renderSelected,
  svgStyle,
}: Props): React.ReactElement {
  const [highlightedPortion, setHighlightedPortion] = useState(0)
  const portionDegree = useMemo(() => getPortionDegree(amount), [amount])
  const allPortions = useMemo(
    () =>
      Array.from(Array(amount), (_val, idx) =>
        polarToCartesian(idx * portionDegree, RADIUS),
      ),
    [amount, portionDegree],
  )
  const getPanResponderAngle = useCallback(
    ({ nativeEvent }) => {
      const relativeX = nativeEvent.locationX - SVG_SIZE / 2
      const relativeY = nativeEvent.locationY - SVG_SIZE / 2
      const movingAngle = cartesianToPolarDegrees(relativeX, relativeY)
      setHighlightedPortion(Math.floor(movingAngle / portionDegree))
    },
    [portionDegree],
  )
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (_evt, _gestureState) => true,
        onStartShouldSetPanResponderCapture: (_evt, _gestureState) => true,
        onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
        onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => true,
        onPanResponderGrant: getPanResponderAngle,
        onPanResponderMove: getPanResponderAngle,
        onPanResponderTerminationRequest: (_evt, _gestureState) => true,
        onPanResponderRelease: (_evt, _gs) => {},
        onShouldBlockNativeResponder: (_evt, _gestureState) => {
          // Returns whether this component should block native components from becoming
          // the JS responder. Returns true by default. Is currently only supported on
          // android.
          return true
        },
      }),
    [getPanResponderAngle],
  )
  const calculatePaths = useCallback(
    (portion, idx) => {
      if (hidePortions?.includes(idx)) {
        return null
      }
      const nextIdx = idx === amount - 1 ? 0 : idx + 1
      const move = portion
      const moveNext = allPortions[nextIdx]
      let color = 'transparent'
      if (highlightedPortion >= idx) {
        /*
        // to move some paths so they're further away from the center, recalculate their coords:
        move = polarToCartesian(idx * portionDegree, RADIUS + STROKE_WIDTH / 3)
        moveNext = polarToCartesian(
          nextIdx * portionDegree,
          RADIUS + STROKE_WIDTH / 3,
        )
        */
        color = getColor(idx)
      }
      const pathData =
        `M${move.x} ${move.y}` +
        `A ${RADIUS} ${RADIUS} 0 ${portionDegree > 180 ? 1 : 0} 1 ${
          moveNext.x
        } ${moveNext.y}`

      return (
        <React.Fragment key={idx}>
          <Path
            stroke={color}
            fill="none"
            d={pathData}
            strokeWidth={STROKE_WIDTH}
          />
        </React.Fragment>
      )
    },
    [
      hidePortions,
      highlightedPortion,
      amount,
      allPortions,
      portionDegree,
      getColor,
    ],
  )

  return (
    <Svg
      viewBox={`${-SVG_SIZE / 2} ${-SVG_SIZE / 2} ${SVG_SIZE} ${SVG_SIZE}`}
      width={SVG_SIZE * scale}
      height={SVG_SIZE * scale}
      style={[styles.container, svgStyle]}
      {...panResponder.panHandlers}
    >
      <CardinalText text="0%" cardinal={CardinalPoint.UP} />
      <CardinalText text="25%" cardinal={CardinalPoint.RIGHT} />
      <CardinalText text="50%" cardinal={CardinalPoint.DOWN} />
      <CardinalText text="75%" cardinal={CardinalPoint.LEFT} />
      {allPortions.map(calculatePaths)}
      <HighlightArrow
        angle={getArcsMiddleAngle(
          highlightedPortion * portionDegree,
          (highlightedPortion + 1) * portionDegree,
        )}
      />
      {children}
      {!!renderSelected && renderSelected(highlightedPortion, amount)}
    </Svg>
  )
}

Roulette.defaultProps = {
  amount: PORTIONS,
  getColor: () => 'white',
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'purple',
  },
})

export default Roulette
