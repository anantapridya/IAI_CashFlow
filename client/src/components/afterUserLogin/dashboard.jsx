import React, { useState, useEffect } from "react";
import MapTenant from "./Dashboard/mapTenant";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../src/helpers/auth";
import { useNavigate } from "react-router-dom";
import UserCircle from "../../assets/UserCircle.svg";
import PlusCircle from "../../assets/PlusCircle.svg";
import CheckCircle from "../../assets/CheckCircle (1).png";
import Navbar from "./navbar";
import BarData from "../chart/page/BarData";
import AddTransaction from "../afterUserLogin/addtransaction.jsx";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  console.log(today);
  const Navigate = useNavigate();

  const tittle = "Loading";
  const [dataTransaksi, setData] = useState([]);
  const [startBalance, setStartingBalance] = useState(false);
  const [isRendered, setRendered] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = React.useState(false);
  const [formData, setFormData] = useState({
    nama_rumah_sakit: "",
    saldo: "",
    pemasukan: "",
    pengeluaran: "",
  });
  const [dataHospital, setDataHospital] = useState({
    loading: false,
    data: null,
  });
  const [newUser, setNewUser] = useState({
    photo: "",
  });
  const handleOnClose = () => {
    setShowAddTransaction(false);
  };
  const { initialValue, isHavingInit } = formData;
  // console.log(formData);
  useEffect(() => {
    setTimeout(() => {
      setRendered(true);
    }, 1000);
    getHospital({
      loading: true,
      data: null,
    });
    loadProfile();
    loadPost();
    // getUsers();
    // console.log("cek");
    // console.log(formData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getHospital = () => {
    axios.get(`http://localhost:5000/api/hospital/read`).then((res) =>
      setDataHospital({
        loading: false,
        data: res.data,
        // const data = res.data;
        // console.log("cekdata");
        // console.log(data);
        // setDataHospital(data);
        // console.log(dataHospital);
      })
    );
  };

  const [users, setUser] = useState("");

  useEffect(() => {
    // getUsers();
    // hospital();
  }, []);

  // async function hospital() {
  //   const response = await fetch("http://localhost:5000/api/hospital/read");
  //   console.log(response);
  // }

  // const getUsers = async () => {
  //   const response = await axios.get("http://localhost:5000/api/hospital/read");
  //   setUser(response.data);
  //   console.log(users);
  // };

  const loadProfile = () => {
    const token = getCookie("token"); //mengambil token yang disimpan di dalam cookie
    axios
      .get(`${process.env.REACT_APP_API_URL}/hospital/read`, {
        headers: {
          // masih bingung gunanya headers ?
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { nama_rumah_sakit, saldo, pengeluaran, pemasukan } = res.data;
        setFormData({
          ...formData,
          nama_rumah_sakit,
          saldo,
          pemasukan,
          pengeluaran,
        });
      })
      .catch((err) => {
        // toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            Navigate("/login");
          });
        }
      });
  };
  // console.log(formData);
  const loadPost = () => {
    const token = getCookie("token"); //mengambil token yang disimpan di dalam cookie
    axios
      .get(`${process.env.REACT_APP_API_URL}/transaction/read`, {
        headers: {
          // masih bingung gunanya headers ?
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setData(res.data);
        // console.log(dataTransaksi);

        console.log("test iin adalah useEffect");
      })
      .catch((err) => {
        // toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            Navigate("/login");
          });
        }
      });
  };
  const AddInitalValue = () => {
    const token = getCookie("token"); //mengambil token yang disimpan di dalam cookie
    if (initialValue < 0) {
      return toast.error("Nominal harus lebih dari sama dengan 0");
    }
    const isHavingInit = true;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/addinitial/${isAuth()._id}`,
        {
          initialValue,
          isHavingInit,
        },
        {
          headers: {
            // masih bingung gunanya headers ?
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data;
      })
      .catch((err) => {
        // toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            Navigate("/login");
          });
        }
      });
  };
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const { name, email, textChange, pemasukan, pengeluaran, tabungan } =
    formData;

  let saldoRS = null;
  if (dataHospital.data) {
    saldoRS = dataHospital.data.hospital.saldo;
  } else {
    saldoRS = "......";
  }
  let pemasukanRS = null;
  if (dataHospital.data) {
    pemasukanRS = dataHospital.data.hospital.pemasukan;
  } else {
    pemasukanRS = "......";
  }
  let pengeluaranRS = null;
  if (dataHospital.data) {
    pengeluaranRS = dataHospital.data.hospital.pengeluaran;
  } else {
    pengeluaranRS = "......";
  }
  return (
    <div className="font-Roboto">
      <Navbar />

      <div className="h-screen bg-[#F3F3F3] flex-none md:flex font-Roboto pt-24 md:pt-32 px-5 md:px-16 pb-10 text-sm xm:text-lg md:text-xl">
        <div className="text-black font-black w-[100%] md:w-2/3 pr-0 md:pr-5">
          <ToastContainer />
          <div className="bg-white h-40 md:h-[15%] rounded-lg flex justify-between px-5 w-full items-center md:items-start md:pt-5">
            <div className="xs:gap-8 md:gap-0 flex-none xm:flex justify-between pl-5 pr-10 md:pr-24 w-full">
              <div className="xs:ml-4 items-center w-fit">
                Your Money
                <div className="font-medium h-3/5 place-items-start flex items-center">
                  {/* <div>Rp {dataHospital.hospital.saldo}</div> */}
                  <div>Rp {saldoRS}</div>
                </div>
              </div>
              <div className="">
                Total Expense
                <div className="font-medium grid h-3/5 place-items-start items-center xs:text-xl ">
                  {/* Rp {dataHospital.hospital.pengeluaran} */}
                  <div>Rp {pengeluaranRS}</div>
                </div>
              </div>
              <div className="">
                Total Income
                <div className="font-medium grid h-3/5  place-items-start items-center  xm:text-xl ">
                  {/* Rp {dataHospital.hospital.pemasukan} */}
                  <div>Rp {pemasukanRS}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 bg-white flex flex-col h-[83%] rounded-lg">
            <div className="mx-8 mt-12 justify-between flex items-center pb-5">
              <p>Transactions</p>
              <button
                className=" bg-[#319C69] place-items-start rounded-md px-2 py-1 items-center text-white hover:text-[#263238] flex font-normal text-sm xm:text-base"
                onClick={() => {
                  setShowAddTransaction(true);
                }}
              >
                <img
                  className="mr-1 hidden xm:flex"
                  src={PlusCircle}
                  alt="PlusCircle"
                />
                <div className="hidden xm:flex">Add Inventory Cash</div>
                <div className="flex xm:hidden font-medium px-1">Add New</div>
              </button>
              {isHavingInit ? (
                <>
                  {" "}
                  <NavLink to="/transactions">
                    <button className=" bg-[#319C69] place-items-start rounded-md px-2 py-1 items-center text-white hover:text-[#263238] flex font-normal text-sm xm:text-base">
                      <img
                        className="mr-1 hidden xm:flex"
                        src={PlusCircle}
                        alt="PlusCircle"
                      />
                      <div className="hidden xm:flex">New Transaction</div>
                      <div className="flex xm:hidden font-medium px-1">
                        Add New
                      </div>
                    </button>
                  </NavLink>
                </>
              ) : (
                <></>
              )}
            </div>
            <MapTenant tenantList={dataTransaksi} />
          </div>
        </div>
        <div className=" text-black font-black bg-white md:h-[100%] md:w-1/3 rounded-lg w-[100%]">
          <div className="pl-10 pt-5 md:pt-0 mt-5 ">Statistics</div>
          <div className="flex w-[95%] h-4/5 justify-center items-center font-extralight text-base pl-5 scale-90 md:scale-100 px-10 md:px-10">
            {isRendered ? (
              <>
                {" "}
                <BarData pemasukan={pemasukan} pengeluaran={pengeluaran} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <AddTransaction onClose={handleOnClose} visible={showAddTransaction} />
    </div>
  );
};

export default Dashboard;
