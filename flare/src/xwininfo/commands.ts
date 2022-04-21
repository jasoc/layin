import { run } from "../stdout";
import { Command, Window, Coordinates } from "../types";


export const getWindowSizeWithGeometry: Command = {
  cmd: "xwininfo -id {id} | grep geometry",
  run: _getWindowSizeWithGeometry,
};

async function _getWindowSizeWithGeometry(window: Window): Promise<Coordinates> {
  const cmd: string = `xwininfo -id ${window.id} | grep geometry`;
  console.log(cmd);
  const res = (await run(cmd))!.replace('  -geometry ', '').split('x');
  return {
    width:  Number(res[0]),
    height: Number(res[1].split('+')[0]),
  };
}
