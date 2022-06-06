import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getParticipantsCompletedByLocation,
  getProvinces,
} from "../../redux/action";
import { exportParticipantsCompletedByLocation } from "../../redux/action/participant";

const ByLocation = () => {
  const { type } = useParams();
  const dispatch = useDispatch();

  const { provinces } = useSelector((state) => state.provinces);

  const [ktaCategory, setKtaCategory] = useState();
  const [provinceCode, setProvinceCode] = useState();
  const [provinceName, setProvinceName] = useState();
  console.log(provinceName);

  const { participants_completed_by_location } = useSelector(
    (state) => state.participantsCompletedByLocation
  );

  const search = () => {
    dispatch(
      getParticipantsCompletedByLocation(type, ktaCategory, provinceCode)
    )
      .then((res) => {})
      .catch((err) => {});
  };

  const btnExcel = () => {
    dispatch(
      exportParticipantsCompletedByLocation(type, ktaCategory, provinceCode)
    );
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Rekap Peserta</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">{type === "run" ? "Lari" : "Gowes"}</a>
                </li>
                <li className="breadcrumb-item active">Rekap Peserta</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content mb-5">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-4 mb-2">
                  <div class="form-group">
                    <select
                      className="form-control"
                      value={ktaCategory}
                      onChange={(e) => {
                        setKtaCategory(e.target.value);
                        dispatch(getProvinces());
                      }}
                    >
                      <option value="" disabled selected>
                        Pilih Kategori
                      </option>
                      <option value="a">PII Lunas</option>
                      <option value="b">PII Belum Lunas</option>
                      <option value="c">PII S.T. / Setara</option>
                      <option value="d">Umum</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <select
                      className="form-control"
                      value={provinceCode}
                      onChange={(e) => {
                        setProvinceCode(e.target.value);
                      }}
                    >
                      <option value="" disabled selected>
                        Pilih Provinsi
                      </option>
                      {provinces?.map((value, index) => (
                        <option value={value.code}>{value.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="btn btn-default mr-1"
                    onClick={() => search()}
                  >
                    Cari
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => btnExcel()}
                  >
                    <i class="fas fa-file-excel"></i>
                  </button>
                </div>
                <div className="col-md-8">
                  <table className="table">
                    {participants_completed_by_location?.total ? (
                      Object.keys(
                        participants_completed_by_location?.total
                      ).map((value, index) => (
                        <tr>
                          <td>{value}</td>
                          <td>
                            {participants_completed_by_location?.total[value]}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <td>Tidak Ada</td>
                    )}
                  </table>
                </div>
              </div>
            </div>
            <div className="card-body table-responsive p-0">
              <table className="table table-head-fixed text-nowrap">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Ebib</th>
                    <th>No. KTA</th>
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Jenis Kelamin</th>
                    <th>Tanggal Lahir</th>
                    <th>Telp / Wa</th>
                    <th>Alamat</th>
                    <th>Provinsi</th>
                    <th>Kota / Kab</th>
                    <th>Kecamatan</th>
                    <th>Desa</th>
                    <th>Kode Pos</th>
                    <th>Pekerjaan</th>
                    <th>Asal Perguruan Tinggi / Universitas</th>
                    <th>Lokasi Perguruan Tinggi / Universitas</th>
                    <th>Jurusan</th>
                    <th>Tahun Lulus</th>
                    <th>Ukuran Jersey</th>
                  </tr>
                </thead>
                <tbody>
                  {participants_completed_by_location?.participant?.length ? (
                    participants_completed_by_location?.participant?.map(
                      (value, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{value.ebib?.toUpperCase()}</td>
                          <td>{value.user?.kta_id}</td>
                          <td>{value.user?.nik}</td>
                          <td>{value.user?.name}</td>
                          <td>
                            {value.user?.gender === "male"
                              ? "Laki-Laki"
                              : "Perempuan"}
                          </td>
                          <td>{value.user?.birthday}</td>
                          <td>{value.user?.phone}</td>
                          <td>{value.user?.address}</td>
                          <td>{value.user?.province?.name}</td>
                          <td>{value.user?.city?.name}</td>
                          <td>{value.user?.district?.name}</td>
                          <td>{value.user?.village?.name}</td>
                          <td>{value.user?.post_code}</td>
                          <td>{value.user?.job}</td>
                          <td>{value.user?.college}</td>
                          <td>{value.user?.college_location?.name}</td>
                          <td>{value.user?.major}</td>
                          <td>{value.user?.graduate_at}</td>
                          <td>{value.user?.jersey_size.toUpperCase()}</td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td>Tidak Ada</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ByLocation;
