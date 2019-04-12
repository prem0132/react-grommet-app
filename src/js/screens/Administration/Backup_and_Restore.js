import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Grommet, App } from 'grommet';
import Notification from 'grommet/components/Notification';
import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';

import Paragraph from 'grommet/components/Paragraph';
import SyncIcon from 'grommet/components/icons/base/Sync';
import ArchiveIcon from 'grommet/components/icons/base/Archive';
import Button from 'grommet/components/Button';
import { pageLoaded } from '../utils';
import { backupConfig, restoreConfig, loadData, unloadBackupandRestoreSummary, factoryConfig } from '../../actions/Administration/backup_and_restore'

import store from '../../store';


class Backup_and_Restore extends Component {

    constructor(props){
        super(props);
        this._backup = this._backup.bind(this);
        this._restore = this._restore.bind(this);
        this._factoryDefaults = this._factoryDefaults.bind(this);

        this.state ={
            Oem:{
                Hpe:{
                    ESCConfigurationBackup: false,
                    ESCConfigurationRestore: false
                }
            },
            notificatonMessage: false,
            status: undefined,
            error: undefined
        }
       
    }

    componentDidMount(){
        pageLoaded('Backup and Restore');
        this.props.dispatch(loadData());
        this.state.Oem.Hpe.ESCConfigurationBackup = store.getState().BackupandRestore.ESCConfigurationBackup;
        this.state.Oem.Hpe.ESCConfigurationRestore = store.getState().BackupandRestore.ESCConfigurationRestore;
    }

    _backup(){
        this.state.Oem.Hpe.ESCConfigurationBackup=true;
        this.props.dispatch(backupConfig(this.state));
        if(store.getState().BackupandRestore.backupError == undefined)
        {
            this.setState({notificatonMessage :'Successfully backup',
            status: 'ok'})
        }
        else
        {
            this.setState({notificatonMessage :'Failed to backup',
            status: 'critical'})
        }
       
    }

    _restore(){
        this.state.Oem.Hpe.ESCConfigurationBackup=true;
        this.props.dispatch(restoreConfig(this.state))
        if(store.getState().BackupandRestore.restoreError == undefined)
        {
            this.setState({notificatonMessage :'Successfully restored',
            status: 'ok'})
        }
        else
        {
            this.setState({notificatonMessage :'Failed to restore',
            status: 'critical'})
        }
    }

    _factoryDefaults(){
        let data = {"ResetType":"Default"};
        this.props.dispatch(factoryConfig(data))
        
        if(store.getState().BackupandRestore.ESCFactoryRestore == true)
        {
            this.setState({notificatonMessage: 'Restored to factory settings',
            status: 'critical'})
        }
        else{
            this.setState({notificatonMessage: 'Error in restoring to factory settings',
            status: 'critical'})            
        }
    }

    componentWillUnmount(){
        this.props.dispatch(unloadBackupandRestoreSummary());
    }

    render() {
        // const {notificatonMessage } = this.state.notificatonMessage;
        let notification;
        
        if (this.state.notificatonMessage)
        {
        notification=(
            < Notification pad="medium" status={this.state.status} size='medium' closer='true'
            message={this.state.notificatonMessage}>
            
            </ Notification>
           )
        }

        return(
            <Box flex={true}>
               {notification}
            <Box justify='center'
                align='center'
                wrap={true}
                pad='large'
                margin='small'
                colorIndex='light-1'
                direction='row'
                > 

                    <Box 
                    pad='large'
                    margin='small'
                    colorIndex='light-1'
                    separator='all'
                    > 
                        <Button icon={<ArchiveIcon />}
                        plain={true}
                        label='Backup'
                        onClick = {this.props.accountType== 'admin'? this._backup:null}
                         />
                    </Box>
                    <Box 
                    pad='large'
                    margin='small'
                    colorIndex='light-1'
                    separator='all'
                    > 
                        <Button icon={<SyncIcon />}
                        plain={true}
                        label='Restore'
                        onClick = {this.props.accountType== 'admin'? this._restore:null}
                         />
                    </Box>
                    <Box 
                    pad='large'
                    margin='small'
                    colorIndex='light-1'
                    separator='all'
                    > 
                        <Button icon={<ArchiveIcon />}
                        plain={true}
                        label='Factory defaults'
                        onClick= {this.props.accountType== 'admin'? this._factoryDefaults:null}
                         />
                    </Box>

            </Box>
            </Box>
        );
    }
}

const select = state => ({ ...state.BackupandRestore,...state.session});
export default connect(select)(Backup_and_Restore);