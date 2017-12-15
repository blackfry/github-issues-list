import React from 'react'
import PropTypes from 'prop-types'

export const Label = (label, clickHandler) =>
  <span key={label.id}
    onClick={() => clickHandler({ "tagFilterTerm": label.name })}
    style={{ backgroundColor: `#${label.color}` }}>
    {label.name}
  </span>

Label.propTypes = {
  label: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string
  }),
  clickHandler: PropTypes.func.isRequired
}

export const Issue = (issue, clickHandler) => {
  const date = new Date(issue.created_at).toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
  return (
    <div className="issue" key={issue.id}>
      <div className="title">
        <a href={issue.html_url} target="_blank">{issue.title}</a></div>
      <div>
        <div className="date">{`Opened on ${date} by ${issue.user.login}`}</div>
        <div className="avatar">
          <a href={issue.user.html_url} target="_blank">
            <img src={issue.user.avatar_url} alt='issue user profile' />
          </a>
        </div>
        <div className="label-container">
          {issue.labels && issue.labels.map(label => Label(label, clickHandler))}
        </div>
      </div>
    </div>
  )
}

Issue.propTypes = {
  issue: PropTypes.shape({
    created_at: PropTypes.string,
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    html_url: PropTypes.string.html_url,
    user: PropTypes.shape({
      login: PropTypes.string,
      html_url: PropTypes.string,
      avatar_url: PropTypes.string
    }).isRequired,
    labels: PropTypes.array.isRequired,
  }),
  clickHandler: PropTypes.func.isRequired
}

Issue.defaultValue = {
  issue: {
    user: {
      id: 1,
      name: '',
      html_url: ''
    }
  }
}