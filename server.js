const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
var cookieParser = require('cookie-parser')
var request = require('request');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const URL = 'http://localhost/api-dipongo/public';

const getCookie = (cookie) =>
{
        var re = new RegExp("token" + "=([^;]+)");
        var value = re.exec(cookie);
        return (value != null) ? unescape(value[1]) : null;
}


// fake DB
const messages = [];

// socket.io server
io.on("connection", (socket) => {

    //console.log("connected");
    /*if(getCookie(socket.handshake.headers.cookie) !== null && getCookie(socket.handshake.headers.cookie) !== undefined ){
        var options = {
            url: URL + '/api/back/to/game'
        };
        options.headers = {
            'lang': 'fr',
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+getCookie(socket.handshake.headers.cookie)
        };
        console.log(`Socket ${socket.id} connected.`);
        request(options, function(err, httpResponse, body) {
            if (err) {
                console.log("error connected");
            } else {
                console.log("ok connected");
            }
        });
    }*/
   socket.on("user_online",(data)=>{
       if(data.token !==undefined && data.token!== null){
           var options = {
               url: URL + '/api/back/to/game'
           };
           options.headers = {
               'lang': 'fr',
               'Content-Type': 'application/json',
               'Authorization':'Bearer '+ data.token
           };
           request(options, function(err, httpResponse, body) {
               if (err) {
                   console.log("error back to game");

               } else {

                   console.log(`${socket.id} back to game.`);
                   if(JSON.parse(body).data.running_session !== undefined){
                       //console.log(JSON.parse(body).data.running_session.should_end_date);
                       //console.log(JSON.parse(body).data.end_date);
                       console.log("left time"+JSON.parse(body).data.left.toString());
                   }

               }
           });
       }
   });

    socket.on("disconnect", data => {

        if(getCookie(socket.handshake.headers.cookie) !== null && getCookie(socket.handshake.headers.cookie) !== undefined ){
            var options = {
                url: URL + '/api/leave/game'
            };
            options.headers = {
                'lang': 'fr',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+getCookie(socket.handshake.headers.cookie)
            };

            request(options, function(err, httpResponse, body) {
                if (err) {
                    console.log("error disconnected");
                } else {
                    //console.log(JSON.parse(body));

                    console.log("ok disconnected");
                    let json = JSON.parse(body);
                    if(json.data !== undefined && json.data.running_session){
                       console.log("spent time"+JSON.parse(body).data.spent.toString());
                    }
                }
            });
        }


    });




});

nextApp.prepare().then(() => {
    app.get("/messages", (req, res) => {
        res.json({ messages });
    });

    app.get("*", (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(8000, err => {
        if (err) throw err;
        console.log("server started");
    });
});
