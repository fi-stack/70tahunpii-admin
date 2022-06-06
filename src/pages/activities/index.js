import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getActivities } from "../../redux/action";

const Activities = () => {
  const { type } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities(type));
  }, [dispatch]);

  const { activities } = useSelector((state) => state.activities);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">
                Aktifitas {type === "run" ? "Lari" : "Gowes"}
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Index</a>
                </li>
                <li className="breadcrumb-item active">
                  Aktifitas {type === "run" ? "Lari" : "Gowes"}
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
              <div className="card-tools">
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="cari..."
                    onChange={(e) => {
                      dispatch(getActivities(type, e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="card-body table-responsive p-0"
              style={{ height: 375 }}
            >
              <table className="table table-head-fixed text-nowrap">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Ebib</th>
                    <th>Nama</th>
                    <th>Athlete</th>
                    <th>Total (Valid)</th>
                    <th>Total (Unvalid)</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {activities?.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.ebib}</td>
                      <td>{value.user?.name}</td>
                      <td>{value.athlete_id}</td>
                      <td className="text-center">
                        {value.athlete?.activities_count_valid}
                      </td>
                      {value.athlete?.activities_count_unvalid > 0 ? (
                        <td className="text-center bg-danger">
                          {value.athlete?.activities_count_unvalid}
                        </td>
                      ) : (
                        <td></td>
                      )}
                      <td>
                        <a
                          href={`/activity-details/${type}/${value.athlete_id}/${value.user?.name}`}
                          className="btn btn-default"
                        >
                          <i className="fas fa-eye"></i>
                        </a>
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
  );
};

export default Activities;
