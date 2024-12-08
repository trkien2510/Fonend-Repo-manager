export default async function GetProductsService(username) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`http://localhost:8080/api/products/${username}`, requestOptions);
        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message || 'Successful');
        }
    } catch (error) {
        console.error('LFailed:', error);
        return { error: error.message };
    }
}