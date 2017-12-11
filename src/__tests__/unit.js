import React from 'react'
import {mount, render} from 'enzyme'
import Downshift from 'downshift'
import FruitAutocomplete, {fruitAutocompleteRender} from '../fruit-autocomplete'

const downshiftStub = {
  isOpen: false,
  getLabelProps: p => p,
  getInputProps: p => p,
  getItemProps: p => p,
}

// some handy utilities
// learn more about this `sel` function
// from my other blog post: http://kcd.im/sel-util
const sel = id => `[data-test="${id}"]`
const hasMenu = wrapper => wrapper.find(sel('menu')).length === 1
const hasItem = (wrapper, item) =>
  wrapper.find(sel(`item-${item}`)).length === 1
const renderFruitAutocompleteRenderer = props =>
  render(fruitAutocompleteRender({...downshiftStub, ...props}))

test('shows no menu when isOpen is false', () => {
  const wrapper = renderFruitAutocompleteRenderer({isOpen: false})
  expect(hasMenu(wrapper)).toBe(false)
})

test('shows the menu when isOpen is true', () => {
  const wrapper = renderFruitAutocompleteRenderer({isOpen: true})
  expect(hasMenu(wrapper)).toBe(true)
})

test('when the inputValue is banana, it shows banana', () => {
  const wrapper = renderFruitAutocompleteRenderer({
    isOpen: true,
    inputValue: 'banana',
  })
  expect(hasItem(wrapper, 'banana')).toBe(true)
})

// here's the exact same test as above, except if you wanted to inline the render prop
// honestly, I'd rather just do the tests that are a little more integration-ish.... :)
test('when the inputValue is banana, it shows banana (with mount)', () => {
  const fruitAutocompleteRenderer = mount(<FruitAutocomplete />)
    .find(Downshift)
    .prop('render')
  const wrapper = render(
    fruitAutocompleteRenderer({
      ...downshiftStub,
      isOpen: true,
      inputValue: 'banana',
    })
  )
  expect(hasItem(wrapper, 'banana')).toBe(true)
})
