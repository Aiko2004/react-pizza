import styles from './NotFoundBlock.module.scss'
import { JSX } from 'react'

const NotFoundBlock = (): JSX.Element => {
  return (
    <>
      <h1 className={styles.root}>
        <span>😕</span>
        <br />
        404 страница не найдена
      </h1>
    </>
  )
}

export default NotFoundBlock
