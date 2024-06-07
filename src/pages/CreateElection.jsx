import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import constituenciesService from "../services/constituenciesService";
import { addNewElection, createElectionFailure, createElectionRequest, createElectionSuccess, createPhase, createResult, removePhase, removeResult, resetNewElection, setConstituenciesOPtions } from "../redux/actions/electionActions";
import candidatesService from "../services/candidatesService";
import LoadingSpinner from "../components/LoadingSpinner";
import electionService from "../services/electionService";


const electionTypesObj = [
  { value: "Parliamentary", label: "Parliamentary" },
  { value: "StateAssembly", label: "State Assembly" },
  { value: "Local", label: "Local" },
  { value: "RajyaSabha", label: "Rajya Sabha" },
  { value: "Presidential", label: "Presidential" },
  { value: "VicePresidential", label: "Vice Presidential" },
  { value: "LegislativeCouncil", label: "Legislative Council" },
];
const statesAndUTsOfIndia = [
  {
    value: "Andhra Pradesh",
    label: "Andhra Pradesh",
  },
  {
    value: "Arunachal Pradesh",
    label: "Arunachal Pradesh",
  },
  {
    value: "Assam",
    label: "Assam",
  },
  {
    value: "Bihar",
    label: "Bihar",
  },
  {
    value: "Chhattisgarh",
    label: "Chhattisgarh",
  },
  {
    value: "Goa",
    label: "Goa",
  },
  {
    value: "Gujarat",
    label: "Gujarat",
  },
  {
    value: "Haryana",
    label: "Haryana",
  },
  {
    value: "Himachal Pradesh",
    label: "Himachal Pradesh",
  },
  {
    value: "Jharkhand",
    label: "Jharkhand",
  },
  {
    value: "Karnataka",
    label: "Karnataka",
  },
  {
    value: "Kerala",
    label: "Kerala",
  },
  {
    value: "Madhya Pradesh",
    label: "Madhya Pradesh",
  },
  {
    value: "Maharashtra",
    label: "Maharashtra",
  },
  {
    value: "Manipur",
    label: "Manipur",
  },
  {
    value: "Meghalaya",
    label: "Meghalaya",
  },
  {
    value: "Mizoram",
    label: "Mizoram",
  },
  {
    value: "Nagaland",
    label: "Nagaland",
  },
  {
    value: "Odisha",
    label: "Odisha",
  },
  {
    value: "Punjab",
    label: "Punjab",
  },
  {
    value: "Rajasthan",
    label: "Rajasthan",
  },
  {
    value: "Sikkim",
    label: "Sikkim",
  },
  {
    value: "Tamil Nadu",
    label: "Tamil Nadu",
  },
  {
    value: "Telangana",
    label: "Telangana",
  },
  {
    value: "Tripura",
    label: "Tripura",
  },
  {
    value: "Uttar Pradesh",
    label: "Uttar Pradesh",
  },
  {
    value: "Uttarakhand",
    label: "Uttarakhand",
  },
  {
    value: "West Bengal",
    label: "West Bengal",
  },
  {
    value: "Andaman and Nicobar Islands",
    label: "Andaman and Nicobar Islands",
  },
  {
    value: "Chandigarh",
    label: "Chandigarh",
  },
  {
    value: "Dadra and Nagar Haveli and Daman and Diu",
    label: "Dadra and Nagar Haveli and Daman and Diu",
  },
  {
    value: "Delhi",
    label: "Delhi",
  },
  {
    value: "Jammu and Kashmir",
    label: "Jammu and Kashmir",
  },
  {
    value: "Ladakh",
    label: "Ladakh",
  },
  {
    value: "Lakshadweep",
    label: "Lakshadweep",
  },
  {
    value: "Puducherry",
    label: "Puducherry",
  },
];


function CreateElection() {

  const dispatch = useDispatch();
  const userParsed = JSON.parse(sessionStorage.getItem("user"));
  const constituenciesRef = useRef(null)
  const [gridApi, setGridApi] = useState(null);
  const [gridApiResult, setGridApiResult] = useState(null);
  const electionState = useSelector((state) => state.elections);
  const [isLoadingConstituencies, setIsLoadingConstituencies] = useState(false); // Track loading state
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false); // Track loading state
  const [constituencies, setConstituencies] = useState([]);

  const [candidates, setCandidates] = useState([]);
  const constituenciesSelectRef = useRef([]);
  let constituencyLookup = {};

  // Create a mapping of MongoDB IDs to actual values
  const idToConstituency = {};
  const idToCandidate = {};

  const getConstituencies = async () => {

    try {
      setIsLoadingConstituencies(true)
      const res = await constituenciesService.getAllconstituencies();


      if (res.status === 200) {
        const newConstituencies = res.data.allConstituencies.map((state) => ({
          value: state.name,
          label: state.name,
          id: state._id
        }));

        res.data.allConstituencies.forEach((constituency) => {
          idToConstituency[constituency._id] = constituency.name;
        });

        setConstituencies(() => newConstituencies);
        setIsLoadingConstituencies(false)


      }

      return res;
    } catch (error) {
      console.error(error);
      setIsLoadingConstituencies(false)
      return error;

    }
  };

  const getConstituencyName = (id) => {
    let data = electionState.constituenciesOptions.find(c => c.id == id)
    return data
  }



  const [rowData, setRowData] = useState("");
  const [colDefs, setColDefs] = useState([
    { field: "phaseNumber", headerName: "Phase Number" },
    { field: "date", headerName: "date" },
    { field: "states", headerName: "States", valueFormatter: params => params.value.join(', ') },
    {
      field: "constituencies", headerName: "Constituencies", valueGetter: function (params) {

        if (Array.isArray(params.data.constituencies)) {
          // Map the array of MongoDB IDs to their corresponding constituency names
          return params.data.constituencies.map(id => idToConstituency[id]).join(', ');
        }
        return '';
      }

    },

  ])


  const [rowDataResults, setRowDataResults] = useState("");
  const [colDefsResults, setColDefsResults] = useState([
    {
      field: "candidate", headerName: "Candidate", valueGetter: function (params) {

        return idToCandidate[params.data.candidate]
      }

    },

    { field: "votesReceived", headerName: "votesReceived" },
    {
      field: "won", headerName: "Winning Status", cellRenderer: function (params) {
        return params.value ? <span className="material-symbols-outlined">
          check
        </span> : <span className="material-symbols-outlined">
          close
        </span>;
      }
    },


  ]);
  const electionFormRef = useRef(null)
  const [isSubmited, setIsSubmited] = useState(false)

  useEffect(() => {
    if (constituencies.length === 0) {
      getConstituencies();
    }
    setRowData(electionState?.newElection?.phases)

    getCandidates()
    if (gridApi && electionState?.newElection?.phases?.length) {
      gridApi.updateGridOptions({
        rowData: electionState?.newElection?.phases,
      }); // Refresh grid
    }
  }, [gridApi, electionState?.newElection?.phases, constituencies]);


  useEffect(() => {
    setRowDataResults(electionState?.newElection?.results)
    getConstituencies()
    getCandidates()
    if (gridApiResult && electionState?.newElection?.results?.length) {
      gridApiResult.updateGridOptions({
        rowData: electionState?.newElection?.results,
      }); // Refresh grid
    }
  }, [gridApiResult, electionState?.newElection?.results]);




  const getCandidates = async () => {

    try {
      setIsLoadingCandidates(true)
      const res = await candidatesService.getAllCandidates();


      if (res.status === 200) {
        const newCandidates = res.data.data.candidates.map((state) => ({
          value: state.name,
          label: state.name,
          id: state._id
        }));

        res.data.data.candidates.forEach((candidate) => {
          idToCandidate[candidate._id] = candidate.name;
        });

        setCandidates(() => newCandidates);
        setIsLoadingCandidates(false)
      }

      return res;
    } catch (error) {
      console.error(error);
      setIsLoadingConstituencies(false)
      return error;

    }
  };

  const handleIputChange = (event) => {


    let obj = { [event.target.name]: event.target.value }
    if (event.target.name === "issueDate" || event.target.name === "lastDateForNominations") {
      obj = obj = { ...electionState.newElection, notificationDetails: { ...electionState.newElection.notificationDetails, [event.target.name]: event.target.value } };
    }


    dispatch(addNewElection(obj))
  }

  const handlePhaseIputChange = (event) => {

    dispatch(createPhase({ [event.target.name]: event.target.value }))
  }
  const onClear = () => {
    constituenciesRef.current.clearValue();
  };

  const handleSelectChange = (selectedOptions, { name }) => {


    if (name === "electionType") {
      dispatch(addNewElection({ "electionType": selectedOptions.value }))
    }

    if (name === 'states') {
      let values = selectedOptions.map(option => option.value);
      let payload = { [`${name}`]: values };
      dispatch(createPhase(payload));
    }
    if (name === 'constituencies') {
      let values = selectedOptions.map(option => option.id);

      let payload = { [`${name}`]: values };
      dispatch(createPhase(payload));
    }

  }

  function isEqual(array1, array2) {
    if (array1?.length !== array2?.length) {
      return false;
    }

    let set1 = new Set(array1);

    return array2.every(value => set1.has(value));
  }

  const handleAddPhase = () => {


    let phase = electionState?.phases;
    if (phase.phaseNumber && phase.date && phase?.states && phase?.constituencies) {
      let foundedPhase = electionState?.newElection?.phases?.find(
        (eachPhase) => {
          if (
            eachPhase.name === phase.name &&
            eachPhase.date === phase.date &&
            isEqual(eachPhase.states) === isEqual(phase.states) &&
            isEqual(eachPhase.constituencies) === isEqual(phase.constituencies)
          ) {
            return eachPhase;
          }

          return null;
        }
      );

      if (!foundedPhase) {

        let newPhases = [...electionState?.newElection?.phases, phase];
        dispatch(addNewElection({ ...electionState.newElection, phases: newPhases }));


        onClear()
        dispatch(removePhase())

        // Clear the React-Select fields
        dispatch(createPhase({ states: [], constituencies: [] }));
        if (electionState?.newElection?.phases?.length) {
          gridApi.updateGridOptions({
            rowData: electionState?.newElection?.phases,
          }); // Refresh grid
        }
      } else {
        toast.info("This phase already exists");
        onClear()
        dispatch(removePhase())
      }
    } else {
      toast.info("Please fill up the required field ")
    }
  };

  const handleResultInputChange = (event, data) => {
    let name, value;


    // Check if event is SyntheticEvent (normal input)
    if (event.target) {
      if (event.target.name === "won") {

        dispatch(createResult({ [event.target.name]: event.target.checked }))
        name = event.target.name;
        value = event.target.value;
      } else {
        dispatch(createResult({ [event.target.name]: event.target.value }))
      }
      // Else it's react-select
    } else {
      name = data.name;
      value = event.id;

      dispatch(createResult({ [`${name}`]: value }))

    }



  }



  const handleAddResult = () => {

    let result = electionState?.results;


    let foundedResult = electionState?.newElection?.results?.find(
      (eachPhase) => {
        if (
          eachPhase.candidate === result.candidate &&
          eachPhase.votesReceived === result.votesReceived &&
          eachPhase.won === result.won
        ) {
          return eachPhase;
        }

        return null;
      }
    );

    if (!foundedResult) {

      let newResults = [...electionState?.newElection?.results, result];
      dispatch(addNewElection({ ...electionState.newElection, results: newResults }));



      dispatch(removeResult())


      if (electionState?.newElection?.results?.length) {
        gridApiResult.updateGridOptions({
          rowData: electionState?.newElection?.results,
        }); // Refresh grid
      }
    } else {
      toast.info("This result already exists");
      onClear()
      dispatch(removeResult())
    }

  }

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 10, // Increase this as needed
    }),
  };
  console.log(electionState);
  const handleSubmit = async (event) => {

    try {
      let newElection = electionState.newElection
      dispatch(createElectionRequest(newElection))
      setIsSubmited(true);
      event.preventDefault();

      if (!electionFormRef.current.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        setIsSubmited(false);
        if (electionFormRef) {
          electionFormRef.current.reportValidity();
        }
      }

      electionFormRef.current.classList.add("was-validated");
      if (electionFormRef.current.checkValidity()) {
        const res = await electionService.createNewElection(newElection)
        console.log(res);

        if (res?.response?.status === 500) {
          toast.error(res.response.data.error)
          setIsSubmited(false);
          dispatch(resetNewElection())
          electionFormRef.current.classList.remove("was-validated");
        }


        if (res?.response?.status === 409) {
          toast.info(res?.response?.data?.message);
          setIsSubmited(false);
          dispatch(resetNewElection())
          electionFormRef.current.classList.remove("was-validated");
        }

        if (res?.message === "Network Error") {
          toast.error(res.message);
          setIsSubmited(false);

          electionFormRef.current.classList.remove("was-validated");
        }

        if (res?.status === 201) {
          toast.success(res?.data?.message);
          setIsSubmited(false);

          dispatch(resetNewElection())
          electionFormRef.current.classList.remove("was-validated");

        }
      }
    } catch (error) {
      console.log(error);
      dispatch(createElectionFailure(error))
    }
  }

  return (
    <div>
      <form noValidate onSubmit={handleSubmit} ref={electionFormRef}>
        <div className="container-fluid py-4">
          <div className="row">
            <h2 className="text-center">Create Elections</h2>
          </div>

          <div className="row">

            <div className="col-lg-3">
              <div className="card position-sticky  " style={{ top: 90 }}>
                <ul className="nav flex-column   rounded   p-3 settingsNav userEdit-menu-card">
                  <li className="nav-item">
                    <a
                      className="nav-link d-flex "
                      data-scroll=""
                      href="#Electiondetails"
                    >
                      <span className="material-symbols-outlined">
                        ballot
                      </span>

                      <span className="text-sm">Election Details</span>
                    </a>
                  </li>
                  <li className="nav-item pt-2">
                    <a
                      className="nav-link d-flex "
                      data-scroll=""
                      href="#Phases"
                    >
                      <span className="material-symbols-outlined">
                        lists
                      </span>
                      <span className="text-sm">Phases</span>
                    </a>
                  </li>
                  <li className="nav-item pt-2">
                    <a
                      className="nav-link d-flex "
                      data-scroll=""
                      href="#notificationDetails"
                    >
                      <span className="material-symbols-outlined">
                        campaign
                      </span>
                      <span className="text-sm">Notification </span>
                    </a>
                  </li>

                  <li className="nav-item pt-2">
                    <a className="nav-link d-flex " data-scroll="" href="#results">
                      <span className="material-symbols-outlined">
                        high_density
                      </span>
                      <span className="text-sm">Results</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row" id="Electiondetails">
                <div className="col-12">
                  <div className="card p-3 mt-1">
                    <div className="card-heading">
                      <h4 className="text-center">Election details</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="name">Election name</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <input
                              id="name"
                              type="text"
                              className="form-control"
                              name="name"
                              required
                              onChange={handleIputChange}
                              value={electionState?.newElection?.name}
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter election name.
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="year">Election Year</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <input
                              id="year"
                              type="number"
                              min={1900}
                              className="form-control"
                              name="year"
                              onChange={handleIputChange}
                              value={electionState?.newElection?.year}
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter election year.
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="electionType">Election Type</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <Select
                              id="electionType"
                              name="electionType"
                              className="form-control form-select"
                              options={electionTypesObj}
                              isClearable
                              isSearchable
                              required
                              onChange={handleSelectChange}
                              
                              value={
                                electionState?.newElection?.electionType ?
                                  {
                                    value: electionState?.newElection?.electionType, label: electionState?.newElection?.electionType
                                  } : null}

                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please select transaction type.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="description">Description</label>{" "}
                            <textarea
                              className="form-control"
                              id="description"
                              placeholder="Election description"
                              name="description"
                              onChange={handleIputChange}
                              value={electionState?.newElection?.description}
                            ></textarea>
                            <div
                              className="form-text text-secondary"
                              id="basic-addon4"
                            >
                              Write election description.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" id="Phases">
                <div className="col-12">
                  <div className="card p-3 mt-1">
                    <div className="card-header mt-0 pt-0">
                      <h4 className="text-center">Phases</h4>
                    </div>
                    <div className="card-body mt-3 pt-0">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="phaseNumber">Phase Number</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <input
                              value={electionState?.phases?.phaseNumber}
                              type="number"
                              id="phaseNumber"
                              className="form-control"
                              name="phaseNumber"
                              onChange={handlePhaseIputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="date">Phase date</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <input
                              value={electionState?.phases?.date}
                              id="date"
                              type="date"
                              className="form-control"
                              name="date"
                              onChange={handlePhaseIputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="input-group input-group-static mb-4">
                            <label>States</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <Select
                              styles={customStyles}
                              className="form-control form-select"
                              name="states"
                              options={statesAndUTsOfIndia}
                              isClearable
                              isMulti
                              isSearchable
                              onChange={handleSelectChange}
                              value={electionState?.phases?.states?.map(value => ({ value, label: value }))}
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please select state
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="constituencies">Constituencies</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <Select
                              styles={customStyles}
                              className="form-control form-select"
                              name="constituencies"
                              options={constituencies}
                              isClearable
                              isMulti
                              isSearchable
                              id="constituencies"
                              isLoading={isLoadingConstituencies}
                              onChange={handleSelectChange}
                              ref={constituenciesRef}

                            />
                            <div
                              className="form-text text-secondary"
                              id="basic-addon4"
                            >
                              If you can't find constituency <Link >click here</Link> to add.
                            </div>

                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please select constituencies
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 justify-content-center d-flex align-items-center">
                          <button className="btn btn-info h-50" type="button" onClick={handleAddPhase}>
                            Add phase
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">

                      <div
                        className="ag-theme-custom"
                        style={{ height: 200 }}
                      >
                        <AgGridReact
                          colResizeDefault
                          rowData={rowData}
                          columnDefs={colDefs}
                          pagination={true}
                          animateRows={true}
                          onGridReady={(params) => setGridApi(params.api)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" id="notificationDetails">
                <div className="col-12 ">
                  <div className="card p-3 mt-1">
                    <div className="card-header p-0 m-0">
                      <h4 className="text-center">Notification Details</h4>
                    </div>
                    <div className="card-body mt-3 pt-0">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="issueDate">Notification Date</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <input
                              value={electionState?.newElection?.notificationDetails?.issueDate}
                              type="date"
                              id="issueDate"
                              className="form-control"
                              name="issueDate"
                              placeholder="Notification IssueDate"
                              onChange={handleIputChange}
                            />
                            <div className="mb-3">

                              <div id="textHelp" className="form-text">Notification Issue Date</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="issueDate"> Date For Nominations</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <input
                              value={electionState?.newElection?.notificationDetails?.lastDateForNominations}
                              type="date"
                              id="lastDateForNominations"
                              className="form-control"
                              name="lastDateForNominations"
                              placeholder="Notification lastDateForNominations"
                              onChange={handleIputChange}
                            />
                            <div className="mb-3">

                              <div id="textHelp" className="form-text">Last Date for nominations</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="row" id="results">
                <div className="col-12">
                  <div className="card p-3 mt-1">
                    <div className="card-header mt-0 pt-0">
                      <h4 className="text-center">Results</h4>
                    </div>
                    <div className="card-body mt-3 pt-0">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="candidate">Candidats</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <Select
                              styles={customStyles}
                              className="form-control form-select"
                              name="candidate"
                              options={candidates}
                              isClearable

                              isSearchable
                              id="candidates"
                              isLoading={isLoadingCandidates}
                              onChange={handleResultInputChange}


                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-4">
                            <label className="justify-content-center d-flex align-items-center">Won</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <div className="checkbox-wrapper-26">
                              <input type="checkbox" checked={electionState?.results?.won} id="_checkbox-26" onChange={handleResultInputChange} name="won" /* value={electionState?.results?.won}  */ />
                              <label htmlFor="_checkbox-26">
                                <div className="tick_mark"></div>
                              </label>
                              <div className="mb-3">

                                <div id="textHelp" className="form-text text-wrap">Please click here to choose won or not</div>
                              </div>
                            </div>

                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please select state
                            </div>

                          </div>

                        </div>
                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-0">
                            <label htmlFor="votesReceived">Votes Received</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <input
                              value={electionState?.results?.votesReceived}
                              id="votesReceived"
                              type="number"
                              className="form-control"
                              name="votesReceived"
                              onChange={handleResultInputChange}
                            />
                          </div>
                        </div>


                        <div className="col-md-6 justify-content-center d-flex align-items-center">
                          <button className="btn btn-info h-50" type="button" onClick={handleAddResult}>
                            Add result
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div
                        className="ag-theme-material"
                        style={{ height: 200 }}
                      >
                        <AgGridReact
                          rowData={rowDataResults}
                          columnDefs={colDefsResults}
                          pagination={true}
                          animateRows={true}
                          onGridReady={(params) => setGridApiResult(params.api)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row " >
                <div className="col-12">
                  <div className="card">
                    <button type="submit" className="btn btn-primary btn-lg fw-semibold">Create Election {isSubmited && <LoadingSpinner size={15} />}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}

export default CreateElection;
