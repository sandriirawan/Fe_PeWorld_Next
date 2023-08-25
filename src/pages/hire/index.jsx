import React from 'react';
import Footer from '@/components/footer/Footer';
import NavbarLogin from '@/components/navbarLogin/Navbar';
import styles from '@/styles/hire.module.css';

function Hire() {
  return (
    <>
      <NavbarLogin />
      <div className="container">
        <div className="row mt-5">
          <div className={`col-md-4 mb-4 card ${styles.customCard}`}>
            <div className="card-body">
              <div className={`profile ${styles.profile}`}>
                <img src="/Make Your Day.jpg" alt="Foto Profil" />
              </div>
              <div className={`dataDiri ${styles.dataDiri}`}>
                <h2 className="nama">Louis Tomlinsoon</h2>
                <h6 className="posisi">Web Developer</h6>
                <p className="address">
                  <i className="bi bi-geo-alt">Lorem ipsum </i>
                </p>
                <p className={`deskripsi ${styles.deskripsi}`}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
                  obcaecati pariatur saepe atque error dolore molestias asperiores
                  reiciendis in voluptatem! Voluptates eligendi amet exercitationem
                  accusantium voluptate blanditiis reprehenderit eaque id.
                </p>
                <div className={`wrapSkill ${styles.wrapSkill}`}>
                  <h2 className="skill">Skill</h2>
                  <button>PHP</button> <button>JavaScript</button>
                  <button>HTML</button> <button>PHP</button>
                  <button>JavaScript</button> <button>HTML</button>
                  <button>PHP</button> <button>JavaScript</button>
                  <button>HTML</button>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-md-6 mb-4 ${styles.cardHire}`}>
            <div className={` ${styles.cardHire}`}>
              <div className={`title ${styles.title}`}>
                <h1>Hubungi Lous Tomlinson</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
                  ipsum et dui rhoncus auctor.
                </p>
              </div>
              <form className="form-hire m-5">
                <div className="form-group">
                  <label htmlFor="tujuan">Tujuan Pesan</label>
                  <select className={`form-control ${styles.formControl}`} id="tujuan">
                    <option value="pesan_umum">Pesan Umum</option>
                    <option value="pesan_khusus">Pesan Khusus</option>
                    <option value="pesan_pengaduan">Pesan Pengaduan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="namaLengkap">Nama Lengkap</label>
                  <input
                    type="text"
                    className={`form-control ${styles.formControl}`}
                    id="namaLengkap"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className={`form-control ${styles.formControl}`}
                    id="email"
                    placeholder="Masukkan email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="noHandphone">No Handphone</label>
                  <input
                    type="text"
                    className={`form-control ${styles.formControl}`}
                    id="noHandphone"
                    placeholder="Masukkan no handphone"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="deskripsi">Deskripsi</label>
                  <textarea
                    className={`form-control ${styles.formControl}`}
                    id="deskripsi"
                    rows={4}
                    placeholder="Masukkan deskripsi pesan"
                    defaultValue={""}
                  />
                </div>
                <button type="submit" className={`btn ${styles.btnHire}`}>
                  Hire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Hire;
