import React from 'react';
import {Card, Dimmer, Button, Icon, Image} from 'semantic-ui-react';

class UploadedFileCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleDimmer = this.handleDimmer.bind(this);
    this.state = {
      active: false,
    };
  }

  handleDimmer() {
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    const {active} = this.state;
    let dropzoneRef;
    const content = (
      <div>
        <Button
          icon="trash outline"
          onClick={() => this.props.handleDeleteFiles(this.props.file)}
        />
      </div>
    );
    return (
      <Card>
        <Dimmer.Dimmable
          as={Image}
          dimmed={active}
          dimmer={{active, content}}
          onMouseEnter={this.handleDimmer}
          onMouseLeave={this.handleDimmer}
          size='medium'
          src={`/files/${this.props.file.fileName}`}
        />
      </Card>
    )
  }
}

export default UploadedFileCard;