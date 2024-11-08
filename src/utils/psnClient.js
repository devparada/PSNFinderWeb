import * as psnApi from 'psn-api';
import fetch from 'isomorphic-unfetch';
import dotenv from 'dotenv';

const { exchangeCodeForAccessToken, exchangeNpssoForCode, makeUniversalSearch, getUserTitles } = psnApi;
dotenv.config

dotenv.config();
var TOKEN_PSN_ENV;
// El username es recibido como parámetro
export const obtenerUsuarioData = async (username) => {
  try {
    if (process.env.NODE_ENV == "production") {
      TOKEN_PSN_ENV = process.env.TOKEN_PSN_PROD;
    } else {
      TOKEN_PSN_ENV = process.env.TOKEN_PSN;
    }

    const TOKEN_PSN = TOKEN_PSN_ENV;
    TOKEN_PSN_ENV = "";
    // Autoriza para buscar el usuario
    const accessCode = await exchangeNpssoForCode(TOKEN_PSN);
    const authorization = await exchangeCodeForAccessToken(accessCode);

    // Obtiene todos los datos del usuario
    const allAccountsSearchResults = await makeUniversalSearch(authorization, username, 'SocialAllAccounts');
    const targetAccountId = allAccountsSearchResults?.domainResponses[0]?.results[0]?.socialMetadata?.accountId;

    // Obtiene los juegos del usuario
    const { trophyTitles } = await getUserTitles(authorization, targetAccountId);

    // Devuelve el nombre del usuario y los juegos
    return { username, trophyTitles };
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null;
  }
};
