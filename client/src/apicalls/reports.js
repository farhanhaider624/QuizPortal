const {default: axiosInstance} = require(".");

//add report
export const addReport = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/reports/add-report', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//get all reports
export const getAllReports = async () => {
    try {
        const response = await axiosInstance.post('/api/reports/get-all-reports');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//get all reports by user
export const getAllReportsByUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/reports/get-all-reports-by-user', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};