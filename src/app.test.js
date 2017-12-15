import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import App from './app'
import { FormsComponent, } from './components/forms-component'
import { Label, Issue } from './components/issue'
import Issues from './components/issues'

describe('Test suite for App', () => {
  it('Label renders without crashing', () => {
    const div = document.createElement('div')

    let props = {
      label: {
        id: 1,
        name: 'not working',
      },
      clickHandler: () => 1 + 1
    }

    ReactDOM.render(Label(props.label), div)
  })

  it('Label snapshot', () => {
    let props = {
      label: {
        id: 1,
        name: 'not working',
      },
      clickHandler: () => 1 + 1
    }
    const component = renderer.create(
      <Label {...props} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Issue renders without crashing', () => {
    const div = document.createElement('div')

    let props = {
      issue: {
        id: 1,
        user: {
          avatar_url: 'sdf',
          login: 'Dan Abramov'
        },
        labels: []
      },
      clickHandler: () => 1 + 1
    }

    ReactDOM.render(Issue(props.issue), div)
  })

  it('Issue snapshot', () => {
    let props = {
      issue: {
        id: 1,
        user: {
          avatar_url: 'sdf',
          login: 'Dan Abramov'
        },
        labels: []
      },
      clickHandler: () => 1 + 1
    }
    const component = renderer.create(
      Issue(props.issue)
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('FormsComponent renders without crashing', () => {
    const div = document.createElement('div')

    let props = {
      issueOrder: 'asc',
      issueStatus: 'open',
      onFormsChange: () => 1 + 1,
      onSubmit: () => 1 + 1,
    }

    ReactDOM.render(FormsComponent(props), div)
  })

  it('FormsComponent snapshot', () => {
    let props = {
      issueOrder: 'asc',
      issueStatus: 'open',
      onFormsChange: () => 1 + 1,
      onSubmit: () => 1 + 1,
    }
    const component = renderer.create(
      <FormsComponent {...props} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})