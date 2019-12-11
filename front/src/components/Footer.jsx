import React from 'react';
import { Link } from 'react-router-dom';
import ContactsIcon from '@material-ui/icons/Contacts';
import { useStylesForFooter } from '../styles';

export const Footer = () => {
    const classes = useStylesForFooter();

    
    return (
        <>
        <div className={classes.root}>
            <Link className={classes.linkToContact} to="/contact">
                <ContactsIcon className={classes.contactIcon} />
                <p className={classes.label}>Contact</p>
            </Link>
            <p className={classes.signature}>&copy; Created by Jinofly</p>
        </div>
        </>
    )
}