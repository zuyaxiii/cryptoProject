# วิธีการติดตั้งและใช้งานระบบ

## การติดตั้ง
1. ติดตั้งแพ็กเกจที่จำเป็นโดยใช้คำสั่ง:
   ```bash
   npm i
   ```

2. ตั้งค่า MySQL และ JWT ตามตัวอย่างที่มีในไฟล์ `.env.example` โดยสร้างไฟล์ `.env` และเพิ่มค่าที่เกี่ยวข้อง เช่น:
   ```env
   MYSQL_HOST=yourlocalhost
   MYSQL_USER=youruser
   MYSQL_PASSWORD=yourpassword
   MYSQL_DATABASE=yourdatabase
   MYSQL_PORT=yourport
   JWT_SECRET=yourjwtsecret
   ```

## การใช้งาน
1. ใช้ Postman หรือเครื่องมืออื่น ๆ ในการสร้างผู้ใช้งานใหม่ (User) ผ่าน API
   - ดูเส้นทาง (Router) ต่าง ๆ ได้ในโฟลเดอร์ `Routers`
   - การสร้างผู้ใช้งานสามารถทำได้ทีละคน สามารถดูใน โฟลเดอร์ `Example`ที่จัดเตรียมไว้ให้

2. เมื่อสร้างผู้ใช้งานสำเร็จแล้ว ให้เข้าสู่ระบบ (Login) โดยใช้ Email และ Password ที่สร้างขึ้นแบบนี้
   
  ```json
     {
         "email": "example@example.com",
         "password": "yourpassword"
     }
```

## การทำธุรกรรม (Transaction)
ระบบอื่น ๆ เช่น การทำธุรกรรม (Transaction) สามารถใช้งานได้หลังจากเข้าสู่ระบบสำเร็จ Example ในการใช้ครับ:

```json
{
    "ReceiverUserID": null, // มีหรือไม่มีก็ได้ แต่ต้องเป็น ID ที่มีอยู่ในระบบ
    "CryptoCurrency": "BTC",
    "TransactionType": "Transfer",
    "Amount": 10,
    "TransactionFee": 0.001,
    "Currency": null,
    "ExternalWalletAddress": "asdsadqkwedfgkbsdmvkpsf" // มีหรือไม่มีก็ได้
}
```

### หมายเหตุ
- `ReceiverUserID` ต้องเป็น ID ของผู้ใช้งานที่มีอยู่ในระบบ หากไม่มี ให้ระบุ `null` หรือไม่ใส่
- `ExternalWalletAddress` สามารถเว้นว่างได้หากไม่ใช่การโอนไปยัง Wallet ภายนอก


