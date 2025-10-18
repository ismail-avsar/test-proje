import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback, Card } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Lütfen geçerli bir email girin',
  password: 'Şifre en az 4 karakter olmalı',
  terms: 'Şartları kabul etmeniz gerekiyor',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = errorMessages.email;
    }

    if (form.password && form.password.length < 4) {
      newErrors.password = errorMessages.password;
    }

    if (!form.terms) {
      newErrors.terms = errorMessages.terms;
    }

    setErrors(newErrors);

    if (
      emailRegex.test(form.email) &&
      form.password.length >= 4 &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password === form.password && item.email === form.email
        );
        if (user) {
          setForm(initialForm);
          history.push('/success');
        } else {
          alert('Kullanıcı bulunamadı!');
        }
      });
  };

  return (
    <Card >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Emailinizi girin"
            type="email"
            onChange={handleChange}
            value={form.email}
            invalid={!!errors.email}
          />
          {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Şifre</Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Şifrenizi girin"
            type="password"
            onChange={handleChange}
            value={form.password}
            invalid={!!errors.password}
          />
          {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
        </FormGroup>

        <FormGroup check>
          <Input
            type="checkbox"
            id="terms"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />
          <Label htmlFor="terms" check>
            Şartları kabul ediyorum
          </Label>
          {errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}
        </FormGroup>

        <FormGroup className="text-center p-4">
          <Button color="primary" disabled={!isValid}>
            Giriş Yap
          </Button>
        </FormGroup>
      </Form>
    </Card>
  );
}
