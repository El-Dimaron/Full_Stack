import { useFormik } from "formik";
import { object, ref, string } from "yup";
import "../form.css";

const RegistrationSchema = object({
  name: string().min(2, "Name is too short").max(50, "Name is too long").required("Required field"),

  email: string().email("Incorrect email format. Expected 'example@mail.com'").required("Required field"),

  password: string().min(8, "Password has to contain at least 8 symbols").required("Required field"),

  confirmPassword: string()
    .oneOf([ref("password")], "Passwords do not match")
    .required("Required field"),
});

export const FormikForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: RegistrationSchema,

    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values, "Submitted");

      resetForm();
      setSubmitting(false);
    },
  });

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Formik Form</h2>
        <form className="form-element" onSubmit={formik.handleSubmit}>
          <div className="form-subelement">
            <label htmlFor="name" className="form-label">
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.name && formik.errors.name && <p className="form-error">{formik.errors.name}</p>}
          </div>

          <div className="form-subelement">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.email && formik.errors.email && <p className="form-error">{formik.errors.email}</p>}
          </div>

          <div className="form-subelement">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.password && formik.errors.password && (
              <p className="form-error">{formik.errors.password}</p>
            )}
          </div>

          <div className="form-subelement">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="form-error">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <button className="form-button" type="submit" disabled={formik.isSubmitting}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
