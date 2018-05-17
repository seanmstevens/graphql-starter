import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries'

class AddBook extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }

    this.submitForm = this.submitForm.bind(this)
  }

  submitForm (e) {
    e.preventDefault()
    const { name, genre, authorId } = this.state
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    })
  }

  displayAuthors () {
    const { getAuthorsQuery: data } = this.props

    if (data.loading) {
      return <option disabled>Loading authors</option>
    }

    return data.authors.map(author => (
      <option
        key={ author.id }
        value={ author.id }>
        { author.name }
      </option>
    ))
  }

  render () {
    return (
      <form
        id="add-book"
        onSubmit={this.submitForm}
      >
        <div className="field">
          <label>Book name</label>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value})}
          />
        </div>
        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            onChange={(e) => this.setState({ genre: e.target.value})}
            />
        </div>
        <div className="field">
          <label>Author</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value})}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, {
    name: "getAuthorsQuery"
  }),
  graphql(addBookMutation, {
    name: "addBookMutation"
  })
)(AddBook)