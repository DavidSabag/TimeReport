import Cookies from 'js-cookie';
const { VITE_API_URL } = import.meta.env;

async function updateReport(reportData) {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: Cookies.get("session-token"),
            },
            body: JSON.stringify(reportData),
        };
        const res = await fetch(`${VITE_API_URL}/updateReport`, options)

        const { success, err } = await res.json();

        if (err?.name === "TokenExpiredError") {
            Cookies.remove('session-token');
            window.location.reload();
        }

        return {
            success,
            err
        }

    } catch (err) {

        console.error(`Error in updateReport: ${err.message}`)
        return {
            err: err.message
        }
    }
}


export { updateReport };