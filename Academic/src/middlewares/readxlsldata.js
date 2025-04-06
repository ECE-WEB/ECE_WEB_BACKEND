const XLSX = require("xlsx");
function ReadExcel(req,res,next){
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    try {
        console.log('came to the read excel middleware')
        const data = XLSX.read(req.file.buffer, { type: 'buffer' });
        let allsheetsdata = {}
        console.log(data.SheetNames.length ,'this is length of the total sheet lenghts')
        for(let sheets=0; sheets<data.SheetNames.length; sheets+=1){
           
            const sheetName = data.SheetNames[sheets];
            
            const worksheet = data.Sheets[sheetName];       

            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            allsheetsdata[sheetName] = jsonData;


        }
        
        req.excelData = allsheetsdata;
        next();
    } catch (error) {
        return res.status(500).json({ error: "Error processing the file" });
    }
}
module.exports=ReadExcel