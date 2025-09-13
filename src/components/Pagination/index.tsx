import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import { FC } from 'react'

interface PaginationProps {
  currentPage?: number
  setCurrentPage: (selected: number) => void
}

const Pagination: FC<PaginationProps> = ({ setCurrentPage }: PaginationProps) => {
  // const pgRangeDisplayed = 8
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={8}
      pageCount={2}
      renderOnZeroPageCount={null}
      onPageChange={(e) => setCurrentPage(e.selected + 1)}
    />
  )
}

export default Pagination