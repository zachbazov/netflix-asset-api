class ImageUploader {
    constructor() {}

    updatePreviewImage(input, previewImage) {
        input.onchange = function () {
            var file = input.files[0],
                reader = new FileReader();

            reader.onloadend = async function () {
                previewImage.src = reader.result;
            };

            reader.readAsDataURL(file);
        };
    }

    // MARK: - Execute Image Upload

    async executeUpload(btn, input, cb) {
        btn.addEventListener("click", async function (e) {
            e.preventDefault();

            for (var i = 0; i < input.files.length; i++) {
                const reader = new FileReader();
                console.log(i);
                reader.onloadend = async function () {
                    var name = input.files[i].name;
                    var path = document.getElementById(
                        "image-upload--select-path"
                    ).value;
                    var type = `.${name.split(".")[1]}`;
                    name = name.split(".")[0];
                    var b64 = reader.result.replace(/^data:.+;base64,/, "");
                    var output = {
                        dataUri: b64,
                    };

                    await cb(name, path, type, output);
                };

                reader.readAsDataURL(input.files[i]);
            }
        });
    }
}

module.exports = ImageUploader;
