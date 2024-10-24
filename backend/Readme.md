# Backend Kurulum Patikası -->

* `npm i` gerekli değişkenleri kurmak için.
* `npm run dev` backend başlatmak için.
* `npm i cors` başka origin'den erişilmeye izin vermek için. Backend 5001 portunda, Frontend 3001 portun'a erişmek için. (server.js dosyasında app.use(corse())'u routelardan önce kullanmak gerekiyor.)

* `npm install bcryptjs jsonwebtoken express-validator` Bu paketler kimlik doğrulama işlemi ve şifre kontrolü için gereklidir
* express-validator: Gelen giriş verilerini (email ve password) doğrulamak için kullanıyoruz. Eğer hatalı giriş yapılırsa, bunu kullanıcılara geri döndürüyoruz.
* bcrypt.compare: Veritabanında saklanan hash'lenmiş şifre ile kullanıcının girdiği şifreyi karşılaştırıyoruz.
* JWT: Başarılı bir giriş işleminden sonra, JWT kullanarak kullanıcıya bir token veriyoruz. Bu token, kullanıcıyı doğrulamak ve diğer yetkilendirilmiş işlemleri yapabilmesi için kullanılabilir.

 ## POSTMAN ile Giriş Rotasını Test Etmek

 * URL: `http://localhost:5001/api/auth/login` POST ile Body Kısmına JSON formatında kullanıcı e-mail ve Password'u giriyoruz.

 * Başarılı giriş olursa JWT token dönecektir.