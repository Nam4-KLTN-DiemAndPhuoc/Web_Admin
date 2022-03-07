import * as Yup from "yup"
export const validationLogin = Yup.object().shape({
    email: Yup.string()
        .matches(/^\S+@\S+\.\S+$/, 'Email không hợp lệ')
        .required("Không được để trống"),
    password: Yup.string()
        .min(6, "Mật khẩu ít nhất 6 kí tự")
        .required("Không được để trống"),
  
});