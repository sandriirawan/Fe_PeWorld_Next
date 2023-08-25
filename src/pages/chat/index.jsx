import React from 'react';
import styles from '@/styles/chat.module.css';
import NavbarLogin from '@/components/navbarLogin/Navbar';
import Footer from '@/components/footer/Footer';

function Chat() {
  return (
    <>
    <NavbarLogin/>
      <div className="container">
        <div className="row pt-5 pb-5">
          <div className="col-md-4 mb-"> 
          <div className={`card ${styles.cardChat}`}>
            <div className="card-body">
              {/* Konten untuk card sebelah kiri */}
              <h5 className={styles.cardTitle}>chat</h5>
              <div className={styles.garis} />
              <div className={styles.warpChat}>
                <img src="/Make Your Day.jpg" alt="" />
                <div className={styles.pesan}>
                  <span className={styles.nama}>Who I Am</span>
                  <span className={styles.pesanText}>apa kabar?</span>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="col-md-8 mb-4 ">
          <div className={`card ${styles.cardChat2}`}>
            <div className="card-body">
              <div className={styles.warpChat2}>
                <img src="/Make Your Day.jpg" alt="" />
                <span className={styles.nama}>Who I Am</span>
              </div>
              <div className={styles.garis2} />
              <div className="chat-content">
       
              </div>
              <div className={`form-group ${styles.formGroup}`}>
                <input
                  type="text"
                  className={`form-control ${styles.formControl}`}
                  id="inputPesan"
                  placeholder="Ketik pesan Anda di sini..."
                />
                <div className="input-icon">
                  <button className={`btn ${styles.btnSend}`}>
                    <i className="bi bi-send" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Chat;
