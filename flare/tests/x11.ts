const x11 = require("x11");

x11.createClient(function(err, display) {
    let X = display.client;
    let root = display.screen[0].root;

    X.MoveWindow(root, 0, 0);
    
    X.QueryTree(root, function(err, tree) {
        tree.children.forEach(element => {
        }); //output all windows tree
    });

    display.client.terminate();
});