import React from "react";

type FooterProps = {
    footerShortcuts?: string[];
    footerFullforms?: string[];
};

const Footer = (props: FooterProps) => {

    const footerOutput = [];
    for(let i in props.footerShortcuts) {
        footerOutput.push(
          (<td><span className="footer-shortcut">{props.footerShortcuts?.[+i]}</span> <span className="footer-fullform">{props.footerFullforms?.[+i]}</span></td>)
        )
    }
    return (
        <div className="footer">
        <table>
            <tr>{footerOutput.slice(0, footerOutput.length/2)}</tr>
            <tr>{footerOutput.slice(footerOutput.length/2)}</tr>
        </table>
        </div>
    );
};

export default Footer;
