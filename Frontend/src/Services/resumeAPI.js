import { VITE_APP_URL } from "@/config/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: VITE_APP_URL + "api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const createNewResume = async (data) => {
  try {
    const response = await axiosInstance.post(
      "resumes/createResume",
      data.data
    );
    return response.data;
  } catch (error) {
    // console.log("Eroor in getting all the resumes ",error);
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const getAllResumeData = async () => {
  try {
    const response = await axiosInstance.get("resumes/getAllResume");
    return response.data;
  } catch (error) {
    // console.log("Eroor in getting all the resumes ",error);
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const getResumeData = async (resumeID) => {
  try {
    const response = await axiosInstance.get(
      `resumes/getResume?id=${resumeID}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const updateThisResume = async (resumeID, data) => {
  try {
    const response = await axiosInstance.put(
      `resumes/updateResume?id=${resumeID}`,
      data.data
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const deleteThisResume = async (resumeID) => {
  try {
    const response = await axiosInstance.delete(
      `resumes/removeResume?id=${resumeID}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const generateResumeFromPrompt = async (prompt) => {
  try {
    const response = await axiosInstance.post(
      "resumes/generate-from-prompt",
      { prompt }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const downloadResumePDF = async (resumeData) => {
  try {
    const response = await axiosInstance.post(
      "resumes/generate-pdf",
      { resumeData },
      {
        responseType: 'blob'
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

export {
    createNewResume,
    deleteThisResume,
    downloadResumePDF,
    generateResumeFromPrompt,
    getAllResumeData,
    getResumeData,
    updateThisResume
};

