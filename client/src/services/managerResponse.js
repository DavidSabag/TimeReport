import Cookies from 'js-cookie';
const { VITE_API_URL } = import.meta.env;

async function managerResponse(data) {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: Cookies.get("session-token"),
            },
            body: JSON.stringify(data),
        };
        const res = await fetch(`${VITE_API_URL}/managerResponse`, options)

        const { success } = await res.json();

        return {
            success
        }

    } catch (err) {

        console.error(`Error in loginService: ${err.message}`)
        return {
            err: err.message
        }
    }
}


export { managerResponse };