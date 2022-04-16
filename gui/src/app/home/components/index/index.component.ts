import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private _electronService: ElectronService) {}

  ngOnInit(): void {}

  schiatta(): void {
    this._electronService.ipcRenderer.send('ping');
    interface s {
      sex: number;
    }
    this._electronService.ipcRenderer.on('ping', (event, arg: s) => {
      console.log('gay level: ' + arg.sex);
      event.returnValue = 'pong';
    });
    const content = 'Some content!';

    // fs.writeFile('/Users/joe/test.txt', content, (err: any) => {
    //   if (err) {
    //     console.error(err)
    //     return
    //   }
    // })
  }
}
