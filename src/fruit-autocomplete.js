import React from 'react'
import {render} from 'react-dom'
import Downshift from 'downshift'

const items = ['apple', 'pear', 'orange', 'grape', 'banana']

function FruitAutocomplete({onChange}) {
  return <Downshift onChange={onChange} render={fruitAutocompleteRender} />
}

// NOTE: I generally don't like to do things this way. I'd rather just inline it
// but I'm doing things this way so I can expose the render function for testing.
// alternatively you could get it by mounting the component and then do this:
// `const renderFn = wrapper.find(Downshift).prop('render')`
// I don't like doing things that way because I feel like it's including too much
// of implementation details and and you have to mount the component.
// Pretty much my solution is to just do an integration test instead :)
function fruitAutocompleteRender({
  getInputProps,
  getItemProps,
  getLabelProps,
  isOpen,
  inputValue,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <div>
      <label {...getLabelProps()}>Enter a fruit</label>
      <input {...getInputProps()} />
      {isOpen ? (
        <div data-test="menu">
          {items
            .filter(i => !inputValue || i.includes(inputValue))
            .map((item, index) => (
              <div
                {...getItemProps({
                  key: item,
                  'data-test': `item-${item}`,
                  index,
                  item,
                  style: {
                    backgroundColor:
                      highlightedIndex === index ? 'lightgray' : 'white',
                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                  },
                })}
              >
                {item}
              </div>
            ))}
        </div>
      ) : null}
    </div>
  )
}

export {fruitAutocompleteRender}
export default FruitAutocomplete
