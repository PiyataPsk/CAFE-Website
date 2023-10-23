const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const multer = require('multer');
const path = require('path');

// ตั้งค่า multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/image'); // กำหนดโฟลเดอร์ที่รับไฟล์ที่อัปโหลด
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // กำหนดชื่อไฟล์ที่จะถูกบันทึก
    }
  });
  
  // กำหนดการอัปโหลดโดยใช้ multer
  const upload = multer({
    storage: storage
    // limits: { fileSize: 1000000 } // กำหนดขนาดไฟล์สูงสุด (ในตัวอย่างนี้คือ 1 MB)
  });

router.get('/admin',(req,res)=>{
    res.render('admin_login.ejs',{status: true})
})

router.get('/create',(req,res)=>{
    res.render('admin-create.ejs')
})

router.get('/delete',async(req,res)=>{
    const PRODUCTS = await Product.find();
    res.render('admin-delete.ejs',{products:PRODUCTS})
})

router.get('/update',async(req,res)=>{
    const PRODUCTS = await Product.find();
    res.render('admin-update.ejs',{products:PRODUCTS})
})


router.post('/create/products',upload.single('image'),async(req,res)=>{
    let {name,price,sweet} = req.body
    console.log(req.body)
    try {
        // สร้างproductใหม่
          const newProduct = new Product({
              name: name,
              image: req.file ? req.file.filename : null,
              price: price,
              sweet: sweet
          });
          await newProduct.save(); // ใช้ await เพื่อรอให้ข้อมูลบันทึกเสร็จสมบูรณ์
              res.redirect('/');
              console.log('Create New porduct Success!!!');
    
      }catch (error) {
          console.error(error);
          res.status(500).send(error);
      }

})

router.post('/delete/products',async(req,res)=>{
    let {id} = req.body;
    try {
        await Product.findByIdAndDelete(id);
        // ทำสิ่งที่คุณต้องการกับ deletedDocument
        res.redirect('/');
      } catch (error) {
        // จัดการข้อผิดพลาด
        console.log(error)
      }

});

router.post('/update/products', upload.single('image'), async (req, res) => {
    let { id, name, price, sweet } = req.body;

    // ตรวจสอบว่ามีไฟล์รูปถูกอัปโหลดหรือไม่
    let image = req.file ? req.file.filename : null;

    try {
        // สร้างออบเจ็กต์ใหม่ที่ต้องการอัปเดต
        const updatedProduct = {
            name: name,
            image: image,
            price: price,
            sweet: sweet
        };

        // ใช้ findByIdAndUpdate() โดยไม่ระบุฟิลด์ _id ในออบเจ็กต์ที่ต้องการอัปเดต
        await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        res.redirect('/')
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});




module.exports = router