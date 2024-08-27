import { responseStandar } from "../helpers/response.js";
import Vehicle from "../models/Vehicle.js";

export const getAllVehicles = async (req, res) => {
  try {
    const { page = 1, limit = 10, brand, minPrice, maxPrice } = req.query;

    const filters = { isActive: true };

    if (brand) {
      filters.brand = brand;
    }

    if (minPrice) {
      filters.price = { ...filters.price, $gte: Number(minPrice) };
    }

    if (maxPrice) {
      filters.price = { ...filters.price, $lte: Number(maxPrice) };
    }

    const skip = (page - 1) * limit;

    const vehicles = await Vehicle.find(filters)
      .skip(skip)
      .limit(Number(limit))
      .populate("createdBy", "-password -token -__v")
      .exec();

    const total = await Vehicle.countDocuments(filters);

    res.status(200).json({
      success: true,
      data: vehicles,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(responseStandar(false, [], error.message));
  }
};

export const getVehicleById = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findOne({ _id: id, isActive: true }).populate(
      "createdBy",
      "username firstName lastName"
    );

    if (!vehicle) {
      return res
        .status(404)
        .json(responseStandar(false, [], "Vehicle not found or inactive"));
    }

    res.status(200).json(responseStandar(true, vehicle));
  } catch (error) {
    console.error(error);
    res.status(500).json(responseStandar(false, [], "Server error"));
  }
};

export const editVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findOne({ _id: id, isActive: true });
    if (!vehicle) {
      return res
        .status(404)
        .json(responseStandar(false, [], "Vehicle not found or inactive"));
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(responseStandar(true, updatedVehicle));
  } catch (error) {
    console.error(error);
    res.status(500).json(responseStandar(false, [], "Server error"));
  }
};

export const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findOne({ _id: id });

    if (!vehicle) {
      return res
        .status(404)
        .json(responseStandar(false, [], "Vehicle not found"));
    }

    vehicle.isActive = false;
    await vehicle.save();

    res
      .status(200)
      .json(
        responseStandar(true, [
          { msg: "Vehicle marked as inactive successfully" },
        ])
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(responseStandar(false, [], "Server error"));
  }
};

export const createVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle({
      ...req.body,
      createdBy: req.user._id,
    });

    const createdVehicle = await newVehicle.save();
    res.status(201).json(responseStandar(true, createdVehicle));
  } catch (error) {
    console.log(error);
    res.status(500).json(responseStandar(false, [], error));
  }
};
