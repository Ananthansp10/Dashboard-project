import api from "@/lib/axiosConfig";

export const getTable = async (tableName: string) => {
  const response = await api.get(`/tables/${tableName}`);
  return response.data;
};
