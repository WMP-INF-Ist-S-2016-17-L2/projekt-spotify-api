export default async () => {

    try {
        let response = await fetch('https://spotify-web-api.herokuapp.com/token');
        const res = await response.json();

        return  res.token;
    }
    catch(e) {
        return false;
    }
}
