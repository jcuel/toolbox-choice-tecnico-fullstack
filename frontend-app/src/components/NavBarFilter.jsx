import React from 'react';
import { useState } from 'react';
import { Navbar, Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function NavBarFilter({ onResult, onError, setLoading }) {
  const [fileName, setFileName] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(`/api/files/data?fileName=${fileName}`);
      onResult(res.data);
    } catch (err) {
      onError('No se pudo obtener datos para ese archivo.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/files/data`);
      setFileName('');
      onResult(res.data);
    } catch (err) {
      onError('No se pudo recargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Navbar bg="light" className="mb-4 shadow-sm">
      <Container>
        <Form className="w-100" onSubmit={handleSearch}>
          <Row className="align-items-center w-100">
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="Buscar archivo (ej: file1.csv)"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </Col>
            <Col xs="auto" className="mt-2 mt-md-0">
              <Button type="submit" variant="primary" className="me-2">
                Buscar
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                Ver todos
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
}
