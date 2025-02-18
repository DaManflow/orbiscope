const { exec } = require('child_process');

// Augmente le timeout global de Jest pour éviter les erreurs de timeout
jest.setTimeout(60000); // 60 secondes

describe('Tests de performance', () => {
  it('devrait tester la performance des routes', (done) => {
    // Exécute le fichier de configuration Artillery
    const process = exec('artillery run artillery-config.yml', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur : ${error.message}`);
        return done(error); // Termine le test avec une erreur
      }

      if (stderr) {
        console.error(`stderr : ${stderr}`);
      }

      console.log(`stdout : ${stdout}`);
      done(); // Signale à Jest que le test est terminé
    });

    // Gestion de l'événement de fermeture du processus
    process.on('close', (code) => {
      console.log(`Process terminé avec le code : ${code}`);
      if (code !== 0) {
        return done(new Error(`Le processus s'est terminé avec le code ${code}`));
      }
    });

    // Gestion des erreurs liées au processus
    process.on('error', (err) => {
      console.error(`Erreur lors de l'exécution du processus : ${err.message}`);
      done(err); // Termine le test avec une erreur inattendue
    });
  });
});
