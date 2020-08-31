import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const MINUTES_A_DAY = 24 * 60

export const SPACING = 15
export const SPACING_SMALLER = 5

export const SVG_SIZE = SCREEN_WIDTH - SPACING_SMALLER

export const STROKE_WIDTH = SPACING * 2
export const RADIUS = (SVG_SIZE - STROKE_WIDTH * 4) / 2

export const CIRCLE_DEGREES = 360
export const MINUTES_PER_PORTION = 5
export const PORTIONS = MINUTES_A_DAY / MINUTES_PER_PORTION
