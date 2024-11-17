"use client";

import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { string, object } from "yup";

// Define Yup validation schema
const validationSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email format").required("Email is required"),
  website: string()
    .matches(
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      "Invalid URL format"
    )
    .required("Website is required"),
  message: string().required("Message is required"),
});

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    website: "",
    message: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setLoading(true);

    const data = {
      no: Date.now(),
      ...values,
    };

    try {
      const response = await fetch("/api/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        resetForm();
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="content-wrap" className="site-page">
      <div className="row">
        <div className="col-twelve">
          <section>
            <div className="content-media">
              <div id="map-wrap">
                <div id="map-container"></div>
                <div id="map-zoom-in"></div>
                <div id="map-zoom-out"></div>
              </div>
            </div>

            <div className="primary-content">
              <h1 className="entry-title add-bottom">Get In Touch With Us.</h1>

              <p className="lead">
                Lorem ipsum Deserunt est dolore Ut Excepteur nulla occaecat
                magna occaecat Excepteur nisi esse veniam dolor consectetur
                minim qui nisi esse deserunt commodo ea enim ullamco non
                voluptate consectetur minim aliquip Ut incididunt amet ut
                cupidatat.
              </p>

              <p>
                Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat
                nostrud cupidatat dolor sunt sint sit nisi est eu exercitation
                incididunt adipisicing veniam velit id fugiat enim mollit amet
                anim veniam dolor dolor irure velit commodo cillum sit nulla
                ullamco magna amet magna cupidatat qui labore cillum sit in
                tempor veniam consequat non laborum adipisicing aliqua ea nisi
                sint ut quis proident ullamco ut dolore culpa occaecat ut
                laboris in sit minim cupidatat ut dolor voluptate enim veniam
                consequat occaecat fugiat in adipisicing in amet Ut nulla nisi
                non ut enim aliqua laborum mollit quis nostrud sed sed.
              </p>

              <div className="row">
                <div className="col-six tab-full">
                  <h4>Where to Find Us</h4>
                  <p>
                    1600 Amphitheatre Parkway
                    <br />
                    Mountain View, CA
                    <br />
                    94043 US
                  </p>
                </div>

                <div className="col-six tab-full">
                  <h4>Contact Info</h4>
                  <p>
                    someone@abstractwebsite.com
                    <br />
                    info@abstractwebsite.com <br />
                    Phone: (+63) 555 1212
                  </p>
                </div>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form name="cForm" id="cForm">
                    <fieldset>
                      <div className="form-field">
                        <Field
                          name="name"
                          type="text"
                          id="cName"
                          className="full-width"
                          placeholder="Your Name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="error-contact-message"
                        />
                      </div>

                      <div className="form-field">
                        <Field
                          name="email"
                          type="email"
                          id="cEmail"
                          className="full-width"
                          placeholder="Your Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error-contact-message"
                        />
                      </div>

                      <div className="form-field">
                        <Field
                          name="website"
                          type="text"
                          id="cWebsite"
                          className="full-width"
                          placeholder="URL (e.g. http://www.google.com, facebook.com, etc.)"
                        />
                        <ErrorMessage
                          name="website"
                          component="div"
                          className="error-contact-message"
                        />
                      </div>

                      <div className="message form-field">
                        <Field
                          name="message"
                          as="textarea"
                          id="cMessage"
                          className="full-width"
                          placeholder="Your Message"
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="error-contact-message"
                        />
                      </div>

                      <button
                        type="submit"
                        className="submit button-primary full-width-on-mobile"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="spinner-contact-form"></span>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </fieldset>
                  </Form>
                )}
              </Formik>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
