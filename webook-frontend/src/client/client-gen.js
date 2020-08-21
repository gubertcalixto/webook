const shell = require('shelljs');
const wget = require('node-wget');
const fs = require('fs');
const prompts = require('prompts');

let config = JSON.parse(fs.readFileSync(__dirname + '/temp/temp.json'));
let swaggerFile = config.swagger_codegen_cli_jar;
let properties_file = __dirname + '/client.config.json';

const downloadSwaggerJar = cb => {
  shell.echo('Start to download Swagger JAR deps');
  wget({ url: config.swagger_codegen_cli_jardownload, dest: __dirname + '/temp/' },
    () => {
      shell.echo('Swagger JAR downloaded, let\'s get started...');
      if (cb) {
        cb();
      }
    }
  );
};

const genSwagger = (clientSettings = { name: "", baseUrl: "", outPath: "", donTAskJustGenerate: "" }) => {
  const swaggerLocation = ('\"' + (__dirname + '/temp/' + swaggerFile) + '\"');
  // Full Config: https://github.com/OpenAPITools/openapi-generator/blob/master/docs/generators/typescript-angular.md
  const swaggerOptionsLocation = ('\"' + __dirname + '/temp/swagger-gencode.options' + '\"');
  const packageName = (clientSettings.name ? '--package-name ' + clientSettings.name : '');
  const outputLocation = (clientSettings.outPath ? clientSettings.outPath : './client/');
  const command =
    `java -jar ${swaggerLocation} generate` +
    ` -i ${clientSettings.baseUrl}` +
    ` -g typescript-angular ${packageName}` +
    ` --skip-validate-spec` +
    ` -o ${outputLocation}` +
    ` -c ${swaggerOptionsLocation}`;

  // UPDATE 
  const exec = shell.exec(command);
  if (exec.code === 0) {
    shell.echo('Api gerada por swagger codegen');
  } else if (exec.code === 1) {
    if (exec.stderr.indexOf('jar') > -1) {
      shell.echo('reparando jars');
      downloadSwaggerJar(() => genSwagger(clientSettings));
    }
    return;
  }
}

(async () => {
  let settings = { "clients": [{ name: "", baseUrl: "", outPath: "", donTAskJustGenerate: "" }] };
  try {
    settings = JSON.parse(fs.readFileSync(properties_file));
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`Failed to get file from path "${properties_file}"`);
    } else {
      console.log(err.code, err.message);
    }
  }

  const clientsOptions = settings.clients.map((key, value) => { return { title: key.name, value: value } })
  const clientsToGen = await prompts({
    type: 'multiselect',
    message: 'Clients to Update/Generate',
    value: 'clientsToGen',
    name: 'clients',
    choices: [
      ...clientsOptions
    ]
  });

  clientsToGen.clients.forEach(cOpt => {
    genSwagger(settings.clients[cOpt])
  });
})();