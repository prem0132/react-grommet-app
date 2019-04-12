import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Rest, { headers, buildQuery, processStatus } from 'grommet/utils/Rest';

import {urlPrefix} from '../actions/utils'

import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import LoginForm from 'grommet/components/LoginForm';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';
import Logo from 'grommet/components/icons/Grommet';

import store from '../store';
import { login } from '../actions/session';
import { navEnable } from '../actions/nav';
import { pageLoaded } from './utils';



class Login extends Component {
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
    this.state= {
        SecurityMessage: undefined,
        IsEnabled: undefined
    }
  }
  
  componentDidMount() {
    pageLoaded('Login');
    this.props.dispatch(navEnable(false));
    //console.log('url prefix', urlPrefix)
    const uri = '/redfish/v1/Managers/1/LoginSecurityBanner';
    const data = fetch(`${urlPrefix}${uri}`)
    .then(processStatus)
    .then(response => response.json())
    .then(json => {
      if(json.IsEnabled == true){
        this.setState({ SecurityMessage: json.SecurityMessage});
        }
        else{
          this.setState({ SecurityMessage: undefined});
        }
      }
    );
  }


  componentWillUnmount() {
    this.props.dispatch(navEnable(true));
    
  }

  _onSubmit(fields) {
    const { dispatch } = this.props;
    const { router } = this.context;
    dispatch(login(fields.username, fields.password, () => (
      router.history.push('/dashboard')
    )));
    // router.history.push('/dashboard')
  }
  

  render() {
    const { session: { error } } = this.props;
    
    return (
      <Split flex='left' separator={true}>

        <Article>
          <Section
            full={true}
            colorIndex='brand'
            texture='url(img/splash.png)'
            pad='large'
            justify='center'
            align='center'
          >
            <Heading tag='h1' strong={true}>iLO EDGE </Heading>
            <Paragraph align='center' size='large'>
              {/* Edgeline Services Controller */}
              (Beta)
            </Paragraph>
          </Section>
        </Article>

        <Sidebar justify='between' align='center' pad='none' size='large'>
          <span />
          <LoginForm
            align='center'
            logo={<Logo className='logo' colorIndex='brand' />}
            title='iLO EDGE (beta)'
            secondaryText={this.state.SecurityMessage}
            onSubmit={this._onSubmit}
            errors={[error]}
            usernameType='text'
          />
          
          <Footer
            direction='row'
            size='small'
            pad={{ horizontal: 'medium', vertical: 'small' }}
          >
            <span className='secondary'>&copy; 2018 HPE</span>
          </Footer>
        </Sidebar>

      </Split>
    );
  }
}

Login.defaultProps = {
  session: {
    error: undefined
  }
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.shape({
    error: PropTypes.string
  })
};

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};

const select = state => ({
  ...state.session,
});

export default connect(select)(Login);
