const url = "https://api.cloudinary.com/v1_1/chumstudies/upload";

const generateRandomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const upload = async (file, uploadPreset, publicId) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("resource_type", "auto");

  if (publicId)
    formData.append("public_id", `${publicId}_${generateRandomString(10)}`);

  const fetchResult = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const jsonResult = await fetchResult.json();

  if (!fetchResult.ok) {
    throw new Error(jsonResult);
  }

  return {
    cloudinaryObject: jsonResult,
    cloudinaryString: JSON.stringify(jsonResult),
  };
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const smallProfpicUrl = (url) => {
  if (!url)
    return "https://cdn.discordapp.com/attachments/803530289653481475/905158223995220008/9311412861606062171-512.png";
  const splitUrl = url.split("upload");
  return `${splitUrl[0]}upload/w_100,ar_1:1,c_fill,g_auto${splitUrl[1]}`;
};
