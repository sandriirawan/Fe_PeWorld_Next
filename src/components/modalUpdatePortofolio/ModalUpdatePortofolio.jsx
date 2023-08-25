import React from "react";

function ModalUpdatePortofolio() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="btn btn-warning" onClick={handleShow}>
        {children}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
          <div className="form-group">
              <label className="text-secondary" htmlFor="nama aplikasi">
                Nama aplikasi
              </label>
              <input
                type="text"
                className="form-control"
                id="nama aplikasi"
                name="nama_aplikasi"
                placeholder="Masukan nama aplikasi"
                required=""
                value={formData.nama_aplikasi}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="text-secondary" htmlFor="Link repository">
                Link repository
              </label>
              <input
                type="text"
                className="form-control"
                id="Link repository"
                name="link_repo"
                placeholder="Masukkan Link repository"
                required=""
                value={formData.link_repo}
                onChange={handleChange}
              />
            </div>
            <div className="form-check-inline">
              <div className="radio-container mr-3 ">
                <input
                  type="radio"
                  id="aplikasiMobile"
                  defaultValue="mobile"
                  name="tipe"
                  value="mobile"
                  checked={formData.tipe === "mobile"}
                  onChange={handleChange}
                />
                <label className="radio-label ml-1" htmlFor="aplikasiMobile">
                  Aplikasi Mobile
                </label>
              </div>
              <div className="radio-container">
                <input
                  type="radio"
                  id="aplikasiWeb"
                  defaultValue="web"
                  name="tipe"
                  value="web"
                  checked={formData.tipe === "web"}
                  onChange={handleChange}
                />
                <label className="radio-label ml-1" htmlFor="aplikasiWeb">
                  Aplikasi Web
                </label>
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="uploadGambar"
                className="upload-label text-secondary"
              >
                Upload Gambar
              </label>
              <div className={styles.uploadPhotoContainer}>
                <input
                  type="file"
                  id="uploadGambar"
                  accept="image/*"
                  onChange={handleFileChange}
                  name="photo"
                />
                <div className={styles.iconDownload}>
                  <i className="bi bi-cloud-arrow-up-fill" />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-warning"></button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalUpdatePortofolio;
