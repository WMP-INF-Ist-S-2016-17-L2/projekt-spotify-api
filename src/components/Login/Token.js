export default async () => {

    const res = await fetch('https://spotify-web-api.herokuapp.com/token');
    const json = await res.json();

    return json.token;
}
