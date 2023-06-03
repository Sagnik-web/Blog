exports.time = async (req,res,next) =>{
    res.json({
        time:Date.now().toString()
    })
}