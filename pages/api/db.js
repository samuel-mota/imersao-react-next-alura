import db from '../../db.json';

export default function dbHandler(request, response) {
  // ===========  COMMAND TO AVOID CORS POLICY (Access-Control-Allow-Origin)
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  // ===============================================

  response.json(db);
}



// TO ACCESS THIS DB IN THE BROWSER CONSOLE
// fetch('http://localhost:3000/api/db').then(
//     async (response) => {
//         const responseJson = await response.json()
//         console.log(responseJson)
//     }
// )