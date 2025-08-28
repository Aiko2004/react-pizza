import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, setCurrentPage }) => {
  const pgRangeDisplayed = 8;
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
  );
};

export default Pagination;
