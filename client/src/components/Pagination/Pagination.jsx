import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, changePage }) => {
  return (
    <>
      <ReactPaginate
        pageCount={pageCount}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        onPageChange={changePage}
        containerClassName={
          "pagination justify-content-center my-3 py-5 align-items-center"
        }
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        disabledClassName={"page-item disabled"}
        activeClassName={"page-item active"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
      />
    </>
  );
};

export default Pagination;
