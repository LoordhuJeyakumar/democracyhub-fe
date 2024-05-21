import React from "react";
import MainWrapper from "../components/MainWrapper";
import Wrapper from "../components/Wrapper";

const ElectionsComponent = () => {
  return (
    <div className="container-fluid m-2">
      <div className="row">
        <h1 className="text-center">Current Elections</h1>
        <div className="col-lg-3">
          <div className="card position-sticky top-1">
            <ul className="nav flex-column  border-radius-lg p-3 electionNav rounded">
              <li className="nav-item">
                <a
                  className="nav-link d-flex "
                  data-scroll=""
                  href="#general-elections"
                >
                  <span className="material-symbols-outlined">public</span>
                  &nbsp;
                  <span className="text-sm">General Elections</span>
                </a>
              </li>
              <li className="nav-item pt-2">
                <a
                  className="nav-link d-flex "
                  data-scroll=""
                  href="#assembly-elections"
                >
                  <span className="material-symbols-outlined">analytics</span>
                  &nbsp;
                  <span className="text-sm">Assembly Elections</span>
                </a>
              </li>
              <li className="nav-item pt-2">
                <a
                  className="nav-link d-flex "
                  data-scroll=""
                  href="#bye-elections"
                >
                  <span className="material-symbols-outlined">ballot</span>
                  &nbsp;
                  <span className="text-sm">Bye Elections</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-9 mt-lg-0 mt-4 election-content">
          <div className="card" id="general-elections">
            <div className="card-header">
              <h4 className="text-center">General Elections details</h4>
            </div>
            <div className="card-body">
              <p>
                General Elections to the Lok Sabha, also known as the House of
                the People, are held every five years in India. These elections
                are conducted by the Election Commission of India to elect 543
                members to the Lok Sabha
              </p>
              <p>
                The Lok Sabha is the lower house of the Parliament of India, and
                its members represent constituencies from different parts of the
                country. The party or coalition that secures a majority of seats
                in the Lok Sabha forms the government, and its leader typically
                becomes the Prime Minister
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">General Elections - 2024</h4>
              <p className="text-center">Schedule</p>{" "}
            </div>
            <div className="card-body">
              <ul className="timeline">
                {/*  <!-- Item 1 --> */}
                <li>
                  <div className="direction-r">
                    <div className="flag-wrapper">
                      <span className="hexa"></span>
                      <span className="flag">Phase 7</span>
                      <span className="time-wrapper">
                        <span className="time">1 June 2024</span>
                      </span>
                    </div>
                    <div className="desc">
                      <p>
                        The seventh and final phase of polling will be held on{" "}
                        <b>June 1</b>. covering 57 parliamentary constituencies
                        across eight states.
                      </p>
                      <p className="p-2">
                        Polling status :{" "}
                        <span className="badge bg-primary">Scheduled</span>
                      </p>
                    </div>
                  </div>
                </li>

                {/* <!-- Item 2 --> */}
                <li>
                  <div className="direction-l">
                    <div className="flag-wrapper">
                      <span className="hexa"></span>
                      <span className="flag">Phase 6</span>
                      <span className="time-wrapper">
                        <span className="time">25 May 2024</span>
                      </span>
                    </div>
                    <div className="desc">
                      <p>
                        The sixth phase of polling will be held on <b>May 25</b>
                        , covering 57 parliamentary constituencies across seven
                        states.
                      </p>
                      <p className="p-2">
                        Polling status :{" "}
                        <span className="badge bg-primary">Scheduled</span>
                      </p>
                    </div>
                  </div>
                </li>

                {/*  <!-- Item 3 --> */}
                <li>
                  <div className="direction-r">
                    <div className="flag-wrapper">
                      <span className="hexa"></span>
                      <span className="flag">Phase 5</span>
                      <span className="time-wrapper">
                        <span className="time">20 May 2024</span>
                      </span>
                    </div>
                    <div className="desc">
                      <p>
                        {" "}
                        The fifth phase of polling will be held on <b>May 20</b>
                        , covering 49 parliamentary constituencies across eight
                        states.
                      </p>
                      <p className="p-2">
                        Polling status :{" "}
                        <span className="badge bg-primary">Scheduled</span>
                      </p>
                    </div>
                  </div>
                </li>
                {/*  <!-- Item 4 --> */}
                <li>
                  <div className="direction-l">
                    <div className="flag-wrapper">
                      <span className="hexa"></span>
                      <span className="flag">Phase 4</span>
                      <span className="time-wrapper">
                        <span className="time">13 May 2014</span>
                      </span>
                    </div>
                    <div className="desc">
                      <p>
                        The fourth phase of polling will be held on{" "}
                        <b>May 13</b>, covering 96 parliamentary constituencies
                        across 10 states.
                      </p>
                      <p className="p-2">
                        Polling status{" "}
                        <span className="badge bg-success">Completed</span>
                      </p>
                    </div>
                  </div>
                </li>
                {/*  <!-- Item 5 --> */}
                <li>
                  <div className="direction-r">
                    <div className="flag-wrapper">
                      <span className="hexa"></span>
                      <span className="flag">Phase 3</span>
                      <span className="time-wrapper">
                        <span className="time">7 May 2014</span>
                      </span>
                    </div>
                    <div className="desc">
                      <p>
                        The third phase of polling will be held on <b>May 7</b>,
                        covering 94 parliamentary constituencies across 12
                        states.
                      </p>
                      <p className="p-2">
                        Polling status{" "}
                        <span className="badge bg-success">Completed</span>
                      </p>
                    </div>
                  </div>
                </li>
                {/*  <!-- Item 6 --> */}
                <li>
                  <div className="direction-l">
                    <div className="flag-wrapper">
                      <span className="hexa"></span>
                      <span className="flag">Phase 2</span>
                      <span className="time-wrapper">
                        <span className="time">26 April 2024</span>
                      </span>
                    </div>
                    <div className="desc">
                      <p>
                        The second phase of polling was held on <b>April 26</b>,
                        covering 89 parliamentary constituencies across 13
                        states.
                      </p>

                      <p className="p-2">
                        Polling status{" "}
                        <span className="badge bg-success">Completed</span>
                      </p>
                    </div>
                  </div>
                </li>
                {/*  <!-- Item 7 --> */}
                <li>
                  <div className="direction-r">
                    <div className="flag-wrapper">
                      <span className="hexa"></span>
                      <span className="flag">Phase 1</span>
                      <span className="time-wrapper">
                        <span className="time">19 April 2024</span>
                      </span>
                    </div>
                    <div className="desc">
                      <p>
                        {" "}
                        The first phase of polling was held on <b>April 19</b>,
                        covering 102 parliamentary constituencies across 21
                        states.
                      </p>

                      <p className="p-2">
                        Polling status{" "}
                        <span className="badge bg-success">Completed</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ElectionsHomePage() {
  return (
    <Wrapper>
      <div className="pt-5 mt3">
        <ElectionsComponent />
      </div>
    </Wrapper>
  );
}

function ElectionsDashboard() {
  return (
    <MainWrapper>
      <ElectionsComponent />
    </MainWrapper>
  );
}

export { ElectionsHomePage as default, ElectionsDashboard, ElectionsComponent };
