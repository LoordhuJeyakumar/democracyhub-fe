import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import constituenciesService from "../services/constituenciesService";

function CreateElection() {
  const elections = useSelector((state) => state.elections);
  const [constituencies, setConstituencies] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    /* axios
      .get("/api/constituencies")
      .then((response) => setConstituencies(response.data));
    axios
      .get("/api/candidates")
      .then((response) => setCandidates(response.data));
    axios.get("/api/parties").then((response) => setParties(response.data)); */
    getConstituencies();
  
  }, []);

 

  const getConstituencies = async () => {
    try {
      const res = await constituenciesService.getAllconstituencies();

      if (res.status === 200) {
        setConstituencies(res.data.allConstituencies);
      }
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const getcandidates = async () => {
    try {
      const res = await constituenciesService.getAllconstituencies();

      if (res.status === 200) {
        setConstituencies(res.data.allConstituencies);
      }
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const initialValues = {
    name: "",
    description: "",
    year: new Date().getFullYear(),
    electionType: "",
    phases: [{ phaseNumber: 1, date: "", states: [""], constituencies: [""] }],
    notificationDetails: { issueDate: "", lastDateForNominations: "" },
    results: [{ candidate: "", votesReceived: 0, won: false }],
    winners: [""],
    manifestos: [{ party: "", manifestoURL: "" }],
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Election name is required")
      .max(100, "Election name cannot exceed 100 characters"),
    year: Yup.number().required("Election year is required"),
    electionType: Yup.string().required("Election type is required"),
    phases: Yup.array().of(
      Yup.object({
        phaseNumber: Yup.number().required("Phase number is required"),
        date: Yup.date().required("Phase date is required"),
        states: Yup.array()
          .of(Yup.string().required("State is required"))
          .min(1, "At least one state is required"),
        constituencies: Yup.array()
          .of(Yup.string().required("Constituency is required"))
          .min(1, "At least one constituency is required"),
      })
    ),
    notificationDetails: Yup.object({
      issueDate: Yup.date().required("Issue date is required"),
      lastDateForNominations: Yup.date().required(
        "Last date for nominations is required"
      ),
    }),
    results: Yup.array().of(
      Yup.object({
        candidate: Yup.string().required("Candidate is required"),
        votesReceived: Yup.number()
          .required("Votes received is required")
          .min(0, "Votes received cannot be negative"),
      })
    ),
    winners: Yup.array().of(Yup.string().required("Winner is required")),
    manifestos: Yup.array().of(
      Yup.object({
        party: Yup.string().required("Party is required"),
        manifestoURL: Yup.string()
          .url("Invalid URL")
          .required("Manifesto URL is required"),
      })
    ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios
      .post("/api/elections", values)
      .then((response) => {
        console.log("Election created successfully", response.data);
      })
      .catch((error) => {
        console.error("There was an error creating the election!", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container mt-4 p-4">
      <div className="text-center mb-4">
        <h4>Create Election</h4>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="row g-3 needs-validation" noValidate>
            <div className="col-md-4">
              <label htmlFor="name" className="form-label">
                Election Name
              </label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="year" className="form-label">
                Year
              </label>
              <Field name="year" type="number" className="form-control" />
              <ErrorMessage
                name="year"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="electionType" className="form-label">
                Election Type
              </label>
              <Field name="electionType" as="select" className="form-select">
                <option value="" label="Choose..." />
                <option value="Parliamentary">Parliamentary</option>
                <option value="StateAssembly">State Assembly</option>
                <option value="RajyaSabha">Rajya Sabha</option>
                <option value="Presidential">Presidential</option>
                <option value="VicePresidential">Vice Presidential</option>
                <option value="LegislativeCouncil">Legislative Council</option>
                <option value="Local">Local</option>
              </Field>
              <ErrorMessage
                name="electionType"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <FieldArray name="phases">
              {({ insert, remove, push }) => (
                <div>
                  {values.phases.length > 0 &&
                    values.phases.map((phase, index) => (
                      <div key={index} className="card mb-3 p-3">
                        <h5>Phase {index + 1}</h5>
                        <div className="col-md-2">
                          <label
                            htmlFor={`phases.${index}.phaseNumber`}
                            className="form-label"
                          >
                            Phase Number
                          </label>
                          <Field
                            name={`phases.${index}.phaseNumber`}
                            type="number"
                            className="form-control"
                          />
                          <ErrorMessage
                            name={`phases.${index}.phaseNumber`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="col-md-3">
                          <label
                            htmlFor={`phases.${index}.date`}
                            className="form-label"
                          >
                            Phase Date
                          </label>
                          <Field
                            name={`phases.${index}.date`}
                            type="date"
                            className="form-control"
                          />
                          <ErrorMessage
                            name={`phases.${index}.date`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <FieldArray name={`phases.${index}.states`}>
                          {({ insert, remove, push }) => (
                            <div className="col-md-3">
                              <label className="form-label">States</label>
                              {phase.states.map((state, stateIndex) => (
                                <div
                                  key={stateIndex}
                                  className="input-group mb-1"
                                >
                                  <Field
                                    name={`phases.${index}.states.${stateIndex}`}
                                    className="form-control"
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => remove(stateIndex)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => push("")}
                              >
                                Add State
                              </button>
                            </div>
                          )}
                        </FieldArray>

                        <FieldArray name={`phases.${index}.constituencies`}>
                          {({ insert, remove, push }) => (
                            <div className="col-md-4">
                              <label className="form-label">
                                Constituencies
                              </label>
                              {phase.constituencies?.map(
                                (constituency, constituencyIndex) => (
                                  <div
                                    key={constituencyIndex}
                                    className="input-group mb-1"
                                  >
                                    <Field
                                      as="select"
                                      name={`phases.${index}.constituencies.${constituencyIndex}`}
                                      className="form-select"
                                    >
                                      <option
                                        value=""
                                        label="Select constituency"
                                      />
                                      {constituencies?.map((cons) => (
                                        <option key={cons._id} value={cons._id}>
                                          {cons.name}
                                        </option>
                                      ))}
                                    </Field>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => remove(constituencyIndex)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                )
                              )}
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => push("")}
                              >
                                Add Constituency
                              </button>
                            </div>
                          )}
                        </FieldArray>

                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => remove(index)}
                        >
                          Remove Phase
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={() =>
                      push({
                        phaseNumber: values.phases.length + 1,
                        date: "",
                        states: [""],
                        constituencies: [""],
                      })
                    }
                  >
                    Add Phase
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="col-md-6">
              <label
                htmlFor="notificationDetails.issueDate"
                className="form-label"
              >
                Issue Date
              </label>
              <Field
                name="notificationDetails.issueDate"
                type="date"
                className="form-control"
              />
              <ErrorMessage
                name="notificationDetails.issueDate"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="notificationDetails.lastDateForNominations"
                className="form-label"
              >
                Last Date for Nominations
              </label>
              <Field
                name="notificationDetails.lastDateForNominations"
                type="date"
                className="form-control"
              />
              <ErrorMessage
                name="notificationDetails.lastDateForNominations"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <FieldArray name="results">
              {({ insert, remove, push }) => (
                <div>
                  {values.results.length > 0 &&
                    values.results.map((result, index) => (
                      <div key={index} className="card mb-3 p-3">
                        <h5>Result {index + 1}</h5>
                        <div className="col-md-4">
                          <label
                            htmlFor={`results.${index}.candidate`}
                            className="form-label"
                          >
                            Candidate
                          </label>
                          <Field
                            as="select"
                            name={`results.${index}.candidate`}
                            className="form-select"
                          >
                            <option value="" label="Select candidate" />
                            {candidates?.map((candidate) => (
                              <option key={candidate._id} value={candidate._id}>
                                {candidate.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name={`results.${index}.candidate`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="col-md-4">
                          <label
                            htmlFor={`results.${index}.votesReceived`}
                            className="form-label"
                          >
                            Votes Received
                          </label>
                          <Field
                            name={`results.${index}.votesReceived`}
                            type="number"
                            className="form-control"
                          />
                          <ErrorMessage
                            name={`results.${index}.votesReceived`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="col-md-4">
                          <label
                            htmlFor={`results.${index}.won`}
                            className="form-label"
                          >
                            Won
                          </label>
                          <Field
                            name={`results.${index}.won`}
                            type="checkbox"
                            className="form-check-input"
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => remove(index)}
                        >
                          Remove Result
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={() =>
                      push({ candidate: "", votesReceived: 0, won: false })
                    }
                  >
                    Add Result
                  </button>
                </div>
              )}
            </FieldArray>

            <FieldArray name="winners">
              {({ insert, remove, push }) => (
                <div className="col-md-12 mb-3">
                  <label className="form-label">Winners</label>
                  {values.winners.length > 0 &&
                    values.winners.map((winner, index) => (
                      <div key={index} className="input-group mb-1">
                        <Field
                          as="select"
                          name={`winners.${index}`}
                          className="form-select"
                        >
                          <option value="" label="Select winner" />
                          {candidates?.map((candidate) => (
                            <option key={candidate._id} value={candidate._id}>
                              {candidate.name}
                            </option>
                          ))}
                        </Field>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => remove(index)}
                        >
                          Remove Winner
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={() => push("")}
                  >
                    Add Winner
                  </button>
                </div>
              )}
            </FieldArray>

            <FieldArray name="manifestos">
              {({ insert, remove, push }) => (
                <div className="col-md-12 mb-3">
                  <label className="form-label">Manifestos</label>
                  {values.manifestos.length > 0 &&
                    values.manifestos.map((manifesto, index) => (
                      <div key={index} className="card mb-3 p-3">
                        <h5>Manifesto {index + 1}</h5>
                        <div className="col-md-6">
                          <label
                            htmlFor={`manifestos.${index}.party`}
                            className="form-label"
                          >
                            Party
                          </label>
                          <Field
                            as="select"
                            name={`manifestos.${index}.party`}
                            className="form-select"
                          >
                            <option value="" label="Select party" />
                            {parties.map((party) => (
                              <option key={party._id} value={party._id}>
                                {party.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name={`manifestos.${index}.party`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="col-md-6">
                          <label
                            htmlFor={`manifestos.${index}.manifestoURL`}
                            className="form-label"
                          >
                            Manifesto URL
                          </label>
                          <Field
                            name={`manifestos.${index}.manifestoURL`}
                            type="url"
                            className="form-control"
                          />
                          <ErrorMessage
                            name={`manifestos.${index}.manifestoURL`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => remove(index)}
                        >
                          Remove Manifesto
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={() => push({ party: "", manifestoURL: "" })}
                  >
                    Add Manifesto
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="col-12">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateElection;
