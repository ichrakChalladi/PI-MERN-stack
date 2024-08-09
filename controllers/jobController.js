const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  const { title, description, company, location } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      company,
      location
    });

    const job = await newJob.save();

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: 'Job not found' });

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateJob = async (req, res) => {
  const { title, description, company, location } = req.body;

  const jobFields = { title, description, company, location };

  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: 'Job not found' });

    job = await Job.findByIdAndUpdate(req.params.id, { $set: jobFields }, { new: true });

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: 'Job not found' });

    await Job.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
