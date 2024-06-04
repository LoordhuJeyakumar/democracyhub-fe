import React from "react";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  setCurrentPage,
  fetchData,
  pageSize,
}) {
  const goToFirstPage = () => onPageChange(1);
  const goToPreviousPage = () => onPageChange(currentPage - 1);
  const goToNextPage = () => onPageChange(currentPage + 1);
  const goToLastPage = () => onPageChange(totalPages);

  const handlePageSizeChange = (event) => {
    setCurrentPage(1);
    onPageSizeChange(Number(event.target.value));
  };

  return (
    <div className="d-flex custom-pagination-panel">
      <div className="d-flex w-50 align-items-center">
        <button
          className="btn text-light d-flex"
          onClick={() => fetchData(currentPage, pageSize)}
        >
          Fetch&nbsp;
          <lord-icon
            src="https://cdn.lordicon.com/fyxgoiep.json"
            trigger="click"
            stroke="bold"
            state="loop-cycle"
            colors="primary:#f3ffbd,secondary:#acd0c0"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
        </button>
      </div>
      <div className="custom-pagination-panel p-2 ">
        <div className="custom-page-size-selector">
          <div className="d-flex gap-3  align-items-center justify-content-center">
            <label htmlFor="page-select " className="w-50">
              Page size
            </label>

            <select
              className="form-select px-4 py-2 w-50"
              id="page-select"
              onChange={handlePageSizeChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <div className="custom-page-summary-panel">
          <button
            className="btn border border-0 text-warning"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <button
            className="btn border border-0 text-warning"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <span className=" px-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn border border-0 text-warning"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button
            className="btn border border-0 text-warning"
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
