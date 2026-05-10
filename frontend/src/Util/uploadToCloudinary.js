const uploadToCloudnary = async (pics) => {
     const cloud_name = "dvuzyzdbo";

     if (pics) {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "my_default");
          data.append("cloud_name", cloud_name);

          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
               method: "post",
               body: data,
          });

          const fileData = await response.json();
          return fileData.url;
     } else {
          console.log("Error during upload to cloudinary");
     }
};

export default uploadToCloudnary;
