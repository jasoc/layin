import { exec, ExecException } from "child_process";

export async function run(command: string): Promise<string | null> {
  let ret: string | null = null;

  await new Promise((next) => {

    exec(command, (error, stdout, stderr) => {

      if (error)
        throw error;
      
      if (stderr)
        throw new Error(stderr);

      ret = stdout;
      next(null);
    });

  });

  return ret;
}
