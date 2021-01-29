
module.exports.home = function(req, res){
    /*to read cookie from browser
    console.log(req.cookies);
    to sendthe cookie to the browser from server
    res.cookie('user_id',100);
    */

    res.render('home',{
        title: 'SocioGram | Home'
    });
}