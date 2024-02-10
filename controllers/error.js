exports.get404Page = (req,res,next) => {
    res.status(200).sendFile('error.html' ,{
        root:'views'
    })
}