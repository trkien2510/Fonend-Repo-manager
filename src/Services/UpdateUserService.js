export default async function UpdateProductService(username, password, newpassword, email, newemail) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        'username': username,
        'password': password,
        'newPassword': newpassword,
        'email': email,
        'newEmail': newemail
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("http://localhost:8080/api/users", requestOptions);
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