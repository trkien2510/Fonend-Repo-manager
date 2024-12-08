export default async function UpdateProductService(name, type, note, number, username) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        'name': name,
        'type': type,
        'note': note,
        'number': number,
        'username': username
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("http://localhost:8080/api/products/update", requestOptions);
        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message || '');
        }
    } catch (error) {
        console.error('', error);
        return { error: error.message };
    }
}