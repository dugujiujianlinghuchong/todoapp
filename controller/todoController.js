
// 引入mongoose模块
var mongoose = require('mongoose');

// 链接数据库
mongoose.connect('mongodb://todoapp:yt4561761@ds247001.mlab.com:47001/todoapp')

// 创建图表
var todoSchema = new mongoose.Schema({
    item: String
});

// 往数据库中存储数据
var Todo = mongoose.model('Todo', todoSchema);

var bodyParser = require('body-parser');
// 对数据进行解析
var urlencodeParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
    // 获取数据
    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            if (err) throw err;

            res.render('todo', { todos: data });
        })
    });

    // 传递数据
    app.post('/todo', urlencodeParser, function (req, res) {
        Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        })
    });

    // 删除数据
    app.delete('/todo/:item', function (req, res) {
        // console.log(req.params.item);
        Todo.find({ item: req.params.item }).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        })
        // data = data.filter(function (todo) {
        //     return req.params.item !== todo.item;
        // });
        //
        // res.json(data);
    });
}