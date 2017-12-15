import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Issue } from './issue'
import { FormsComponent } from './forms-component'

class IssuesList extends Component {

  state = {
    headerRepoName: "facebook/react",
    repoName: "facebook/react",
    issues: [],
    dataLoadSuccess: null,
    loading: false,
    errorMessage: '',
    issueStatus: 'open',
    issueOrder: 'asc',
    tagFilterTerm: ''
  }

  composeErrorMessage = error => {
    let errorMessage = ''
    if (!error || !error.response || !error.response.data) {
      errorMessage = "Something went wrong"
    } else {
      errorMessage = JSON.stringify(error.response.data.message)
    }
    return errorMessage
  }

  fetchIssues = repo => {
    return axios.get(`https://api.github.com/repos/${repo}/issues`)
      .catch(error => this.setState({
        dataLoadSuccess: false,
        errorMessage: `Request for repo, ${repo}, encounterd error ${this.composeErrorMessage(error)}`,
        loading: false
      })
      )
  }

  getGithubIssues = repoName => {
    this.setState({ loading: true })
    return this.fetchIssues(repoName)
      .then(response => {
        if (response) {
          this.setState({
            issues: response.data,
            dataLoadSuccess: response.status && response.status === 200,
            loading: false,
            headerRepoName: repoName
          })
        }
      })
  }

  onSubmit = e => {
    e.preventDefault()
    this.getGithubIssues(this.state.repoName)
  }

  onFormsChange = formObj => {
    if (this.state.hasOwnProperty(Object.entries(formObj)[0][0])) {
      this.setState(formObj)
    }
  }

  componentWillMount() {
    this.getGithubIssues(this.state.repoName)
  }

  render() {
    let {
      dataLoadSuccess,
      errorMessage,
      headerRepoName,
      issues,
      issueOrder,
      issueStatus,
      loading,
      repoName,
      tagFilterTerm
    } = this.state

    let tagFilteredIssues = issues.filter(issue => issue.labels
      .some(label => label.name.toLowerCase().includes(tagFilterTerm.toLocaleLowerCase())))

    return (
      <Fragment>
        <header className="app-header">
          <div className="title-container">
            <h1 className="app-title">GitHub Issues</h1>
            <div className="list-title"> {headerRepoName}</div>
          </div>
          <FormsComponent
            issueOrder={issueOrder}
            issueStatus={issueStatus}
            onFormsChange={this.onFormsChange}
            onSubmit={this.onSubmit}
            repoName={repoName}
            tagFilterTerm={tagFilterTerm}
          />
        </header>
        <div className='issues-list-container'>
          {loading
            ?
            <div className='loading-screen'>
              <h1>...loading</h1>
            </div>
            :
            !dataLoadSuccess
              ?
              <div className="failed-loading-screen">
                <h1>Issues failed to load</h1>
                <h2>{errorMessage}</h2>
              </div>
              :
              tagFilteredIssues &&
              tagFilteredIssues.length === 0
                ?
                <div className='no-issues-screen'>
                  {
                    tagFilterTerm !== ''
                      ?
                        <Fragment>
                          <h1>No issues match your filter term</h1>
                          <button onClick={() => this.setState({ "tagFilterTerm": '' })}>Clear search</button>
                        </Fragment>
                    :  
                      <h1>This repo currently has no issues</h1>
                  }  
                </div>
                :
                tagFilteredIssues.filter(issue => issue.state === issueStatus)
                  .sort((a, b) => issueOrder === 'asc' ? new Date(a.created_at) - new Date(b.created_at) : new Date(b.created_at) - new Date(a.created_at))
                  .map(issue => Issue(issue, this.onFormsChange))
          }
        </div>
      </Fragment>
    )
  }
}

export default IssuesList

