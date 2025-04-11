async function checkeserver(req,res){
    try {
        return res.json({success:true,message:"server is running"})
    } catch (error) {
        return res.json({success:false,message:"server is not running"})
    }
}
module.exports = checkeserver;