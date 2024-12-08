export default async function signup(username, password, email) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": username,
        "password": password,
        "email": email
    });

    const requestOptions = {
        method: "POST",
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
            throw new Error(result.message || 'Đăng ký không thành công');
        }
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        return { error: error.message };
    }
}