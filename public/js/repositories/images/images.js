import axios from "axios";
import { showAlert } from "../../utils/alert";

// MARK: - Request Image

export const requestImage = async (img, name) => {
    try {
        const url = `/api/v1/images?name=${name}`;

        const res = await axios({
            method: "GET",
            url,
            data: {
                name,
            },
        });

        if (res.data.status === "success") {
            const buffer = res.data.data[0].output.dataUri;
            img.src = Buffer.from(buffer);
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
};

// MARK: - Upload Request

export const uploadRequest = async (name, path, type, output) => {
    try {
        const url = "/api/v1/images";
        console.log(`Uploading ${name}`);
        const res = await axios({
            method: "POST",
            url,
            data: {
                name,
                path,
                type,
                output,
            },
        });

        if (res.data.status === "success") {
            showAlert("success", "Image uploaded successfully");
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
};

// MARK: - Multiple Image Upload

export const uploadImage = async (file) => {
    const formData = new FormData();
    const reader = new FileReader();

    reader.onloadend = async function () {
        let name = file.name;
        const path = document.getElementById("image-upload--select-path").value;
        const type = `.${name.split(".")[1]}`;
        name = name.split(".")[0];
        const b64 = reader.result.replace(/^data:.+;base64,/, "");
        const output = {
            dataUri: b64,
        };

        const data = { name, type, path, output };

        formData.append("data", data);

        const url = "/api/v1/images";

        try {
            const res = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.data.status === "success") {
                showAlert("success", "Images uploaded successfully");
                return res.data;
            }
        } catch (err) {
            showAlert("error", err.response.data.message);
        }
    };

    reader.readAsDataURL(file);
};

export const uploadImages = async (files) => {
    const results = [];
    for (const file of files) {
        const result = await uploadImage(file);
        results.push(result);
    }
    return results;
};

// MARK: - Pagination

export const requestPage = async (page, limit) => {
    try {
        const res = await axios({
            method: "GET",
            url: `/api/v1/images?page=${page}&limit=${limit}`,
            data: {
                page,
                limit,
            },
        });

        if (res.data.status === "success") {
            window.location.assign(`/?page=${page}&limit=${limit}`);
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
};
