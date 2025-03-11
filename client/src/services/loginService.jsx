import Cookies from 'js-cookie';

async function loginService(formdata) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: formdata.get('username'),
                password: formdata.get('password')
            }),
            credentials: "include"
        };        
        const res = await fetch('http://localhost:8080/login', options)             
        if (!res.ok) throw new Error(`Error fetching data with status: ${res.statusText}`);
        const token = Cookies.get("session-token");        
        
        const data = await res.json();
        return {
            token,
            data
        }
        
    } catch (err) {
        
        console.error(`Error in loginService: ${err.message}`)        
        return {            
            err: err.message
        }
    }
}


export { loginService };