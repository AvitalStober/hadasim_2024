
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function UpdatePatient({ closeModal, covidInfo }) {

    const [formData, setFormData] = useState({
        Name: '',
        Id: '',
        City: '',
        Street: '',
        StreetNumber: '',
        DateOfBirth: '',
        Phone: '',
        MobilePhone: '',
        Picture: '',
        Vaccination1Date: '',
        CompanyV1: '',
        Vaccination2Date: '',
        CompanyV2: '',
        Vaccination3Date: '',
        CompanyV3: '',
        Vaccination4Date: '',
        CompanyV4: '',
        PositiveResultDate: '',
        RecoveryDate: ''
    });

    // Creating one object with all the patient's data
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const mergedObject = Object.assign({}, covidInfo[0], covidInfo[1]);
                setFormData(mergedObject);
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update patient data',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }
        };
        fetchPatientData();
    }, [covidInfo]);

    // Sending an update to the server
    const handleUpdatePatient = async () => {
        await axios.put(`http://localhost:3000/patients/${covidInfo}`, formData)
        .then(() => {
            closeModal();
        }).catch(() => {
            Swal.fire({
                title: 'Error',
                text: 'Failed to update patient data',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleUpdatePatient();
        closeModal();
    };

    return (
        <>

            {formData && <form onSubmit={handleSubmit}>

                <label>
                    Name:<br />
                    <input type="text" name="Name" value={formData.Name || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Id:<br />
                    <input type="text" name="Id" value={formData.Id} onChange={handleChange} />
                </label>
                <br />
                <label>
                    City:<br />
                    <input type="text" name="City" value={formData.City || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Street:<br />
                    <input type="text" name="Street" value={formData.Street || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Street Number:<br />
                    <input type="text" name="StreetNumber" value={formData.StreetNumber || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Date of Birth:<br />
                    <input type="text" name="DateOfBirth" value={formData.DateOfBirth || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Phone:<br />
                    <input type="text" name="Phone" value={formData.Phone || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Mobile Phone:<br />
                    <input type="text" name="MobilePhone" value={formData.MobilePhone || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Vaccination 1 Date:<br />
                    <input type="text" name="Vaccination1Date" value={formData.Vaccination1Date || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Company vaccination 1:<br />
                    <select name="CompanyV1" value={formData.CompanyV1 || ''} onChange={handleChange}>
                        <option value="">Select Company</option>
                        <option value="Moderna">Moderna</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="BioNTech">BioNTech</option>
                    </select>
                </label>
                <br />
                <label>
                    Vaccination 2 Date:<br />
                    <input type="text" name="Vaccination2Date" value={formData.Vaccination2Date || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Company vaccination 2:<br />
                    <select name="CompanyV2" value={formData.CompanyV2 || ''} onChange={handleChange}>
                        <option value="">Select Company</option>
                        <option value="Moderna">Moderna</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="BioNTech">BioNTech</option>
                    </select>
                </label>

                <br />
                <label>
                    Vaccination 3 Date:<br />
                    <input type="text" name="Vaccination3Date" value={formData.Vaccination3Date || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Company vaccination 3:<br />
                    <select name="CompanyV3" value={formData.CompanyV3 || ''} onChange={handleChange}>
                        <option value="">Select Company</option>
                        <option value="Moderna">Moderna</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="BioNTech">BioNTech</option>
                    </select>
                </label>
                <br />
                <label>
                    Vaccination 4 Date:<br />
                    <input type="text" name="Vaccination4Date" value={formData.Vaccination4Date || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Company vaccination 4:<br />
                    <select name="CompanyV4" value={formData.CompanyV4 || ''} onChange={handleChange}>
                        <option value="">Select Company</option>
                        <option value="Moderna">Moderna</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="BioNTech">BioNTech</option>
                    </select>
                </label>
                <br />
                <label>
                    Positive Result Date:<br />
                    <input type="text" name="PositiveResultDate" value={formData.PositiveResultDate || ''} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Recovery Date:<br />
                    <input type="text" name="RecoveryDate" value={formData.RecoveryDate || ''} onChange={handleChange} />
                </label>
                <button type="submit">Update</button>
                <button onClick={closeModal}>Close</button>
            </form>}
        </>
    );
}

export default UpdatePatient;

