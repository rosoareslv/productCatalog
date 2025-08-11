import { exec } from "child_process";
import fs from "fs";
import util from "util";

const execAsync = util.promisify(exec);

export async function createSSHKeys() {
  try {
    const { stdout, stderr } = await execAsync(
      "echo 'yes' | ssh-keygen -t rsa -b 4096 -m PEM -f /keys/id_rsa -N ''"
    );
    if (stdout) console.log("SSH Keys OK");
    if (stderr) console.log("SSH Key Error:", stderr);
    process.env.PRIVATE_KEY = fs.readFileSync("/keys/id_rsa").toString();
  } catch (error) {
    throw error;
  }
}