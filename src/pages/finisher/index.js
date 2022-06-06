import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPodiumFinisher, getPodiumFinisherExcel } from "../../redux/action";

const Finisher = () => {
  const { type } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPodiumFinisher(type));
  }, [dispatch]);

  const { podium_finisher } = useSelector((state) => state.podiumFinisher);

  const zeroPad = (num, pad) => {
    var pd = Math.pow(10, pad);
    return Math.floor(num * pd) / pd;
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">
                  Finisher {type === "run" ? "Lari" : "Gowes"}
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Index</a>
                  </li>
                  <li className="breadcrumb-item active">
                    Finisher {type === "run" ? "Lari" : "Gowes"}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content mb-5">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <div className="card-header">
                  <div className="card-tools">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={() => dispatch(getPodiumFinisherExcel(type))}
                    >
                      <i className="fas fa-file-excel"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body table-responsive p-0">
                <table className="table table-head-fixed text-nowrap">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Ebib</th>
                      <th>Athlete</th>
                      <th>Nama</th>
                      <th>Gender</th>
                      <th>Total Jarak (Km)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {podium_finisher?.map((value, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{value.participant_details[0].ebib}</td>
                        <td>
                          <a
                            href={`https://www.strava.com/athletes/${value.participant_details[0].athlete_id}`}
                          >
                            {value.participant_details[0].athlete_id}
                          </a>
                        </td>
                        <td>{value.name}</td>
                        <td>
                          {value.gender === "male" ? "Laki-Laki" : "Perempuan"}
                        </td>
                        <td>
                          {zeroPad(
                            value.participant_details[0].athlete
                              .activities_sum_distance / 1000,
                            1
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Finisher;
