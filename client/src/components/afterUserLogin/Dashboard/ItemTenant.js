import { useState, useEffect } from "react";
import Trash from "../../../assets/AfterUserLogin/Trash.svg";
import PencilLine from "../../../assets/AfterUserLogin/PencilLine.svg";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import {
  updateUser,
  isAuth,
  getCookie,
  signout,
  updateUserImageProfile,
} from "../../../helpers/auth";

export default function ItemTenant(props, test) {
  useEffect(() => {}, []);
  const [deleted, setDeleted] = useState(false);
  console.log(props.itemData.pemasukan);

  const handleOpenWarning = (e) => {
    setDeleted(!deleted);
  };
  const handleDelete = (e) => {
    const token = getCookie("token");

    console.log(isAuth());
    console.log(token);

    const title = props.itemData.title;
    const label = props.itemData.label;
    const kategori = props.itemData.kategori;
    const pemasukan = props.itemData.pemasukan;
    const pengeluaran = props.itemData.pengeluaran;
    const tabungan = props.itemData.tabungan;
    const deskripsi = props.itemData.deskripsi;
    const _id = props.itemData._id;

    // setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/deletepost/${isAuth()._id}`,
        {
          title,
          label,
          kategori,
          pemasukan,
          deskripsi,
          pengeluaran,
          tabungan,
          _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Transaksi berhasil dihapus");
        console.log(res);
        window.location.reload();
        toast.success("Transaksi berhasil dihapus");
      })
      .catch((err) => {
        // setFormData({
        //   ...formData,
        //   institusi: "",
        //   password1: "",
        //   password2: "",
        // });
      });
  };
  const [src, setSrc] = useState(
    `/data/tenant/${props.itemData.id_tenant}/${props.itemData.tenantLogo}`
  );
  console.log(src);
  console.log(props.pemasukan);
  // console.log(itemData);
  return (
    <>
      {deleted ? (
        <>
          <div className="fixed z-[1000] font-Roboto font-normal inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="md:w-1/2 w-[75%] h-[60%] lg:h-1/2 flex justify-center items-center">
              <div className="w-3/4 rounded-md bg-white px-5 flex flex-col justify-center items-center h-1/2">
                <div className="text-black mb-5">
                  Are you sure you want to delete this transaction?
                </div>
                <div className="flex w-[70%] items-center justify-between">
                  <button
                    onClick={handleOpenWarning}
                    className="bg-[#D9D9D9] hover:bg-gray-400 text-black mt-4 mr-4 w-1/3 py-1 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-[#319C69] hover:bg-green-800 text-white mt-4 w-1/3 py-1 rounded"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div
        className={
          props.itemData.label === "income"
            ? "grid font-medium xs:font-bold bg-white border-green-400 rounded-md px-2 items-center border-2 w-full grid-cols-4 md:grid-cols-5 sm:grid-cols-5 justify-between text-xs sm:text-base xm:text-sm m-2"
            : "grid font-medium xs:font-bold bg-white border-red-400 rounded-md px-2 items-center border-2 w-full grid-cols-4 md:grid-cols-5 sm:grid-cols-5 justify-between text-xs sm:text-base xm:text-sm m-2"
        }
      >
        <div className="text-center">{props.itemData.instansi}</div>
        {/* <div className="flex capitalize items-center text-center justify-center">
          Rp {props.itemData.pengeluaran}
        </div> */}
        <div className="text-red-400 text-center">
          -Rp. {props.itemData.pengeluaran}
        </div>

        <div className="text-green-500 text-center">
          +Rp. {props.itemData.pemasukan}
        </div>

        <div className="hidden md:block text-center">
          {props.itemData.deskripsi}
        </div>
        <div className=" flex justify-center items-center gap-5 flex-row">
          {props.itemData.createdAt}
        </div>
      </div>
    </>
  );
}
