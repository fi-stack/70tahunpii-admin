import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { approveParticipant, getParticipants } from "../../redux/action";

const Participant = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParticipants());
  }, [dispatch]);

  const navigate = useNavigate();

  const { participants } = useSelector((state) => state.participants);

  const [paymentProof, setPaymentProof] = useState("");
  console.log(paymentProof);

  const handleApprove = (id) => {
    approveParticipant(id)
      .then((res) => {
        toast.success(res.message);
        navigate("/participant");
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
                    {/* <input
                    type="text"
                    className="form-control float-right"
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearch(e.target.value);
                      dispatch(getParticipantDetails(e.target.value));
                    }}
                  /> */}
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
                      <th>User</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Verified</th>
                      <th>Admin</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants?.map((value, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.user?.name}</td>
                        <td>{value.type}</td>
                        <td>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(parseInt(value.amount))}
                        </td>
                        <td>{value.verified ? "true" : "false"}</td>
                        <td>{value.admin?.name}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-default mr-1"
                            data-toggle="modal"
                            data-target="#modal-default"
                            onClick={() => setPaymentProof(value.payment_proof)}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            type="submit"
                            className="btn btn-default"
                            onClick={() => handleApprove(value.id)}
                          >
                            Approve
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
              <img
                src={`${paymentProof}`}
                className="img-fluid img-thumbnail"
              />
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
