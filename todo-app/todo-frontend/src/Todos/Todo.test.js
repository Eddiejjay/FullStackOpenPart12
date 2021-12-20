import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'


test('renders content', () => {
    const todo = {
      text: 'You better do what you want or die bored',
      done: false
    }
  
    const component = render(
      <Todo todo={todo}
      onClickDelete={() => console.log('Delete clicked')}
      onClickComplete={() => console.log('Complete clicked')}
    /> 
    )
  
    expect(component.container).toHaveTextContent(
      'You better do what you want or die bored' 
         )
  })