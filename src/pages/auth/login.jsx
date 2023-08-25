import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import swal from "sweetalert";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const oneClick = (e) => {
    e.preventDefault();

    axios
      .post(`https://be-peworld.vercel.app/users/login`, data)
      .then((result) => {
        Cookies.set("token", result.data.data.token_user);
        Cookies.set("role", result.data.data.role);
        Cookies.set("id", result.data.data.id);
        swal({
          title: "Login Success",
          text: "You clicked the button!",
          icon: "success",
          button: "OK",
        }).then(() => {
          router.push("/");
        });
      })
      .catch((err) => {
        const errorMessage =
        err.response?.data?.message || "Unknown error occurred"; 
      swal({
        title: "Login Error",
        text: errorMessage,
        icon: "error",
        button: "OK",
      });
      });
  };

  return (
    <>
      <div className={styles["half-screen-container"]}>
        <div className={styles["half-screen-image"]}>
          <div className={styles.overlay} />
          <img className={styles.icon} src="/peworld.png" alt="" />
          <h1 className={styles.title}>
            Temukan developer berbakat &amp; terbaik di berbagai bidang keahlian
          </h1>
        </div>
        <div className={styles.content}>
          <div className={styles["form-title"]}>
            <h1>Halo, Pewpeople</h1>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </h5>
          </div>
          <div className={styles.container}>
            <form>
              <div className={styles["form-group-email"]}>
                <span>Email</span>
                <input
                  name="email"
                  className="form-control"
                  placeholder="Masukan alamat email"
                  type="email"
                  onChange={onChange}
                />
              </div>
              <div className={styles["form-group-password"]}>
                <span>Kata Sandi</span>
                <input
                  name="password"
                  className="form-control"
                  placeholder="Masukan kata sandi"
                  type="password"
                  onChange={onChange}
                />
              </div>
              <div className={styles["form-group"]}>
                <h6 className="text-right py-3">Forgot password?</h6>
                <button
                  type="submit"
                  onClick={oneClick}
                  className={`${styles.btn} btn btn-block`}
                >
                  MASUK
                </button>
                <h6 className="pt-5 text-center">
                  Anda belum punya akun?
                  <Link href="/auth/register">Daftar disini</Link>
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
