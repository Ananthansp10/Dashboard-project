import api from "@/lib/axiosConfig";

export const getLabels = async () => {
  const response = await api.get("/labels");
  return response.data;
};

export const updateLabel = async (key: string, title: string) => {
  const response = await api.put("/labels/update", { key, title });
  return response.data;
};

export const addLabel = async (key: string, title: string, usedIn: string[]) => {
  const response = await api.post("/labels/add", { key, title, usedIn });
  return response.data;
};
