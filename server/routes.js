exports.index = function(req, res){
    res.render('index.html', {
       title: 'the index' 
    });
}