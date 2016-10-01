import { createRenderer } from './dom'
import createElement from './element'
import { render } from './string'

export const dom = { createRenderer }
export const element = createElement
export const string = { render }
