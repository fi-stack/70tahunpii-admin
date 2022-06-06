import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getActivityDetails } from "../../redux/action";

const Detail = () => {
  const { type, athleteId, name } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivityDetails(type, athleteId));
  }, [dispatch]);

  const { activity_details } = useSelector((state) => state.activityDetails);

  const zeroPad = (num, pad) => {
    var pd = Math.pow(10, pad);
    return Math.floor(num * pd) / pd;
  };

  const timeToViewFormat = (number) => {
    if (number !== null || number !== "") {
      if (number > 0 && number < 60) {
        return number + "s";
      }
      if (number >= 60 && number < 3600) {
        let second = number % 60;
        let minute = number - second;
        minute = minute / 60;
        return minute + "m " + second + "s";
      } else if (number >= 3600) {
        let second = number % 60;
        let tempMinute = (number - second) / 60;
        let minute = tempMinute % 60;
        let hour = (tempMinute - minute) / 60;
        return hour + "h " + minute + "m " + second + "s";
      }
    } else {
      return "-";
    }
  };
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">
                Aktifitas {type === "run" ? "Lari" : "Gowes"} {name}
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Index</a>
                </li>
                <li className="breadcrumb-item active">
                  Aktifitas {type === "run" ? "Lari" : "Gowes"} {name}
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
                      dispatch(
                        getActivityDetails(type, athleteId, e.target.value)
                      );
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
                    <th>Valid</th>
                    <th>Activity Id</th>
                    <th>Activity Name</th>
                    <th>Distance (Km)</th>
                    <th>Average Speed (Km/h)</th>
                    <th>Max Speed (Km/h)</th>
                    <th>Elapsed Time</th>
                    <th>Moving Time</th>
                    <th>Start Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activity_details?.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.valid ? "Ya" : "Tidak"}</td>
                      <td>{value.activity_id}</td>
                      <td>{value.activity_name}</td>
                      <td>{zeroPad(value.distance / 1000, 1)}</td>
                      <td>{zeroPad(value.average_speed * 3.6, 1)}</td>
                      <td>{zeroPad(value.max_speed * 3.6, 1)}</td>
                      <td>{timeToViewFormat(value.elapsed_time)}</td>
                      <td>{timeToViewFormat(value.moving_time)}</td>
                      <td>{value.start_date_local}</td>
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

export default Detail;
