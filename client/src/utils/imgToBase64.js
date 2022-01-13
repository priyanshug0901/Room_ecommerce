

const imgToBase64 = (file) => {

    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = (fileEvent) => {
            const fileContents = fileEvent.target.result;
            // const imgBase64 = fileContents.replace("data:", "").replace(/^.+,/, "");
            // resolve(imgBase64)
            resolve(fileContents);
        }
        reader.onerror = () => {
            reject("oops, something went wrong with the file reader.")
        }
        reader.readAsDataURL(file);
    })
}


export default imgToBase64;