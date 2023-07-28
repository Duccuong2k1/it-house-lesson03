import multer from "multer";

export const ExcelUploader = multer({
    // write file to upload folder
    dest:"uploads/",
    fileFilter:(req,file,cb)=>{
        if(!file.originalname.match(/\.(xlsx)$/)){
            return cb(new Error("Only .xlsx file is allow"))
        }
        if(file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            return cb(new Error("Only .xlsx file is allow"))
        }
        cb(null,true)
    },
    // limit size file no greaten than 10MB
    limits:{
        fileSize:1024 * 1024 * 10
    }
})

