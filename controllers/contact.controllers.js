import { Contact } from "../models/contact.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";

//create contact
export const createContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "Enquiry form submitted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get all contacts
export const getAllContacts = asyncHandler(async (req, res) => {
  try {
    const getAllContacts = await Contact.find();
    return res.status(200).json(
      new ApiResponse(200, "Enquiry fetched successfully", {
        TotalContacts: getAllContacts.length,
        getAllContacts,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get a contact
export const getAContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getContact = await Contact.findById(id);
    return res.status(200).json(
      new ApiResponse(200, "Enquiry fetched successfully", {
        getContact,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//delete a contact
export const deleteAContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteContact = await Contact.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Enquiry deleted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//update a contact

export const updateAContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateContact = await contact.findByIdAndUpdate(
      id,
      {
        status: req.body.status,
      },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, "Enquiry updated successfully"));
  } catch (error) {
    throw new Error(error);
  }
});
