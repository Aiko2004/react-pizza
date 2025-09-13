import NotFoundBlock from '../components/NotFoundBlock/index.js'
import { Link } from 'react-router-dom'
import { JSX } from 'react'

const NotFound = (): JSX.Element => {
  return (
    <>
      <NotFoundBlock />
      <Link to="/">
        <button className="button button--black button--center">
          вернуться назад
        </button>
      </Link>
    </>
  )
}

export default NotFound
