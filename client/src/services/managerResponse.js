import Cookies from 'js-cookie';
const { VITE_API_URL } = import.meta.env;

async function managerResponse(resData) {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: Cookies.get("session-token"),
            },
            body: JSON.stringify(resData),
        };
        const res = await fetch(`${VITE_API_URL}/managerResponse`, options)
        const { success, data, err } = await res.json();

        if (err?.name === "TokenExpiredError") {
            Cookies.remove('session-token');
            window.location.reload();
        }


        return {
            success,
            data
        }

    } catch (err) {
        console.error(`Error in managerResponse: ${err.message}`)
        return {
            err: err.message
        }
    }
}


export { managerResponse };