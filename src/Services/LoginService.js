export default async function login(username, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": username,
        "password": password,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch(`http://localhost:8080/api/users/${username}`, requestOptions);
        const result = await response.json();
        
        if (response.ok) {           
            localStorage.setItem('userToken', result.token);
            localStorage.setItem('username', username);
            localStorage.setItem('email', result.data.email);

            return result;
        } else {
            throw new Error(result.message || 'Đăng nhập không thành công');
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        return { error: error.message };
    }
}
