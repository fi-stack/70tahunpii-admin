import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  destroyParticipantExpired,
  getParticipantsExpired,
} from "../../redux/action";

const ParticipantExpired = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParticipantsExpired());
  }, [dispatch]);

  const { participants_expired } = useSelector(
    (state) => state.participantsExpired
  );

  const handleDestroy = (id) => {
    destroyParticipantExpired(id)
      .then((res) => {
        toast.success(res.message);
        dispatch(getParticipantsExpired());
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Peserta Expired</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Index</a>
                  </li>
                  <li className="breadcrumb-item active">Peserta Expired</li>
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
                  <div className="input-group"></div>
                </div>
              </div>
              <div className="card-body table-responsive p-0">
                <table className="table table-head-fixed text-nowrap">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Tanggal Registrasi</th>
                      <th>Nama</th>
                      <th>Kategori</th>
                      <th>Telp / Wa</th>
                      <th>Tipe</th>
                      <th>Biaya</th>
                      <th>Approval</th>
                      <th>Oleh</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants_expired?.map((value, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.created_at}</td>
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
                        <td>{value.created_at}</td>
                        <td>
                          {value.updated_at !== value.created_at
                            ? value.updated_at
                            : "-"}
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDestroy(value.id);
                            }}
                          >
                            Hapus
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
    </>
  );
};

export default ParticipantExpired;
