
import api from "./axiosClient";

export const user = {
    async getAll() {
        const { data } = await api.get("/users");
        return data;
    },

    async add(name, password, icon) {
        const { data } = await api.post("/users",{name:name, password:password, icon:icon}); 
        return data;
    },

    async login(name, password) {
        const { data } = await api.post("/users/login", { name:name, password:password });
        return data;
    },

    async checkLogin() {
        console.log("check login status");
        const { data } = await api.get("/users/check-login");
        return data;
    },

    async logout(name) {
        const { data } = await api.post("/users/logout",{name:name});
        return data;
    },
     
    async createOnePost(name, post) {
        console.log("create post");
        const { data } = await api.post(`/users/post`, {name:name,content:post});
        return data;
    },

    async getPost() {
        const { data } = await api.get("/users/post");
        return data;
    },

    async deletePost(id) {
        const { data } = await api.delete(`/users/post/${id}`);
        return data;
      },
    async deletePost(id) {
        const { data } = await api.delete(`/users/post/${id}`);
        return data;
    },

    async AI(text) {
        const { data } = await api.post("/users/AIImage", { prompt: text });
        return data;
      },

}; 