import { CardinalPoint, Coords } from './types'
import { CIRCLE_DEGREES, PORTIONS, RADIUS, STROKE_WIDTH } from './config'

export function getArcsMiddleAngle(
  startingAngle: number,
  endingAngle: number,
): number {
  return startingAngle + ((endingAngle || CIRCLE_DEGREES) - startingAngle) / 2
}

const { PI, cos, sin, atan2 } = Math

export function polarToCartesian(angle: number, dialRadius: number): Coords {
  const a = ((angle - 90) * PI) / 180.0

  const x = dialRadius * cos(a)
  const y = dialRadius * sin(a)
  return { x, y }
}

export function cartesianToPolarDegrees(x: number, y: number) {
  return ((((atan2(y, x) * 180) / PI + 90) % 360) + 360) % 360
}

export function getPortionDegree(portionsAmount: number = PORTIONS) {
  return CIRCLE_DEGREES / portionsAmount
}

export function getCardinalCoords(cardinal: CardinalPoint): Coords {
  let x = 0
  let y = 0

  switch (cardinal) {
    case CardinalPoint.UP:
      y = -RADIUS + STROKE_WIDTH
      break
    case CardinalPoint.DOWN:
      y = RADIUS - STROKE_WIDTH * 0.75
      break
    case CardinalPoint.LEFT:
      x = -RADIUS + STROKE_WIDTH
      break
    case CardinalPoint.RIGHT:
      x = RADIUS - STROKE_WIDTH
      break
  }

  return { x, y }
}
