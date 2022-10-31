/* global FileReader, Blob, sa */
import React, { Component } from 'react';
import { Form, InputGroup, Button, Alert } from 'react-bootstrap';
import prettier from 'prettier/standalone';
import PhpPlugin from '@prettier/plugin-php/standalone';
import { saveAs } from 'file-saver';
import Layout from '../components/Layout';

export default class extends Component {
  state = {
    files: [],
    loading: false,
    error: null,
    beautifyCode: true,
  };

  handleFileChange = (event) => {
    this.setState({
      files: event.target.files,
    });
  };

  handleStubChange = (event) => {
    this.setState({
      stub: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { files, beautifyCode } = this.state;
    this.setState({
      loading: true,
      error: false,
    });

    const formData = new FormData();
    formData.append('fileToUpload', files[0]);

    const response = await fetch('https://pmf-decoder.nathfreder.dev/', {
      method: 'POST',
      body: formData,
    });

    this.setState({
      loading: false,
    });

    if (response.headers.get('Content-Type') !== 'application/json') {
      return this.setState({
        error: await response.text(),
      });
    }

    const json = await response.json();
    const plugin = { ...json };
    plugin.code = `<?php ${plugin.code}`;

    if (beautifyCode) {
      plugin.code = prettier.format(plugin.code, {
        plugins: [PhpPlugin],
        parser: 'php',
      });
    }

    saveAs(
      new Blob([plugin.code]),
      `${files[0].name
        .split('.')
        .slice(0, -1)
        .join('.')}.php`,
    );
  };

  render = () => {
    const { files, loading, error, beautifyCode, includeMetadata } = this.state;

    return (
      <Layout title="PMF Decoder">
        {error ? <Alert variant="danger">{error}</Alert> : null}
        <Form onSubmit={this.handleSubmit}>
          <Form.Label>Plugin</Form.Label>
          <InputGroup className="mb-3">
            <div className="custom-file">
              <Form.Control
                type="file"
                name="fileToUpload"
                className="custom-file-input"
                accept=".pmf"
                onChange={this.handleFileChange}
              />
              <Form.Label className="custom-file-label" style={{ color: files[0] ? null : '#747c84' }}>
                {files[0] ? files[0].name : 'No PMF selected'}
              </Form.Label>
            </div>
          </InputGroup>
          <div className="mb-3">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="beautifyCode"
                checked={beautifyCode}
                onChange={(event) => this.setState({ beautifyCode: event.target.checked })}
              />
              <label
                className="custom-control-label"
                htmlFor="beautifyCode"
              >
                Beautify code
              </label>
            </div>
          </div>
          <Button variant="secondary" type="submit" disabled={files.length < 1} disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true" /> : null}
            Decode
          </Button>
          <small className="text-muted"><br />Your plugin will be uploaded to <a>https://pmf-decoder.nathfreder.dev</a> and stored temporarily.</small>
        </Form>
      </Layout>
    );
  };
}
