"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { object, string } from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginValues {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // New state

  const initialValues: LoginValues = {
    username: "",
    password: "",
  };

  const validationSchema = object().shape({
    username: string()
      .required("Username is required")
      .oneOf(["admin"], "Username must be exactly 'admin'"),
    password: string()
      .required("Password is required")
      .oneOf(["password"], "Password must be exactly 'password'"),
  });

  const onSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    setSubmitting(true);
    try {
      if (values.username === "admin" && values.password === "password") {
        document.cookie = "isAdmin=true; path=/"; // Session cookie
        setSubmissionSuccess(true);
        await router.push("/admin/response");
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key.trim()] = value;
      return acc;
    }, {} as Record<string, string>);

    if (cookies.isAdmin === "true") {
      router.push("/admin/response");
    }
  }, [router]);

  return (
    <>
      <title>Admin Log In</title>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f5f5f5"
      >
        <Paper style={{ padding: 20, width: 300 }}>
          <Box textAlign="center">
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <LockOpenOutlinedIcon />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Sign In
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Field name="username">
                  {({ field }: { field: any }) => (
                    <TextField
                      {...field}
                      label="Username"
                      placeholder="Enter username"
                      fullWidth
                      required
                      error={Boolean(
                        props.errors.username && props.touched.username
                      )}
                      helperText={<ErrorMessage name="username" />}
                      margin="normal"
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field }: { field: any }) => (
                    <TextField
                      {...field}
                      label="Password"
                      placeholder="Enter password"
                      type="password"
                      fullWidth
                      required
                      error={Boolean(
                        props.errors.password && props.touched.password
                      )}
                      helperText={<ErrorMessage name="password" />}
                      margin="normal"
                    />
                  )}
                </Field>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting || submissionSuccess}
                  fullWidth
                  style={{ marginTop: "16px", height: "36px" }}
                >
                  {props.isSubmitting || submissionSuccess ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <small
                  style={{
                    marginTop: "2.5rem",
                    marginBottom: "0.5rem",
                    display: "block",
                    textAlign: "center",
                    color: "#5e5d72",
                    fontWeight: "bold",
                  }}
                >
                  Back to home page <Link href={"/"}>Home</Link>
                </small>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </>
  );
}
