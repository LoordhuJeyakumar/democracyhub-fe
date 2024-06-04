import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import instance from "../services/instance"; // Assuming this fetches your data from the backend
import moment from "moment";
import Pagination from "../components/Pagination";
import userService from "../services/userService";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

function ViewAllUsers() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Add a state variable for the current page
  const [totalPages, setTotalPages] = useState(1); // Add a state variable for the total pages
  const [pageSize, setPageSize] = useState(10); // Add a state variable for the page size
  const [loadingStates, setLoadingStates] = useState({});
  const [loadingStatesDA, setLoadingStatesDA] = useState({});
  const [loadingStatesAC, setLoadingStatesAC] = useState({});
  const fetchData = async (page, limit) => {
    try {
      const response = await instance.protectedInstance.get(
        `/users?page=${page}&limit=${limit}`
      );

      const { results, totalPages, currentPage, next, prev, totalUsers } =
        response.data;

      // Update the row data
      gridApi.updateGridOptions({ rowData: results });

      // Update the pagination state
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching rows:", error);
    }
  };

  useEffect(() => {
    if (gridApi) {
      fetchData(currentPage, pageSize); // Fetch the current page of data
    }
  }, [gridApi, currentPage, pageSize]); // Add currentPage as a dependency

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const defaultColDef = {
    resizable: true,
    sortable: true, // Enable sorting on all columns
    filter: true,
  };

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    {
      headerName: "Verification Status",
      field: "verification",
      cellRenderer: (params) =>
        params.value ? (
          <span className="badge text-bg-success">Verified</span>
        ) : (
          <span className="badge text-bg-warning">Not Verified</span>
        ),
    },
    {
      headerName: "User Status",
      field: "verification",
      cellRenderer: (params) => (
        <>
          <div
            className={`status-icon ${
              params.value ? "status-active" : "status-deactivated"
            }`}
          ></div>
          &nbsp;
          {params.value ? "Active" : "Deactivated"}
        </>
      ),
    },
    { headerName: "Role", field: "role", filter: "agSetColumnFilter" },
    {
      headerName: "Register Date",
      field: "createdAt",
      valueFormatter: (params) => {
        return params.value
          ? moment(params.value).format("DD-MM-YYYY hh:mm:ss A")
          : "";
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => {
        return (
          <div className="d-flex gap-2 p-0 m-0 h-100 align-items-center ">
            <button
              title="Delete"
              className="btn btn-danger px-3 py-0"
              onClick={() => deleteUser(params.data._id)}
            >
              <i className="fa-solid fa-trash "></i>
              {loadingStates[params.data._id] && <LoadingSpinner size={5} />}
            </button>

            <button
              title="De-Activate"
              className="btn btn-info px-3 py-0"
              onClick={() => deactivateUser(params.data._id)}
            >
              <i className="fa-solid fa-ban"></i>
              {loadingStatesDA[params.data._id] && <LoadingSpinner size={5} />}
            </button>

            <button
              title="Activate"
              className="btn btn-success px-3 py-0"
              onClick={() => activateUser(params.data._id)}
            >
              <i className="fa-solid fa-check"></i>

              {loadingStatesAC[params.data._id] && <LoadingSpinner size={5} />}
            </button>
          </div>
        );
      },
    },
  ];

  const deleteUser = async (userId) => {
    setLoadingStates((prevStates) => ({ ...prevStates, [userId]: true }));
    try {
      const res = await userService.deleteUserByAdmin(userId);

      if (res.status === 200) {
        toast.success(res.data.message);
        setLoadingStates((prevStates) => ({ ...prevStates, [userId]: false }));
        fetchData(currentPage, pageSize);
      }

      if (res.status === 401) {
        toast.info(res.data.message);
        setLoadingStates((prevStates) => ({ ...prevStates, [userId]: false }));
        fetchData(currentPage, pageSize);
      }
    } catch (error) {
      console.error("Error from viewAllUsers", error);
      setLoadingStates((prevStates) => ({ ...prevStates, [userId]: false }));
      fetchData(currentPage, pageSize);
      return error;
    }
  };

  const deactivateUser = async (userId) => {
    setLoadingStatesDA((prevStates) => ({ ...prevStates, [userId]: true }));
    try {
      const res = await userService.deActivateUserByAdmin(userId);

      if (res.status === 200) {
        toast.success(res.data.message);
        setLoadingStatesDA((prevStates) => ({
          ...prevStates,
          [userId]: false,
        }));
        fetchData(currentPage, pageSize);
      } else {
        if (res.response.status === 409) {
          toast.info(res.response.data.message);
          setLoadingStatesDA((prevStates) => ({
            ...prevStates,
            [userId]: false,
          }));
          fetchData(currentPage, pageSize);
        }

        if (res.response.status === 401) {
          toast.info(res.response.data.message);
          setLoadingStatesDA((prevStates) => ({
            ...prevStates,
            [userId]: false,
          }));
          fetchData(currentPage, pageSize);
        }
      }
    } catch (error) {
      console.error("Error from viewAllUsers", error);
      setLoadingStatesDA((prevStates) => ({ ...prevStates, [userId]: false }));
      fetchData(currentPage, pageSize);
      return error;
    }
  };

  const activateUser = async (userId) => {
    setLoadingStatesAC((prevStates) => ({ ...prevStates, [userId]: true }));
    try {
      const res = await userService.activateUserByAdmin(userId);

      if (res.status === 200) {
        toast.success(res.data.message);
        setLoadingStatesAC((prevStates) => ({
          ...prevStates,
          [userId]: false,
        }));
        fetchData(currentPage, pageSize);
      } else {
        if (res.response.status === 409) {
          toast.info(res.response.data.message);
          setLoadingStatesAC((prevStates) => ({
            ...prevStates,
            [userId]: false,
          }));
          fetchData(currentPage, pageSize);
        }

        if (res.response.status === 401) {
          toast.info(res.response.data.message);
          setLoadingStatesAC((prevStates) => ({
            ...prevStates,
            [userId]: false,
          }));
          fetchData(currentPage, pageSize);
        }
      }
    } catch (error) {
      console.error("Error from viewAllUsers", error);
      setLoadingStatesAC((prevStates) => ({
        ...prevStates,
        [userId]: false,
      }));
      fetchData(currentPage, pageSize);
      return error;
    }
  };

  return (
    <div className="container m-3 p-3">
      <div>
        <h3 className="text-center">All Users details</h3>
      </div>

      <div className="ag-theme-custom" style={{ height: 400 }}>
        <AgGridReact
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          pagination={false} // Enable pagination
          paginationPageSize={10} // Set default page size
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
        <Pagination
          pageSize={pageSize}
          fetchData={fetchData}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize} // Pass the setPageSize function as a prop
        />
      </div>
    </div>
  );
}

export default ViewAllUsers;
