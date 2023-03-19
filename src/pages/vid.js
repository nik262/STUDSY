import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

// Replace this with your Firebase configuration
const firebaseConfig = {
  // Your Firebase configuration data
};

initializeApp(firebaseConfig);
const storage = getStorage(); // Get a reference to Firebase Storage

function uploadFileAndGetURL(file, path) {
  return new Promise(async (resolve, reject) => {
    // 'file' should be a File object representing the file you want to upload (e.g., from an input field)
    const storageRef = ref(storage, `${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can use this to track the progress of the upload
      },
      (error) => {
        console.error("Error uploading file:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at:", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
}

    // Assuming 'file' is a File object from an input field
const file = /* your file object */;
const path = "path/to/your/storage/folder";

uploadFileAndGetURL(file, path)
  .then((downloadURL) => {
    // Use the downloadURL to call another API
    // For example, you can call a JSONPlaceholder API to create a new post with the file URL as the 'url' field
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "My uploaded file",
        url: downloadURL,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Created new post with file URL:", data))
      .catch((error) => console.error("Error calling the API:", error));
  })
  .catch((error) => console.error("Error uploading file:", error));
