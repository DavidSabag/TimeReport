import Cookies from 'js-cookie';
const { VITE_API_URL } = import.meta.env;

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
        const res = await fetch(`${VITE_API_URL}/login`, options)             
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