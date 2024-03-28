import express from "express";
import cors from 'cors'
import { getPatients, getPatient, postPatient, putPatient, deletePatient} from './database.js'

const app = express();

app.use(cors()); 
app.use(express.json());

app.get('/patients', async (req, res) => {
    const data = await getPatients();
    res.send(data);
})

app.get('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const data = await getPatient(id);
    if(!data) return res.status(404).send(`Patient with id ${id} was not found`);
    res.send(data);
})

app.post('/patients', async (req, res) => {
    const patient = req.body;
    const data = await postPatient(patient);

    res.send(data);
})

app.put('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const data = await getPatient(id);
    if(!data) return res.status(404).send(`Patient with id ${id} was not found`);
    
    const patient = req.body;
    console.log(patient);
    putPatient(patient);
})

app.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const data = await deletePatient(id);
    if(!data) return res.status(404).send(`Patient with id ${id} was not found`);
    res.send(data);
})

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`listen in port ${port}...`);
})