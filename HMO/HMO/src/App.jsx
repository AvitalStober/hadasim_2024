
import { useState, useEffect } from 'react';
import NewPatient from './NewPatient';
import UpdatePatient from './UpdatePatient';
import axios from 'axios';
import Modal from 'react-modal';
import './App.css';
import Swal from 'sweetalert2';
Modal.setAppElement('#root');

function App() {
  const [patients, setPatients] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [covidInfo, setCovidInfo] = useState([]);
  const [show, setShow] = useState(false);
  const [updatePatient, setUpdatePatient] = useState(false);

  //open page to add or update
  const openModal = () => {
    setModalIsOpen(true);
  };
  //close page to add or update
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    //get all the patients
    axios.get('http://localhost:3000/patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        Swal.fire({
          text: 'Failed to fetch patients: ' + error.message,
          icon: 'error',
          confirmButtonText: 'Close'
        });
      });
  }, [patients]);

  //delete function
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/patients/${id}`)
      .then(() => {
        const updated = patients.filter(patient => patient.Id !== id);
        setPatients(updated);
        setShow(false);
      })
      .catch((error) =>
        Swal.fire({
          text: 'Failed to delete patients: ' + error.message,
          icon: 'error',
          confirmButtonText: 'Close'
        }));
  };

  //get one patient by id
  const handleGet = async (id) => {
    await axios.get(`http://localhost:3000/patients/${id}`)
      .then((response) => {
        setCovidInfo(response.data);
        setShow(true);
      })
      .catch((error) =>
        Swal.fire({
          text: 'Failed to get patient: ' + error.message,
          icon: 'error',
          confirmButtonText: 'Close'
        }));
  };

  //send to add or update page
  const handleAddUpdate = (array) => {
    if (array[0]) {
      setUpdatePatient(true);
    } else {
      setUpdatePatient(false)
    }
    openModal();
  };

  //present only the basic details
  const handleHideInfo = () => {
    setShow(false);
    setCovidInfo([]);
  }

  return (
    <>
      <h1>HMO</h1>

      {/* open add or update page */}
      <div>
        <button onClick={() => handleAddUpdate([])}>Add new patient</button>
        <Modal isOpen={modalIsOpen}>
          {!updatePatient ? <NewPatient closeModal={closeModal} /> :
            <UpdatePatient closeModal={closeModal} covidInfo={covidInfo} />}
        </Modal>
      </div>
      {/* presenting all the patients */}
      {patients.map((patient, index) => (
        <div key={index}>
          <h3>{index + 1}.</h3>
          <p>ID: {patient.Id}</p>
          <p>Name: {patient.Name}</p>
          <p>Address: {patient.City}, {patient.Street}, {patient.StreetNumber}</p>
          <p>Birthday: {patient.DateOfBirth}</p>
          <p>Phone number: {patient.Phone}</p>
          <p>Mobile phone: {patient.MobilePhone}</p>

          {/* Shows more data about a specific patient */}
          {show && patient.Id == covidInfo[0].Id && covidInfo[1] && (
            <div>
              {(covidInfo[1].Vaccination1Date != null) && (
                <div>
                  <h4>first vaccination</h4>
                  <p>date: {covidInfo[1].Vaccination1Date}</p>
                  <p>company: {covidInfo[1].CompanyV1}</p>
                </div>
              )}
              {(covidInfo[1].Vaccination2Date != null) && (
                <div>
                  <h4>second vaccination</h4>
                  <p>date: {covidInfo[1].Vaccination2Date}</p>
                  <p>company: {covidInfo[1].CompanyV2}</p>
                </div>
              )}
              {(covidInfo[1].Vaccination3Date != null) && (
                <div>
                  <h4>third vaccination</h4>
                  <p>date: {covidInfo[1].Vaccination3Date}</p>
                  <p>company: {covidInfo[1].CompanyV3}</p>
                </div>
              )}
              {(covidInfo[1].Vaccination4Date != null) && (
                <div>
                  <h4>fourth vaccination</h4>
                  <p>date: {covidInfo[1].Vaccination4Date}</p>
                  <p>company: {covidInfo[1].CompanyV4}</p>
                </div>
              )}

            </div>)}

          {(show) && patient.Id == covidInfo[0].Id && (<div>
            <button onClick={() => handleHideInfo()}>Hide information</button>
            <button onClick={() => handleDelete(patient.Id)}>Delete patient</button>
            <button onClick={() => handleAddUpdate([covidInfo[0], covidInfo[1]])}>Update patient</button>
          </div>)}

          {!show && <button onClick={() => handleGet(patient.Id)}>Show information</button>}

        </div>
      ))}

    </>
  );



}
export default App;

