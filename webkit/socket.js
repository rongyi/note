var express = require("express");
var app = express.createServer();
var io = require("socket.io").listen(app);

app.configure(function () {
	app.use(express.static(__dirname + "/public"));
	app.set("views", __dirname);
});
app.listen(8001);

app.get("/", function (req, res) {
	res.sendfile("./socket_test.html");
});

io.sockets.on("connection", function (socket) {
	socket.on("ok", function (data) {
		console.log(data);
		socket.emit("alert", "blabla");
	});
	socket.on("again", function (data) {
		console.log(data);
	});
});
