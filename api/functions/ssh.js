const { exec } = require("child_process");
const fs = require("fs");
const util = require("util");

const execAsync = util.promisify(exec);

async function createSSHKeys() {
  try {
    const { stdout, stderr } = await execAsync(
      "echo 'yes' | ssh-keygen -t rsa -b 4096 -m PEM -f /keys/id_rsa -N ''"
    );
    if (stdout) console.log("SSH Keys OK");
    if (stderr) console.log("SSH Key Error:", stderr);
  } catch (error) {
    throw error;
  }
}

process.env.PRIVATE_KEY = fs.readFileSync("/keys/id_rsa").toString();

createSSHKeys();
