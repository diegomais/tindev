import React from 'react'
import renderer from 'react-test-renderer'

import Login from '.'

describe('<Login />', () => {
  it('should has 3 children', () => {
    const tree = renderer.create(<Login />).toJSON()
    expect(tree.children.length).toBe(3)
  })
})
