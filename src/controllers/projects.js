// const express = require('express');
// const fs = require('fs');
// const router = express.Router();
// const projects = require('../data/projects.json');

import Project from '../models/Projects';

// const projects = [];

const create = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      state: req.body.state,
      employees: req.body.employees,
    });
    await project.save();
    return res.status(201).json({
      message: 'Project was created',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteById = async (req, res) => {
  const projectId = req.params.id;
  try {
    if (!projectId) {
      return res.status(400).send({
        message: 'Missing ID parameter',
        data: undefined,
        error: true,
      });
    }
    const searchProject = await Project.findByIdAndDelete(projectId);
    return res.status(204).json({
      message: 'Project was deleted',
      data: searchProject,
      error: false,
    });
  } catch (error) {
    return res.send({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await Project.findById(req.params.id);
      if (!project) {
        res.status(404).json({
          message: 'Project not found',
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: 'Project found',
        data: project,
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const put = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Id not found',
        data: undefined,
        error: true,
      });
    }
    const updateProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updateProject) {
      return res.status(404).json({
        msg: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Project updated',
      data: updateProject,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).json({
      message: 'Projects found',
      data: project,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export default {
  create,
  getAll,
  getById,
  deleteById,
  put,
};
