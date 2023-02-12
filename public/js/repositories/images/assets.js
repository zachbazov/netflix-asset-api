import axios from "axios";
import { showAlert } from "../../utils/alert";

// MARK: - Request Asset

export const requestAsset = async (asset, img, name) => {
    try {
        const url = `/api/v1/${asset}?name=${name}`;

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
        console.log("error", err.response.data.message);
    }
};

// MARK: - Upload Request

export const uploadAssetRequest = async (asset, name, path, type, output) => {
    try {
        const url = `/api/v1/${asset}`;

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

// MARK: - Multiple Asset Upload

export const uploadAsset = async (asset, file) => {
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

        const url = `/api/v1/${asset}`;

        try {
            const res = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.data.status === "success") {
                showAlert("success", "Assets uploaded successfully");
                return res.data;
            }
        } catch (err) {
            showAlert("error", err.response.data.message);
        }
    };

    reader.readAsDataURL(file);
};

export const uploadAssets = async (asset, files) => {
    const results = [];
    for (const file of files) {
        const result = await uploadAsset(asset, file);
        results.push(result);
    }
    return results;
};

// MARK: - Asset Pagination

export const requestAssetPage = async (asset, page, limit) => {
    try {
        const res = await axios({
            method: "GET",
            url: `/api/v1/${asset}?page=${page}&limit=${limit}`,
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
