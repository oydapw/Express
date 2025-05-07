const { v4: uuidv4 } = require('uuid');
const { readWorkers, writeWorkers } = require('../db/db');

async function getAllWorkers() {
  return await readWorkers();
}

async function getWorkerById(id) {
  const workers = await readWorkers();
  const worker = workers.find(worker => worker.id === id);
  if (!worker) throw new Error('Рабочий не найден');
  return worker;
}

async function createWorker(workerData) {
  const workers = await readWorkers();
  const newWorker = {
    id: uuidv4(),
    name: workerData.name,
    experienceYears: workerData.experienceYears,
    isActive: workerData.isActive,
    hireDate: workerData.hireDate,
    skills: workerData.skills
  };
  workers.push(newWorker);
  await writeWorkers(workers);
  return newWorker;
}

async function updateWorker(id, workerData) {
  const workers = await readWorkers();
  const index = workers.findIndex(worker => worker.id === id);
  if (index === -1) throw new Error('Рабочий не найден');
  workers[index] = { ...workers[index], ...workerData, id };
  await writeWorkers(workers);
  return workers[index];
}

async function patchWorker(id, workerData) {
  const workers = await readWorkers();
  const index = workers.findIndex(worker => worker.id === id);
  if (index === -1) throw new Error('Рабочий не найден');
  workers[index] = { ...workers[index], ...workerData, id };
  await writeWorkers(workers);
  return workers[index];
}

async function deleteWorker(id) {
  const workers = await readWorkers();
  const index = workers.findIndex(worker => worker.id === id);
  if (index === -1) throw new Error('Рабочий не найден');
  const deletedWorker = workers.splice(index, 1)[0];
  await writeWorkers(workers);
  return deletedWorker;
}

module.exports = { getAllWorkers, getWorkerById, createWorker, updateWorker, patchWorker, deleteWorker };