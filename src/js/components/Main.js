import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';

import NavSidebar from './NavSidebar';
import { navResponsive } from '../actions/nav';

import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Sysinfo from '../screens/System_Information';
import Firmware_OS from '../screens/Firmware_OS';
import Network from '../screens/Network'
import Remote_Console from '../screens/Remote_Console';
import Power_Thermal from '../screens/Power_Thermal';
//import Tasks from '../screens/Tasks';
//import Task from '../screens/Task';
import NotFound from '../screens/NotFound';
import RemoteSupport from '../screens/RemoteSupport';
import Administration from '../screens/Administration';
import Security from '../screens/Security';
import Management from '../screens/Management';
import Optional_Cards from '../screens/Optional_Cards';
import AdminAdd from '../screens/Administration/AdminAdd';
import AdminEdit from '../screens/Administration/AdminEdit';
import killAuthenticateForm from '../screens/Administration/killAuthenticateForm';
import secureEraseAuthenticateForm from '../screens/Administration/secureEraseAuthenticate';
import CustomizeCertificate from '../screens/Security/CustomizeCertificate';
////Oneview Not Required
//import HPEOneView from '../screens/HPEOneView';

class Main extends Component {
  constructor() {
    super();
    this._onResponsive = this._onResponsive.bind(this);
  }

  _onResponsive(responsive) {
    this.props.dispatch(navResponsive(responsive));
  }

  render() {
    const {
      nav: { active: navActive, enabled: navEnabled, responsive }
    } = this.props;
    const includeNav = (navActive && navEnabled);
    let nav;
    if (includeNav) {
      nav = <NavSidebar />;
    }
    const priority = (includeNav && responsive === 'single' ? 'left' : 'right');

    return (
      <App centered={false}>
        <Router>
          <Split
            priority={priority}
            flex='right'
            onResponsive={this._onResponsive}
          >
            {nav}
            <Switch>
              <Route exact={true} path='/' component={Login} />
              <Route path='/Dashboard' component={Dashboard} />
              <Route path='/system_information' component={Sysinfo} />
              <Route path='/Firmware_OS' component={Firmware_OS} />
              <Route path='/Remote_Console' component={Remote_Console} />
              <Route path='/power_thermal' component={Power_Thermal} />
              <Route path='/Wired & Wireless Network' component={Network} />
              <Route path='/RemoteSupport' component={RemoteSupport} />
              <Route path='/Administration' component={Administration} />
              <Route path='/Security' component={Security} />
              <Route path='/Management' component={Management} />
              <Route path='/Option Cards' component={Optional_Cards} />
              <Route path='/Admin/Add' component={AdminAdd} />
              <Route path='/Admin/Edit' component={AdminEdit} />
              <Route path='/Admin/killAuthenticate' component={killAuthenticateForm} />
              <Route path='/Admin/secureEraseAuthenticate' component={secureEraseAuthenticateForm}  />
              <Route path='/SSLCertificate/CustomizeCert' component={CustomizeCertificate}  />
              
              {/* //Oneview Not Required  <Route path='/HPEOneView' component={HPEOneView} /> */}
              <Route path='/login' component={Login} />
              
              <Route path='/*' component={NotFound} />
            </Switch>
          </Split>
        </Router>
      </App>
    );
  }
}

Main.defaultProps = {
  nav: {
    active: true, // start with nav active
    enabled: true, // start with nav disabled
    responsive: 'multiple'
  }
};

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    active: PropTypes.bool,
    enabled: PropTypes.bool,
    responsive: PropTypes.string
  })
};

const select = state => ({
  nav: state.nav
});

export default connect(select)(Main);
