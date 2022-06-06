import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { approveParticipant, getParticipants } from "../../redux/action";

const Participant = () => {
  const { type } = useParams();
  const dispatch = useDispatch();

  const { participants } = useSelector((state) => state.participants);
  const { admin } = useSelector((state) => state.admin);

  const [verified, setVerified] = useState();
  const [search, setSearch] = useState();
  const [page, setPage] = useState();

  useEffect(() => {
    dispatch(getParticipants(type, verified, search, page));
  }, [type]);

  const [paymentProof, setPaymentProof] = useState("");

  const btnSearch = (e) => {
    e.preventDefault();
    dispatch(getParticipants(type, verified, search, page));
  };

  const handleApprove = (id) => {
    approveParticipant(id, admin?.id)
      .then((res) => {
        toast.success(res.message);
        dispatch(getParticipants());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Pendaftar</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Index</a>
                  </li>
                  <li className="breadcrumb-item active">Pendaftar</li>
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
                  <form className="input-group" onSubmit={btnSearch}>
                    <div className="mr-1">
                      <input
                        type="radio"
                        value="0"
                        name="verified"
                        onChange={(e) => {
                          setVerified(0);
                        }}
                      />
                      <label>Belum Terverifikasi</label>
                    </div>
                    <div className="mr-1">
                      <input
                        type="radio"
                        value="1"
                        name="verified"
                        onChange={(e) => {
                          setVerified(1);
                        }}
                      />
                      <label>Terverifikasi</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="cari..."
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Cari
                    </button>
                  </form>
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
                      <th>Biaya</th>
                      <th>Approval</th>
                      <th>Oleh</th>
                      <th>Ebib</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.data?.map((value, index) => (
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
                        <td>
                          Rp{" "}
                          {new Intl.NumberFormat("id-ID", {
                            currency: "IDR",
                          }).format(parseInt(value.amount))}
                        </td>
                        <td>{value.verified ? "Sudah" : "Belum"}</td>
                        <td>{value.admin?.name}</td>
                        <td>
                          {value.participant_details?.map((value) => (
                            <a
                              href={`https://www.strava.com/athletes/${value.athlete_id}`}
                              target="_blank"
                            >
                              {`${value.ebib}-${value.athlete_id})$`}
                            </a>
                          ))}
                        </td>
                        <td>{value.created_at}</td>
                        <td>
                          {value.updated_at !== value.created_at
                            ? value.updated_at
                            : "-"}
                        </td>
                        <td>
                          {!value.payment_proof ? (
                            <button
                              type="button"
                              className="btn btn-default mr-1"
                              data-toggle="modal"
                              data-target="#modal-default"
                              onClick={() =>
                                setPaymentProof(value.payment_proof)
                              }
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-success mr-1"
                              data-toggle="modal"
                              data-target="#modal-default"
                              onClick={() =>
                                setPaymentProof(value.payment_proof)
                              }
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          )}
                          {!value.participant_details?.length ? (
                            <button
                              type="submit"
                              className="btn btn-default"
                              onClick={() => handleApprove(value.id)}
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-default"
                              onClick={() => handleApprove(value.id)}
                            >
                              Send Mail
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Total : {participants?.total}</div>
              <div>
                {participants?.links?.map((value, index) =>
                  value.active ? (
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        dispatch(
                          getParticipants(
                            type,
                            verified,
                            search,
                            value.url.split("=")[1]
                          )
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
                          getParticipants(
                            type,
                            verified,
                            search,
                            value.url.split("=")[1]
                          )
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

      <div class="modal fade" id="modal-default">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Bukti Pembayaran</h4>
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
              {(() => {
                if (paymentProof?.split("/")[0] === "data:image") {
                  return (
                    <img
                      src={`${paymentProof}`}
                      className="img-fluid img-thumbnail"
                    />
                  );
                } else if (paymentProof?.split("/")[0] === "data:application") {
                  return <iframe src={`${paymentProof}`} />;
                } else {
                  return null;
                }
              })()}
            </div>
            <div class="modal-footer justify-content-between">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Participant;
