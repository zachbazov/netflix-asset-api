import "@babel/polyfill";
import {
    requestImage,
    uploadRequest,
    requestPage,
    uploadImages,
} from "./repositories/images/images";
import ImageCropper from "../../utils/image-cropper";
import ImageUploader from "../../utils/image-uploader";
import { formToJSON } from "axios";

// MARK: - Header View

const headerImage = document.getElementById("img__header");
const logoHeaderImage = document.getElementById("img-header--logo");
if (headerImage) {
    requestImage(headerImage, "streams-bg");
    requestImage(logoHeaderImage, "netflix-logo");
}

const allMediaRef = document.getElementById("ref--all-media");
if (allMediaRef) {
    allMediaRef.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("page", 1);
        window.location.assign("/?page=1&limit=9");
    });
}

// MARK: - Footer View

const footerImage = document.getElementById("img__footer");
if (footerImage) {
    requestImage(footerImage, "header-footer-bg");
}

// MARK: - Overview Page
// Pagination
const prevPageRef = document.getElementById("btn--page-control-prev");
const nextPageRef = document.getElementById("btn--page-control-next");

var currentPage =
    localStorage.getItem("page") * 1 || localStorage.setItem("page", 1);

if (prevPageRef) {
    prevPageRef.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage--;
        if (currentPage <= 0) {
            currentPage = 1;
        }
        localStorage.setItem("page", currentPage);
        requestPage(currentPage, 9);
    });
}
if (nextPageRef) {
    nextPageRef.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage++;
        localStorage.setItem("page", currentPage);
        requestPage(currentPage, 9);
    });
}

// MARK: - Image Upload Form

const imageUploadForm = document.querySelector(".form--image-upload");
const imageUploadInput = document.querySelector(".input--image-upload-p");
const imageUploadPreviewImage = document.getElementById("preview-img--upload");
const imageUploadButton = document.querySelector(".btn--image-upload");
const imageUploader = new ImageUploader();
if (imageUploadButton) {
    imageUploader.updatePreviewImage(imageUploadInput, imageUploadPreviewImage);
    // imageUploader.executeUpload(
    //     imageUploadButton,
    //     imageUploadInput,
    //     uploadRequest
    // );
}
if (imageUploadForm) {
    imageUploadForm.addEventListener("submit", function (e) {
        e.preventDefault();

        uploadImages(imageUploadInput.files);
    });
}

// MARK: - Image Cropping Form

const imageCropInput = document.querySelector(".input--image-crop-p");
const imageCropButton = document.querySelector(".btn--image-crop");
const croppedPreviewImage = document.getElementById("preview-img--crop");
const croppedOutputImage = document.getElementById("output-img--crop");
const croppingPosterButton = document.querySelector(".btn--img-crop-poster");
const croppingLogoButton = document.querySelector(".btn--img-crop-logo");
const croppingDisplayPosterButton = document.querySelector(
    ".btn--img-crop-display-poster"
);
const croppingDisplayLogoButton = document.querySelector(
    ".btn--img-crop-display-logo"
);
const croppingPreviewPosterButton = document.querySelector(
    ".btn--img-crop-preview-poster"
);

const imageCropper = new ImageCropper([
    croppingPosterButton,
    croppingLogoButton,
    croppingDisplayPosterButton,
    croppingDisplayLogoButton,
    croppingPreviewPosterButton,
]);

// Crop
if (imageCropButton) {
    imageCropper.updatePreviewImage(
        imageCropper,
        imageCropInput,
        croppedPreviewImage
    );
    imageCropper.cropImage(imageCropper, imageCropButton, croppedOutputImage);
}

// Save
const saveCropButton = document.querySelector(".btn--image-save");
if (saveCropButton) {
    imageCropper.executeSave(
        croppedOutputImage,
        imageCropInput,
        saveCropButton,
        uploadRequest
    );
}

// Update Size
const updateSizeButton = document.getElementById("btn--img-crop-update-size");
if (updateSizeButton) {
    updateSizeButton.addEventListener("click", function (e) {
        e.preventDefault();
        let widthInput = document.getElementById("input--img-crop-width");
        let heightInput = document.getElementById("input--img-crop-height");
        let data = { width: widthInput.value, height: heightInput.value };
        imageCropper.updateSize(imageCropper.cropper, data);
    });
}
