import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParticipantDetails } from "../../redux/action/participant";

const Participant = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState();

  useEffect(() => {
    dispatch(getParticipantDetails(search));
  }, [dispatch]);

  const { participant_details } = useSelector(
    (state) => state.participantDetails
  );

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Participant</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Index</a>
                </li>
                <li className="breadcrumb-item active">Participant</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <div className="card-tools">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control float-right"
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearch(e.target.value);
                      dispatch(getParticipantDetails(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="card-body table-responsive p-0"
              style={{ height: 350 }}
            >
              <table className="table table-head-fixed text-nowrap">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Participant ID</th>
                    <th>Ebib</th>
                    <th>Type</th>
                    <th>Verified</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {participant_details.data?.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.participant_id}</td>
                      <td>{value.ebib}</td>
                      <td>{value.participant.type}</td>
                      <td>{value.participant.verified ? "true" : "false"}</td>
                      <th>Detail</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Participant;
