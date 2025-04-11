import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Spinner,
  Alert,
  Form,
  Button,
} from "react-bootstrap";
import axios from "axios";
import "../styles.css";
import NavBarFilter from "../components/NavBarFilter";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleResult = (data) => {
    setFiles(data);
    setError(null);
  };

  const handleError = (message) => {
    setFiles([]);
    setError(message);
  };

  useEffect(() => {
    axios
      .get("/api/files/data")
      .then((res) => setFiles(res.data))
      .catch(() => setError("No se pudo cargar la información."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const filteredFiles = files.filter((file) =>
    file.file.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <NavBarFilter
        onResult={handleResult}
        onError={handleError}
        setLoading={setLoading}
      />

      <div className="app-header d-flex justify-content-between align-items-center px-4">
        <h1 className="m-0">Fullstack Challenge Viewer</h1>
        <Button
          variant={darkMode ? "light" : "dark"}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </Button>
        <Button
          variant="outline-primary"
          href="/selfcheck"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver Tests
        </Button>
      </div>

      <Container>
        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            placeholder="Filtrado rápido por nombre de archivo..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Form.Group>

        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}

        {error && (
          <div className="text-center my-4">
            <img
              src="/icons/system-failure.svg"
              alt="Error"
              style={{ width: "100px", marginBottom: "1rem" }}
            />
            <Alert variant="danger">
              <p>
                <strong>Algo salió mal.</strong>
              </p>
              <p>
                Verificá la conexión o consultá el estado del sistema en&nbsp;
                <a href="/selfcheck" target="_blank" rel="noopener noreferrer">
                  /selfcheck
                </a>
                .
              </p>
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                Si el problema persiste, contactá a soporte técnico.
              </p>
            </Alert>
          </div>
        )}

        {filteredFiles.map((file) => (
          <div key={file.file} className="file-section">
            <h4>{file.file}</h4>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Text</th>
                  <th>Number</th>
                  <th>Hex</th>
                </tr>
              </thead>
              <tbody>
                {file.lines.map((line, idx) => (
                  <tr key={idx}>
                    <td>{line.text}</td>
                    <td>{line.number}</td>
                    <td>{line.hex}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
      </Container>
    </>
  );
}
