import mysql from 'mysql2'

const pool = mysql.createPool({
    host: "127.0.0.1",
    password: "9095774",
    user: "root",
    database: "patients"
}).promise();

export async function getPatients() {
    const [patients] = await pool.query('select * from details_tbl');
    return patients;
}

export async function getPatient(id) {
    const [[patient]] = await pool.query(`select * from details_tbl where id= ?`, [id]);
    const covid19 = await getCovidData(id);
    const info = [patient, covid19];
    console.log(patient + "  " + covid19);
    return info;
}

export async function postPatient(patient) {
    console.log(" " + patient);
    await pool.query(`insert into details_tbl(Name, Id, City, Street, StreetNumber, DateOfBirth, Phone, MobilePhone, Picture) values(?,?,?,?,?,?,?,?,?) `,
        [patient.Name, patient.Id, patient.City ? patient.City : null, patient.Street = null, patient.StreetNumber ? patient.StreetNumber : null, patient.DateOfBirth ? patient.DateOfBirth : null, patient.Phone ? patient.Phone : null, patient.MobilePhone ? patient.MobilePhone : null, patient.Picture = null]);

    postCovidData(patient.Id, patient.Vaccination1Date ? patient.Vaccination1Date : null, patient.CompanyV1 ? patient.CompanyV1 : null, patient.Vaccination2Date ? patient.Vaccination2Date : null, patient.CompanyV2 ? patient.CompanyV2 : null, patient.Vaccination3Date ? patient.Vaccination3Date : null, patient.CompanyV3 ? patient.CompanyV3 : null, patient.Vaccination4Date ? patient.Vaccination4Date : null, patient.CompanyV4 ? patient.CompanyV4 : null, patient.PositiveResultDate ? patient.PositiveResultDate : null, patient.RecoveryDate ? patient.RecoveryDate : null);

    return await getPatients();
}

export async function putPatient(patient) {
    await pool.query(
        `UPDATE details_tbl SET Name = ?, City = ?, Street = ?, StreetNumber = ?, DateOfBirth = ?, Phone = ?, MobilePhone = ?, Picture = ? WHERE Id = ?`,
        [
            patient.Name ? patient.Name : null,
            patient.City ? patient.City : null,
            patient.Street ? patient.Street : null,
            patient.StreetNumber ? patient.StreetNumber : null,
            patient.DateOfBirth ? patient.DateOfBirth : null,
            patient.Phone ? patient.Phone : null,
            patient.MobilePhone ? patient.MobilePhone : null,
            patient.Picture ? patient.Picture : null,
            patient.Id
        ]
    );

    console.log("now we put " + patient.City);
    putCovidData(patient.Id,
        patient.Vaccination1Date ? patient.Vaccination1Date : null,
        patient.CompanyV1 ? patient.CompanyV1 : null,
        patient.Vaccination2Date ? patient.Vaccination2Date : null,
        patient.CompanyV2 ? patient.CompanyV2 : null,
        patient.Vaccination3Date ? patient.Vaccination3Date : null,
        patient.CompanyV3 ? patient.CompanyV3 : null,
        patient.Vaccination4Date ? patient.Vaccination4Date : null,
        patient.CompanyV4 ? patient.CompanyV4 : null,
        patient.PositiveResultDate ? patient.PositiveResultDate : null,
        patient.RecoveryDate ? patient.RecoveryDate : null
    );

    return await getPatient(patient.Id);
}


export async function deletePatient(id) {
    await deleteCovidData(id);
    await pool.query(`delete from details_tbl where Id= ?`, [id]);
    return await getPatients();
}


async function getCovidData(userId) {
    const [[userVaccination]] = await pool.query(`select * from covid19_tbl where IdPatient= ?`, [userId]);
    console.log(userVaccination);
    return userVaccination;
}

async function postCovidData(userId, Vaccination1Date, CompanyV1, Vaccination2Date, CompanyV2, Vaccination3Date, CompanyV3, Vaccination4Date, CompanyV4, PositiveResultDate, RecoveryDate) {
    await pool.query(`insert into covid19_tbl(IdPatient, Vaccination1Date, CompanyV1, Vaccination2Date, CompanyV2, Vaccination3Date, CompanyV3, Vaccination4Date, CompanyV4, PositiveResultDate, RecoveryDate) values(?,?,?,?,?,?,?,?,?,?,?) `,
        [userId, Vaccination1Date, CompanyV1, Vaccination2Date, CompanyV2, Vaccination3Date, CompanyV3, Vaccination4Date, CompanyV4, PositiveResultDate, RecoveryDate]);
    console.log(`created covid data ${userId}`);
}

async function putCovidData(userId, Vaccination1Date, CompanyIdV1, Vaccination2Date, CompanyIdV2, Vaccination3Date, CompanyIdV3, Vaccination4Date, CompanyIdV4, PositiveResultDate, RecoveryDate) {
    const update = await pool.query(`UPDATE covid19_tbl  SET Vaccination1Date = ?, CompanyV1 = ?, Vaccination2Date = ?, CompanyV2 = ?, Vaccination3Date = ?, CompanyV3 = ?, Vaccination4Date = ?, CompanyV4 = ?, PositiveResultDate = ?, RecoveryDate = ? WHERE IdPatient = ?`,
        [Vaccination1Date, CompanyIdV1, Vaccination2Date, CompanyIdV2, Vaccination3Date, CompanyIdV3, Vaccination4Date, CompanyIdV4, PositiveResultDate, RecoveryDate, userId]);
    console.log('updated covid');
    return update;
}

async function deleteCovidData(userId) {
    await pool.query(`delete from covid19_tbl where IdPatient= ?`, [userId]);
    console.log('deleted covid')
}


