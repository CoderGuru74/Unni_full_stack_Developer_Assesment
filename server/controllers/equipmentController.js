const { Equipment, Request } = require('../models');

const getAllEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findAll({
      include: [{
        model: Request,
        as: 'requests',
        where: { status: 'Approved' },
        required: false,
      }],
    });

    res.json(equipment);
  } catch (error) {
    next(error);
  }
};

const getAvailableEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findAll({
      where: { status: 'available' },
    });

    res.json(equipment);
  } catch (error) {
    next(error);
  }
};

const createEquipment = async (req, res, next) => {
  try {
    const { name, category, description } = req.body;

    const equipment = await Equipment.create({
      name,
      category,
      description,
    });

    res.status(201).json({
      message: 'Equipment created successfully',
      equipment,
    });
  } catch (error) {
    next(error);
  }
};

const updateEquipment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, description, status } = req.body;

    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    await equipment.update({ name, category, description, status });

    res.json({
      message: 'Equipment updated successfully',
      equipment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEquipment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    await equipment.destroy();

    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEquipment,
  getAvailableEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
