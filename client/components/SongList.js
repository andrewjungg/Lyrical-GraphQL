import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import query from '../queries/fetchSongs'

class SongList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: []
    }
  }

  onSongDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch())
      // this method because the query is associated with this component
      // could run refetchQueries as well for consistency
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i className='material-icons'
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        {
          this.props.data.loading ?
          <div>Loading</div> :
          <div>
            <ul className='collection'>{this.renderSongs()}</ul>
            <Link to='/songs/new' className='btn-floating btn-large red right'>
              <i className='material-icons'>add</i>
            </Link>
          </div>
        }
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default graphql(mutation)(
  graphql(query)(SongList)
)
