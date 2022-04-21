import * as c from "../src/wmctrl/commands";
import { Coordinates, Window } from "../src/types";


async function main() {

    const TOP_BAR_MARGIN = 31;
    const MARGIN = 170;

    const ws = await c.listAllWindows.run();
    
    console.log(ws);

    const width: number = 1920;
    const height: number = 1080;

    const win = ws.find((w: Window) => w.title.toLowerCase().includes("code"));

    c.unMaximizeWindow.run(win);

    let co =
    {
        x:      0,
        y:      height - 31 - 37 - 26,
        width:  width / 2,
        height: (height / 2) - 35,
    };

    console.log(co);

    c.moveWindow.run(win, co);
    c.focusWindow.run(win);
}

main();