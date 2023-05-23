export const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const APIUrl = process.env.REACT_APP_API_URL;