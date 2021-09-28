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