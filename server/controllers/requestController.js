const { Request, Equipment, User } = require('../models');

const getAllRequests = async (req, res, next) => {
  try {
    const requests = await Request.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Equipment, as: 'equipment' },
      ],
      order: [['request_date', 'DESC']],
    });

    res.json(requests);
  } catch (error) {
    next(error);
  }
};

const getUserRequests = async (req, res, next) => {
  try {
    const requests = await Request.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: Equipment, as: 'equipment' },
      ],
      order: [['request_date', 'DESC']],
    });

    res.json(requests);
  } catch (error) {
    next(error);
  }
};

const createRequest = async (req, res, next) => {
  try {
    const { equipment_id } = req.body;

    const equipment = await Equipment.findByPk(equipment_id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    if (equipment.status !== 'available') {
      return res.status(400).json({ message: 'Equipment is not available' });
    }

    const existingRequest = await Request.findOne({
      where: {
        user_id: req.user.id,
        equipment_id,
        status: ['Pending', 'Approved'],
      },
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending or approved request for this equipment' });
    }

    const request = await Request.create({
      user_id: req.user.id,
      equipment_id,
    });

    const populatedRequest = await Request.findByPk(request.id, {
      include: [
        { model: Equipment, as: 'equipment' },
      ],
    });

    res.status(201).json({
      message: 'Request created successfully',
      request: populatedRequest,
    });
  } catch (error) {
    next(error);
  }
};

const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const request = await Request.findByPk(id, {
      include: [{ model: Equipment, as: 'equipment' }],
    });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    await request.update({ status });

    if (status === 'Approved') {
      await request.equipment.update({ status: 'unavailable' });
    } else if (status === 'Rejected') {
      await request.equipment.update({ status: 'available' });
    }

    const updatedRequest = await Request.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Equipment, as: 'equipment' },
      ],
    });

    res.json({
      message: `Request ${status.toLowerCase()} successfully`,
      request: updatedRequest,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRequests,
  getUserRequests,
  createRequest,
  updateRequestStatus,
};
