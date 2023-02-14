import mjml2html from 'mjml'

export default function requestDemo(user) {
    const htmlOutput = mjml2html(
        `<mjml>
            <mj-body background-color="#ffffff">
                <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
                    <mj-column vertical-align="top" width="100%">
                    </mj-column>
                </mj-section>
                <mj-section padding-bottom="0px" padding-top="10px">
                    <mj-column vertical-align="top" width="100%">
                    <mj-text align="left" color="#000" font-size="25px" font-weight="bold" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="30px" padding-top="50px">Demo Request</mj-text>
                    </mj-column>
                </mj-section>
                <mj-section background-color="#f5f5f4" padding-bottom="20px" padding-top="20px">
                    <mj-column vertical-align="middle" width="100%">
                        <mj-text align="left" color="#000" font-size="22px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" text-transform="capitalize"><span style="color:#000">Dear ${user}</span></mj-text>
                        <mj-text align="left" color="#000" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Thanks for contacting us about requesting a demo of CINTEL App. We will be in touch shortly...</mj-text>
                        <mj-text align="left" color="#000" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Kind regards, <br /><br /> The MaryOctav Team</mj-text>
                    </mj-column>
                </mj-section>
            </mj-body>
        </mjml>
        `, {keepComments: false}
    ) 
    return htmlOutput.html
}