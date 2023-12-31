  import React, { useState, useEffect } from "react";
  import styles from "../editPekerja/editpekerja.module.css";
  import axios from "axios";
  import Cookies from "js-cookie";
  import swal from "sweetalert";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

  function Formskill() {
    const [skillInput, setSkillInput] = useState("");
    const [skills, setSkills] = useState([]);


    useEffect(() => {
      const users_id = Cookies.get("id");
      axios
        .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/skill/${users_id}`)
        .then((response) => {
          const existingSkills = response.data.data.map(
            (skill) => skill.nama_skill
          );
          if (existingSkills) {
            setSkills(existingSkills);
            setSkillInput(existingSkills.join(", "));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    const handleSkillInputChange = (event) => {
      setSkillInput(event.target.value);
    };

    const handleSkillSave = () => {
      const users_id = Cookies.get("id");
      const newSkillsArray = skillInput.split(",").map((skill) => skill.trim());
    
      axios
        .put(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/skill/${users_id}`, {
          nama_skill: newSkillsArray,
        })
        .then((response) => {
          const updatedSkills = response.data.nama_skill;
          if (updatedSkills) {
            setSkills(updatedSkills);
            setSkillInput(updatedSkills.join(", "));
          } else {
            setSkills([]);
            setSkillInput();
          }
          toast.success("Skills berhasil disimpan!");
        })
        .catch((error) => {
          toast.error("Gagal menyimpan skill.", "error");
        });
    };
    

    return (
      <>
      <ToastContainer />
        <div className="input-skill">
          <div className={`card ${styles.cardSkill}`}>
            <div className={`${styles.titleSkill}`}>
              <h3>Skill</h3>
              <div className={` ${styles.garis}`}></div>
            </div>
            <div className="form-skill mt-5 ml-4 mr-4">
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan skill"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={skillInput}
                  onChange={handleSkillInputChange}
                />
                <div className="input-group-append">
                  <button
                    className={`btn ${styles.btnSkill}`}
                    type="button"
                    id="button-addon2"
                    onClick={handleSkillSave}
                  >
                    simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default Formskill;
