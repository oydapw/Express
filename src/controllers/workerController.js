const workerService = require('../services/workerService');

async function getAllWorkers(req, res) {
  try {
    const workers = await workerService.getAllWorkers();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getWorkerById(req, res) {
  try {
    const worker = await workerService.getWorkerById(req.params.id);
    res.status(200).json(worker);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function createWorker(req, res) {
  try {
    const workerData = req.body;
    if (!workerData.name || !workerData.experienceYears || workerData.isActive === undefined || !workerData.hireDate || !workerData.skills) {
      return res.status(400).json({ error: 'Отсутствуют обязательные поля' });
    }
    const newWorker = await workerService.createWorker(workerData);
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateWorker(req, res) {
  try {
    const workerData = req.body;
    if (!workerData.name || !workerData.experienceYears || workerData.isActive === undefined || !workerData.hireDate || !workerData.skills) {
      return res.status(400).json({ error: 'Отсутствуют обязательные поля' });
    }
    const updatedWorker = await workerService.updateWorker(req.params.id, workerData);
    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function patchWorker(req, res) {
  try {
    const workerData = req.body;
    const updatedWorker = await workerService.patchWorker(req.params.id, workerData);
    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function deleteWorker(req, res) {
  try {
    const deletedWorker = await workerService.deleteWorker(req.params.id);
    res.status(200).json(deletedWorker);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = { getAllWorkers, getWorkerById, createWorker, updateWorker, patchWorker, deleteWorker };