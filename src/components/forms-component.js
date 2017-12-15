import React from 'react'
import PropTypes from 'prop-types'

export const FormsComponent = ({ issueOrder, issueStatus, onFormsChange, onSubmit, repoName, tagFilterTerm }) =>
  <div className='options'>
    <form className='form-filters' onSubmit={onSubmit}>
      <h2>Enter repo name: </h2>
      <input
        label="enter repo name: "
        type="text"
        name="repoName"
        defaultValue={repoName}
        onChange={e => onFormsChange({ "repoName": e.target.value })}
      />
    </form>
    <form className='form-filters' onSubmit={onSubmit}>
      <h2>Filter issues by status: </h2>
      <span>Open</span>
      <input
        label="open"
        type="checkbox"
        className="issue-status-open"
        checked={issueStatus === 'open'}
        disabled={false}
        onChange={() => onFormsChange({ "issueStatus": 'open' })}
      />
      <span>Closed</span>
      <input
        label="closed"
        type="checkbox"
        className="issue-status-closed"
        checked={issueStatus === 'closed'}
        disabled={false}
        onChange={() => onFormsChange({ "issueStatus": 'closed' })}
      />
    </form>
    <form className='form-filters' onSubmit={onSubmit}>
      <h2>Order date created: </h2>
      <span>Asc</span>
      <input
        label="ascending"
        type="checkbox"
        checked={issueOrder === 'asc'}
        disabled={false}
        onChange={() => onFormsChange({ "issueOrder": 'asc' })}
      />
      <span>Desc</span>
      <input
        label="descending"
        type="checkbox"
        checked={issueOrder === 'desc'}
        disabled={false}
        onChange={() => onFormsChange({ "issueOrder": 'desc' })}
      />
    </form>
    <form className='form-filters'>
      <h2>Filter by tag: </h2>
      <input
        label="filter by tag: "
        type="text"
        value={tagFilterTerm}
        onChange={e => onFormsChange({ "tagFilterTerm": e.target.value })}
      />
    </form>
  </div>

  FormsComponent.propTypes = {
    issueOrder: PropTypes.string,
    issueStatus: PropTypes.string,
    onFormsChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    repoName: PropTypes.string,
    tagFilterTerm: PropTypes.string
  }
