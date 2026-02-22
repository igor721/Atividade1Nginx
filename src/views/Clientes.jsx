import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import ClientesTable from '../components/ClientesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Clientes = () => {
  const [Clientes, setClientes] = useState([]);
  const [show, setShow] = useState(false);

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    nascimento: Yup.string()
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Data no formato DD/MM/AAAA')
      .required('Campo obrigatório'),
    cep: Yup.string()
      .matches(/^\d{8}$/, 'CEP deve conter 8 dígitos')
      .required('Campo obrigatório')
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setClientes([...Clientes, values]);
        setShow(false);
        resetForm();
      }
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h1>Clientes</h1>
        <Row>
          <Col>
            <MDBInput label="Buscar" type="text" size="sm" />
          </Col>
          <Col className="text-end">
            <MDBTooltip title="Cadastrar Cliente">
              <Button onClick={() => setShow(true)}>+</Button>
            </MDBTooltip>
          </Col>
        </Row>
      </div>

      <ClientesTable clientes={Clientes} setClientes={setClientes} />

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Cliente</Modal.Title>
        </Modal.Header>
        
        <Formik
          initialValues={{
            nome: '',
            email: '',
            nascimento: '',
            cep: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                    isInvalid={touched.nome && !!errors.nome}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nascimento</Form.Label>
                  <Form.Control
                    name="nascimento"
                    placeholder="DD/MM/AAAA"
                    value={values.nascimento}
                    onChange={handleChange}
                    isInvalid={touched.nascimento && !!errors.nascimento}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nascimento}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control
                    name="cep"
                    value={values.cep}
                    onChange={handleChange}
                    isInvalid={touched.cep && !!errors.cep}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cep}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Fechar
                </Button>
                <Button variant="primary" type="submit">
                  Cadastrar
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Clientes;