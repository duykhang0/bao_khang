import { User } from "../model/User.js";

// const submitBtn = document.getElementById("submit");
// // lấy dữ liệu từ API
// const signUp = (userObj) => {
//   //goi api
//   const res = axios({
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     url: `https://shop.cyberlearn.vn/api/Users/signup`,
//     method: "POST",
//     data: userObj,
//   });

//   //kiem tra api
//   res
//     .then((result) => {
//       alert("ban da dang ky thanh cong");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const validateData = (userObj, confirm) => {
//   const user = new User(userObj);
//   console.log(userObj);
//   const { name, email, password, gender, phone } = user;
//   if (!name || !email || !password || !confirm || !phone || !gender) {
//     console.log("object");
//     alert("vui long dien vao form");
//     return false;
//   }
//   const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//   if (!regexEmail.test(email)) {
//     alert("email sai cu phap");
//     return false;
//   }

//   const regexPassword =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   if (!regexPassword.test(password)) {
//     alert(
//       "Password phai co it nhat 8 ky tu bao gom chu va so, 1 ky tu in hoa va 1 ky tu dac biet "
//     );
//     return false;
//   }
//   if (password !== confirm) {
//     alert("password khong dong nhat");
//     return false;
//   }
//   const regexPhone = /^[0-9]{10,}$/;
//   if (!regexPhone.test(phone)) {
//     alert("phone k dung");
//     return false;
//   }

//   return true;
// };

// // signUp("");

// //lay du lieu tu UI
// const getFormData = () => {
//   const email = document.getElementById("txtEmail").value;
//   const name = document.getElementById("txtName").value;
//   const password = document.getElementById("txtPassword").value;
//   const phone = document.getElementById("txtPhone").value;
//   const confirm = document.getElementById("txtConfirm").value;
//   const gender = document.querySelector(
//     '.register__wrap-check input[name="inlineRadioOptions"]:checked'
//   ).value;

//   const userObj = new User({
//     email,
//     name,
//     password,
//     phone,
//     gender: true,
//   });
//   const validate = validateData(userObj, confirm);
//   if (validate) {
//     signUp(userObj);
//   }
//   //   signUp(userObj);
// };

// submitBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   getFormData();
// });
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit");
  
  if (!submitBtn) {
    console.error('Không tìm thấy nút submit với id "submit"');
    return;
  }

  // Hàm đăng ký người dùng
  const signUp = async (userObj) => {
    try {
      await axios({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: `https://shop.cyberlearn.vn/api/Users/signup`,
        method: "POST",
        data: userObj,
      });
      alert("Bạn đã đăng ký thành công");
    } catch (err) {
      console.error("Lỗi khi đăng ký:", err);
    }
  };

  // Hàm kiểm tra dữ liệu người dùng
  const validateData = (userObj, confirm) => {
    const user = new User(userObj);
    const { name, email, password, gender, phone } = user;

    if (!name || !email || !password || !confirm || !phone || !gender) {
      alert("Vui lòng điền đầy đủ thông tin vào form");
      return false;
    }

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(email)) {
      alert("Email không hợp lệ");
      return false;
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexPassword.test(password)) {
      alert("Mật khẩu phải có ít nhất 8 ký tự bao gồm chữ cái, số, ký tự in hoa và ký tự đặc biệt");
      return false;
    }

    if (password !== confirm) {
      alert("Mật khẩu không khớp");
      return false;
    }

    const regexPhone = /^[0-9]{10,}$/;
    if (!regexPhone.test(phone)) {
      alert("Số điện thoại không hợp lệ");
      return false;
    }

    return true;
  };

  // Hàm lấy dữ liệu từ form
  const getFormData = () => {
    const email = document.getElementById("txtEmail").value;
    const name = document.getElementById("txtName").value;
    const password = document.getElementById("txtPassword").value;
    const phone = document.getElementById("txtPhone").value;
    const confirm = document.getElementById("txtConfirm").value;
    const gender = document.querySelector(
      '.register__wrap-check input[name="inlineRadioOptions"]:checked'
    ).value;

    const userObj = new User({
      email,
      name,
      password,
      phone,
      gender,
    });

    if (validateData(userObj, confirm)) {
      signUp(userObj);
    }
  };

  // Thêm sự kiện click cho nút submit
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút submit (nếu cần)
    getFormData();
  });
});