import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getParticipantsCompleted } from "../../redux/action";
import { exportParticipantsCompleted } from "../../redux/action/participant";

const ParticipantCompleted = () => {
  const { type } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParticipantsCompleted(type));
  }, [type]);

  const [page, setPage] = useState();

  const { participants_completed } = useSelector(
    (state) => state.participantsCompleted
  );

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Peserta</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">{type === "run" ? "Lari" : "Gowes"}</a>
                </li>
                <li className="breadcrumb-item active">Peserta</li>
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
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={() => dispatch(exportParticipantsCompleted(type))}
                >
                  <i className="fas fa-file-excel"></i>
                </button>
              </div>
            </div>
            <div className="card-body table-responsive p-0">
              <table className="table table-head-fixed text-nowrap">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Kategori</th>
                    <th>Telp / Wa</th>
                    <th>Tipe</th>
                    <th>Approval</th>
                    <th>Ebib</th>
                    <th>Approved At</th>
                  </tr>
                </thead>
                <tbody>
                  {participants_completed.data?.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.user?.name}</td>
                      {(() => {
                        if (value.user?.kta_category === "a") {
                          return <td>PII (Lunas)</td>;
                        } else if (value.user?.kta_category === "b") {
                          return <td>PII (Blum Lunas)</td>;
                        } else if (value.user?.kta_category === "c") {
                          return <td>S.T. / Setara</td>;
                        } else {
                          return <td>Umum</td>;
                        }
                      })()}
                      <td>
                        <a
                          href={`https://wa.me/62${value.user?.phone.substring(
                            1
                          )}`}
                          target="_blank"
                        >
                          {value.user?.phone}
                        </a>
                      </td>
                      {(() => {
                        if (value.type === "run") {
                          return <td>Lari</td>;
                        } else if (value.type === "ride") {
                          return <td>Gowes</td>;
                        } else {
                          return <td>Lari & Gowes</td>;
                        }
                      })()}
                      <td>{value.participant?.verified ? "Sudah" : "Belum"}</td>
                      <td>{value.ebib}</td>
                      <td>{value.participant?.approved_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div>Total : {participants_completed?.total}</div>
            <div>
              {participants_completed?.links?.map((value, index) =>
                value.active ? (
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      dispatch(
                        getParticipantsCompleted(type, value.url.split("=")[1])
                      );
                      setPage(value.url.split("=")[1]);
                    }}
                  >
                    {value.label}
                  </button>
                ) : (
                  <button
                    className="btn btn-default"
                    onClick={() => {
                      dispatch(
                        getParticipantsCompleted(type, value.url.split("=")[1])
                      );
                      setPage(value.url.split("=")[1]);
                    }}
                  >
                    {(() => {
                      if (value.label === "&laquo; Previous") {
                        return "Prev";
                      } else if (value.label === "Next &raquo;") {
                        return "Next";
                      } else {
                        return value.label;
                      }
                    })()}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParticipantCompleted;
