import { useForm, type SubmitHandler } from "react-hook-form";
import "../form.css";

type RegistrationFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<RegistrationFormValues> = (values) => {
    console.log(values, "Submitted");

    reset();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">React Hook Form</h2>

      <form className="form-element" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-subelement">
          <label htmlFor="name" className="form-label">
            Name
          </label>

          <input
            type="text"
            id="name"
            className="form-input"
            placeholder="Enter your name"
            {...register("name", {
              required: "Required field",
              minLength: {
                value: 2,
                message: "Name is too short",
              },
              maxLength: {
                value: 50,
                message: "Name is too long",
              },
            })}
          />

          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        <div className="form-subelement">
          <label htmlFor="email" className="form-label">
            Email
          </label>

          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
            {...register("email", {
              required: "Required field",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Incorrect email format. Expected 'example@mail.com'",
              },
            })}
          />

          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div className="form-subelement">
          <label htmlFor="phone" className="form-label">
            Phone number
          </label>

          <input
            type="tel"
            id="phone"
            className="form-input"
            placeholder="Enter your phone number"
            {...register("phone", {
              pattern: {
                value: /^\+?[0-9\s()-]{7,20}$/,
                message: "Incorrect phone number format",
              },
            })}
          />

          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>

        <div className="form-subelement">
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Enter your password"
            {...register("password", {
              required: "Required field",
              minLength: {
                value: 8,
                message: "Password has to contain at least 8 symbols",
              },
            })}
          />

          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>

        <div className="form-subelement">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>

          <input
            type="password"
            id="confirmPassword"
            className="form-input"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Required field",
              validate: (value) => value === passwordValue || "Passwords do not match",
            })}
          />

          {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
        </div>

        <button className="form-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
