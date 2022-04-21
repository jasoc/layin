import { run } from "../stdout";
import { Command, Window, Coordinates } from "../types";


export const listAllWindows: Command = {
  cmd: "wmctrl -l",
  run: _listAllWindows,
};

export const moveWindow: Command = {
  cmd: "wmctrl -ir {id} -t {coord}",
  run: _moveWindow,
};

export const focusWindow: Command = {
  cmd: "wmctrl -i -a {id}",
  run: _focusWindow,
};

export const getWindowSizeWithoutGeometry: Command = {
  cmd: "wmctrl -lG | grep {id}",
  run: _getWindowSizeWithoutGeometry,
};

export const maximizeWindow: Command = {
  cmd: "wmctrl -lG | grep {id}",
  run: _maximizeWindow,
};

export const unMaximizeWindow: Command = {
  cmd: "wmctrl -lG | grep {id}",
  run: _unMaximizeWindow,
};

async function _maximizeWindow(window: Window): Promise<void> {
  const cmd: string = `wmctrl -i -r ${window.id} -b add,maximized_vert,maximized_horz`;
  await run(cmd);
}

async function _unMaximizeWindow(window: Window): Promise<void> {
  const cmd: string = `wmctrl -i -r ${window.id} -b remove,maximized_vert,maximized_horz`;
  await run(cmd);
}

async function _getWindowSizeWithoutGeometry(window: Window): Promise<Coordinates> {
  const cmd: string = `wmctrl -lG | grep ${window.id}`;
  console.log(cmd);
  const res = (await run(cmd))!.split(' ').filter((e) => e != '');
  return {
    x:      Number(res[2]),
    y:      Number(res[3]),
    width:  Number(res[4]),
    height: Number(res[5]),
  };
}

async function _focusWindow(window: Window): Promise<void> {
  const cmd: string = `wmctrl -i -a ${window.id}`;
  await run(cmd);
}

async function _moveWindow(window: Window, coordinates: Coordinates): Promise<void> {
  const cmd: string =
    `wmctrl -ir ${window.id} -e 0,` +
    `${coordinates.x},${coordinates.y},` +
    `${coordinates.width},${coordinates.height}`;
  await run(cmd);
}

async function _listAllWindows(): Promise<Window[]> {
  const cmd: string = "wmctrl -l";

  let ret: Window[] = [];

  let stdout: string = (await run(cmd)) ?? "";

  for (let row of stdout.split("\n")) {
    const s = row.split(" ");
    const id = s[0];
    const title = s
      .filter((e: string, i: number) => i > 3)
      .join(" ");
    const desktop = Number(s[2]);

    if (!id || !title) continue;

    ret.push({
      id: id,
      title: title,
      desktop: desktop,
    });
  }

  return ret;
}
