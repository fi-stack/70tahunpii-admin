import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getActivityDetails, validationActivity } from "../../redux/action";

const Detail = () => {
  const { type, athleteId, name } = useParams();

  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getActivityDetails(type, athleteId));
  }, [dispatch]);

  const { activity_details } = useSelector((state) => state.activityDetails);

  const [activityId, setActivityId] = useState();
  const [message, setMessage] = useState();
  const [valid, setValid] = useState();
  const [errors, setErrors] = useState([]);

  const handleValidationActivity = (e) => {
    e.preventDefault();

    const form = {
      valid,
      reason: `${admin.name}: ${message}`,
    };

    validationActivity(activityId, form)
      .then((res) => {
        toast.success(res.message);
        window.location.reload();
      })
      .catch((err) => {
        if (err.data) {
          setErrors(err.data);
        } else {
          toast.error(err.message);
        }
      });
  };

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
    <>
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
                      <th>Aksi</th>
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
                        <td>
                          <button
                            className="btn btn-danger"
                            data-toggle="modal"
                            data-target="#invalidMessageModal"
                            onClick={() => {
                              setActivityId(value.activity_id);
                              setValid(false);
                            }}
                          >
                            Invalid
                          </button>
                          <button
                            className="btn btn-success"
                            data-toggle="modal"
                            data-target="#validMessageModal"
                            onClick={() => {
                              setActivityId(value.activity_id);
                              setValid(true);
                            }}
                          >
                            Valid
                          </button>
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

      <div
        class="modal fade"
        id="invalidMessageModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="invalidMessageModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="invalidMessageModalLabel">
                Invalid Message
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleValidationActivity}
              >
                Invalid
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="validMessageModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="validMessageModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="validMessageModalLabel">
                Valid Message
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleValidationActivity}
              >
                Valid
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
