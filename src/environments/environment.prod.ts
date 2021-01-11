
export const environment = {
  production: true,
  baseAppUrl: 'https://api.benoitmayeur.gq/'
};

/*

Ce fichier sera utile par ex si on veut faire des versions différentes en fonction
de la production
Les règles de création vont être prises dans le fichier angular.json
Dans Angular.json, tu vas avoir les infos sur le build du projet dans la partie "Architect"
Derrière Angular, il y a WebPack => orchestrateur du build
Angular a absorbé WebPack

En fait environnement.ts est écrasé par environnement.prod.ts lors du build, donc tu modifies la valeur de "baseAppUrl"

*/