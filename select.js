const db = require('./db_connection')
//console.log(db)
let sql = "INSERT INTO HotelVacancy.user (id, user_name) VALUES ('1003', 'mule')";
let sql2 = "INSERT INTO HotelVacancy.Hotel (hotel_id,Hotelname, address, latitude, longitude,description,total_capacity, occopied_rooms, phone_number,id) VALUES ('0021', 'Skylight Hotel', 'bole', '123', '444','hotel','300','40','2519122222','1001')";
let sql3 = "UPDATE HotelVacancy.Hotel SET available_room = '15' WHERE hotel_id = '0021'";
let queries = {
    selecting: db.query("SELECT * FROM HotelVacancy.Hotel", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    }),
    inserting: db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    }),
    updating: db.query(sql3, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    })



}