import React from 'react';
import {Card, Grid, Image, Button, Dimmer, Icon} from 'semantic-ui-react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import UploadedFileCard from './UploadedFileCard.jsx';

class UploadDocs extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteFiles = this.handleDeleteFiles.bind(this);
    this.state = {
      files: [],
    };
  }

  componentDidMount() {
    axios
      .get('/file/' + this.props.patient.patientID)
      .then(response => {
        this.setState({
          files: response.data,
        });
      })
      .catch(err => {
        console.log('error retrieving uploads from server');
      });
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('patientID', this.props.patient.patientID);

    axios
      .post('/file', data)
      .then(response => {
        console.log('response: ', response);
        this.setState({
          files: response.data,
        });
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }

  handleDeleteFiles(file) {
    axios
      .delete('/file/' + file._id)
      .then(response => {
        this.setState({
          files: response.data,
        });
      })
      .catch(err => {
        console.log('error deleting files: ', err);
      });
  }

  render() {
    let dropzoneRef;
    let uploadedFiles = this.state.files.map((file, i) => {
                          return (
                            <UploadedFileCard
                              key={i}
                              file={file}
                              handleDeleteFiles={this.handleDeleteFiles}
                            />
                          )
                        });

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header style={{paddingBottom: 10}}>Uploaded Documents</Card.Header>
          <Card.Description>
            <Card.Group itemsPerRow={4}>
              {uploadedFiles}
            </Card.Group>
          </Card.Description>
          <Dropzone
            style={{display: 'none'}}
            ref={node => {
              dropzoneRef = node;
            }}
            onDrop={this.onImageDrop.bind(this)}
          />
        </Card.Content>
        <Button
          fluid
          color="teal"
          onClick={() => dropzoneRef.open()}
        >
          Upload A File
        </Button>
      </Card>
    )
  }
}

export default UploadDocs;